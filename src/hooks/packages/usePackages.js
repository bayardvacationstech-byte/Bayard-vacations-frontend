"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getPackagesByRegion } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

export function usePackages(regionName) {
  const {
    data: packages = [],
    isLoading,
    error,
    refetch: fetchPackages,
  } = useQuery({
    queryKey: [COLLECTIONS.PACKAGES, regionName],
    queryFn: () => getPackagesByRegion(regionName),
    enabled: !!regionName,
    staleTime: 5 * 60 * 1000, // 5 minutes - packages don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const domesticPackages = useMemo(
    () => packages?.filter((pkg) => pkg.domestic === true) || [],
    [packages]
  );

  const internationalPackages = useMemo(
    () => packages?.filter((pkg) => pkg.domestic === false) || [],
    [packages]
  );

  return {
    packages,
    isLoading,
    error,
    fetchPackages,
    domesticPackages,
    internationalPackages,
  };
}
