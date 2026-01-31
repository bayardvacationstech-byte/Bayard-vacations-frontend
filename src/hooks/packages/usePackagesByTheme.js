"use client";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByTheme } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

import { useMinimumLoading } from "@/hooks/useMinimumLoading";

export function usePackagesByTheme(theme, initialPackages = []) {
  const {
    data: packages = [],
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    initialData: initialPackages,
    queryKey: [COLLECTIONS.PACKAGES, "theme", theme],
    queryFn: () => getPackagesByTheme(theme, initialPackages),
    enabled: !!theme,
    staleTime: 0, // Truly immediate updates
    gcTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  const isLoading = useMinimumLoading(isQueryLoading, 1500);

  return {
    packages,
    isLoading,
    error,
  };
}
