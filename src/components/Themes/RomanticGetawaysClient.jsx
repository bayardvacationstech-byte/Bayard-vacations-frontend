"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Play, Info, Camera, Clock, Utensils, Music, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";
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
import { useRef } from "react";
import ThemeLoader from "@/components/ui/ThemeLoader";
import InspirationSection from "@/components/Landing/InspirationSection";

// Floating Hearts Background Component
const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((heart, i) => (
        <motion.div
          key={heart.id}
          initial={{ 
            opacity: 0, 
            y: "100%", 
            x: `${heart.x}%`,
            scale: heart.scale,
            rotate: heart.rotateStart
          }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: "-20%",
            rotate: heart.rotateEnd
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart 
            className={cn(
              "w-8 h-8",
              i % 3 === 0 ? "text-pink-200 fill-pink-200" : 
              i % 3 === 1 ? "text-rose-300 fill-rose-300" : 
              "text-red-200 fill-red-200"
            )} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function RomanticGetawaysClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const packagesRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("romantic-getaways");

  const romanticPackages = useMemo(() => {
    if (!allThemePackages) return { international: [], domestic: [] };
    
    // Deduplicate by package ID for robustness
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
  const currentPackages = romanticPackages[selectedTab] || [];
  const totalPages = Math.ceil(currentPackages.length / itemsPerPage);
  
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return currentPackages.slice(start, start + itemsPerPage);
  }, [currentPackages, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-[#fffafa] text-[#2d2d2d] font-sans selection:bg-[#ff4d6d] selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && (
          <ThemeLoader theme="romantic" fullScreen className="bg-rose-50" />
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="relative min-h-[75vh] lg:min-h-[85vh] overflow-hidden bg-rose-950 flex items-center">
        {/* Ken Burns Animation */}
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1920&q=80"
            alt="Romantic background"
            fill
            className="object-cover opacity-60"
            priority
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-rose-800/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-rose-950/40 z-10" />
        
        <FloatingHearts />

        <Container className="relative z-20 pt-20 pb-10 md:pt-28">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Refined Glassmorphism Badge */}
              <Breadcrumbs 
                items={[
                  { label: "Home", href: "/" },
                  { label: "Themes", href: "/themes" },
                  { label: "Romantic Getaways", href: "/themes/romantic-getaways", active: true }
                ]} 
                className="bg-transparent border-transparent p-0 mb-4 flex justify-center md:justify-start"
                omitContainer
                colorClasses="text-pink-100/70"
                activeColorClasses="text-white"
              />

              <div className="space-y-2">
                <p className="text-rose-500 font-great-vibes text-4xl md:text-6xl tracking-wide ml-1 drop-shadow-sm">
                  Handpicked
                </p>
                 <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white leading-tight md:leading-[0.9] tracking-tight drop-shadow-2xl">
                  Romantic<br />
                  <span className="text-[#FF3366]">Getaways</span>
                </h1>
              </div>

              <p className="text-sm md:text-xl text-white/90 font-medium leading-relaxed max-w-xl drop-shadow-md">
                Escape to the world's most intimate corners. Where every sunset is a celebration and every moment becomes a timeless memory.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="h-11 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl bg-white text-[#FF3366] hover:bg-rose-50 shadow-lg border-none font-black text-sm md:text-lg uppercase tracking-wider md:tracking-widest active:scale-95 transition-all">
                  Book Your Escape
                  <ChevronRight className="ml-1 w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-11 md:h-16 px-8 md:px-10 rounded-xl md:rounded-2xl border-2 border-white/60 text-white hover:bg-white/10 backdrop-blur-md font-black text-sm md:text-lg uppercase tracking-wider md:tracking-widest active:scale-95 transition-all">
                  Customize Love
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Floating "Couples Card" */}
        <Container className="absolute bottom-12 right-0 hidden lg:block z-30">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="ml-auto w-[380px] group"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-400/30 group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-8 h-8 text-rose-300 fill-rose-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Elite Romance</h3>
                  <p className="text-rose-100/70 text-sm leading-relaxed font-medium">
                    "Bayard transformed our honeymoon into a living dream. The attention to detail was magical."
                  </p>
                  <div className="flex gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-60">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Unveil Romance</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/50 to-transparent" />
        </div>
      </div>


      {/* Intro Section */}
      <section className="py-6 md:py-8 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-[120px] -mr-48 -mt-48" />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                   <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto" />
                   <h2 className="text-4xl sm:text-6xl md:text-9xl font-black text-rose-950 tracking-tighter leading-tight md:leading-none italic">
                      Start Your <br />
                      <span className="text-[#FF3366] not-italic font-light block mt-4">Love Story</span>
                   </h2>
                </motion.div>
            <h2 className="text-4xl md:text-7xl font-serif text-slate-900 tracking-tight leading-tight">
              Where <span className="text-rose-500 italic">Love</span> Meets the World’s Grandeur
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
              We don't just plan trips; we orchestrate love stories. Our romance collection spans the globe, from the turquoise lagoons of the Maldives to the royal palaces of Udaipur.
            </p>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="pb-8">
        <Container>
          {/* Tab Switcher */}
          <div className="flex justify-center mb-8 px-4">
            <div className="inline-flex bg-slate-100/80 backdrop-blur-sm rounded-[2rem] p-2 shadow-inner border border-slate-200/50">
              <button
                onClick={() => handleTabChange("international")}
                className={cn(
                  "px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 active:scale-95",
                  selectedTab === "international"
                    ? "bg-rose-600 text-white shadow-2xl shadow-rose-600/30 scale-105"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Global Destinations
              </button>
              <button
                onClick={() => handleTabChange("domestic")}
                className={cn(
                  "px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 active:scale-95",
                  selectedTab === "domestic"
                    ? "bg-rose-600 text-white shadow-2xl shadow-rose-600/30 scale-105"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Incredible India
              </button>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" ref={packagesRef}>
            {isLoading ? (
              <ThemeLoader theme="romantic" />
            ) : (
              <AnimatePresence mode="wait">
                {paginatedPackages.map((pkg, index) => (
                  <ThemedPackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    theme="romantic"
                    item={pkg} 
                  />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn(
                        "cursor-pointer rounded-xl h-10 w-10 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all",
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
                        <PaginationEllipsis className="text-rose-400" />
                      ) : (
                        <PaginationLink
                          className={cn(
                            "cursor-pointer rounded-xl h-10 w-10 font-bold transition-all border-rose-100",
                            currentPage === page 
                              ? "bg-rose-600 text-white shadow-lg border-transparent" 
                              : "text-rose-600 hover:bg-rose-50"
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
                        "cursor-pointer rounded-xl h-10 w-10 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all",
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

      {/* Why Choose Section - Redesigned */}
      <section className="relative py-6 md:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-900/40 rounded-full blur-[150px] -mr-64 -mt-64 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[150px] -ml-64 -mb-64 animate-floatSlow" />

        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Our Romance Philosophy</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  Why Trust Us With Your <span className="text-rose-500 italic font-serif">Heart?</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-10">
                {[
                  { icon: Heart, title: "Emotion-First Curation", desc: "We don't just book rooms; we secure the specific table with the best sunset view, and the villa with the most privacy." },
                  { icon: Sparkles, title: "Secret Inclusions", desc: "Private beach setups, surprise champagne arrivals, and localized romance traditions you won't find anywhere else." },
                  { icon: Users, title: "24/7 Romance Concierge", desc: "Need a last-minute flower delivery in a remote village? Our team makes the impossible happen for your love story." }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <h3 className="text-2xl font-black text-white tracking-tight">{feature.title}</h3>
                      <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1000&q=80"
                  alt="Romantic sunset"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20">
                    <p className="text-2xl font-black text-white italic leading-relaxed">
                      "Distance is just a test to see how far love can travel."
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative Card Behind */}
              <div className="absolute top-10 -right-10 w-full aspect-square bg-rose-600 rounded-[4rem] -z-10 opacity-30 transform rotate-6 border border-white/20" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Premium CTA */}
      <section className="py-6 bg-white relative overflow-hidden">
        <Container className="text-center">
            <div className="max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight">
                Ready to Write Your Next<br />
                <span className="text-rose-500">Chapter Together?</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-2xl shadow-rose-600/30 border-none font-black text-lg uppercase tracking-widest transition-all">
                  Talk to a Specialist
                </Button>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-100">
                      <Image src={`https://i.pravatar.cc/150?u=${i + 130}`} alt="Agent" width={48} height={48} />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-black">
                    +12
                  </div>
                </div>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Join 500+ couples who celebrated with us last month</p>
            </div>
          </Container>
        </section>

      <section className="h-full bg-white relative">
        <InspirationSection theme="romantic" />
      </section>
    </div>
  );
}
