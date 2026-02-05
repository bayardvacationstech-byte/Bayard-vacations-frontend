"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Sparkles, Waves, MapPin, Calendar, Users, Star, Heart, ChevronRight, Leaf, Sun, Wind, Cloud, Moon, Globe, PlayCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
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

import InspirationSection from "@/components/Landing/InspirationSection";
import VideoReelModal from "@/components/ui/VideoReelModal";
import { VIDEO_MAP } from "@/config/themePackages";

// Floating Zen Elements (Lotus Petals)
const FloatingZenElements = () => {
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
          <Flower 
            className="w-8 h-8 text-stone-300/40 fill-stone-100/20" 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function RelaxRejuvenateClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
  } = usePackagesByTheme("relax-rejuvenate");

  const wellnessPackages = useMemo(() => {
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

  const currentPackages = wellnessPackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentPackages.slice(start, start + itemsPerPage);
  }, [currentPackages, currentPage, itemsPerPage]);

  // if (!mounted) return null; // Removed check

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#2c3e50] font-sans selection:bg-[#7fb3d5] selection:text-white overflow-x-hidden">
      <VideoReelModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={VIDEO_MAP["relax-rejuvenate"]} 
      />

      {/* Immersive Serenity Hero */}
      <div className="relative min-h-[75vh] md:h-[85vh] overflow-hidden flex items-center bg-[#E5E1DA]">
        {/* Ken Burns Effect */}
        <motion.div 
          initial={{ scale: 1, x: "-1%" }}
          animate={{ scale: 1.1, x: "1%" }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
            alt="Serene wellness background"
            fill
            className="object-cover opacity-90"
            priority
          />
        </motion.div>
        
        {/* Soft Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100/60 via-stone-50/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-200/80 via-transparent to-stone-100/30 z-10" />
        
        {mounted && <FloatingZenElements />}

        <Container className="relative z-20 pt-24 md:pt-40">
          <div className="max-w-4xl space-y-4 md:space-y-10">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4 md:space-y-8 text-center md:text-left"
            >
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Relax & Rejuvenate", href: "/themes/relax-rejuvenate", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
                omitContainer
              />

              <div className="space-y-1 md:space-y-2">
                <p className="text-sage-700 font-serif italic text-lg md:text-4xl opacity-80 mb-2">
                  Inner peace starts here
                </p>
                <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[9rem] font-serif text-stone-900 leading-[0.9] tracking-tight lowercase">
                  Relax &<br />
                  <span className="text-sage-600 font-light translate-x-2 md:translate-x-12 block">Rejuvenate</span>
                </h1>
              </div>

              <p className="text-base md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto md:mx-0 px-4 md:px-0">
                Shed the weight of the world. Rediscover stillness in earth’s most tranquil sanctuaries, curated for the modern soul.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 pt-2 md:pt-6">
                <Link href="#packages">
                  <Button size="lg" className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xl border-none font-medium text-base md:text-lg tracking-wide transition-all duration-300">
                    Find Your Peace
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-12 md:h-auto text-stone-700 hover:bg-stone-100/50 font-medium text-base md:text-lg tracking-wide flex items-center gap-2 group"
                >
                  <PlayCircle className="w-6 h-6 text-[#B5A48B] group-hover:scale-110 transition-transform" />
                  <span>Watch Story</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Side Accents */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-24 opacity-20">
           <Waves className="w-8 h-8 text-stone-900" />
           <Sun className="w-8 h-8 text-stone-900" />
           <Moon className="w-8 h-8 text-stone-900" />
        </div>

        {/* Breath Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <div className="w-10 h-10 rounded-full border border-stone-900 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 rounded-full bg-stone-900"
              />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-900">Exhale</span>
        </div>
      </div>



      {/* The Three Pillars Section */}
      <section className="section-padding bg-white">
         <Container>
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 space-y-4">
              <div className="w-16 h-[2px] bg-sage-400 mx-auto" />
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-stone-900 lowercase italic leading-tight md:leading-normal">The Three Pillars of Serenity</h2>
              <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed">
                 We believe true rejuvenation occurs at the intersection of mind, body, and spirit. Each of our sanctuaries is vetted for these three core experiences.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
              {[
                { icon: Sun, title: "Mind", desc: "Digital detox, guided meditation, and neurological rest in silence-first environments." },
                { icon: Leaf, title: "Body", desc: "Organic nutrition, ancient holistic treatments, and low-impact movement for physical restoration." },
                { icon: Heart, title: "Spirit", desc: "Communion with nature, spiritual discovery, and soulful connections that transcend the mundane." }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center space-y-8 group"
                >
                   <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-sage-50 rounded-full group-hover:scale-110 transition-transform duration-700" />
                      <pillar.icon className="w-10 h-10 text-sage-600 relative z-10" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-serif italic text-stone-900 lowercase">{pillar.title}</h3>
                      <p className="text-stone-500 font-light leading-relaxed">{pillar.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </Container>
      </section>

      {/* Sanctuary Units (Packages Grid) */}
      <section id="packages" className="section-padding bg-[#F9F7F5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="space-y-4 max-w-xl">
              <span className="text-sage-600 font-bold text-xs uppercase tracking-[0.3em]">Curation</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Handpicked <br />Sanctuaries</h2>
            </div>
            
            <div className="flex bg-stone-200/50 p-1.5 rounded-full border border-stone-200">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "international"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Global Safaris
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "domestic"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Local Zen
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10" ref={packagesRef}>
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="relax"
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
                        "cursor-pointer rounded-full h-12 w-12 bg-white border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg",
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
                        <PaginationEllipsis className="text-stone-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-full h-12 w-12 bg-white font-medium transition-all border-stone-200 shadow-md",
                            currentPage === page 
                              ? "bg-sage-600 text-white border-transparent shadow-xl" 
                              : "text-stone-700 hover:bg-sage-50"
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
                        "cursor-pointer rounded-full h-12 w-12 bg-white border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg",
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

      {/* The Sanctuary Experience CTA */}
      <section className="section-padding bg-[#E5E1DA] overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
         <Container className="relative">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <motion.div
                 className="space-y-6"
               >
                   <Flower className="w-12 h-12 text-sage-600 mx-auto" />
                   <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-stone-900 tracking-tight leading-loose md:leading-none lowercase italic">
                      Ready to begin your <br />
                      <span className="text-sage-600 not-italic font-light block mt-4">transformation?</span>
                   </h2>
               </motion.div>
               <p className="text-xl md:text-2xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed italic">
                  "Your journey to tranquility isn't a destination, it's a decision. Let us find your stillness."
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Button size="lg" className="h-16 px-14 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xl shadow-2xl transition-all duration-500 hover:scale-105">
                     Book Your Sanctuary
                  </Button>
                  <Link href="/contact" className="text-stone-900 font-bold uppercase tracking-[0.3em] text-xs border-b-2 border-stone-900/20 pb-1 hover:border-sage-600 transition-colors">
                     Consult a Wellness Architect
                  </Link>
               </div>
            </div>
         </Container>
      </section>

      <section>
        <InspirationSection theme="relax" />
      </section>
    </div>
  );
}
