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
} from "@/utils/firebase";
import { doc, getDoc, getDocs, limit } from "firebase/firestore";
import axios from "axios";
import { db } from "@/firebase/firebaseConfig";

// Helper function to recursively serialize all dates in an object
const serializeDates = (obj) => {
  if (obj === null || obj === undefined) return obj;
  
  // Handle Firestore Timestamp
  if (obj && typeof obj.toDate === 'function') {
    return obj.toDate().toISOString();
  }
  
  // Handle Date objects
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(serializeDates);
  }
  
  // Handle plain objects
  if (typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = serializeDates(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
};

export const fetchReviews = unstableCache(
  async () => {
    try {
      const cacheRef = doc(db, COLLECTIONS.CACHED_REVIEWS, REVIEWS_DOC_ID);
      const cacheDoc = await getDoc(cacheRef);

      if (cacheDoc.exists()) {
        const cachedData = cacheDoc.data();
        const now = Date.now();

        // If cache is still valid, return cached data
        if (now - cachedData.lastFetched < REVIEWS_CACHE_DURATION) {
          return cachedData.reviews;
        }
      }

      // Cache expired or doesn't exist, fetch from Google Places API
      const response = await axios.get(`${DEFAULT_URL}/api/reviews`);

      if (response.status === 200) {
        return response.data.reviews;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return null;
    }
  },
  ["reviews"],
  {
    // 1 day in seconds
    revalidate: 60 * 60 * 24,
  }
);

export const fetchRegions = async () => {
  try {
    const regionsQuery = getCollectionQuery(COLLECTIONS.REGIONS);
    const regions = await getDocs(regionsQuery).then((res) =>
      res.docs.map(sanitizeDocumentData)
    );

    return {
      domesticRegions: regions
        .filter((region) => region.isDomestic)
        // Filter out excluded domestic regions
        .filter((region) => !EXCLUDED_DOMESTIC_REGIONS.includes(region.slug))
        // Only show regions where visible is true or undefined
        .filter((region) => region.visible !== false)
        .sort((a, b) => a.slug.localeCompare(b.slug)),
      internationalRegions: regions
        .filter((region) => !region.isDomestic)
        // Filter out excluded regions
        .filter((region) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(region.slug))
        // Only show regions where visible is true or undefined
        .filter((region) => region.visible !== false)
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    };
  } catch (error) {
    console.error("Error fetching regions:", error);
    return {
      domesticRegions: [],
      internationalRegions: [],
    };
  }
};

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

    return groupDeparturePackages.map(serializeDates);
  } catch (error) {
    console.error("Error fetching group departure packages:", error);
    return [];
  }
};

export const getAllPackagesByTheme = async () => {
  try {
    const conditions = [limit(5)];
    const eliteEscapePackages = await getPackagesByTheme(
      "elite-escape",
      [],
      conditions
    );
    const soloExpeditionPackages = await getPackagesByTheme(
      "solo-expedition",
      [],
      conditions
    );
    const familyFunventurePackages = await getPackagesByTheme(
      "family-funventure",
      [],
      conditions
    );
    const groupAdventuresPackages = await getPackagesByTheme(
      "group-adventures",
      [],
      conditions
    );
    const religiousRetreatPackages = await getPackagesByTheme(
      "religious-retreat",
      [],
      conditions
    );
    const romanticGetawaysPackages = await getPackagesByTheme(
      "romantic-getaways",
      [],
      conditions
    );
    const explorationBundlePackages = await getPackagesByTheme(
      "exploration-bundle",
      [],
      conditions
    );
    const educationalPackages = await getPackagesByTheme(
      "educational",
      [],
      conditions
    );
    const relaxRejuvenatePackages = await getPackagesByTheme(
      "relax-rejuvenate",
      [],
      conditions
    );
    return {
      eliteEscapePackages,
      soloExpeditionPackages,
      familyFunventurePackages,
      groupAdventuresPackages,
      religiousRetreatPackages,
      romanticGetawaysPackages,
      explorationBundlePackages,
      educationalPackages,
      relaxRejuvenatePackages,
    };
  } catch (error) {
    console.error("Error fetching all packages by theme:", error);
    return [];
  }
};
