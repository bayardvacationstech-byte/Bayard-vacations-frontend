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
      console.log('[fetchReviews] Starting fetch...');
      const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
      const cacheDoc = await getDoc(cacheRef);

      if (cacheDoc.exists()) {
        const cachedData = cacheDoc.data();
        const reviews = (cachedData.reviews || []).slice(0, 10).map(minimizeReviewData);
        console.log(`[fetchReviews] Successfully fetched ${reviews.length} reviews`);
        return serializeData(reviews);
      }

      console.log('[fetchReviews] No cached reviews found, returning empty array');
      return [];
    } catch (err) {
      console.error("[fetchReviews] Error:", err.message || err);
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
    console.error("Error fetching group departure packages:", error);
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
    console.error("Error in getAllPackagesByTheme:", error);
    return {};
  }
};

export const getRegionsForHome = unstableCache(
  async () => {
    try {
      console.log('[getRegionsForHome] Starting fetch...');
      const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
      const querySnapshot = await getDocs(regionsQuery);
      const regions = querySnapshot.docs
        .map(sanitizeDocumentData)
        .map(minimizeRegionData);

      console.log(`[getRegionsForHome] Successfully fetched ${regions.length} regions`);
      return serializeData(regions);
    } catch (error) {
      console.error("[getRegionsForHome] Error:", error.message || error);
      return [];
    }
  },
  ["regions-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getCuratedPackagesForHome = unstableCache(
  async (packageType) => {
    try {
      console.log(`[getCuratedPackagesForHome] Starting fetch for ${packageType}...`);
      // Add limit to prevent fetching too many packages for the home page
      const conditions = [limit(12)];
      const packages = await getCuratedPackages(packageType, conditions, true);
      console.log(`[getCuratedPackagesForHome] Successfully fetched ${packages.length} ${packageType} packages`);
      return serializeData(packages);
    } catch (error) {
      console.error(`[getCuratedPackagesForHome] Error fetching ${packageType}:`, error.message || error);
      return [];
    }
  },
  ["curated-packages-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getGroupDeparturePackagesForHome = unstableCache(
  async () => {
    try {
      console.log('[getGroupDeparturePackagesForHome] Starting fetch...');
      const packages = await getGroupDeparturePackages();
      console.log(`[getGroupDeparturePackagesForHome] Successfully fetched ${packages.length} packages`);
      return serializeData(packages); 
    } catch (error) {
      console.error('[getGroupDeparturePackagesForHome] Error:', error.message || error);
      return [];
    }
  },
  ["group-departure-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getThemePackagesForHome = unstableCache(
  async () => {
    try {
      console.log('[getThemePackagesForHome] Starting fetch...');
      const data = await getAllPackagesByTheme();
      console.log('[getThemePackagesForHome] Successfully fetched theme packages');
      return serializeData(data);
    } catch (error) {
      console.error('[getThemePackagesForHome] Error:', error.message || error);
      return {};
    }
  },
  ["theme-packages-home"],
  { revalidate: 60 * 60 * 24 }
);

export const getElitePackages = unstableCache(
  async () => {
    try {
      console.log('[getElitePackages] Starting fetch...');
      const packages = await getPackagesByTheme("elite-escape", [], []);
      console.log(`[getElitePackages] Successfully fetched ${packages.length} packages`);
      return serializeData(packages);
    } catch (error) {
      console.error('[getElitePackages] Error:', error.message || error);
      return [];
    }
  },
  ["elite-packages"],
  { revalidate: 60 * 60 * 24 }
);

export const getWhyChooseRegionData = unstableCache(
  async (regionId) => {
    try {
      console.log(`[getWhyChooseRegionData] Starting fetch for region ID: ${regionId}...`);
      const docRef = doc(db, COLLECTIONS.WHY_CHOOSE_REGION, regionId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(`[getWhyChooseRegionData] Successfully fetched data for region ID: ${regionId}`, data);
        return serializeData(data);
      }
      
      console.log(`[getWhyChooseRegionData] No data found for region ID: ${regionId}`);
      return null;
    } catch (error) {
      console.error(`[getWhyChooseRegionData] Error fetching region ID ${regionId}:`, error.message || error);
      return null;
    }
  },
  ["why-choose-region"],
  { revalidate: 60 * 60 * 24 }
);


