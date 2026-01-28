"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRegionDocumentBySlug } from "@/utils/firebase";

export function useRegion(regionSlug) {
  const queryClient = useQueryClient();

  const {
    data: regionData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["region", regionSlug],
    queryFn: async () => {
      // First check if we have regions in the global regions cache
      const regionsQuery = queryClient
        .getQueryCache()
        .find({ queryKey: ["regions"] });
      const cachedRegions = regionsQuery?.state.data;

      if (cachedRegions && Array.isArray(cachedRegions)) {
        // Look for the specific region in the cached regions
        const cachedRegion = cachedRegions.find(
          (region) => region.slug === regionSlug
        );

        if (cachedRegion) {
          return cachedRegion;
        }
      }

      // If not found in cache, fetch from Firebase
      return getRegionDocumentBySlug(regionSlug);
    },
    enabled: !!regionSlug, // Only run when regionSlug is provided
    staleTime: 0, // Truly immediate updates
    gcTime: 1000, 
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  return {
    regionData,
    isLoading,
    error,
    refetch,
  };
}
