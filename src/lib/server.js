"use server";
import { unstable_cache as unstableCache } from "next/cache";
import {
  DEFAULT_URL,
  COLLECTIONS,
  REVIEWS_CACHE_DURATION,
  REVIEWS_DOC_ID,
  EXCLUDED_INTERNATIONAL_REGIONS,
  EXCLUDED_DOMESTIC_REGIONS,
} from "@/config";
import {
  getCollectionQuery,
  getPackagesByTheme,
  getAllDocuments,
  sanitizeDocumentData,
  getCuratedPackages,
} from "@/utils/firebase";
import { doc, getDoc, getDocs, limit } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { minimizePackageData, minimizeRegionData, minimizeReviewData } from "@/utils/dataMinimizers";

// Safe serialization with depth and circularity safeguards
const serializeData = (obj, depth = 0, seen = new WeakSet()) => {
  if (obj === null || obj === undefined || depth > 8) return obj;
  if (typeof obj !== 'object') return obj;
  if (seen.has(obj)) return "[Circular]";
  if (typeof obj.toDate === 'function') return obj.toDate().toISOString();
  if (obj instanceof Date) return obj.toISOString();
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map(item => serializeData(item, depth + 1, seen));
  }

  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = serializeData(obj[key], depth + 1, seen);
    }
  }
  return result;
};

export const fetchReviews = unstableCache(
  async () => {
    try {
      const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
      const cacheDoc = await getDoc(cacheRef);

      if (cacheDoc.exists()) {
        const cachedData = cacheDoc.data();
        const reviews = (cachedData.reviews || []).slice(0, 10).map(minimizeReviewData);
        return serializeData(reviews);
      }

      return [];
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return [];
    }
  },
  ["reviews"],
  {
    revalidate: 60 * 60 * 24,
  }
);

export const fetchRegions = unstableCache(
  async () => {
    try {
      const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
      const regions = await getDocs(regionsQuery).then((res) =>
        res.docs.map(sanitizeDocumentData)
      );

      const domestic = regions
          .filter((region) => region.isDomestic)
          .filter((region) => !EXCLUDED_DOMESTIC_REGIONS.includes(region.slug))
          .filter((region) => region.visible !== false)
          .sort((a, b) => a.slug.localeCompare(b.slug))
          .map(minimizeRegionData);

      const international = regions
          .filter((region) => !region.isDomestic)
          .filter((region) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(region.slug))
          .filter((region) => region.visible !== false)
          .sort((a, b) => a.slug.localeCompare(b.slug))
          .map(minimizeRegionData);

      return serializeData({
        domesticRegions: domestic,
        internationalRegions: international,
      });
    } catch (error) {
      console.error("Error fetching regions:", error);
      return {
        domesticRegions: [],
        internationalRegions: [],
      };
    }
  },
  ["regions"],
  {
    revalidate: 60 * 60 * 24, // 1 day
  }
);

export const getGroupDeparturePackages = async () => {
  try {
    const groupAdventuresPackages =
      await getPackagesByTheme("group-adventures");

    const offers = await getAllDocuments("offers");

    // Use all published group adventure packages
    const groupDeparturePackages = groupAdventuresPackages
      .filter((item) => {
        const images = Array.isArray(item.cardImages) ? item.cardImages : [];
        return images.length > 0;
      })
      .map((pkg) => {
        const filteredPkg = {
          ...pkg,
          cardImages: pkg.cardImages.filter((image) => image !== null),
        };

        // Find active offer for this package
        const matchingOffer = offers?.find(
          (offer) => offer.packageId === filteredPkg.id && offer.isActive
        );

        if (matchingOffer) {
          // Calculate offer price
          const offerPrice =
            matchingOffer.discountType === "fixed"
              ? Math.round(filteredPkg.basePrice - matchingOffer.discountValue)
              : Math.round(
                  filteredPkg.basePrice -
                    filteredPkg.basePrice * (matchingOffer.discountValue / 100)
                );

          const savingsAmount = filteredPkg.basePrice - offerPrice;

          // Convert Timestamp to ISO string for serialization
          let offerEndDateStr = null;
          if (matchingOffer.endDate) {
            if (matchingOffer.endDate.toDate) {
              offerEndDateStr = matchingOffer.endDate.toDate().toISOString();
            } else if (matchingOffer.endDate instanceof Date) {
              offerEndDateStr = matchingOffer.endDate.toISOString();
            } else {
              offerEndDateStr = matchingOffer.endDate;
            }
          }

          return {
            ...filteredPkg,
            offerPrice,
            savingsAmount,
            offerId: matchingOffer.id,
            offerEndDate: offerEndDateStr,
          };
        }
        return filteredPkg;
      })
      .sort((a, b) => {
        if (a.groupAdventure?.tripDates[0] && b.groupAdventure?.tripDates[0]) {
          return (
            a.groupAdventure.tripDates[0].startDate -
            b.groupAdventure.tripDates[0].startDate
          );
        }
        return 0;
      });

    return serializeData(groupDeparturePackages.map(minimizePackageData));
  } catch (error) {
    console.error("Error getting group departure packages:", error);
    return [];
  }
};

const getAllPackagesByTheme = async () => {
  try {
    const conditions = [limit(5)];
    const [
      eliteEscapePackages,
      soloExpeditionPackages,
      familyFunventurePackages,
      groupAdventuresPackages,
      religiousRetreatPackages,
      romanticGetawaysPackages,
      explorationBundlePackages,
      educationalPackages,
      relaxRejuvenatePackages,
    ] = await Promise.all([
      getPackagesByTheme("elite-escape", [], conditions),
      getPackagesByTheme("solo-expedition", [], conditions),
      getPackagesByTheme("family-funventure", [], conditions),
      getPackagesByTheme("group-adventures", [], conditions),
      getPackagesByTheme("religious-retreat", [], conditions),
      getPackagesByTheme("romantic-getaways", [], conditions),
      getPackagesByTheme("exploration-bundle", [], conditions),
      getPackagesByTheme("educational", [], conditions),
      getPackagesByTheme("relax-rejuvenate", [], conditions),
    ]);

    return {
      eliteEscapePackages: eliteEscapePackages.map(minimizePackageData),
      soloExpeditionPackages: soloExpeditionPackages.map(minimizePackageData),
      familyFunventurePackages: familyFunventurePackages.map(minimizePackageData),
      groupAdventuresPackages: groupAdventuresPackages.map(minimizePackageData),
      religiousRetreatPackages: religiousRetreatPackages.map(minimizePackageData),
      romanticGetawaysPackages: romanticGetawaysPackages.map(minimizePackageData),
      explorationBundlePackages: explorationBundlePackages.map(minimizePackageData),
      educationalPackages: educationalPackages.map(minimizePackageData),
      relaxRejuvenatePackages: relaxRejuvenatePackages.map(minimizePackageData),
    };
  } catch (error) {
    console.error("Error getting all packages by theme:", error);
    return {};
  }
};

export const getRegionsForHome = unstableCache(
  async () => {
    try {
      const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
      const querySnapshot = await getDocs(regionsQuery);
      const regions = querySnapshot.docs
        .map(sanitizeDocumentData)
        .map(minimizeRegionData);

      return serializeData(regions);
    } catch (error) {
      console.error("Error getting regions for home:", error);
      return [];
    }
  },
  ["regions-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getCuratedPackagesForHome = unstableCache(
  async (packageType) => {
    try {
      // Add limit to prevent fetching too many packages for the home page
      const conditions = [limit(12)];
      const packages = await getCuratedPackages(packageType, conditions, true);
      return serializeData(packages);
    } catch (error) {
      console.error(`Error getting curated packages for home (type: ${packageType}):`, error);
      return [];
    }
  },
  ["curated-packages-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getGroupDeparturePackagesForHome = unstableCache(
  async () => {
    try {
      const packages = await getGroupDeparturePackages();
      return serializeData(packages); 
    } catch (error) {
      console.error("Error getting group departure packages for home:", error);
      return [];
    }
  },
  ["group-departure-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getThemePackagesForHome = unstableCache(
  async () => {
    try {
      const data = await getAllPackagesByTheme();
      return serializeData(data);
    } catch (error) {
      console.error("Error getting theme packages for home:", error);
      return {};
    }
  },
  ["theme-packages-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getElitePackages = unstableCache(
  async () => {
    try {
      const packages = await getPackagesByTheme("elite-escape", [], []);
      return serializeData(packages);
    } catch (error) {
      console.error("Error getting elite packages:", error);
      return [];
    }
  },
  ["elite-packages"],
  { revalidate: 60 * 60 * 24 }
);

export const getWhyChooseRegionData = unstableCache(
  async (regionId) => {
    try {
      const docRef = doc(db, COLLECTIONS.WHY_CHOOSE_REGION, regionId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return serializeData(data);
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting why choose region data for ${regionId}:`, error);
      return null;
    }
  },
  ["why-choose-region"],
  { revalidate: 60 * 60 * 24 }
);


