"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Backpack, Compass, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Coffee, Tent, Zap, Wind, Shield, Rocket, Globe } from "lucide-react";
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

// Floating Explorer Elements (Maps, Compasses)
const FloatingExplorerElements = () => {
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
            opacity: [0, 0.3, 0], 
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
          {i % 2 === 0 ? (
            <MapPin className="w-8 h-8 text-teal-200/20 fill-teal-200/20" />
          ) : (
            <Compass className="w-10 h-10 text-cyan-200/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function SoloExpeditionClient() {
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
  } = usePackagesByTheme("solo-expedition");

  const soloPackages = useMemo(() => {
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

  const currentPackages = soloPackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentPackages.slice(start, start + itemsPerPage);
  }, [currentPackages, currentPage, itemsPerPage]);

  // if (!mounted) return null; // Removed to prevent footer flash

  return (
    <div className="min-h-screen bg-cosmic-950">
      <AnimatePresence mode="wait">
        {isLoading && (
          <ThemeLoader theme="solo" fullScreen className="bg-cosmic-900" />
        )}
      </AnimatePresence>
      {/* Immersive Adventure Hero */}
      <section className="relative min-h-screen pt-20 overflow-hidden star-field flex items-center">
        {/* Aurora Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-1/2 right-0 w-80 h-80 bg-aurora-500/10 rounded-full blur-[80px]" 
          />
        </div>

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center py-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-aurora-400 text-sm font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 animate-pulse" />
                <span>Solo Traveler Network</span>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.9]">
                <span className="block text-white">GO</span>
                <span className="block text-gradient-aurora mt-2">ALONE</span>
                <span className="block text-white/60 text-4xl md:text-5xl lg:text-6xl mt-4 font-light italic">Together.</span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-4 border-purple-500 pl-6">
                Solo expeditions built for independent souls. Connect with fellow travelers, 
                stay safe with 24/7 tracking, and discover who you become under the aurora.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="px-8 py-7 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg uppercase tracking-wider transition-all shadow-xl shadow-purple-500/30 flex items-center space-x-2 group border-none"
                >
                  <span>Start Journey</span>
                  <Rocket className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="px-8 py-7 bg-transparent border-2 border-aurora-400/30 text-aurora-400 rounded-xl font-bold text-lg uppercase tracking-wider hover:border-aurora-400 hover:bg-aurora-400/5 transition-all"
                >
                  Browse Intel
                </Button>
              </div>
            </motion.div>
            
            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 cut-corner overflow-hidden border border-purple-500/20">
                <Image 
                  src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Solo Northern Lights" 
                  width={1000}
                  height={600}
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/80 via-transparent to-transparent"></div>
              </div>
              
              {/* Stats Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass-cosmic p-6 rounded-lg border-l-4 border-purple-500 z-20 max-w-[200px]"
              >
                <div className="text-3xl font-display font-bold text-purple-400">94%</div>
                <div className="text-sm text-gray-300">Make lifelong friends</div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 -right-6 glass-cosmic p-4 rounded-lg border-l-4 border-aurora-500 z-20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Verified Guide</div>
                    <div className="text-xs text-gray-400">Currently Online</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-8 bg-cosmic-900 border-y border-purple-500/10">
        <Container>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Mission Scope:</span>
            
            <button 
              onClick={() => handleTabChange("international")}
              className={cn(
                "px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 border",
                selectedTab === "international" 
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30" 
                  : "bg-cosmic-800 text-gray-400 border-purple-500/10 hover:border-purple-500/30 hover:text-gray-200"
              )}
            >
              <Globe className="w-4 h-4" />
              Overseas
            </button>
            <button 
              onClick={() => handleTabChange("domestic")}
              className={cn(
                "px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 border",
                selectedTab === "domestic" 
                  ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/30" 
                  : "bg-cosmic-800 text-gray-400 border-purple-500/10 hover:border-purple-500/30 hover:text-gray-200"
              )}
            >
              <MapPin className="w-4 h-4" />
              Mainland
            </button>
          </div>
        </Container>
      </section>

      {/* Solo Manifesto Section */}
      <section className="py-20 relative bg-cosmic-900 overflow-hidden border-y border-purple-500/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[20vw] lg:text-[25vw] font-display font-black tracking-tighter leading-none text-white whitespace-nowrap">
            FREEDOM
          </span>
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-purple-600 rounded-[3rem] rotate-3 opacity-20 blur-2xl" />
              <div className="absolute inset-0 bg-cosmic-800 rounded-[3rem] border border-purple-500/20 overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1000&q=80"
                  alt="Solo explorer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 p-8 glass-cosmic rounded-2xl border border-white/10 max-w-xs">
                  <p className="text-aurora-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                    STATUS: ACTIVE
                  </p>
                  <p className="text-white font-bold tracking-tight text-lg">
                    "The man who goes alone can start today."
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-aurora-400">
                  <Zap className="w-5 h-5 fill-aurora-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    The Solo Manifesto
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-tight uppercase">
                  Travel <br />
                  <span className="text-gradient-aurora">Unfiltered.</span>
                </h2>
              </div>
              <p className="text-gray-400 text-xl leading-relaxed font-medium border-l-4 border-purple-500 pl-8">
                Solo travel isn't just a trip; it's a brutalist approach to self-discovery. 
                We strip away the noise of group dynamics and focus on the raw connection 
                between you and the destination.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <span className="text-5xl font-display font-bold text-white">100%</span>
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em]">
                    Decision Power
                  </p>
                </div>
                <div className="space-y-3">
                  <span className="text-5xl font-display font-bold text-white">24/7</span>
                  <p className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em]">
                    Tactical Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Exploration */}
      <section className="py-20 bg-cosmic-900" id="assignments">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight">
              Curated for <span className="text-gradient-aurora">One</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl italic font-light">
              Destinations optimized for pure, unfiltered exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" ref={packagesRef}>
            {isLoading ? (
              <ThemeLoader theme="solo" />
            ) : (
              <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="solo"
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
                        "cursor-pointer rounded-xl h-12 w-12 bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-xl",
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
                        <PaginationEllipsis className="text-teal-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-xl h-12 w-12 bg-white font-black transition-all border-slate-200 shadow-lg",
                            currentPage === page 
                              ? "bg-teal-600 text-white border-transparent" 
                              : "text-slate-900 hover:bg-teal-50"
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
                        "cursor-pointer rounded-xl h-12 w-12 bg-slate-900 text-white hover:bg-teal-600 transition-all shadow-xl",
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

      {/* Safety & Logistics Info */}
      <section className="py-20 bg-cosmic-950 overflow-hidden relative border-y border-purple-500/10">
        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-stretch border border-purple-500/20 shadow-2xl rounded-[3rem] overflow-hidden bg-cosmic-900">
            <div className="flex-1 p-10 md:p-20 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                  Solo But <br />
                  <span className="text-gradient-aurora">Never Alone.</span>
                </h2>
                <p className="text-gray-400 font-medium text-xl leading-relaxed">
                  True freedom requires the ultimate safety net. Our solo expeditions are backed by global infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                {[
                  { icon: Shield, title: "Safety Net", desc: "Every route is vetted by local experts. We provide constant monitoring and emergency protocols." },
                  { icon: Users, title: "Solo-Meetup", desc: "Digital connectivity to other solo travelers in your area. Join groups when you want, leave when you don't." },
                  { icon: Globe, title: "Hyper-Local", desc: "Avoid the tourist traps. Our solo routes focus on authentic, underground experiences." },
                  { icon: Wind, title: "Logistics Sync", desc: "All solo-friendly transport, baggage handling, and arrivals handled with military precision." }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4 group">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-aurora-400 group-hover:bg-purple-600/40 transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-display font-bold text-white uppercase tracking-tight text-lg">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-[400px] relative">
              <Image
                src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1000&q=80"
                alt="Solo travel logistics"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-900 via-cosmic-900/40 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Tactical CTA */}
      <section className="py-32 bg-cosmic-950 relative overflow-hidden star-field">
        <div className="absolute inset-0 bg-purple-600/5 blur-[120px] rounded-full -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full" />
        <Container className="text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block p-6 border border-purple-500/30 rounded-full"
            >
              <Globe className="w-12 h-12 text-aurora-400" />
            </motion.div>
            
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-tight uppercase">
              Ready to <br />
              <span className="text-gradient-aurora italic">Disappear?</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <Button 
                size="lg" 
                className="h-20 px-12 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-2xl uppercase tracking-widest transition-all shadow-2xl shadow-purple-500/40 border-none"
              >
                Deploy Now
              </Button>
              <Link 
                href="/contact" 
                className="text-white font-bold uppercase tracking-widest text-lg hover:text-aurora-400 transition-colors border-b-2 border-purple-500/40 pb-2"
              >
                Consult a Strategist
              </Link>
            </div>
            
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[1em] pt-12">
              Bayard Vacations | Solo Operations Unit
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
