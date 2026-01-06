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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    packages,
    isLoading,
    error,
  };
}
