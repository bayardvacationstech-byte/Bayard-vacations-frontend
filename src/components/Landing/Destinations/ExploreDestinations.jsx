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
  const [intlFilter, setIntlFilter] = useState("asia");
  const [domFilter, setDomFilter] = useState(ZONES[0]?.feKey);
  const { internationalRegions, domesticRegions, regionIsLoading } = useRegionsData(initialRegions);

  // International Logic
  const selectedContinent = useMemo(() => 
    internationalRegions &&
    internationalRegions.find((continent) => continent.feKey === intlFilter),
    [internationalRegions, intlFilter]
  );

  // Domestic Logic
  const selectedZone = useMemo(() =>
    domesticRegions &&
    domesticRegions?.filter((region) => region.zone === domFilter),
    [domesticRegions, domFilter]
  );

  useEffect(() => {
    if (domesticRegions) {
      const regionWithZone = domesticRegions.filter((region) => region.zone);
      if (regionWithZone.length > 0) {
        setDomFilter(regionWithZone[0].zone);
      }
    }
  }, [domesticRegions]);

  const handleIntlFilterChange = (type) => setIntlFilter(type);
  const handleDomFilterChange = (type) => setDomFilter(type);

  return (
    <Container className="sm:px-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="section-title-light mb-2">Explore Destinations</h2>
          <p className="section-subtitle-light">Discover your next adventure across the globe or close to home.</p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit">
          <button
            onClick={() => setActiveTab("international")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-semibold transition-all duration-300",
              activeTab === "international" 
                ? "bg-white text-brand-blue shadow-md" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            International
          </button>
          <button
            onClick={() => setActiveTab("domestic")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-semibold transition-all duration-300",
              activeTab === "domestic" 
                ? "bg-white text-brand-blue shadow-md" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Filters for the active tab */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {activeTab === "international" ? (
                CONTINENTS.map((continent, index) => (
                  <Button
                    key={index}
                    variant={intlFilter === continent.feKey ? "default" : "outline"}
                    onClick={() => handleIntlFilterChange(continent.feKey)}
                    className={cn(
                      "rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 flex-shrink-0 transition-all",
                      intlFilter === continent.feKey && "gradient-btn shadow-lg text-white border-transparent hover:opacity-90"
                    )}
                  >
                    {continent.displayName}
                  </Button>
                ))
              ) : (
                ZONES.map((zone, index) => (
                  <Button
                    key={index}
                    variant={domFilter === zone.feKey ? "default" : "outline"}
                    onClick={() => handleDomFilterChange(zone.feKey)}
                    className={cn(
                      "rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 flex-shrink-0 transition-all",
                      domFilter === zone.feKey && "gradient-btn shadow-lg text-white border-transparent hover:opacity-90"
                    )}
                  >
                    {zone.displayName}
                  </Button>
                ))
              )}
            </div>

            {/* Carousel Content */}
            <Carousel
              opts={{ align: "start" }}
              className="mt-4"
            >
              <CarouselContent className="gap-4 ml-0">
                {activeTab === "international" ? (
                  selectedContinent && selectedContinent.regions.length > 0 ? (
                    selectedContinent.regions.map((region, index) => (
                      <DestinationCard key={index} regionSlug={region.slug} inCarousel={true} />
                    ))
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center text-sm text-gray-400">
                      {regionIsLoading ? "Loading Regions..." : "No international regions available."}
                    </div>
                  )
                ) : (
                  selectedZone?.length > 0 ? (
                    selectedZone.map((region, index) => (
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

      <div className="mt-12 flex justify-center">
        <Link href="/destinations">
          <Button className="gradient-btn rounded-full px-10 py-6 text-base font-semibold text-white shadow-xl hover:scale-105 transition-transform">
            Explore Packages
          </Button>
        </Link>
      </div>
    </Container>
  );
}
