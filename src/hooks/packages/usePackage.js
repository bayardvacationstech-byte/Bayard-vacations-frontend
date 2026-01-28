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
      // Fetch from Firebase using unified function - removing manual cache lookup for immediate updates
      return await getPackageWithAllReferences(slugOrId, { bySlug });
    },
    enabled: !!slugOrId, // Only run when slugOrId is provided
    staleTime: 0, // Truly immediate updates
    gcTime: 1000, // Minimal garbage collection time for extreme freshness
    refetchOnWindowFocus: true, // Refetch when switching back to the tab
    refetchOnMount: 'always', // Always refetch on mount
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
