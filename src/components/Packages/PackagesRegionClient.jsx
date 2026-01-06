"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersVertical, X, MapPin, Calendar, Package, ChevronDown, ChevronLeft, ChevronRight, ArrowUpRight, Info, CircleDollarSign, Clock, Compass, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Container from "@/components/ui/Container";
import { usePackages } from "@/hooks/packages";
import { useRegion } from "@/hooks/regions/useRegion";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { applyOffersToPackages, formatPrice } from "@/utils/offerUtils";
import PackageCard from "@/components/ui/PackageCard";
import BlogCard from "@/components/Blog/BlogCard";
import PremiumFaq from "@/components/Packages/PremiumFaq";
import RegionQuickFacts from "@/components/Packages/RegionQuickFacts";
import RegionStats from "@/components/Packages/RegionStats";
import RegionTestimonials from "@/components/Packages/RegionTestimonials";
import RegionExperiences from "@/components/Packages/RegionExperiences";
import RegionActivities from "@/components/Packages/RegionActivities";
import RegionCities from "@/components/Packages/RegionCities";
import RegionDosAndDonts from "@/components/Packages/RegionDosAndDonts";
import RegionWhyChoose from "@/components/Packages/RegionWhyChoose";
import SectionNav from "@/components/Packages/SectionNav";
import WhyBayardVacations from "@/components/Packages/WhyBayardVacations";
import { featuredBlogs } from "@/data/testBlogData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as SwiperPagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const allThemes = [
  { value: "elite-escape", label: "Elite Escape" },
  { value: "solo-expedition", label: "Solo Expedition" },
  { value: "family-funventure", label: "Family Funventure" },
  { value: "group-adventures", label: "Group Adventures" },
  { value: "religious-retreat", label: "Religious Retreat" },
  { value: "relax-rejuvenate", label: "Relax & Rejuvenate" },
  { value: "exploration-bundle", label: "Exploration Bundle" },
  { value: "educational", label: "Educational" },
  { value: "romantic-getaways", label: "Romantic Getaways" },
];

const navSections = [
  { id: "packages", label: "Packages" },
  { id: "recommended", label: "Recommended" },
  { id: "why-choose", label: "Why Choose" },
  { id: "activities", label: "Activities" },
  { id: "experiences", label: "Experiences" },
  { id: "blogs", label: "Blogs" },
  { id: "testimonials", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

const durations = [
  { value: "0-3", label: "0-3 Days" },
  { value: "4-5", label: "4-5 Days" },
  { value: "6-9", label: "6-9 Days" },
  { value: "10+", label: "10+ Days" },
];

export default function PackagesRegionClient() {
  const [range, setRange] = useState([0, 1000000]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filterMenu, setFilterMenu] = useState(false);
  const [packagesWithOffers, setPackagesWithOffers] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showSectionNav, setShowSectionNav] = useState(false);
  const [activeSection, setActiveSection] = useState("packages");
  const packagesRef = useRef(null);
  const itemsPerPage = 9;
  const { region: regionName } = useParams();
  const searchParams = useSearchParams();
  const isGroupPackage = searchParams.get("group") === "true";
  const { packages: allPackages, isLoading, error } = usePackages(regionName);
  const { regionData } = useRegion(regionName);
  const placeName = regionName?.split("-").join(" ") || "this destination";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Navigation Bar Visibility
      const recommendedElem = document.getElementById('recommended');
      if (recommendedElem) {
        const recRect = recommendedElem.getBoundingClientRect();
        setShowSectionNav(recRect.top < 180);
      } else if (packagesRef.current) {
        const rect = packagesRef.current.getBoundingClientRect();
        setShowSectionNav(rect.top < -300);
      }

      // 2. Track Active Section
      // We check which section is currently crossing a "trigger line" (e.g., 20% from top)
      const triggerLine = 240; // Desktop offset approx
      
      let currentActive = activeSection;
      
      for (const section of navSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above our trigger line 
          // AND the bottom is below it, it's the active one
          if (rect.top <= triggerLine && rect.bottom > triggerLine) {
            currentActive = section.id;
            break;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  useEffect(() => {
    if (isGroupPackage && !selectedTheme) {
      setSelectedTheme("group-adventures");
    }
  }, [isGroupPackage, selectedTheme]);

  useEffect(() => {
    const applyOffers = async () => {
      if (allPackages.length > 0) {
        const packagesWithAppliedOffers =
          await applyOffersToPackages(allPackages);
        
        // Deduplicate by package ID
        const uniqueMap = new Map();
        packagesWithAppliedOffers.forEach(pkg => {
          if (pkg.id && !uniqueMap.has(pkg.id)) {
            uniqueMap.set(pkg.id, pkg);
          }
        });
        const uniquePackages = Array.from(uniqueMap.values());
        
        setPackagesWithOffers(uniquePackages);

        setRange([
          Math.min(...uniquePackages.map((item) => item.basePrice)),
          Math.max(...uniquePackages.map((item) => item.basePrice)),
        ]);
      }
    };

    applyOffers();
  }, [allPackages]);

  const filteredArray = useMemo(() => {
    // Get the region slug from the URL (e.g., "multy-countries")
    const regionSlug = regionName; // This is already the slug from the URL
    
    let result = packagesWithOffers.filter((item) => {
      // Compare slug to slug (both should be lowercase with hyphens)
      const matchesRegion = regionSlug ? item.region === regionSlug : true;
      const itemPrice = item.offerPrice || item.basePrice;

      const minPrice = range[0] < 0 ? 0 : range[0];
      const isPriceInRange = itemPrice >= minPrice && itemPrice <= range[1];

      const isDurationSelected = !selectedDuration || (() => {
        const [min, max] = selectedDuration.split("-").map(Number);
        return item.days >= min && (max ? item.days <= max : item.days >= min);
      })();

      const isThemeSelected = !selectedTheme || item.theme.includes(selectedTheme);

      return matchesRegion && isPriceInRange && isDurationSelected && isThemeSelected;
    });

    if (sortOption) {
      result = [...result].sort((a, b) => {
        const aPrice = a.offerPrice || a.basePrice;
        const bPrice = b.offerPrice || b.basePrice;

        switch (sortOption) {
          case "price-low-high":
            return aPrice - bPrice;
          case "price-high-low":
            return bPrice - aPrice;
          case "duration-low-high":
            return a.days - b.days;
          case "duration-high-low":
            return b.days - a.days;
          default:
            return 0;
        }
      });
    }

    // Ensure uniqueness by package ID to prevent duplicate key errors
    const uniqueMap = new Map();
    result.forEach(item => {
      if (item.id && !uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });

    return Array.from(uniqueMap.values());
  }, [
    packagesWithOffers,
    regionName,
    range,
    selectedDuration,
    selectedTheme,
    sortOption,
  ]);

  const paginatedArray = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log(filteredArray.slice(startIndex, endIndex))
    return filteredArray.slice(startIndex, endIndex);
  }, [filteredArray, currentPage]);

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);

  // Auto-rotate banner images
  useEffect(() => {
    if (filteredArray.length > 0 && filteredArray[0]?.bannerImages?.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          (prevIndex + 1) % filteredArray[0].bannerImages.length
        );
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [filteredArray]);

  const handleSliderChange = (values) => setRange(values);
  
  const handleMinInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || inputValue === "-") {
      setRange([-1, range[1]]);
    } else {
      const numValue = Number(inputValue);
      setRange([Math.min(numValue, range[1] - 1000), range[1]]);
    }
  };
  
  const handleMaxInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || inputValue === "-") {
      setRange([range[0], Math.max(range[0] + 10000, 10000)]);
    } else {
      const numValue = Number(inputValue);
      setRange([range[0], Math.max(numValue, range[0] + 1000)]);
    }
  };

  const handleReset = () => {
    setRange([0, 1000000]);
    setSelectedDuration("");
    setSelectedTheme("");
    setCurrentPage(1);
    setSortOption("");
  };

  const handleOpenFilterMenu = () => setFilterMenu(true);
  const handleCloseFilterMenu = () => setFilterMenu(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading packages: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative text-white overflow-hidden h-[85vh] min-h-[700px] bg-center flex items-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: filteredArray[0]?.bannerImages?.[currentBannerIndex]?.url 
            ? `url(${filteredArray[0].bannerImages[currentBannerIndex].url})` 
            : 'linear-gradient(to right, #f97316, #fb923c, #3b82f6, #2563eb)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        {/* Advanced gradient overlay for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
        
        <Container className="relative z-20">
          <div className="flex flex-col items-center text-center gap-4 md:gap-6 max-w-4xl mx-auto">
            {isGroupPackage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-gradient-to-r from-orange-500 to-blue-500 backdrop-blur-md px-6 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl border border-white/20"
              >
                Group Departure
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold tracking-widest uppercase opacity-90">{placeName}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold capitalize leading-tight tracking-tight px-4"
            >
              Discover {placeName}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xs md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed px-6"
            >
              Experience the land of fire and ice. From ancient history to modern architecture, explore the perfect blend of Eastern and Western cultures.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full mt-8"
            >
              <RegionStats regionData={regionData} />
            </motion.div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>

        {/* Banner Image Navigation Dots - Moved to Bottom Right */}
        {filteredArray[0]?.bannerImages?.length > 1 && (
          <div className="absolute bottom-12 right-12 z-30 flex gap-2">
            {filteredArray[0].bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentBannerIndex 
                    ? 'w-10 bg-gradient-to-r from-orange-500 to-blue-500' 
                    : 'w-3 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      <section className="relative z-30 py-6 md:py-8 bg-gradient-to-br from-orange-50 via-blue-50 to-white">
        <Container>
          {/* Debug: Log region data to console */}
          {regionData && console.log('Region Data:', regionData)}
          
          <RegionQuickFacts 
            regionName={placeName} 
            regionData={regionData}
          />
        </Container>
      </section>

      {/* Filters and Content Section Wrapper */}
      <div className="bg-gradient-to-br from-orange-50/30 via-blue-50/30 to-white pt-6 md:pt-8 relative">
        {/* Sticky Glassy Filter Card - Desktop */}
        <div className="hidden c-md:block sticky top-24 z-50 mb-4 w-full max-w-4xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl py-1.5 px-4 shadow-xl border border-white/20 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {isMounted && (
                  !showSectionNav ? (
                    <motion.div
                      key="filters"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut" 
                      }}
                      className="flex items-center justify-between gap-4"
                    >
                      {/* Price Range */}
                      <div className="flex flex-col gap-0.5 min-w-[140px]">
                        <div className="flex items-center gap-1.5 px-0.5">
                          <CircleDollarSign className="w-3.5 h-3.5 text-orange-500" />
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Price Range
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative group flex-1">
                            <Input
                              type="number"
                              placeholder="Min"
                              value={range[0] < 0 ? "" : range[0]}
                              onChange={handleMinInputChange}
                              className="w-full h-9 text-xs !bg-white/50 border-slate-200 rounded-xl focus:!border-orange-500 focus:!ring-4 focus:!ring-orange-500/10 transition-all font-bold placeholder:font-medium"
                            />
                          </div>
                          <span className="text-slate-300 font-bold">/</span>
                          <div className="relative group flex-1">
                            <Input
                              type="number"
                              placeholder="Max"
                              value={range[1]}
                              onChange={handleMaxInputChange}
                              className="w-full h-9 text-xs !bg-white/50 border-slate-200 rounded-xl focus:!border-orange-500 focus:!ring-4 focus:!ring-orange-500/10 transition-all font-bold placeholder:font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Duration Dropdown */}
                      <div className="flex flex-col gap-0.5 min-w-[150px]">
                        <div className="flex items-center gap-1.5 px-0.5">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Duration
                          </label>
                        </div>
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                          <SelectTrigger className="h-9 text-xs !bg-white/50 border-slate-200 rounded-xl focus:!border-blue-500 focus:!ring-4 focus:!ring-blue-500/10 transition-all font-bold">
                            <SelectValue placeholder="All Durations" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-slate-100 z-[100] shadow-2xl">
                            <SelectItem value="all" className="rounded-lg">All Durations</SelectItem>
                            {durations.map((dur) => (
                              <SelectItem key={dur.value} value={dur.value} className="rounded-lg">
                                {dur.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Theme Dropdown */}
                      {!isGroupPackage && (
                        <div className="flex flex-col gap-0.5 flex-1 min-w-[160px]">
                          <div className="flex items-center gap-1.5 px-0.5">
                            <Compass className="w-3.5 h-3.5 text-orange-500" />
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Travel Theme
                            </label>
                          </div>
                          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                            <SelectTrigger className="h-9 text-xs !bg-white/50 border-slate-200 rounded-xl focus:!border-orange-500 focus:!ring-4 focus:!ring-orange-500/10 transition-all font-bold">
                              <SelectValue placeholder="All Themes" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100 z-[100] shadow-2xl">
                              <SelectItem value="all" className="rounded-lg">All Themes</SelectItem>
                              {allThemes.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value} className="rounded-lg">
                                  {theme.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {/* Sort Dropdown */}
                      <div className="flex flex-col gap-0.5 flex-1 min-w-[150px]">
                        <div className="flex items-center gap-1.5 px-0.5">
                          <Filter className="w-3.5 h-3.5 text-slate-400" />
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Sort By
                          </label>
                        </div>
                        <Select value={sortOption} onValueChange={setSortOption}>
                          <SelectTrigger className="h-9 text-xs !bg-white/50 border-slate-200 rounded-xl focus:!border-slate-900 focus:!ring-4 focus:!ring-slate-100 transition-all font-bold">
                            <SelectValue placeholder="Relevance" />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-slate-100 z-[100] shadow-2xl">
                            <SelectItem value="all" className="rounded-lg">Relevance</SelectItem>
                            <SelectItem value="price-low-high" className="rounded-lg">Price: Low to High</SelectItem>
                            <SelectItem value="price-high-low" className="rounded-lg">Price: High to Low</SelectItem>
                            <SelectItem value="duration-low-high" className="rounded-lg">Duration: Low to High</SelectItem>
                            <SelectItem value="duration-high-low" className="rounded-lg">Duration: High to Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Reset Button */}
                      <Button
                        onClick={handleReset}
                        variant="ghost"
                        className="h-9 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-blue-500/5 rounded-xl transition-all self-end"
                      >
                        Reset
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="nav"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ 
                        duration: 0.2,
                        ease: "easeOut" 
                      }}
                    >
                      <SectionNav sections={navSections} activeSection={activeSection} />
                    </motion.div>
                  )
                )}
              </AnimatePresence>
          </div>
        </div>

        <Container>
          {/* Mobile Filter Button */}
          <div className="c-md:hidden flex justify-center mb-6">
            <Button
              onClick={handleOpenFilterMenu}
              className="w-full max-w-sm flex items-center justify-center gap-2 h-11 text-sm font-black bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white rounded-xl shadow-lg border-b-4 border-black/20 active:translate-y-0.5 active:border-b-0 transition-all"
            >
              <SlidersVertical className="w-4 h-4" />
              Tune Your Search
            </Button>
          </div>

          {/* Main Content: Package Grid and Pagination - Full Width */}
          <div className="w-full pb-14" id="packages" ref={packagesRef}>
            {/* Package Cards Grid */}
            {!isMounted || isLoading || (allPackages.length > 0 && packagesWithOffers.length === 0) ? (
              // Loading State - Show skeleton cards
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-6 animate-pulse">
                    <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : paginatedArray.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                {paginatedArray.map((item) => (
                  <PackageCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No Packages Available</h3>
                <p className="text-slate-500 max-w-md mb-8">
                  We're currently curating amazing experiences for {placeName}. Check back soon or explore our other destinations!
                </p>
                <Link href="/packages">
                  <Button className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
                    Browse All Packages
                  </Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          className="cursor-pointer"
                          onClick={() => {
                            setCurrentPage(index + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={() => {
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Container>

        {/* Recommended Packages Carousel */}
      {packagesWithOffers.length > 0 && (
        <section className="bg-white py-14 border-t border-slate-100" id="recommended">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Recommended for You</h2>
                <p className="text-gray-500">Handpicked packages you might love in {placeName}</p>
              </div>
              <div className="hidden sm:flex gap-2">
                 <button className="p-3 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all swiper-button-prev-pkg">
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button className="p-3 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all swiper-button-next-pkg">
                   <ChevronRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-button-prev-pkg",
                nextEl: ".swiper-button-next-pkg",
              }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-8"
            >
              {packagesWithOffers.slice(0, 6).map((item) => (
                <SwiperSlide key={`rec-${item.id}`}>
                  <PackageCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
      </section>
    )}

    {/* Why Choose Section */}
    <div id="why-choose">
      <RegionWhyChoose 
        regionName={placeName} 
        data={regionData?.whyChoose} 
      />
    </div>

    {/* Activities Section */}
    <div id="activities">
      <RegionActivities regionName={placeName} />
    </div>

    {/* Cities Section */}
    <div id="cities">
      <RegionCities regionName={placeName} />
    </div>

    {/* Food, Culture & Experiences Section */}
    <div id="experiences">
      <RegionExperiences regionName={placeName} />
    </div>

    {/* Dos and Don'ts Section */}
    <div id="dos-donts">
      <RegionDosAndDonts 
        regionName={placeName} 
        dosAndDonts={regionData?.dosAndDonts}
      />
    </div>

    {/* Related Blogs Carousel */}
      <section className="bg-slate-50 py-8" id="blogs">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                Travel Stories &amp; Tips
              </h2>
              <p className="text-slate-600 text-lg">
                Get inspired for your next adventure to{" "}
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent font-bold capitalize">{placeName}</span>
              </p>
            </div>
            <Link 
              href="/blogs" 
              className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent font-bold px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-blue-500/10 transition-colors"
            >
              View All Blogs
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          
          <Swiper
            modules={[SwiperPagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 7000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {featuredBlogs.slice(0, 6).map((blog) => (
              <SwiperSlide key={blog.id}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>

      {/* Reviews/Testimonials Section */}
      <div id="testimonials">
        <RegionTestimonials regionName={placeName} />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <PremiumFaq content={regionData?.faq} />
      </div>

      {/* Why Bayard Vacations */}
      <WhyBayardVacations />
    </div>
    </>
  );
}
