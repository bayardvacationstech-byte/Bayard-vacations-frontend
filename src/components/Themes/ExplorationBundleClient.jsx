"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Map as LucideMap, Tent, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Backpack, TreePine, Flame, Zap, Wind, Navigation } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePackagesByTheme } from "@/hooks/packages";
import ThemedPackageCard from "@/components/ui/ThemedPackageCard";
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
import { useRef } from "react";
import ThemeLoader from "@/components/ui/ThemeLoader";

// Floating Adventure Elements (Use icons relevant to exploration)
const FloatingAdventureElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
    }));
    setElements(newElements);
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((el, i) => (
        <motion.div
          key={el.id}
          initial={{ 
            opacity: 0, 
            y: "100%", 
            x: `${el.x}%`,
            scale: el.scale,
            rotate: el.rotateStart
          }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: "-20%",
            rotate: el.rotateEnd
          }}
          transition={{ 
            duration: el.duration, 
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          {i % 3 === 0 ? (
            <MapPin className="w-8 h-8 text-emerald-200/20 fill-emerald-200/20" />
          ) : i % 3 === 1 ? (
            <Compass className="w-10 h-10 text-teal-200/20" />
          ) : (
             <Mountain className="w-12 h-12 text-green-200/20 fill-green-200/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function ExplorationBundleClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("exploration-bundle");

  const adventurePackages = useMemo(() => {
    if (!allThemePackages) return { international: [], domestic: [] };
    
    // Deduplicate by package ID
    const uniqueMap = new Map();
    allThemePackages.forEach(pkg => {
      if (pkg.id && !uniqueMap.has(pkg.id)) {
        uniqueMap.set(pkg.id, pkg);
      }
    });
    const uniquePackages = Array.from(uniqueMap.values());
    
    return {
      international: uniquePackages.filter(pkg => !pkg.domestic),
      domestic: uniquePackages.filter(pkg => pkg.domestic)
    };
  }, [allThemePackages]);

  const currentPackages = adventurePackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentPackages.slice(start, start + itemsPerPage);
  }, [currentPackages, currentPage, itemsPerPage]);

  // if (!mounted) return null; // Removed to prevent footer flash

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      <AnimatePresence>
        {isLoading && (
          <ThemeLoader theme="exploration" fullScreen className="bg-[#F8FAF9]" />
        )}
      </AnimatePresence>
      {/* Immersive Adventure Hero */}
      <div className="relative min-h-[90vh] md:h-[95vh] overflow-hidden flex items-center bg-emerald-950">
        {/* Ken Burns Background */}
        <motion.div 
          initial={{ scale: 1, x: "-2%" }}
          animate={{ scale: 1.15, x: "2%" }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80"
            alt="Adventure exploration"
            fill
            className="object-cover opacity-70"
            priority
          />
        </motion.div>
        
        {/* Active Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/20 z-10" />
        
        {mounted && <FloatingAdventureElements />}

        <Container className="relative z-20 pt-24 md:pt-40">
          <div className="max-w-5xl space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 md:space-y-10 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/30 backdrop-blur-xl rounded-full border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.4em]">
                  Exploration Bundle 2026
                </span>
              </div>

              <div className="space-y-2 md:space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                  Push your<br />
                  <span className="text-transparent stroke-text text-yellow-300">limits</span>
                </h1>
              </div>

              <p className="text-base md:text-2xl text-emerald-50/90 font-light leading-snug max-w-3xl">
                The ultimate toolkit for the modern explorer. Curated bundles that bridge the gap between curiosity and epic discovery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 pt-6">
                <Button size="lg" className="h-16 md:h-20 px-10 md:px-16 rounded-none skew-x-[-12deg] bg-yellow-400 hover:bg-yellow-300 text-black border-none font-black text-lg md:text-2xl uppercase tracking-tighter transition-all group">
                   <span className="skew-x-[12deg] flex items-center gap-3">
                     Go Exploration
                     <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                   </span>
                </Button>
                <Link href="#bundles">
                  <Button size="lg" variant="outline" className="h-16 md:h-20 px-10 md:px-16 rounded-none skew-x-[-12deg] border-2 border-white/40 text-white hover:bg-white/10 font-bold text-lg md:text-xl uppercase tracking-widest transition-all">
                    <span className="skew-x-[12deg]">Browse Bundles</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* The Exploration Manifesto */}
      <section className="py-8 md:py-12 bg-emerald-950 relative overflow-hidden group">
         <div className="absolute top-0 right-0 text-[10rem] md:text-[20rem] font-black text-emerald-900/40 leading-none select-none -translate-y-1/2 translate-x-1/4 italic pointer-events-none">
            THRIL
         </div>
         
         <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative aspect-square md:aspect-video rounded-[2rem] overflow-hidden border-2 border-emerald-500/30"
               >
                  <Image
                    src="https://images.unsplash.com/photo-1533240332313-0db49b459ad0?w=1200"
                    alt="Wild expedition"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
               </motion.div>

               <div className="space-y-12">
                   <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white italic uppercase leading-tight md:leading-none">
                      The Exploration<br />Manifesto
                   </h2>
                  <div className="space-y-10">
                     {[
                       { title: "Discovery", desc: "Forcing your perspective to shift by witnessing the unseen corners of our planet." },
                       { title: "Resilience", desc: "Testing your grit against nature's most formidable yet beautiful challenges." },
                       { title: "Thrill", desc: "That precise moment when fear transforms into pure, unadulterated existence." }
                     ].map((item, idx) => (
                       <div key={idx} className="flex gap-8 group/item">
                          <div className="text-4xl font-black text-emerald-500 group-hover/item:text-yellow-400 transition-colors">0{idx + 1}</div>
                          <div className="space-y-3">
                             <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{item.title}</h3>
                             <p className="text-emerald-100/60 text-lg leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </Container>
      </section>

      {/* Action Bundles (Packages Grid) */}
      <section id="bundles" className="py-8 md:py-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 md:mb-12">
            <div className="space-y-4">
              <div className="w-12 h-2 bg-emerald-500" />
               <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-emerald-950 uppercase tracking-tighter leading-tight md:leading-none italic">
                Active<br />Bundles
              </h2>
            </div>
            
            <div className="flex bg-emerald-100/50 p-2 rounded-none skew-x-[-6deg]">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 skew-x-[6deg]",
                  selectedTab === "international"
                    ? "bg-emerald-950 text-white shadow-2xl"
                    : "text-emerald-900/60 hover:text-emerald-950"
                )}
              >
                External intel
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 skew-x-[6deg]",
                  selectedTab === "domestic"
                    ? "bg-emerald-950 text-white shadow-2xl"
                    : "text-emerald-900/60 hover:text-emerald-950"
                )}
              >
                Domestic intel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={packagesRef}>
            {isLoading ? (
              <ThemeLoader theme="exploration" />
            ) : (
            <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="exploration"
                    item={pkg}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center py-6">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-none h-14 w-14 bg-emerald-950 text-white hover:bg-yellow-400 hover:text-black transition-all shadow-xl skew-x-[-12deg]",
                        currentPage === 1 && "pointer-events-none opacity-30"
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
                        <PaginationEllipsis className="text-emerald-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-none h-14 w-14 bg-white font-black transition-all border-emerald-100 shadow-md skew-x-[-12deg]",
                            currentPage === page 
                              ? "bg-emerald-500 text-white border-transparent shadow-xl" 
                              : "text-emerald-950 hover:bg-emerald-50"
                          )}
                          onClick={() => {
                            setCurrentPage(page);
                            packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          isActive={currentPage === page}
                        >
                          <span className="skew-x-[12deg]">{page}</span>
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={cn(
                        "cursor-pointer rounded-none h-14 w-14 bg-emerald-950 text-white hover:bg-yellow-400 hover:text-black transition-all shadow-xl skew-x-[-12deg]",
                        currentPage === totalPages && "pointer-events-none opacity-30"
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
        </Container>
      </section>

      {/* Extreme Call to Action */}
      <section className="py-8 md:py-12 bg-white">
         <Container>
            <div className="bg-emerald-600 p-6 md:p-10 relative overflow-hidden flex flex-col items-center text-center space-y-6">
               <div className="absolute top-0 left-0 w-full h-2 bg-yellow-300" />
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                   <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic uppercase leading-tight md:leading-none tracking-tighter">
                      Ready for<br />Extraction?
                   </h2>
               </motion.div>
               <p className="text-emerald-50 md:text-2xl font-medium max-w-2xl">
                  Limited bundles available for the upcoming season. Don't let the map be the only thing you explore.
               </p>
               <Button size="lg" className="h-20 px-16 rounded-none skew-x-[-12deg] bg-white hover:bg-emerald-50 text-emerald-900 border-none font-black text-2xl uppercase tracking-tighter transition-all">
                  <span className="skew-x-[12deg]">Secure Bundle</span>
               </Button>
            </div>
         </Container>
      </section>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1px white;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
