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
    console.log("Regions data:", regions?.length || 0, "regions available");
    
    if (!regions || regions.length === 0) {
      console.warn("No regions data available in useRegionsData");
      return [];
    }
    
    const filtered = regions
      .filter((item) => item.isDomestic)
      .filter((item) => !EXCLUDED_DOMESTIC_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false) // Show if visible is true or undefined
      .sort((a, b) => a.name.localeCompare(b.name));
    
    console.log("Domestic regions filtered:", filtered.length);
    return filtered;
  }, [regions]);

  // Group international regions by continent
  const internationalRegions = useMemo(() => {
    // Start with a fresh clone of CONTINENTS
    const acc = JSON.parse(JSON.stringify(CONTINENTS));

    if (!regions || regions.length === 0) {
      console.warn("No regions data for international regions grouping");
      return acc;
    }

    const intlRegions = regions
      .filter((item) => !item.isDomestic)
      .filter((item) => !EXCLUDED_INTERNATIONAL_REGIONS.includes(item.slug))
      .filter((item) => item.visible !== false)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    console.log("International regions filtered:", intlRegions.length);
    
    const grouped = intlRegions.reduce((prev, region) => {
        // Find the corresponding continent
        const continentIndex = prev.findIndex(
          (continent) =>
            continent.feKey.toLowerCase() === region.continent?.toString().toLowerCase().trim()
        );

        if (continentIndex !== -1) {
          prev[continentIndex].regions.push(region);
        } else {
          console.warn(`Region ${region.name} has unknown continent: ${region.continent}`);
        }

        return prev;
      }, acc);
    
    const totalGrouped = grouped.reduce((sum, continent) => sum + continent.regions.length, 0);
    console.log("International regions grouped by continent:", totalGrouped);
    
    return grouped;
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
