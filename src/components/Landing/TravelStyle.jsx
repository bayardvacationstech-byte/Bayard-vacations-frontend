"use client";

import React, { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Navigation } from "swiper/modules";

import PackageCard from "@/components/Landing/HolidayPackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";

const STYLES = [
  { id: "all", label: "All Packages" },
  { id: "budget", label: "Budget-Friendly Trips" },
  { id: "beach", label: "Beach Holidays" },
  { id: "weekend", label: "Weekend Breaks" },
  { id: "senior", label: "Senior-Friendly Getaways" },
  { id: "group", label: "Small Group for Friends" },
  { id: "womens", label: "Womens only package" },
];

const TravelStyle = ({ 
  initialInternationalPackages = [], 
  initialDomesticPackages = [] 
}) => {
  const [swiper, setSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const allPackages = useMemo(() => 
    [...initialDomesticPackages, ...initialInternationalPackages],
    [initialDomesticPackages, initialInternationalPackages]
  );
  
  const packages = useMemo(() => {
    switch (activeTab) {
      case "budget":
        return allPackages.filter(p => p.basePrice <= 30000);
      case "beach":
        return allPackages.filter(p => 
          p.packageTitle?.toLowerCase().includes("beach") || 
          p.packageTitle?.toLowerCase().includes("island") ||
          p.packageTitle?.toLowerCase().includes("goa") ||
          p.packageTitle?.toLowerCase().includes("maldives")
        );
      case "weekend":
        return allPackages.filter(p => p.days <= 3);
      case "senior":
        return allPackages.filter(p => 
          p.packageTags?.includes("senior") || 
          p.packageTitle?.toLowerCase().includes("senior") ||
          p.packageTitle?.toLowerCase().includes("pilgrimage")
        );
      case "group":
        return allPackages.filter(p => 
          p.packageTags?.includes("group") || 
          p.packageTitle?.toLowerCase().includes("group") ||
          p.packageTitle?.toLowerCase().includes("friends")
        );
      case "womens":
        return allPackages.filter(p => 
          p.packageTags?.includes("womens") || 
          p.packageTitle?.toLowerCase().includes("womens") ||
          p.packageTitle?.toLowerCase().includes("ladies")
        );
      default:
        return allPackages.slice(0, 12);
    }
  }, [allPackages, activeTab]);

  return (
    <Container className="sm:px-5">
      {/* HEADER */}
      <div className="mb-4 md:mb-8">
        <h2 className="section-title-light mb-0 md:mb-2">Your Travel Style</h2>
        <p className="section-subtitle-light hidden md:block">Discover experiences that match your personality.</p>
      </div>

      {/* FILTERS - Same style as Holidays.jsx */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {STYLES.map((style) => (
          <Button
            key={style.id}
            variant={activeTab === style.id ? "default" : "outline"}
            onClick={() => setActiveTab(style.id)}
            className={cn(
              "rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold px-6 py-2.5 flex-shrink-0 transition-all",
              activeTab === style.id && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
            )}
          >
            {style.label}
          </Button>
        ))}
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* SLIDER */}
            <div className="relative">
              {packages.length > 0 ? (
                <>
                  <button
                    onClick={() => swiper?.slidePrev()}
                    disabled={packages.length < 4}
                    className={cn(
                      "hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center transition-all hover:scale-110",
                      packages.length < 4 && "opacity-40 cursor-not-allowed hover:scale-100"
                    )}
                  >
                    <MoveLeft className="w-6 h-6" />
                  </button>

                  <Swiper
                    onSwiper={setSwiper}
                    modules={[Navigation]}
                    loop={packages.length > 4}
                    slidesPerView={1.2}
                    spaceBetween={16}
                    breakpoints={{
                      640: { slidesPerView: 2, spaceBetween: 16 },
                      1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                  >
                    {packages.map((item, index) => (
                      <SwiperSlide key={`${item.id}-${index}`} className="!h-auto">
                        <PackageCard item={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <button
                    onClick={() => swiper?.slideNext()}
                    disabled={packages.length < 4}
                    className={cn(
                      "hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center transition-all hover:scale-110",
                      packages.length < 4 && "opacity-40 cursor-not-allowed hover:scale-100"
                    )}
                  >
                    <MoveRight className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="text-gray-400 font-medium">No packages found for this style</p>
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
