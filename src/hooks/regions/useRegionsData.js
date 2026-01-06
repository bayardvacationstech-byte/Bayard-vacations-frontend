"use client";
import { useMemo } from "react";
import { useRegions } from "./useRegions";
import { 
  CONTINENTS, 
  EXCLUDED_INTERNATIONAL_REGIONS, 
  EXCLUDED_DOMESTIC_REGIONS 
} from "@/config";

export function useRegionsData(initialRegions = []) {
  const { regions, isLoading, error, refetch } = useRegions(initialRegions);

  // Filter domestic regions
  const domesticRegions = useMemo(() => {

    console.log("Regions 123", regions)
    if (!regions || regions.length === 0) return [];
    
    return regions
      .filter((item) => item.isDomestic)
      .filter((item) => !EXCLUDED_DOMESTIC_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false) // Show if visible is true or undefined
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [regions]);

  // Group international regions by continent
  const internationalRegions = useMemo(() => {
    // Start with a fresh clone of CONTINENTS
    const acc = JSON.parse(JSON.stringify(CONTINENTS));

    if (!regions || regions.length === 0) {
      return acc;
    }

    return regions
      .filter((item) => !item.isDomestic)
      .filter((item) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false)
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((prev, region) => {
        // Find the corresponding continent
        const continentIndex = prev.findIndex(
          (continent) =>
            continent.feKey.toLowerCase() === region.continent?.toString().toLowerCase().trim()
        );

        if (continentIndex !== -1) {
          prev[continentIndex].regions.push(region);
        } else {
          // Optional: handle regions with unknown/missing continent
          // console.warn(`Region ${region.name} has unknown continent: ${region.continent}`);
        }

        return prev;
      }, acc);
  }, [regions]);

  return {
    regions,
    domesticRegions,
    internationalRegions,
    regionIsLoading: isLoading,
    error,
    refetch,
  };
}
