"use client";
import React from "react";
import ExploreHero from "@/components/Explore/ExploreHero";
import ExploreListing from "@/components/Explore/ExploreListing";

const ExplorePage = () => {
  return (
    <main className="min-h-screen">
      <ExploreHero />
      <ExploreListing />
    </main>
  );
};

export default ExplorePage;
