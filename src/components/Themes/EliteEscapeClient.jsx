"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Diamond, Martini, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Award, Gem } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function EliteEscapeClient({ initialRegions = [], initialPackages = [] }) {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectionType, setSelectionType] = useState("International");

  // Get regions that actually have Elite Escape packages
  const availableRegions = Array.from(new Set(initialPackages.map(pkg => pkg.region))).sort();

  // Categorize available regions
  const domesticRegions = availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return regionData?.isDomestic;
  });

  const internationalRegions = availableRegions.filter(regionName => {
    const regionData = initialRegions.find(r => r.name === regionName || r.slug === regionName.toLowerCase().replace(/\s+/g, '-'));
    return !regionData?.isDomestic;
  });

  const displayRegions = selectionType === "Domestic" ? domesticRegions : internationalRegions;

  // Filter packages based on selected region and type
  const filteredPackages = initialPackages.filter(pkg => {
    const isLevelMatch = selectedRegion === "All" || pkg.region === selectedRegion;
    
    // Determine if package is domestic/international
    const regionData = initialRegions.find(r => r.name === pkg.region || r.slug === pkg.region.toLowerCase().replace(/\s+/g, '-'));
    const isTypeMatch = selectionType === "Domestic" ? regionData?.isDomestic : !regionData?.isDomestic;
    
    return isLevelMatch && isTypeMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0C10] py-24 md:py-32">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Luxury Texture Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 5 L55 35 L85 40 L55 45 L50 75 L45 45 L15 40 L45 35 Z' fill='none' stroke='%23d97706' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12 xl:col-span-5 space-y-8 text-center xl:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500/20 to-transparent backdrop-blur-xl rounded-full border border-amber-500/30"
              >
                <div className="relative">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-amber-500 rounded-full blur-md"
                  />
                </div>
                <span className="text-xs font-black text-amber-500 uppercase tracking-[0.3em]">
                  The Pinnacle of Discovery
                </span>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  Elite<br />
                  <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                    Escape
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-xl mx-auto xl:mx-0">
                  Curated for the connoisseur of fine travel. Immerse yourself in a world where luxury knows no bounds and every detail is a masterpiece.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
                <Button size="xl" className="h-16 px-10 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-2xl font-black text-lg shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)] group transition-all duration-300">
                  <span className="flex items-center gap-2">
                    Explore Luxury
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button size="xl" variant="outline" className="h-16 px-10 border-amber-500/30 text-white hover:bg-amber-500/10 rounded-2xl font-black text-lg backdrop-blur-sm border-2">
                  VIP Concierge
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 flex flex-wrap items-center justify-center xl:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">500+</span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500">Luxury Resorts</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">24/7</span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500">Personal Butler</span>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white">Top 1%</span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500">Global Service</span>
                </div>
              </div>
            </motion.div>

            {/* Right Multi-Image Grid */}
            <div className="lg:col-span-12 xl:col-span-7 relative h-[500px] md:h-[600px] flex items-center justify-center">
              {/* Main Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="relative w-[70%] h-[60%] rounded-[3rem] overflow-hidden shadow-2xl z-20 border-4 border-slate-900"
              >
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop"
                  alt="Ultra luxury suite"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-2xl p-3 rounded-2xl border border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                      <Diamond className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-sm">Royal Residences</h4>
                      <p className="text-amber-400 text-[10px] font-bold uppercase tracking-tighter">Unmatched Sophistication</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary Images - Top Left */}
              <motion.div 
                initial={{ opacity: 0, x: -40, y: -40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute left-0 top-0 w-[48%] h-[42%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-slate-900 rotate-[-6deg]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2000&auto=format&fit=crop"
                  alt="Luxury Dining"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Secondary Images - Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, x: 40, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="absolute right-0 bottom-0 w-[48%] h-[42%] rounded-[2.5rem] overflow-hidden shadow-2xl z-30 border-4 border-slate-900 rotate-[6deg]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000&auto=format&fit=crop"
                  alt="Infinity Pool"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-20px] top-[10%] w-32 h-32 border-2 border-dashed border-amber-500/20 rounded-full flex items-center justify-center opacity-50 hidden md:flex"
              >
                <div className="w-3 h-3 bg-amber-500 rounded-full blur-[2px]" />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>



      {/* Packages Section */}
      <Container className="py-8 md:py-12">
        {/* Region Filter Section */}
        <div className="relative mb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-slate-950/40 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full" />

              <div className="relative z-10 flex flex-col items-center gap-10">
                {/* Category Toggle (International / Domestic) */}
                <div className="flex flex-col items-center gap-4">
                  <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">Destination Class</span>
                  <div className="inline-flex p-2 bg-slate-900/80 rounded-[2.5rem] border border-white/5 relative shadow-inner">
                    <button
                      onClick={() => {
                        setSelectionType("International");
                        setSelectedRegion("All");
                      }}
                      className={`relative px-12 py-3.5 rounded-[2rem] text-sm font-black transition-all duration-500 z-10 ${
                        selectionType === "International" ? "text-slate-950" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {selectionType === "International" && (
                        <motion.div 
                          layoutId="categoryToggle"
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem] shadow-[0_10px_20px_rgba(245,158,11,0.2)]"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">International</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectionType("Domestic");
                        setSelectedRegion("All");
                      }}
                      className={`relative px-12 py-3.5 rounded-[2rem] text-sm font-black transition-all duration-500 z-10 ${
                        selectionType === "Domestic" ? "text-slate-950" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {selectionType === "Domestic" && (
                        <motion.div 
                          layoutId="categoryToggle"
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem] shadow-[0_10px_20px_rgba(245,158,11,0.2)]"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">Domestic</span>
                    </button>
                  </div>
                </div>

                {/* Regions Horizontal Scroll */}
                <div className="w-full flex flex-col gap-8">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                    <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter text-center">
                      Select <span className="text-amber-500">{selectionType}</span> Region
                    </h3>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
                  </div>
                  
                  <div className="relative group max-w-5xl mx-auto w-full">
                    {/* Scroll Container */}
                    <div className="flex overflow-x-auto scrollbar-hide gap-5 pb-6 px-4 scroll-smooth mask-fade-edges">
                      <button
                        onClick={() => setSelectedRegion("All")}
                        className={`group relative flex-shrink-0 px-10 py-5 rounded-[2rem] font-black transition-all duration-500 overflow-hidden min-w-[160px] ${
                          selectedRegion === "All"
                            ? "text-slate-950 scale-105 shadow-2xl"
                            : "text-slate-400 bg-slate-900/40 border border-white/5 hover:border-amber-500/30 hover:text-white"
                        }`}
                      >
                        {selectedRegion === "All" && (
                          <motion.div 
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10 uppercase text-[10px] tracking-[0.2em]">All Regions</span>
                      </button>

                      {displayRegions.map(region => (
                        <button
                          key={region}
                          onClick={() => setSelectedRegion(region)}
                          className={`group relative flex-shrink-0 px-10 py-5 rounded-[2rem] font-black transition-all duration-500 overflow-hidden min-w-[160px] ${
                            selectedRegion === region
                              ? "text-slate-950 scale-105 shadow-2xl"
                              : "text-slate-400 bg-slate-900/40 border border-white/5 hover:border-amber-500/30 hover:text-white"
                          }`}
                        >
                          {selectedRegion === region && (
                            <motion.div 
                              layoutId="activeFilter"
                              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-[2rem]"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10 capitalize whitespace-nowrap text-[10px] tracking-[0.2em]">
                            {region.replace(/-/g, ' ')}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Fades for scroll indication */}
                    <div className="absolute left-0 top-0 bottom-6 w-20 bg-gradient-to-r from-slate-950/60 to-transparent pointer-events-none rounded-l-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-6 w-20 bg-gradient-to-l from-slate-950/60 to-transparent pointer-events-none rounded-r-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages/${pkg.region?.toLowerCase().replace(/\s+/g, '-')}/${pkg.packageSlug}`}>
                  <div className="group bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-amber-500/20">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={pkg.cardImages?.[0]?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"}
                        alt={pkg.packageTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-black uppercase backdrop-blur-sm">
                          ₹{pkg.basePrice?.toLocaleString()}
                        </div>
                      </div>

                      {/* Days */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-900/95 px-2 py-1 rounded-full border border-amber-500/30">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-bold text-white">{pkg.days}D / {pkg.nights}N</span>
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-bold">{pkg.region}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {pkg.packageTitle}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pkg.packageTags?.slice(0, 2).map((tag, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] text-amber-300 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 font-medium italic">Premium Escapes</p>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold group-hover:gap-3 transition-all">
                          <span className="text-sm">View Package</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-[3rem] border border-dashed border-amber-500/20">
            <Diamond className="w-12 h-12 text-amber-500 opacity-30 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">No Elite Packages Found</h3>
            <p className="text-slate-400">We are currently handpicking exclusive experiences for this region. Stay tuned!</p>
            <Button onClick={() => setSelectedRegion("All")} className="mt-6 bg-amber-500 text-slate-900 font-bold rounded-xl">View All Regions</Button>
          </div>
        )}
      </Container>

      {/* Why Elite Travel Section */}
      {/* Why Elite Travel Section */}
      <div className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <Container>
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-sm mb-4 block">The Bayard Distinction</span>
              <h2 className="text-4xl md:text-6xl font-black text-white">
                Why Choose <br />
                <span className="text-amber-500">Elite Escapes?</span>
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-md">
              Experience the pinnacle of luxury travel where every moment is meticulously crafted for excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Crown, 
                title: "VIP Treatment", 
                desc: "From private airport transfers to dedicated concierge service, every detail is handled with excellence.",
                gradient: "from-amber-500 to-yellow-500"
              },
              { 
                icon: Gem, 
                title: "Exclusive Access", 
                desc: "Private villas, Michelin-star dining, and experiences money can't typically buy—all arranged for you.",
                gradient: "from-blue-500 to-indigo-500"
              },
              { 
                icon: Sparkles, 
                title: "Uncompromising Quality", 
                desc: "5-star accommodations, premium amenities, and world-class service at every touchpoint.",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-10 bg-slate-900/40 rounded-[2.5rem] border border-white/5 hover:border-amber-500/30 transition-all duration-500"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-10 h-10 text-slate-900" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-amber-500 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                
                {/* Decorative border glow */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
