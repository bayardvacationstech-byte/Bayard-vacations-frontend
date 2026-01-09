"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Search, 
  SlidersVertical, 
  MapPin, 
  Globe, 
  Compass, 
  CircleDollarSign, 
  Filter, 
  Package,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/Skeleton";
import PackageCard from "@/components/ui/PackageCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllPublishedPackages } from "@/utils/firebase";
import { cn } from "@/lib/utils";

const ExploreListing = ({ initialPackages = [] }) => {
  const [allPackages, setAllPackages] = useState(initialPackages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [range, setRange] = useState([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const packagesRef = useRef(null);
  const itemsPerPage = 12;

  useEffect(() => {
    setIsMounted(true);
    
    if (initialPackages.length === 0 && allPackages.length === 0) {
      const fetchAll = async () => {
        setIsLoading(true);
        try {
          const [intl, dom] = await Promise.all([
            getAllPublishedPackages("international"),
            getAllPublishedPackages("domestic")
          ]);
          const combined = [...(intl || []), ...(dom || [])];
          setAllPackages(combined);
        } catch (error) {
          console.error("ExploreListing fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAll();
    } else if (initialPackages.length > 0) {
      setAllPackages(initialPackages);
      setIsLoading(false);
    }
  }, [initialPackages.length, allPackages.length]);

  const allThemes = useMemo(() => {
    const themes = new Set();
    allPackages.forEach(p => {
      if (p.theme) p.theme.forEach(t => themes.add(t));
    });
    return [
      { value: "all", label: "All Themes" },
      ...Array.from(themes).sort().map(t => ({ value: t, label: t }))
    ];
  }, [allPackages]);

  const regions = useMemo(() => {
    let packagesForRegions = allPackages;
    if (selectedType !== "all") {
      const isDomestic = selectedType === "domestic";
      packagesForRegions = allPackages.filter(p => p.domestic === isDomestic);
    }

    const uniqueRegions = [...new Set(packagesForRegions.map(p => p.region))].filter(Boolean).sort();
    return [
      { value: "all", label: "All Destinations" },
      ...uniqueRegions.map(r => ({
        value: r,
        label: r.split("-").join(" ").toUpperCase()
      }))
    ];
  }, [allPackages, selectedType]);

  const packagesWithOffers = useMemo(() => {
    return allPackages.map(pkg => {
      const offer = pkg.offers?.[0];
      return {
        ...pkg,
        offerPrice: offer ? offer.offerPrice : null,
        basePrice: pkg.price || 0,
        savingsAmount: offer ? pkg.price - offer.offerPrice : 0
      };
    });
  }, [allPackages]);

  const filteredArray = useMemo(() => {
    let result = packagesWithOffers.filter((item) => {
      const price = item.offerPrice || item.basePrice;
      const isPriceInRange = price >= range[0] && price <= range[1];
      
      const isDurationSelected = selectedDuration === "all" || 
        (selectedDuration === "short" && item.days <= 5) ||
        (selectedDuration === "medium" && item.days > 5 && item.days <= 10) ||
        (selectedDuration === "long" && item.days > 10);

      const isThemeSelected = selectedTheme === "all" || (item.theme && item.theme.includes(selectedTheme));
      const isTypeSelected = selectedType === "all" || 
        (selectedType === "domestic" && item.domestic) || 
        (selectedType === "international" && !item.domestic);

      const isRegionSelected = selectedRegion === "all" || item.region === selectedRegion;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm || 
        (item.packageTitle && item.packageTitle.toLowerCase().includes(searchLower)) ||
        (item.region && item.region.toLowerCase().replace(/-/g, " ").includes(searchLower)) ||
        (item.citiesList && item.citiesList.toLowerCase().includes(searchLower)) ||
        (item.theme && item.theme.some(t => t.toLowerCase().includes(searchLower))) ||
        (searchLower === "international" && !item.domestic) ||
        (searchLower === "domestic" && item.domestic);

      return isPriceInRange && isDurationSelected && isThemeSelected && isTypeSelected && isRegionSelected && matchesSearch;
    });

    if (sortOption === "price-low-high") {
      result.sort((a, b) => (a.offerPrice || a.basePrice) - (b.offerPrice || b.basePrice));
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => (b.offerPrice || b.basePrice) - (a.offerPrice || a.basePrice));
    } else if (sortOption === "duration-low-high") {
      result.sort((a, b) => a.days - b.days);
    } else if (sortOption === "duration-high-low") {
      result.sort((a, b) => b.days - a.days);
    }

    return result;
  }, [packagesWithOffers, range, selectedDuration, selectedTheme, selectedType, selectedRegion, sortOption, searchTerm]);

  const paginatedArray = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArray.slice(start, start + itemsPerPage);
  }, [filteredArray, currentPage]);

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);

  const handleMinInputChange = (e) => {
    const val = e.target.value === "" ? 0 : Number(e.target.value);
    setRange([val, range[1]]);
    setCurrentPage(1);
  };
  
  const handleMaxInputChange = (e) => {
    const val = e.target.value === "" ? range[0] + 1 : Number(e.target.value);
    setRange([range[0], val]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    const prices = packagesWithOffers.map((item) => item.offerPrice || item.basePrice).filter(Boolean);
    setRange(prices.length > 0 ? [0, Math.max(...prices)] : [0, 1000000]);
    setSelectedDuration("all");
    setSelectedTheme("all");
    setSelectedType("all");
    setSelectedRegion("all");
    setSearchTerm("");
    setCurrentPage(1);
    setSortOption("all");
    setShowMobileFilters(false);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-white min-h-screen overflow-x-hidden" ref={packagesRef}>
      <div className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <Container className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500">
                Found <span className="text-slate-900 font-bold">{filteredArray.length}</span> curated trips
              </p>
            </div>

            <div className="flex w-full md:w-auto items-center gap-3">
              <div className="relative flex-1 md:w-80 group">
                <div className="flex items-center gap-2 p-1 pl-3 h-11 bg-slate-50 rounded-2xl border border-slate-200 focus-within:bg-white focus-within:border-brand-blue/50 focus-within:ring-4 focus-within:ring-brand-blue/5 transition-all duration-300">
                  <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-blue" />
                  <input
                    type="text"
                    placeholder="Where to? (e.g. Bali, Trekking)"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="flex-1 bg-transparent border-none outline-none text-xs font-semibold text-slate-700 placeholder:text-slate-400"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="p-1 px-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={cn(
                  "flex items-center gap-2 px-5 h-11 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0",
                  showMobileFilters 
                    ? "bg-slate-900 text-white shadow-xl" 
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                )}
              >
                <SlidersVertical className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-end">
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Trip Type
                      </label>
                      <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); setCurrentPage(1); setSelectedRegion("all"); }}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white font-bold text-xs">
                          <SelectValue placeholder="All Trips" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="all">All Trips</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                          <SelectItem value="domestic">Domestic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Destination
                      </label>
                      <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v); setCurrentPage(1); }}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white font-bold text-xs">
                          <SelectValue placeholder="All Destinations" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl max-h-[300px]">
                          {regions.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Compass className="w-3 h-3" /> Style
                      </label>
                      <Select value={selectedTheme} onValueChange={(v) => { setSelectedTheme(v); setCurrentPage(1); }}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white font-bold text-xs">
                          <SelectValue placeholder="All Styles" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {allThemes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <CircleDollarSign className="w-3 h-3" /> Budget (INR)
                      </label>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="Min" value={range[0] || ""} onChange={handleMinInputChange} className="h-10 rounded-xl text-xs font-bold" />
                        <Input type="number" placeholder="Max" value={range[1] || ""} onChange={handleMaxInputChange} className="h-10 rounded-xl text-xs font-bold" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Sort By
                      </label>
                      <Select value={sortOption} onValueChange={(v) => { setSortOption(v); setCurrentPage(1); }}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white font-bold text-xs">
<SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="all">Relevance</SelectItem>
                          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleReset} variant="outline" className="h-10 rounded-xl border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 w-full">
                      Reset All
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>

      <div className="py-8 sm:py-12">
        <div className="md:hidden mb-6 px-4">
           <p className="text-sm font-medium text-slate-500">
             Showing <span className="text-slate-900 font-bold">{filteredArray.length}</span> curated adventures
           </p>
        </div>

        <div className="px-2 sm:px-6 lg:px-8 xl:px-12 max-w-[1600px] mx-auto">
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
            <AnimatePresence mode="popLayout">
              {(isLoading && packagesWithOffers.length === 0) ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="space-y-4">
                    <Skeleton className="h-[280px] w-full rounded-3xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4 px-2" />
                      <Skeleton className="h-4 w-1/2 px-2" />
                    </div>
                  </div>
                ))
              ) : paginatedArray.length > 0 ? (
                paginatedArray.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                  >
                    <PackageCard item={item} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Package className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No adventures found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your filters to find your perfect match.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center pt-12 border-t border-slate-100">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn("cursor-pointer rounded-xl h-10 px-4", currentPage === 1 && "pointer-events-none opacity-50")}
                      onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i} className="hidden sm:block">
                      <PaginationLink
                        className="cursor-pointer rounded-xl h-10 w-10 font-bold"
                        onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className={cn("cursor-pointer rounded-xl h-10 px-4", currentPage === totalPages && "pointer-events-none opacity-50")}
                      onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreListing;
