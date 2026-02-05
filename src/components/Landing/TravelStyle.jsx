"use client";
import React, { useState, useMemo, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import PremiumPackageCard from "@/components/Landing/PremiumPackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Helper to format tag labels
const formatLabel = (tag) => {
  if (typeof tag !== "string") return "";
  return tag
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TravelStyle = ({ 
  initialInternationalPackages = [], 
  initialDomesticPackages = [] 
}) => {
  const [activeTab, setActiveTab] = useState("international");
  const [activeStyle, setActiveStyle] = useState("all");
  /* Logic Restored - SSR Enabled */
  
  const currentTabPackages = useMemo(() => 
    activeTab === "international" ? initialInternationalPackages : initialDomesticPackages,
    [activeTab, initialInternationalPackages, initialDomesticPackages]
  );

  // Dynamically extract unique tags for the current tab
  const stylesList = useMemo(() => {
    const tags = new Set();
    
    currentTabPackages.forEach(p => {
      const tailoredTags = p.tailored_tag;
      if (Array.isArray(tailoredTags)) {
        tailoredTags.forEach(t => {
          if (typeof t === "string") tags.add(t.trim().toLowerCase());
        });
      } else if (typeof tailoredTags === "string" && tailoredTags) {
        tags.add(tailoredTags.trim().toLowerCase());
      }
    });
    
    const uniqueTags = Array.from(tags).sort();
    return [
      { id: "all", label: "All Packages" },
      ...uniqueTags.map(tag => ({ id: tag, label: formatLabel(tag) }))
    ];
  }, [currentTabPackages]);

  // Reset style filter when tab changes
  useEffect(() => {
    setActiveStyle("all");
  }, [activeTab]);
  
  const displayPackages = useMemo(() => {
    if (activeStyle === "all") {
      return currentTabPackages;
    }
    return currentTabPackages.filter(p => {
      const tailoredTags = p.tailored_tag;
      if (Array.isArray(tailoredTags)) {
        return tailoredTags.some(t => typeof t === "string" && t.trim().toLowerCase() === activeStyle);
      }
      if (typeof tailoredTags === "string" && tailoredTags) {
        return tailoredTags.trim().toLowerCase() === activeStyle;
      }
      return false;
    });
  }, [currentTabPackages, activeStyle]);


  return (
    <Container className="sm:px-5">
      {/* HEADER with Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="flex-1">
          <h2 className="section-title-light mb-1 md:mb-2 text-2xl md:text-3xl lg:text-4xl font-bold text-brand-blue">
            Trips Tailored to Your Travel Style
          </h2>
          <p className="section-subtitle-light hidden sm:block text-xs sm:text-sm md:text-base text-gray-600">
            Discover experiences that match your personality and wanderlust.
          </p>
        </div>

        {/* Tab Switcher - Consistent with Holidays.jsx */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit h-fit">
          <button
            onClick={() => setActiveTab("international")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
              activeTab === "international" 
                ? "bg-brand-blue text-white shadow-md" 
                : "text-gray-500 hover:text-brand-blue"
            )}
          >
            International
          </button>
          <button
            onClick={() => setActiveTab("domestic")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
              activeTab === "domestic" 
                ? "bg-brand-blue text-white shadow-md" 
                : "text-gray-500 hover:text-brand-blue"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* DYNAMIC STYLE FILTERS */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {stylesList.map((style) => (
          <Button
            key={style.id}
            variant={activeStyle === style.id ? "default" : "outline"}
            onClick={() => setActiveStyle(style.id)}
            className={cn(
              "rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 flex-shrink-0 transition-all",
              activeStyle === style.id && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
            )}
          >
            {style.label}
          </Button>
        ))}
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${activeStyle}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* CAROUSEL */}
            <div className="relative">
              {displayPackages.length > 0 ? (
                <Carousel
                  opts={{ align: "start" }}
                  className="w-full mt-4"
                >
                  <CarouselContent className="-ml-4">
                    {displayPackages.map((item, index) => (
                      <CarouselItem 
                        key={`${item.id}-${index}`} 
                        className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                      >
                        <PremiumPackageCard item={item} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition border border-gray-100" />
                  <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg text-black hover:scale-110 transition border border-gray-100" />
                </Carousel>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl w-full">
                  <p className="text-gray-400 font-medium text-lg">No packages found for this style</p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default TravelStyle;
