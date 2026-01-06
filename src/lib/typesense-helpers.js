import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { typesenseClient } from "./typesense";
import { COLLECTIONS, PACKAGE_STATUS } from "@/config";

const TYPESENSE_SYNC_DOC_ID = "typesense_sync_timestamp";
const TYPESENSE_SYNC_COLLECTION = "typesenseSync";
const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const packageSchema = {
  name: "packages",
  fields: [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "title", type: "string" },
    { name: "slug", type: "string" },
    { name: "basePrice", type: "float" },
    { name: "citiesList", type: "string" },
    { name: "titleSlug", type: "string" },
    { name: "theme", type: "string[]" },
    { name: "region", type: "string" },
    { name: "bannerImage", type: "string" },
  ],
  default_sorting_field: "basePrice",
};

const getReferencedData = async (docRef) => {
  try {
    // Handle both sanitized references and direct Firestore references
    let collectionName, documentId;

    if (docRef?.collection && docRef?.id) {
      // This is a sanitized reference from sanitizeDocRef
      collectionName = docRef.collection;
      documentId = docRef.id;
    } else if (docRef?._key && docRef?._key?.path) {
      // This is a direct Firestore document reference
      const segments = docRef._key.path.segments;
      documentId = segments.pop();
      collectionName = segments.pop();
    } else {
      console.log("Invalid document reference format:", docRef);
      return null;
    }

    const docSnap = await getDoc(doc(db, collectionName, documentId));
    if (docSnap.exists()) {
      const result = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error fetching referenced document:", error);
    return null;
  }
};

const getBannerImage = async (bannerImage) => {
  const data = await getReferencedData(bannerImage);
  if (data) {
    return data?.url;
  }
  return null;
};

const getAllPackages = async () => {
  const packageQuery = query(
    collection(db, COLLECTIONS.PACKAGES),
    where("status", "==", PACKAGE_STATUS.PUBLISHED)
  );
  const packageSnapshot = await getDocs(packageQuery);
  console.log("Total packages to upload", packageSnapshot.size);
  const packages = await Promise.all(
    packageSnapshot.docs.map(async (doc) => {
      const packageData = doc.data();
      const packageId = doc.id;
      const packageName = packageData.packageName;
      const packageTitle = packageData.packageTitle;
      const packageBasePrice = packageData.basePrice || 0;
      const packageSlug = packageData.packageSlug;
      const packageCitiesList = packageData.citiesList;
      const packageTitleSlug = packageData.titleSlug;
      const packageTheme = packageData.theme;
      const packageRegion = packageData.region;

      let packageBannerImage = null;
      if (packageData.bannerImages && packageData.bannerImages.length > 0) {
        const randomBannerImage = Math.floor(
          Math.random() * packageData.bannerImages.length
        );
        packageBannerImage = await getBannerImage(
          packageData.bannerImages[randomBannerImage]
        );
      }

      if (!packageBannerImage) {
        console.log("No banner image found for package", packageId);
      }

      return {
        id: packageId,
        name: packageName,
        title: packageTitle,
        basePrice: packageBasePrice,
        slug: packageSlug,
        citiesList: packageCitiesList,
        titleSlug: packageTitleSlug,
        theme: packageTheme,
        region: packageRegion,
        bannerImage: packageBannerImage,
      };
    })
  );
  return packages;
};

const createCollection = async (collectionSchema) => {
  try {
    const collectionExists = await typesenseClient
      .collections(collectionSchema.name)
      .exists();
    if (!collectionExists) {
      console.log("Collection does not exist");
      console.log("Creating collection");
      await typesenseClient.collections().create(collectionSchema);
      console.log("Collection created", collectionSchema.name);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating collection", error);
    throw error;
  }
};

const getLastSyncTimestamp = async () => {
  try {
    const syncDocRef = doc(
      db,
      TYPESENSE_SYNC_COLLECTION,
      TYPESENSE_SYNC_DOC_ID
    );
    const syncDoc = await getDoc(syncDocRef);
    if (syncDoc.exists()) {
      const data = syncDoc.data();
      const lastSynced = data.lastSynced;

      // Handle Firestore Timestamp object
      if (lastSynced instanceof Timestamp) {
        return lastSynced.toMillis();
      }

      // Handle if it's already a number (milliseconds)
      if (typeof lastSynced === "number") {
        return lastSynced;
      }

      // Handle if it's a Date object
      if (lastSynced instanceof Date) {
        return lastSynced.getTime();
      }

      return null;
    }
    return null;
  } catch (error) {
    console.error("Error getting sync timestamp:", error);
    return null;
  }
};

const updateSyncTimestamp = async () => {
  try {
    const syncDocRef = doc(
      db,
      TYPESENSE_SYNC_COLLECTION,
      TYPESENSE_SYNC_DOC_ID
    );
    await setDoc(
      syncDocRef,
      {
        lastSynced: serverTimestamp(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log("Sync timestamp updated");
  } catch (error) {
    console.error("Error updating sync timestamp:", error);
    throw error;
  }
};

const shouldRecreateCollection = async () => {
  try {
    const lastSync = await getLastSyncTimestamp();
    if (!lastSync) {
      console.log("No sync timestamp found, collection needs to be created");
      return true;
    }

    const now = Date.now();
    const timeSinceLastSync = now - lastSync;

    if (timeSinceLastSync >= SYNC_INTERVAL_MS) {
      console.log(
        `Last sync was ${Math.floor(timeSinceLastSync / (60 * 60 * 1000))} hours ago, recreating collection`
      );
      return true;
    }

    console.log(
      `Last sync was ${Math.floor(timeSinceLastSync / (60 * 60 * 1000))} hours ago, collection is up to date`
    );
    return false;
  } catch (error) {
    console.error("Error checking sync timestamp:", error);
    // If we can't check timestamp, assume we need to recreate
    return true;
  }
};

const uploadPackages = async (recreateCollection = false) => {
  try {
    const packages = await getAllPackages();
    console.log("Packages to upload", packages.length);

    // Check if packages collection exists, if not create it
    const collectionExists = await typesenseClient
      .collections(packageSchema.name)
      .exists();

    if (recreateCollection && collectionExists) {
      console.log("Recreating collection (deleting existing)...");
      await typesenseClient.collections(packageSchema.name).delete();
      await createCollection(packageSchema);
    } else if (!collectionExists) {
      console.log("Collection does not exist, creating it");
      await createCollection(packageSchema);
    } else {
      console.log("Collection exists, skipping creation");
    }

    console.log("Uploading packages to Typesense");
    const importResult = await typesenseClient
      .collections(packageSchema.name)
      .documents()
      .import(packages, { action: "upsert" });

    console.log("Upload complete");

    // Update sync timestamp after successful upload
    await updateSyncTimestamp();

    return importResult;
  } catch (error) {
    console.error("Error uploading packages", error);
    if (error.importResults) {
      console.log("Failed items:", error.importResults);
    }
    throw error;
  }
};

const ensureCollectionExists = async () => {
  try {
    const collectionExists = await typesenseClient
      .collections(packageSchema.name)
      .exists();

    if (!collectionExists) {
      console.log(
        "Collection 'packages' does not exist, creating and populating..."
      );
      await uploadPackages(false);
      return true;
    }

    // Check if we need to recreate based on timestamp (24 hour interval)
    const needsRecreation = await shouldRecreateCollection();
    if (needsRecreation) {
      console.log(
        "Collection exists but needs refresh (24+ hours since last sync), recreating..."
      );
      await uploadPackages(true);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error ensuring collection exists", error);
    throw error;
  }
};

export {
  createCollection,
  uploadPackages,
  ensureCollectionExists,
  packageSchema,
};
