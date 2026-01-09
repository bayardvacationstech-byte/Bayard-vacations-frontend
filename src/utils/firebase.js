import { db } from "@/firebase/firebaseConfig";
import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  serverTimestamp,
  limit,
  Timestamp,
} from "firebase/firestore";
import { COLLECTIONS, PACKAGE_STATUS } from "@/config";

// Helper function to sanitize document references
const sanitizeDocRef = (item) => {
  if (!item) return item;
  
  // For imageRefs which have a nested ref structure
  if (item.ref && item.ref._key && item.ref._key.path) {
    const segments = item.ref._key.path.segments;
    return {
      id: segments[segments.length - 1],
      collection: segments[segments.length - 2],
    };
  }
  
  // For direct document references
  if (item._key && item._key.path) {
    const segments = item._key.path.segments;
    return {
      id: segments[segments.length - 1],
      collection: segments[segments.length - 2],
    };
  }
  
  return item;
};

// Helper to recursively sanitize nested objects/arrays with depth safeguard
const sanitizeRecursively = (item, depth = 0) => {
  if (!item || typeof item !== "object" || depth > 8) return item;
  
  if (item instanceof Timestamp) {
    return item.toDate();
  }
  
  if (Array.isArray(item)) {
    return item.map(i => sanitizeRecursively(i, depth + 1));
  }
  
  // Safeguard: Check if it's a Firestore internal object
  if (item._key || item.firestore || item.converter || typeof item.withConverter === 'function') {
    return sanitizeDocRef(item);
  }

  // Only recurse into plain objects
  if (Object.prototype.toString.call(item) !== '[object Object]') {
    return item;
  }

  const newItem = {};
  Object.keys(item).forEach((key) => {
    newItem[key] = sanitizeRecursively(item[key], depth + 1);
  });
  
  return newItem;
};

// Helper function to sanitize document data
export const sanitizeDocumentData = (doc) => {
  const data = doc.data();

  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate();
    } else if (Array.isArray(data[key])) {
      // Check if this is an array of document references or objects containing references
      if (key === "itineraries") {
        data[key] = data[key].map((itinerary) => ({
          ...itinerary,
          imageRefs: itinerary.imageRefs?.map(sanitizeDocRef) || [],
        }));
      }
      // Handle all other array fields (includes, etc.)
      else {
        data[key] = data[key].map(sanitizeDocRef);
      }
    } else if (data[key] && typeof data[key] === "object") {
      // Recursively sanitize nested objects
      data[key] = sanitizeRecursively(data[key]);
    }
  });

  return {
    id: doc.id,
    ...data,
  };
};

// Helper function to fetch referenced document data
const getReferencedData = async (docRef) => {
  if (!docRef) return null;

  try {
    // If it's already an object with data (not a Firestore ref), return as is
    if (docRef.url || docRef.urlRef || docRef.title || docRef.displayName) {
      return docRef;
    }

    // Handle both sanitized references and direct Firestore references
    let collectionName, documentId;

    if (docRef.collection && docRef.id) {
      // This is a sanitized reference from sanitizeDocRef
      collectionName = docRef.collection;
      documentId = docRef.id;
    } else if (docRef._key && docRef._key.path) {
      // This is a direct Firestore document reference
      const segments = docRef._key.path.segments;
      documentId = segments.pop();
      collectionName = segments.pop();
    } else {
      // If we don't recognize it as a reference and it's not a known data object,
      // return it as is if it's an object, otherwise null
      return typeof docRef === "object" ? docRef : null;
    }

    // sanitize the document data
    const docSnap = await getDoc(doc(db, collectionName, documentId));

    if (docSnap.exists()) {
      return sanitizeDocumentData(docSnap);
    }
    return null;
  } catch (error) {
    console.error("Error fetching referenced document:", error);
    return null;
  }
};

// Helper function to resolve only necessary references for a card (e.g. images)
const resolveCardReferences = async (packageData) => {
  if (!packageData.cardImages || !packageData.cardImages.length) return packageData;
  
  const cardImagesData = await Promise.all(
    packageData.cardImages.map(getReferencedData)
  );
  packageData.cardImages = cardImagesData.filter(Boolean);
  return packageData;
};

// Highly optimized batch resolver for card images
export const batchResolveCardReferences = async (packages) => {
  if (!packages || !packages.length) return packages;

  // 1. Collect all unique references
  const refMap = new Map(); // key: collection/id, value: ref object
  
  packages.forEach(pkg => {
    if (pkg.cardImages) {
      pkg.cardImages.forEach(ref => {
        if (ref && (ref.id && ref.collection)) {
          refMap.set(`${ref.collection}/${ref.id}`, ref);
        } else if (ref && ref._key) {
          // Direct firestore ref
          const segments = ref._key.path.segments;
          const id = segments[segments.length - 1];
          const col = segments[segments.length - 2];
          refMap.set(`${col}/${id}`, ref);
        }
      });
    }
  });

  if (refMap.size === 0) return packages;

  // 2. Fetch all unique references in parallel
  const uniqueRefs = Array.from(refMap.values());
  const resolvedData = await Promise.all(uniqueRefs.map(getReferencedData));
  
  // 3. Create a lookup map for resolved data
  const dataLookup = new Map();
  uniqueRefs.forEach((ref, i) => {
    if (resolvedData[i]) {
      const key = ref.id ? `${ref.collection}/${ref.id}` : `${ref._key.path.segments[ref._key.path.segments.length-2]}/${ref._key.path.segments[ref._key.path.segments.length-1]}`;
      dataLookup.set(key, resolvedData[i]);
    }
  });

  // 4. Map resolved data back to packages
  return packages.map(pkg => {
    if (pkg.cardImages) {
      pkg.cardImages = pkg.cardImages.map(ref => {
        const key = ref.id ? `${ref.collection}/${ref.id}` : (ref._key ? `${ref._key.path.segments[ref._key.path.segments.length-2]}/${ref._key.path.segments[ref._key.path.segments.length-1]}` : null);
        return dataLookup.get(key) || null;
      }).filter(Boolean);
    }
    return pkg;
  });
};

// Helper function to resolve all references for a package
const resolveAllPackageReferences = async (packageData) => {
  // Fetch includes data if exists
  if (packageData.includes) {
    const includesData = await Promise.all(
      packageData.includes.map(async (item) => {
        // Check if item is a DocumentReference (has _key or ref property)
        if (item?.id || item?.collection || typeof item === "object") {
          return await getReferencedData(item);
        }
        // If it's already a text object, return as is
        return item;
      })
    );
    packageData.includes = includesData.filter(Boolean);
  }

  if (packageData.excludes) {
    const excludesData = await Promise.all(
      packageData.excludes.map(async (item) => {
        // Check if item is a DocumentReference (has _key or ref property)
        if (item?.id || item?.collection || typeof item === "object") {
          return await getReferencedData(item);
        }
        // If it's already a text object, return as is
        return item;
      })
    );
    packageData.excludes = excludesData.filter(Boolean);
  }

  if (packageData.bannerImages) {
    const bannerImagesData = await Promise.all(
      packageData.bannerImages.map(getReferencedData)
    );
    packageData.bannerImages = bannerImagesData.filter(Boolean);
  }

  if (packageData.cardImages) {
    const cardImagesData = await Promise.all(
      packageData.cardImages.map(getReferencedData)
    );
    packageData.cardImages = cardImagesData.filter(Boolean);
  }

  // Fetch itinerary image data if exists
  if (packageData.itineraries) {
    packageData.itineraries = await Promise.all(
      packageData.itineraries.map(async (itinerary) => {
        if (itinerary.imageRefs) {
          const imageData = await Promise.all(
            itinerary.imageRefs.map(getReferencedData)
          );
          return {
            ...itinerary,
            imageRefs: imageData.filter(Boolean),
          };
        }
        return itinerary;
      })
    );
  }

  return packageData;
};

// Unified function to get package by slug or ID with all references resolved
/**
 * Fetches a package by slug or ID and resolves all references (includes, excludes, bannerImages, cardImages, itineraries)
 * @param {string} slugOrId - The package slug or ID
 * @param {Object} options - Options object
 * @param {boolean} options.bySlug - Whether to search by slug (true) or ID (false). Defaults to true
 * @returns {Promise<Object>} Package data with all references resolved
 * @throws {Error} When package is not found or there's an error fetching data
 */
export const getPackageWithAllReferences = async (slugOrId, options = {}) => {
  try {
    const { bySlug = true } = options;
    let packageData;

    // First get the package document
    if (bySlug) {
      packageData = await getDocumentBySlug(slugOrId);
      if (!packageData) {
        throw new Error("Package not found");
      }
    } else {
      const packageRef = doc(db, COLLECTIONS.PACKAGES, slugOrId);
      const docSnap = await getDoc(packageRef);

      if (!docSnap.exists()) {
        throw new Error("Package not found");
      }

      packageData = sanitizeDocumentData(docSnap);
    }

    // Resolve all references
    return await resolveAllPackageReferences(packageData);
  } catch (error) {
    console.error("Error fetching package with all references:", error);
    throw error;
  }
};

// Get package with all referenced data
export const getPackageWithReferences = async (slug) => {
  try {
    // First get the package document
    const packageData = await getDocumentBySlug(slug);
    
    if (!packageData) {
      throw new Error("Package not found");
    }

    // Resolve all references
    return await resolveAllPackageReferences(packageData);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get a single document by slug
export const getDocumentBySlug = async (slug) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(packagesRef, where("packageSlug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`Package not found for slug: ${slug}`);
      return null;
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
};

export const getRegionDocumentBySlug = async (slug) => {
  try {
    const regionsRef = collection(db, COLLECTIONS.REGIONS);
    const q = query(regionsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Region not found");
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching region:", error);
    throw error;
  }
};

export const getOfferByPackageId = async (packageId) => {
  try {
    const offersRef = collection(db, COLLECTIONS.OFFERS);
    const q = query(offersRef, where("packageId", "==", packageId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching offer:", error);
    throw error;
  }
};

// Get all documents
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const searchPackages = async (searchTerm) => {
  try {
    const searchTermLower = searchTerm.toLowerCase().trim();

    const PACKAGE_LIMIT = 20;

    // Get all packages
    const packagesRef = query(
      collection(db, COLLECTIONS.PACKAGES),
      where("status", "==", PACKAGE_STATUS.PUBLISHED),
      limit(PACKAGE_LIMIT)
    );
    const querySnapshot = await getDocs(packagesRef);
    const packages = [];

    // Get all regions
    // TODO: Add limit to regions
    // Fetchs all regions and filters them in the frontend, not good
    const regionsRef = query(collection(db, COLLECTIONS.REGIONS));
    const regionsSnapshot = await getDocs(regionsRef);
    const regions = [];

    // Filter regions
    regionsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name?.toLowerCase().includes(searchTermLower)) {
        regions.push({
          id: doc.id,
          name: data.name,
          slug: data.slug,
        });
      }
    });

    // Filter packages
    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      if (data.bannerImages) {
        for (const bannerImage of data.bannerImages) {
          const imageData = await getReferencedData(bannerImage);
          if (imageData) {
            data.bannerImages = [imageData];
            break; // This will break out of the bannerImages loop only
          }
        }
        if (!data.bannerImages[0]) {
          data.bannerImages = [];
        }
      }

      if (
        doc.id?.toLowerCase().includes(searchTermLower) ||
        data.titleSlug?.toLowerCase().includes(searchTermLower) ||
        data.packageSlug?.toLowerCase().includes(searchTermLower) ||
        data.packageName?.toLowerCase().includes(searchTermLower) ||
        data.packageTitle?.toLowerCase().includes(searchTermLower) ||
        data.region?.toLowerCase().includes(searchTermLower)
      ) {
        packages.push({
          id: doc.id,
          packageName: data.packageTitle || data.packageName,
          packageSlug: data.packageSlug,
          region: data.region,
          bannerImages: data.bannerImages,
        });
      }
    }

    // Group packages by region
    const packagesByRegion = packages.reduce((acc, pkg) => {
      if (!acc[pkg.region]) {
        acc[pkg.region] = [];
      }
      acc[pkg.region].push(pkg);
      return acc;
    }, {});

    const data = {
      regions,
      packages: packages.slice(0, 25),
      packagesByRegion: Object.entries(packagesByRegion).map(
        ([region, pkgs]) => ({
          region,
          packages: pkgs,
        })
      ),
    };

    return data;
  } catch (error) {
    console.error("Error in searchPackages:", error);
    return {
      regions: [],
      packages: [],
      packagesByRegion: [],
    };
  }
};

export const storeLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      source: "website-enquiry-form",
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, COLLECTIONS.LEADS);

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storePotentialLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      source: "website-contact-form",
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, COLLECTIONS.POTENTIAL_LEADS);

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storeBookings = async (bookingData) => {
  try {
    // Add timestamp to the lead data
    const enrichedBookingData = {
      ...bookingData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, COLLECTIONS.BOOKINGS);

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedBookingData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing booking:", error);
    throw new Error("Failed to create Booking");
  }
};

export const storePayments = async (paymentData) => {
  try {
    // Add timestamp to the lead data
    const enrichedPaymentData = {
      ...paymentData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, COLLECTIONS.PAYMENTS);

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedPaymentData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing payment:", error);
    throw new Error("Failed to create Payment");
  }
};

export const getCuratedPackages = async (
  packageType,
  conditions = [],
  isHomePage = false
) => {
  try {
    let queryConstraints = [
      where("frontPage", "==", true),
      where("domestic", "==", packageType === "domestic"),
      where("status", "==", PACKAGE_STATUS.PUBLISHED),
    ];

    if (Array.isArray(conditions)) {
      queryConstraints = [...queryConstraints, ...conditions];
    }

    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(packagesRef, ...queryConstraints);

    const querySnapshot = await getDocs(q);
    const packages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const packageData = sanitizeDocumentData(doc);
        // Optimize for Homepage: only resolve card images
        const resolved = isHomePage 
          ? await resolveCardReferences(packageData) 
          : await resolveAllPackageReferences(packageData);
          
        return isHomePage ? minimizePackageData(resolved) : resolved;
      })
    );
    return packages.sort((a, b) => a.basePrice - b.basePrice);
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getAllPublishedPackages = async (packageType) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    const q = query(
      packagesRef,
      where("domestic", "==", packageType === "domestic"),
      where("status", "==", PACKAGE_STATUS.PUBLISHED)
    );

    const querySnapshot = await getDocs(q);
    const initialPackages = querySnapshot.docs.map(doc => sanitizeDocumentData(doc));
    
    // Use optimized batch resolver
    const packages = await batchResolveCardReferences(initialPackages);
    return packages.sort((a, b) => a.basePrice - b.basePrice);
  } catch (error) {
    console.error(`Error fetching all published ${packageType} packages:`, error);
    return [];
  }
};

export const getPackagesByRegion = async (regionName) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    
    // Convert slug to proper name format (e.g., "multy-countries" -> "Multy Countries")
    const properName = regionName
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    
    // Try querying by the converted proper name
    let q = query(
      packagesRef,
      where("region", "==", properName),
      where("status", "==", PACKAGE_STATUS.PUBLISHED)
    );
    
    let querySnapshot = await getDocs(q);
    
    // If no results, try the original slug as-is
    if (querySnapshot.empty) {
      q = query(
        packagesRef,
        where("region", "==", regionName),
        where("status", "==", PACKAGE_STATUS.PUBLISHED)
      );
      querySnapshot = await getDocs(q);
    }

    const packages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const packageData = sanitizeDocumentData(doc);
        return await resolveAllPackageReferences(packageData);
      })
    );
    return packages.sort((a, b) => a.basePrice - b.basePrice);
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackagesByTheme = async (
  themeType,
  initialPackages = [],
  conditions = []
) => {
  try {
    const packagesRef = collection(db, COLLECTIONS.PACKAGES);
    let queryConstraints = [
      where("theme", "array-contains", themeType),
      where("status", "==", PACKAGE_STATUS.PUBLISHED),
    ];

    if (Array.isArray(conditions)) {
      queryConstraints = [...queryConstraints, ...conditions];
    }

    const q = query(packagesRef, ...queryConstraints);

    if (initialPackages.length > 0) {
      console.log(
        `For theme ${themeType}, returning initial packages: ${initialPackages.length}`
      );
      return initialPackages;
    }

    const querySnapshot = await getDocs(q);
    const packages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const packageData = sanitizeDocumentData(doc);
        // Use simpler resolution for themes as they are mostly used in cards
        const resolved = await resolveCardReferences(packageData);
        return minimizePackageData(resolved); 
      })
    );
    return packages.sort((a, b) => a.basePrice - b.basePrice);
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getHotelsByIds = async (hotelIds) => {
  try {
    const hotelsRef = collection(db, COLLECTIONS.HOTELS);
    const promises = hotelIds.map(async (id) => {
      const docRef = doc(hotelsRef, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let placeData = null;

        if (data.place) {
          placeData = await getPlace(data.place);
        }

        const result = {
          id: docSnap.id,
          ...data,
          place: placeData || data.place,
        };
        return result;
      }
      return null;
    });

    const results = await Promise.all(promises);
    return results.filter((hotel) => hotel !== null);
  } catch (error) {
    console.error("Error fetching hotels by IDs:", error);
    throw error;
  }
};

export const getPackageHotelDetails = async (hotelCharges) => {
  try {
    // Extract all hotel IDs from the hotel charges
    const allHotelIds = hotelCharges.reduce((ids, hotel) => {
      if (hotel.hotelIds && hotel.hotelIds.length > 0) {
        return [...ids, ...hotel.hotelIds];
      }
      return ids;
    }, []);

    // Fetch all hotels by their IDs
    const hotels = await getHotelsByIds(allHotelIds);

    // Map the hotels back to the hotel charges structure
    return hotelCharges.map((hotelCharge) => ({
      ...hotelCharge,
      hotels: hotelCharge.hotelIds
        .map((id) => hotels.find((hotel) => hotel.id === id))
        .filter(Boolean),
    }));
  } catch (error) {
    console.error("Error fetching package hotel details:", error);
    throw error;
  }
};

export const getCollectionQuery = (collectionName, conditions = []) => {
  const collectionRef = collection(db, collectionName);
  return query(collectionRef, ...conditions);
};

export const getRegions = async () => {
  try {
    const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
    const querySnapshot = await getDocs(regionsQuery);
    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching regions:", error);
    throw error;
  }
};

/**
 * Fetches a random image from the images collection filtered by regionName
 * @param {string} regionName - The region name to filter by
 * @returns {Promise<Object|null>} Random image data or null if no images found
 */
export const getFeaturedImageByRegion = async (regionName) => {
  try {
    if (!regionName) {
      throw new Error("Region name is required");
    }

    const imagesRef = collection(db, COLLECTIONS.IMAGES);
    const q = query(
      imagesRef,
      where("region", "==", regionName.toLowerCase()),
      where("type", "==", "card"),
      where("frontPage", "==", true)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No images found for region: ${regionName}`);
      return null;
    }

    // Convert to array and select random image
    const images = querySnapshot.docs.map(sanitizeDocumentData);
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    return randomImage;
  } catch (error) {
    console.error("Error fetching random image by region:", error);
    throw error;
  }
};

export const getPlace = async (id) => {
  try {
    const placeRef = doc(db, COLLECTIONS.PLACES, id);
    const placeSnap = await getDoc(placeRef);
    return sanitizeDocumentData(placeSnap);
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error;
  }
};
