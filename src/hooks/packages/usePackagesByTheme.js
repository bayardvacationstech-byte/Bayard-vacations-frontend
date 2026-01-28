"use client";
import { useQuery } from "@tanstack/react-query";
import { getPackagesByTheme } from "@/utils/firebase";
import { COLLECTIONS } from "@/config";

export function usePackagesByTheme(theme, initialPackages = []) {
  const {
    data: packages = [],
    isLoading,
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

  return {
    packages,
    isLoading,
    error,
  };
}
