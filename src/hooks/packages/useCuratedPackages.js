"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCuratedPackages } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

export function useCuratedPackages(packageType, initialPackages = []) {
  const queryClient = useQueryClient();
  const hasInitialData = initialPackages && initialPackages.length > 0;
  
  const {
    data: packages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [COLLECTIONS.PACKAGES, "curated", packageType],
    queryFn: async () => {
      const allPackageQueries = queryClient
        .getQueryCache()
        .findAll({ queryKey: [COLLECTIONS.PACKAGES] });

      let cachedPackages = [];
      for (const query of allPackageQueries) {
        const packages = query.state.data;
        if (packages && Array.isArray(packages)) {
          cachedPackages = [...cachedPackages, ...packages];
        }
      }

      if (cachedPackages.length > 0) {
        // Check if we have packages from multiple regions (indicating more complete data)
        const uniqueRegions = [
          ...new Set(cachedPackages.map((pkg) => pkg.region)),
        ];

        // Only use cache if we have packages from multiple regions (3+ for global queries)
        if (uniqueRegions.length >= 3) {
          const curatedPackages = cachedPackages
            .filter(
              (pkg) =>
                pkg.curated === true &&
                pkg.domestic === (packageType === "domestic")
            )
            .sort((a, b) => a.basePrice - b.basePrice);

          if (curatedPackages.length > 0) {
            return curatedPackages.sort((a, b) => a.basePrice - b.basePrice);
          }
        }
      }

      // If not found in cache, fetch from Firebase
      return await getCuratedPackages(packageType);
    },
    enabled: !!packageType,
    // Use longer staleTime if we have initial data to prevent immediate refetch
    staleTime: hasInitialData ? Infinity : 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    // Use placeholderData instead of initialData to show content immediately
    placeholderData: hasInitialData ? initialPackages : undefined,
    initialData: hasInitialData ? initialPackages : undefined,
  });

  return {
    packages,
    isLoading,
    error,
    refetch,
  };
}
