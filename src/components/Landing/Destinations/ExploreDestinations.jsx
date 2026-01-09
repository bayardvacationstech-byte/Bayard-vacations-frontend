"use client";
import Container from "../../ui/Container";
import DestinationCard from "./DestinationCard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { CONTINENTS, ZONES } from "@/config";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { useRegionsData } from "@/hooks/regions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ExploreDestinations({ initialRegions }) {
  const [activeTab, setActiveTab] = useState("international");
  const { internationalRegions, domesticRegions, regionIsLoading } = useRegionsData(initialRegions);

  // Get first 8 international regions
  const displayInternationalRegions = useMemo(() => {
    if (!internationalRegions) return [];
    // Flatten all regions from all continents and take first 8
    const allIntl = internationalRegions.reduce((acc, continent) => {
      return [...acc, ...(continent.regions || [])];
    }, []);
    return allIntl.slice(0, 8);
  }, [internationalRegions]);

  // Get first 8 domestic regions
  const displayDomesticRegions = useMemo(() => {
    if (!domesticRegions) return [];
    return domesticRegions.slice(0, 8);
  }, [domesticRegions]);

  return (
    <Container className="sm:px-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-8">
        <div>
          <h2 className="section-title-light mb-0 md:mb-2">Trending Destinations</h2>
          <p className="section-subtitle-light hidden md:block">Hand-picked hotspots our travelers are loving right now</p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit">
          <button
            onClick={() => setActiveTab("international")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
              activeTab === "international" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            International
          </button>
          <button
            onClick={() => setActiveTab("domestic")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
              activeTab === "domestic" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[350px] md:min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Carousel Content */}
            <Carousel
              opts={{ align: "start" }}
              className="mt-4"
            >
              <CarouselContent className="gap-4 ml-0">
                {activeTab === "international" ? (    
                  displayInternationalRegions.length > 0 ? (
                    displayInternationalRegions.map((region, index) => (
                      <DestinationCard key={index} regionSlug={region.slug} inCarousel={true} />
                    ))
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-sm text-gray-400">
                      {regionIsLoading ? "Loading Regions..." : "No international regions available."}
                    </div>
                  )
                ) : (
                  displayDomesticRegions.length > 0 ? (
                    displayDomesticRegions.map((region, index) => (
                      <DestinationCard key={index} regionSlug={region.slug} inCarousel={true} />
                    ))
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-sm text-gray-400">
                      {regionIsLoading ? "Loading Regions..." : "No domestic regions available."}
                    </div>
                  )
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition" />
              <CarouselNext className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition" />
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 md:mt-6 flex justify-center">
        <Link href="/explore">
          <Button className="gradient-btn rounded-full px-10 py-6 text-base font-semibold text-white shadow-xl hover:scale-105 transition-transform">
            Explore Packages
          </Button>
        </Link>
      </div>
    </Container>
  );
}
