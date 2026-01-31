"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Map, Tent, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Backpack, TreePine, Flame, Zap, Wind, Navigation } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePackagesByTheme } from "@/hooks/packages";
import PackageCard from "@/components/ui/PackageCard";

// Floating Adventure Elements
const FloatingAdventureElements = () => {
  const elements = [Compass, Mountain, Backpack, Navigation, Wind];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(12)].map((_, i) => {
        const Icon = elements[i % elements.length];
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: "110%", 
              x: `${Math.random() * 100}%`,
              rotate: 0,
              scale: Math.random() * 0.4 + 0.2,
            }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: "-10%",
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
            className="absolute text-emerald-300/30"
          >
            <Icon size={40} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default function ExplorationBundleClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* High-Energy Action Hero */}
      <div className="relative h-[80vh] md:h-[90vh] overflow-hidden flex items-center bg-emerald-900">
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
        
        <FloatingAdventureElements />

        <Container className="relative z-20 pt-32 md:pt-40">
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
                <h1 className="text-4xl sm:text-7xl md:text-[11rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                  Push your<br />
                  <span className="text-transparent stroke-text text-yellow-300">limits</span>
                </h1>
              </div>

              <p className="text-lg md:text-3xl text-emerald-50/90 font-light leading-snug max-w-3xl">
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
      <section className="py-24 md:py-48 bg-emerald-950 relative overflow-hidden group">
         <div className="absolute top-0 right-0 text-[20rem] font-black text-emerald-900/40 leading-none select-none -translate-y-1/2 translate-x-1/4 italic pointer-events-none">
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
                  <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-none">
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
      <section id="bundles" className="py-24 md:py-40">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
            <div className="space-y-4">
              <div className="w-12 h-2 bg-emerald-500" />
              <h2 className="text-6xl md:text-9xl font-black text-emerald-950 uppercase tracking-tighter leading-none italic">
                Active<br />Bundles
              </h2>
            </div>
            
            <div className="flex bg-emerald-100/50 p-2 rounded-none skew-x-[-6deg]">
              <button
                onClick={() => setSelectedTab("international")}
                className={cn(
                  "px-8 py-3 rounded-none font-black text-sm uppercase tracking-widest transition-all",
                  selectedTab === "international"
                    ? "bg-emerald-600 text-white shadow-xl"
                    : "text-emerald-900/60 hover:text-emerald-900"
                )}
              >
                Global X
              </button>
              <button
                onClick={() => setSelectedTab("domestic")}
                className={cn(
                  "px-8 py-3 rounded-none font-black text-sm uppercase tracking-widest transition-all",
                  selectedTab === "domestic"
                    ? "bg-emerald-600 text-white shadow-xl"
                    : "text-emerald-900/60 hover:text-emerald-900"
                )}
              >
                Local Ops
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-8 animate-pulse shadow-lg flex flex-col h-full border border-emerald-50">
                  <div className="h-[280px] bg-emerald-50 rounded-lg mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-8 bg-emerald-50 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-emerald-50 rounded-lg w-1/2"></div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-emerald-50 flex justify-between items-end">
                    <div className="space-y-2">
                       <div className="h-3 bg-emerald-50 rounded w-16"></div>
                       <div className="h-8 bg-emerald-50 rounded w-24"></div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-full"></div>
                  </div>
                </div>
              ))
            ) : (
              <AnimatePresence mode="wait">
                {currentPackages.map((pkg, index) => (
                  <PackageCard 
                    key={`${selectedTab}-${pkg.id}`} 
                    item={pkg}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </Container>
      </section>

      {/* Extreme Call to Action */}
      <section className="py-24 md:py-40 bg-white">
         <Container>
            <div className="bg-emerald-600 p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center space-y-12">
               <div className="absolute top-0 left-0 w-full h-2 bg-yellow-300" />
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                  <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase leading-none tracking-tighter">
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
