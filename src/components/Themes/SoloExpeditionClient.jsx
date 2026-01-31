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
import PackageCard from "@/components/ui/PackageCard";

// Floating Explorer Elements Background Component
const FloatingExplorerElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.4 + 0.4,
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: "-10%",
            rotate: Math.random() * 360 + 180
          }}
          transition={{ 
            duration: Math.random() * 15 + 20, 
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear"
          }}
          className="absolute"
        >
          {i % 2 === 0 ? (
            <Mountain className="w-10 h-10 text-teal-200" />
          ) : (
            <Compass className="w-10 h-10 text-cyan-200" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function SoloExpeditionClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Immersive Adventure Hero */}
      <div className="relative h-[85vh] md:h-[95vh] overflow-hidden flex items-center bg-slate-900">
        {/* Ken Burns Animation */}
        <motion.div 
          initial={{ scale: 1.1, x: "-2%" }}
          animate={{ scale: 1, x: "0%" }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="Solo adventure background"
            fill
            className="object-cover opacity-80"
            priority
          />
        </motion.div>
        
        {/* Topo Map Overlay */}
        <div className="absolute inset-0 opacity-20 z-10 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 80 Q 50 10, 90 80 T 170 80' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M10 120 Q 50 50, 90 120 T 170 120' fill='none' stroke='white' stroke-width='0.5'/%3E%3Cpath d='M10 160 Q 50 90, 90 160 T 170 160' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10" />
        
        <FloatingExplorerElements />

        <Container className="relative z-20 pt-32 md:pt-40">
          <div className="max-w-4xl space-y-6 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-teal-500/20 backdrop-blur-xl rounded-lg border border-teal-400/30 shadow-2xl">
                <Compass className="w-5 h-5 text-teal-400 animate-spin-slow" />
                <span className="text-[10px] md:text-xs font-black text-teal-100 uppercase tracking-[0.4em] font-mono">
                  Route: Uncharted Territory
                </span>
              </div>

              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-4 text-amber-500 font-mono text-[10px] md:text-lg tracking-[0.3em] font-bold">
                  <span className="h-[2px] w-8 md:w-12 bg-amber-500/50" />
                  LAT: 64.1265° N | LON: 21.8174° W
                </div>
                <h1 className="text-4xl sm:text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                  Solo<br />
                  <span className="text-teal-400 not-italic">Expedition</span>
                </h1>
              </div>

              <p className="text-base md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl border-l-4 border-teal-500 pl-4 md:pl-6 py-1 md:py-2">
                The ultimate test of freedom. No compromises. No waiting. Just you, the open road, and the thrill of absolute independence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-2 md:pt-4 text-center sm:text-left">
                <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-[0_20px_50px_rgba(13,148,136,0.2)] border-none font-black text-base md:text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                   Enlist Now
                  <Rocket className="ml-3 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 md:h-16 px-8 md:px-10 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md font-black text-base md:text-lg uppercase tracking-widest transition-all">
                  Browse Intel
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Tactical Coordinates Overlay */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:flex flex-col gap-20 py-10 opacity-30 z-20">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 vertical-text font-mono text-white text-xs tracking-[1em]">
               BAYARD-SYSTEM-0{i}
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 z-20 flex items-center gap-6">
          <div className="flex flex-col gap-1 items-center">
             <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
             <div className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
             <div className="w-1.5 h-1.5 rounded-full bg-teal-500/20" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Begin Descent</span>
        </div>
      </div>

      {/* Solo Manifesto Section */}
      <section className="py-24 md:py-40 relative bg-slate-900 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
           <span className="text-[25vw] font-black tracking-tighter leading-none">FREEDOM</span>
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square"
            >
              <div className="absolute inset-0 bg-teal-600 rounded-[3rem] rotate-3 opacity-20" />
              <div className="absolute inset-0 bg-slate-800 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1000&q=80"
                  alt="Solo explorer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 max-w-xs">
                  <p className="text-white font-mono text-[10px] uppercase tracking-widest mb-2 text-teal-400">STATUS: ACTIVE</p>
                  <p className="text-white font-bold tracking-tight">"The man who goes alone can start today."</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500">
                  <Zap className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">The Solo Manifesto</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                  Travel <br />
                  <span className="text-teal-500 underline decoration-8 underline-offset-[12px]">Unfiltered.</span>
                </h2>
              </div>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                Solo travel isn't just a trip; it's a brutalist approach to self-discovery. We strip away the noise of group dynamics and focus on the raw connection between you and the destination.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                   <span className="text-4xl font-black text-white">100%</span>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Decision Power</p>
                 </div>
                 <div className="space-y-2">
                   <span className="text-4xl font-black text-white">24/7</span>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tactical Support</p>
                 </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Packages Exploration */}
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-teal-600" />
              <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                Elite <br />
                Assignements
              </h2>
            </div>
            
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setSelectedTab("international")}
                className={cn(
                  "px-8 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300",
                  selectedTab === "international"
                    ? "bg-slate-900 text-white shadow-xl"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Overseas
              </button>
              <button
                onClick={() => setSelectedTab("domestic")}
                className={cn(
                  "px-8 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300",
                  selectedTab === "domestic"
                    ? "bg-slate-900 text-white shadow-xl"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Mainland
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="rounded-[2rem] border border-slate-200 bg-white p-8 animate-pulse flex flex-col h-full shadow-lg">
                  <div className="h-[240px] bg-slate-100 rounded-[1.5rem] mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-8 bg-slate-100 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded-lg w-1/2"></div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-2">
                       <div className="h-3 bg-slate-100 rounded w-16"></div>
                       <div className="h-8 bg-slate-100 rounded w-24"></div>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
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

      {/* Safety & Logistics Info */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-1/2 h-full bg-white hidden lg:block" />
         <Container className="relative">
            <div className="flex flex-col lg:flex-row items-stretch border border-slate-200 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
               <div className="flex-1 p-10 md:p-20 space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">
                       Solo But <br />
                       <span className="text-teal-600">Never Alone.</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed">
                       True freedom requires the ultimate safety net. Our solo expeditions are backed by global infrastructure.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                     {[
                       { icon: Shield, title: "Safety Net", desc: "Every route is vetted by local experts. We provide constant monitoring and emergency protocols." },
                       { icon: Users, title: "Solo-Meetup", desc: "Digital connectivity to other solo travelers in your area. Join groups when you want, leave when you don't." },
                       { icon: Globe, title: "Hyper-Local", desc: "Avoid the tourist traps. Our solo routes focus on authentic, underground experiences." },
                       { icon: Wind, title: "Logistics Sync", desc: "All solo-friendly transport, baggage handling, and arrivals handled with millitary precision." }
                     ].map((item, idx) => (
                       <div key={idx} className="space-y-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-teal-600">
                             <item.icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="flex-1 min-h-[400px] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=1000&q=80"
                    alt="Solo travel logistics"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-teal-900/10" />
               </div>
            </div>
         </Container>
      </section>

      {/* Final Tactical CTA */}
      <section className="py-32 bg-slate-900 relative">
         <Container className="text-center">
            <div className="max-w-3xl mx-auto space-y-12">
               <div className="inline-block p-4 border border-teal-500/30 rounded-full animate-pulse">
                  <Globe className="w-8 h-8 text-teal-400" />
               </div>
               <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
                  Ready to <br />
                  <span className="text-teal-500 italic">Disappear?</span>
               </h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button size="lg" className="h-16 px-12 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xl uppercase tracking-widest transition-all shadow-2xl shadow-teal-500/20">
                     Deploy Now
                  </Button>
                  <Link href="/contact" className="text-white font-black uppercase tracking-widest text-sm hover:text-teal-400 transition-colors border-b-2 border-white/20 pb-1">
                     Consult a Strategist
                  </Link>
               </div>
               <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">Bayard Vacations | Solo Operations Unit</p>
            </div>
         </Container>
      </section>
    </div>
  );
}
