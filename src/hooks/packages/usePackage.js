"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOfferByPackageId,
  getPackageWithAllReferences,
} from "@/utils/firebase";
import { useRegion } from "../regions";

export function usePackage(slugOrId, options = {}) {
  const { bySlug = true } = options;
  const queryClient = useQueryClient();

  const {
    data: packageData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["package", slugOrId, bySlug ? "slug" : "id"],
    queryFn: async () => {
      const packagesQuery = queryClient
        .getQueryCache()
        .find({ queryKey: ["packages"] });
      const cachedPackages = packagesQuery?.state.data;
      if (cachedPackages) {
        const foundPackage = cachedPackages.find((pkg) => {
          if (bySlug) {
            return pkg.packageSlug === slugOrId;
          } else {
            return pkg.id === slugOrId;
          }
        });
        if (foundPackage) {
          return foundPackage;
        }
      }
      // If not found in cache, fetch from Firebase using unified function
      return await getPackageWithAllReferences(slugOrId, { bySlug });
    },
    enabled: !!slugOrId, // Only run when slugOrId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const {
    regionData,
    isLoading: regionLoading,
    error: regionError,
  } = useRegion(packageData?.region);

  const {
    data: offerData,
    isLoading: offerLoading,
    error: offerError,
  } = useQuery({
    queryKey: ["offer", packageData?.id],
    queryFn: () => getOfferByPackageId(packageData?.id),
    enabled: !!packageData?.id,
  });

  let enrichedPackageData = packageData;

  if (regionData?.faq) {
    enrichedPackageData = {
      ...enrichedPackageData,
      faq: regionData.faq, // Use region FAQ if available, fallback to package FAQ
    };
  }

  if (offerData) {
    const offerPrice =
      offerData.discountType === "fixed"
        ? Math.round(enrichedPackageData.basePrice - offerData.discountValue)
        : Math.round(
            enrichedPackageData.basePrice -
              enrichedPackageData.basePrice * (offerData.discountValue / 100)
          );

    const savingsAmount = enrichedPackageData.basePrice - offerPrice;

    enrichedPackageData = {
      ...enrichedPackageData,
      offer: {
        offerPrice,
        savingsAmount,
      },
    };
  }

  return {
    packageData: enrichedPackageData,
    isLoading: isLoading || regionLoading || offerLoading,
    error: error || regionError || offerError,
    refetch,
  };
}
