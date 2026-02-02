"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crown, 
  Diamond, 
  MapPin, 
  Star, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Gem,
  ArrowRight,
  ConciergeBell,
  Plane,
  ShieldCheck,
  PlayCircle,
  Search,
  User,
  Clock
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ThemedPackageCard from "@/components/ui/ThemedPackageCard";
import { usePackagesByTheme } from "@/hooks/packages";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getPaginationPages } from "@/utils/paginationUtils";
import { cn } from "@/lib/utils";
import ThemeLoader from "@/components/ui/ThemeLoader";

export default function EliteEscapeClient({ initialRegions = [], initialPackages = [] }) {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectionType, setSelectionType] = useState("International");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectionType]);

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("elite-escape");

  const elitePackages = useMemo(() => {
    const pkgSource = allThemePackages?.length > 0 ? allThemePackages : initialPackages;
    
    const uniqueMap = new Map();
    pkgSource.forEach(pkg => {
      if (pkg.id && !uniqueMap.has(pkg.id)) {
        uniqueMap.set(pkg.id, pkg);
      }
    });
    return Array.from(uniqueMap.values());
  }, [allThemePackages, initialPackages]);

  const availableRegions = useMemo(() => 
    Array.from(new Set(elitePackages.map(pkg => pkg.region))).sort()
  , [elitePackages]);

  const domesticRegions = useMemo(() => availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return regionData?.isDomestic;
  }), [availableRegions, initialRegions]);

  const internationalRegions = useMemo(() => availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return !regionData?.isDomestic;
  }), [availableRegions, initialRegions]);

  const displayRegions = selectionType === "Domestic" ? domesticRegions : internationalRegions;

  const filteredPackages = useMemo(() => elitePackages.filter(pkg => {
    const isLevelMatch = selectedRegion === "All" || pkg.region === selectedRegion;
    const regionData = initialRegions.find(r => r.name === pkg.region || r.slug === pkg.region.toLowerCase().replace(/\s+/g, '-'));
    const isTypeMatch = selectionType === "Domestic" ? regionData?.isDomestic : !regionData?.isDomestic;
    return isLevelMatch && isTypeMatch;
  }), [elitePackages, selectedRegion, selectionType, initialRegions]);

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(start, start + itemsPerPage);
  }, [filteredPackages, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500 selection:text-black">
      <AnimatePresence>
        {isLoading && (
          <ThemeLoader theme="elite" fullScreen className="bg-[#0a0a0a]" />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[80dvh] min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=100" 
            alt="Luxury Resort" 
            fill
            className="object-cover scale-110 opacity-60 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/20 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 text-[10px] uppercase text-amber-500 tracking-[0.3em] font-bold border border-amber-500/20 bg-amber-500/5 rounded-full">
              Private Collection
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-serif font-light leading-none mb-10"
          >
            <span className="block text-white">Elite</span>
            <span className="block text-gold-gradient italic -mt-4 md:-mt-8">Escape</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-8 md:mb-16"
          >
            Beyond the ordinary. A curated selection of the world's most exclusive destinations, 
            reserved for the discerning few.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-8 justify-center items-center"
          >
            <button className="group px-12 py-5 bg-transparent border border-amber-500/30 text-amber-500 text-xs uppercase tracking-[0.4em] font-black hover:bg-amber-500 hover:text-black transition-all duration-500 flex items-center gap-4">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors flex items-center gap-3 group">
              <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform text-amber-500/80" />
              <span>View Film</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500 to-transparent"></div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-12 w-[1px] h-32 bg-gradient-to-b from-amber-500/30 to-transparent hidden md:block"></div>
        <div className="absolute top-0 right-12 w-[1px] h-32 bg-gradient-to-b from-amber-500/30 to-transparent hidden md:block"></div>
      </section>

      {/* Filter and Selection Section */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-b border-white/5" ref={packagesRef}>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 border-b border-white/10 pb-6 md:pb-10">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Curated Destinations</h2>
              <p className="text-gray-500 font-light tracking-wide uppercase text-xs">Hand-selected properties and experiences</p>
            </div>
            
            <div className="flex gap-1.5 bg-white/5 p-1 rounded-sm border border-white/10">
              <button
                onClick={() => {
                  setSelectionType("International");
                  setSelectedRegion("All");
                }}
                className={cn(
                  "px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300",
                  selectionType === "International" 
                    ? "bg-white text-black shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                International
              </button>
              <button
                onClick={() => {
                  setSelectionType("Domestic");
                  setSelectedRegion("All");
                }}
                className={cn(
                  "px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300",
                  selectionType === "Domestic" 
                    ? "bg-white text-black shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                Domestic
              </button>
            </div>
          </div>

          {/* Region Tabs (Secondary Filter) */}
          <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 mb-8 md:mb-16 pb-4 border-b border-white/5">
            <button
              onClick={() => setSelectedRegion("All")}
              className={cn(
                "whitespace-nowrap pb-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all border-b-2",
                selectedRegion === "All" 
                  ? "text-amber-500 border-amber-500" 
                  : "text-gray-500 border-transparent hover:text-white"
              )}
            >
              All Regions
            </button>
            {displayRegions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={cn(
                  "whitespace-nowrap pb-4 text-[10px] uppercase tracking-[0.3em] font-black transition-all border-b-2",
                  selectedRegion === region 
                    ? "text-amber-500 border-amber-500" 
                    : "text-gray-500 border-transparent hover:text-white"
                )}
              >
                {region.replace(/-/g, ' ')}
              </button>
            ))}
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 min-h-[400px]">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-white/5 border border-white/10 animate-pulse rounded-sm" />
              ))
            ) : paginatedPackages.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {paginatedPackages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <ThemedPackageCard
                      theme="elite"
                      item={pkg}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full py-32 text-center text-gray-500 font-serif italic text-2xl">
                The collection for this selection is currently being curated.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-3">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-none h-14 px-8 border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all",
                        currentPage === 1 && "pointer-events-none opacity-20"
                      )}
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    />
                  </PaginationItem>
                  
                  {getPaginationPages(currentPage, totalPages).map((page, i) => (
                    <PaginationItem key={i} className="hidden sm:block">
                      {page === "..." ? (
                        <PaginationEllipsis className="text-amber-500" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-none h-14 w-14 font-black transition-all border-white/10",
                            currentPage === page 
                              ? "bg-white text-black border-white shadow-xl" 
                              : "text-gray-400 hover:bg-white/5"
                          )}
                          onClick={() => {
                            setCurrentPage(page);
                            packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        "cursor-pointer rounded-none h-14 px-8 border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all",
                        currentPage === totalPages && "pointer-events-none opacity-20"
                      )}
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="mt-24 text-center">
            <button className="px-16 py-5 border border-white/10 text-xs uppercase tracking-[0.4em] text-gray-400 font-black hover:text-white hover:border-amber-500/30 transition-all duration-500 group">
              <span>View All Elite Properties</span>
            </button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)' }}></div>
        </div>

        <Container className="relative z-10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <ConciergeBell className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-6">24/7 Concierge</h3>
              <p className="text-gray-500 font-light text-base leading-relaxed max-w-[280px] mx-auto">Dedicated lifestyle managers available around the clock to fulfill any request, anywhere.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <Plane className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-6">Private Aviation</h3>
              <p className="text-gray-500 font-light text-base leading-relaxed max-w-[280px] mx-auto">Access to our fleet of private jets and helicopters ensuring absolute privacy and convenience.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="w-24 h-24 mx-auto mb-8 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-6">Discreet Security</h3>
              <p className="text-gray-500 font-light text-base leading-relaxed max-w-[280px] mx-auto">Unobtrusive protection services and secure transportation for complete peace of mind.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#0a0a0a] py-16 md:py-24 border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Join the Elite</h2>
              <p className="text-gray-500 font-light text-lg tracking-wide uppercase text-xs">Membership by invitation or application only</p>
            </div>
            <button className="px-12 py-5 bg-gold-gradient text-black text-xs uppercase tracking-[0.3em] font-black hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-500">
              Request Membership
            </button>
          </div>
        </Container>
      </section>

      <style jsx>{`
        .text-gold-gradient {
          background: linear-gradient(135deg, #f7e7ce 0%, #d4af37 50%, #b8941f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bg-gold-gradient {
          background: linear-gradient(135deg, #f7e7ce 0%, #d4af37 50%, #b8941f 100%);
        }
      `}</style>
    </div>
  );
}
