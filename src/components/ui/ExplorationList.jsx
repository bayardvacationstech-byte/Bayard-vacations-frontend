"use client";
import React from "react";
import { usePackagesByTheme } from "@/hooks/packages";
import { useSearchParams } from "next/navigation";
import DestinationsCard from "../Landing/Destinations/DestinationCard";

// Loading skeleton component
const ExplorationCardSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl bg-[#E5ECF7]">
    <div className="h-[420px] w-full overflow-hidden rounded-2xl bg-gray-300">
      <div className="flex h-full items-end justify-center">
        <div className="h-12 w-[90%] m-4 rounded-xl bg-gray-500/10" />
      </div>
    </div>
  </div>
);

const ExplorationList = ({ theme }) => {
  const { packages, isLoading, error } = usePackagesByTheme(theme);
  const searchParams = useSearchParams();
  const isDomestic = searchParams.get("domestic") === "true";

  const themePackages = packages
    // .filter((pkg) => pkg.theme.includes(theme) && pkg.cardImages[0] !== null)
    .filter((pkg) => pkg.domestic === isDomestic);

  const uniqueRegions = themePackages
    .reduce((acc, current) => {
      const isRegionPresent = acc.some(
        (item) => item.region === current.region
      );
      if (!isRegionPresent) {
        acc.push(current);
      }
      return acc;
    }, [])
    .sort((a, b) => a.region.localeCompare(b.region));

  if (
    packages.length === 0 ||
    themePackages.length === 0 ||
    uniqueRegions.length === 0 ||
    isLoading
  ) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <ExplorationCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <h3>Error fetching packages: {error.message}</h3>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
      {uniqueRegions.map((item) => (
        <DestinationsCard key={item.id} regionSlug={item.region} />
      ))}
    </div>
  );
};

export default ExplorationList;
