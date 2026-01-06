"use client";
import { useQuery } from "@tanstack/react-query";
import { getRegions } from "@/utils/firebase";

export function useRegions(initialRegions = []) {
  const {
    data: regions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions(),
    gcTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: initialRegions.length > 0 ? initialRegions : undefined,
  });

  return { regions, isLoading, error, refetch };
}
