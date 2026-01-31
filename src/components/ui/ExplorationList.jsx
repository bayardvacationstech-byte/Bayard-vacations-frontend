"use client";
import React from "react";
import { usePackagesByTheme } from "@/hooks/packages";
import { useSearchParams } from "next/navigation";
import PackageCard from "./PackageCard";

// Loading skeleton component
const ExplorationCardSkeleton = () => (
   <div className="rounded-3xl bg-white p-6 animate-pulse flex flex-col h-full shadow-lg border border-slate-100">
    <div className="h-56 bg-slate-50 rounded-2xl mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-slate-50 rounded-lg w-3/4"></div>
      <div className="h-4 bg-slate-50 rounded-lg w-1/2"></div>
    </div>
    <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end">
       <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded w-16"></div>
          <div className="h-6 bg-slate-100 rounded w-24"></div>
       </div>
       <div className="h-8 bg-slate-100 rounded-lg w-20"></div>
    </div>
  </div>
);

const ExplorationList = ({ theme }) => {
  const { packages, isLoading, error } = usePackagesByTheme(theme);
  const searchParams = useSearchParams();
  const isDomestic = searchParams.get("domestic") === "true";

  const themePackages = (packages || [])
    .filter((pkg) => pkg.domestic === isDomestic);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <ExplorationCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <h3>Error fetching packages: {error.message}</h3>;
  }

  if (themePackages.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-slate-400 font-serif lowercase italic">No packages found for this theme and region.</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {themePackages.map((item) => (
        <PackageCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ExplorationList;
