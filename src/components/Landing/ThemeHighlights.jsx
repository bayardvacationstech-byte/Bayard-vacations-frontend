"use client";
import { themeMap, themeMapData, VIDEO_MAP } from "@/config/themePackages";
import { useState, useMemo, useEffect } from "react";
import { usePackagesByTheme } from "@/hooks/packages/usePackagesByTheme";
import { formatPrice } from "@/utils/offerUtils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

export default function ThemeHighlights({
  initialEliteEscapePackages,
  initialSoloExpeditionPackages,
  initialFamilyFunventurePackages,
  initialGroupAdventuresPackages,
  initialReligiousRetreatPackages,
  initialRelaxRejuvenatePackages,
  initialExplorationBundlePackages,
  initialEducationalPackages,
  initialRomanticGetawaysPackages,
}) {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Hook Calls ---------------------------------------------------------------
  const eliteEscapeData = usePackagesByTheme("elite-escape", initialEliteEscapePackages);
  const soloExpeditionData = usePackagesByTheme("solo-expedition", initialSoloExpeditionPackages);
  const familyFunventureData = usePackagesByTheme("family-funventure", initialFamilyFunventurePackages);
  const groupAdventuresData = usePackagesByTheme("group-adventures", initialGroupAdventuresPackages);
  const religiousRetreatData = usePackagesByTheme("religious-retreat", initialReligiousRetreatPackages);
  const relaxRejuvenateData = usePackagesByTheme("relax-rejuvenate", initialRelaxRejuvenatePackages);
  const explorationBundleData = usePackagesByTheme("exploration-bundle", initialExplorationBundlePackages);
  const educationalData = usePackagesByTheme("educational", initialEducationalPackages);
  const romanticGetawaysData = usePackagesByTheme("romantic-getaways", initialRomanticGetawaysPackages);

  const themePackagesMap = {
    "elite-escape": eliteEscapeData,
    "solo-expedition": soloExpeditionData,
    "family-funventure": familyFunventureData,
    "group-adventures": groupAdventuresData,
    "religious-retreat": religiousRetreatData,
    "relax-rejuvenate": relaxRejuvenateData,
    "exploration-bundle": explorationBundleData,
    educational: educationalData,
    "romantic-getaways": romanticGetawaysData,
  };
  // --------------------------------------------------------------------------

  // Current State Logic ------------------------------------------------------
  const currentTheme = themeMapData[currentThemeIndex];
  const themeData = themeMap[currentTheme?.themeSlug];
  const currentThemeData = themePackagesMap[currentTheme?.themeSlug] || {};
  const currentThemePackages = currentThemeData.packages || [];
  const currentThemeLoading = currentThemeData.isLoading || false;

  const packages = useMemo(() => {
    if (!currentThemePackages) return [];
    const sortedPackages = currentThemePackages.sort((a, b) => a.basePrice - b.basePrice);
    const seenRegions = new Set();
    const uniquePackages = sortedPackages.filter((pkg) => {
      if (seenRegions.has(pkg.region)) return false;
      seenRegions.add(pkg.region);
      return true;
    });
    return uniquePackages.slice(0, 4);
  }, [currentThemePackages]);
  // --------------------------------------------------------------------------

  // AutoPlay Logic -----------------------------------------------------------
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % themeMapData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentThemeIndex((prev) => (prev - 1 + themeMapData.length) % themeMapData.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themeMapData.length);
    setIsAutoPlay(false);
  };
  // --------------------------------------------------------------------------

  // Helpers
  const getThemeTagline = (themeSlug) => {
    const taglines = {
      "romantic-getaways": "Where Every Moment Feels Like a Honeymoon",
      "group-adventures": "Adventure Awaits When Friends Unite",
      "family-funventure": "Creating Memories That Last a Lifetime",
      educational: "Learn, Explore, and Discover the World",
      "religious-retreat": "Find Peace and Spiritual Renewal",
      "solo-expedition": "Discover Yourself Through Solo Adventures",
      "exploration-bundle": "Uncover Hidden Gems Around the Globe",
      "relax-rejuvenate": "Unwind and Recharge Your Soul",
      "elite-escape": "Luxury Redefined for the Discerning Traveler",
    };
    return taglines[themeSlug] || "Discover Amazing Destinations";
  };

  return (
    <section className="bg-white overflow-hidden section-padding">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="section-badge-light mb-6">
            Featured Collections
          </div>
          <h2 className="section-title-light mb-4">
            Explore Curated Themes
          </h2>
          <p className="section-subtitle-light">
            Discover handpicked experiences that define luxury and adventure
          </p>
        </div>

        {/* Theme Filter Buttons */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {themeMapData.map((theme, index) => (
            <button
              key={theme.themeSlug}
              onClick={() => {
                setCurrentThemeIndex(index);
                setIsAutoPlay(false);
              }}
              className={cn(
                "rounded-full border text-sm font-semibold px-6 py-2.5 flex-shrink-0 transition-all duration-300 whitespace-nowrap",
                currentThemeIndex === index
                  ? "gradient-btn shadow-lg text-white border-transparent"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              )}
            >
              {theme.themeText}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - HERO */}
          <div className="lg:col-span-5">
            <div className="relative h-[450px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
              {/* Background Media */}
              <AnimatePresence>
                <motion.div
                  key={currentThemeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <video
                    src={VIDEO_MAP[currentTheme?.themeSlug]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                </motion.div>
              </AnimatePresence>

              {/* Play/Pause Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="absolute top-6 right-6 z-30 p-3 sm:p-4 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full text-white transition-all shadow-lg hidden group-hover:flex"
              >
                  {isAutoPlay ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />}
              </button>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 sm:px-8 mt-12">
                  <motion.div
                    key={`text-${currentThemeIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-nord text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                        {themeData?.title || currentTheme?.themeText}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl font-damion text-slate-100 drop-shadow-md mb-6 sm:mb-8">
                        "{getThemeTagline(currentTheme?.themeSlug)}"
                    </p>
                    
                    <Link
                        href={`/categories/${currentTheme?.themeSlug}`}
                        className="gradient-btn inline-block px-8 py-3 sm:px-10 sm:py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base"
                    >
                        Explore Packages
                    </Link>
                  </motion.div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {themeMapData.slice(0, 5).map((_, index) => ( 
                   <button
                    key={index}
                    onClick={() => {
                        setCurrentThemeIndex(index);
                        setIsAutoPlay(false);
                    }}
                    className={`transition-all duration-500 rounded-full h-1.5 ${
                        index === currentThemeIndex
                        ? 'w-6 sm:w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

             {/* RIGHT COLUMN - GRID */}
          <div className="lg:col-span-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentThemeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-2 gap-3 sm:gap-6 h-full content-start"
              >
                {currentThemeLoading && packages.length === 0 ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-48 sm:h-64 rounded-2xl bg-slate-100 animate-pulse"
                    />
                  ))
                ) : packages.length > 0 ? (
                  packages.map((pkg, index) => (
                    <div
                      key={pkg.id || index}
                      className="group cursor-pointer relative h-52 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <Link
                        href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                        className="block w-full h-full"
                      >
                        <div className="absolute inset-0 bg-slate-200">
                          <Image
                            src={
                              pkg.cardImages?.[0]?.url ||
                              "/img/package-img/default.jpg"
                            }
                            alt={pkg.packageTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                        <div className="absolute inset-0 p-3 sm:p-6 flex flex-col justify-end">
                          <h3 className="text-sm sm:text-xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-md capitalize leading-tight">
                            {pkg.region.split("-").join(" ")}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                            <p className="text-white/80 text-[10px] sm:text-sm line-clamp-1">
                              {pkg.packageTitle}
                            </p>
                            <span className="text-white font-bold bg-brand-green/90 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded backdrop-blur-sm text-[10px] sm:text-sm whitespace-nowrap self-start sm:self-auto">
                              ₹{formatPrice(pkg.basePrice)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full h-64 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-400 font-medium">Coming Soon</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

             <div className="mt-8 flex justify-end">
                 <Link 
                    href="/categories"
                    className="group inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue font-semibold transition-colors text-sm sm:text-base"
                 >
                    View All Categories <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </Link>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
