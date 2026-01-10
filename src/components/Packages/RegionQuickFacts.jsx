"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  CalendarClock, 
  Wallet, 
  ThermometerSun, 
  Clock4, 
  Globe, 
  Zap, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  FileCheck,
  Building2,
  Users
} from "lucide-react";

// Map coordinates for common destinations
const regionCoordinates = {
  "azerbaijan": { lat: 40.4093, lng: 49.8671 },
  "baku": { lat: 40.4093, lng: 49.8671 },
  "georgia": { lat: 41.7151, lng: 44.8271 },
  "armenia": { lat: 40.1792, lng: 44.4991 },
  "kerala": { lat: 10.8505, lng: 76.2711 },
  "goa": { lat: 15.2993, lng: 74.1240 },
  "kashmir": { lat: 34.0837, lng: 74.7973 },
  "rajasthan": { lat: 27.0238, lng: 74.2179 },
  "himachal": { lat: 31.1048, lng: 77.1734 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "thailand": { lat: 13.7563, lng: 100.5018 },
  "bali": { lat: -8.3405, lng: 115.0920 },
  "maldives": { lat: 3.2028, lng: 73.2207 },
  "singapore": { lat: 1.3521, lng: 103.8198 },
  "vietnam": { lat: 21.0285, lng: 105.8542 },
  "andaman": { lat: 11.7401, lng: 92.6586 },
  "ladakh": { lat: 34.1526, lng: 77.5771 },
  "sikkim": { lat: 27.5330, lng: 88.5122 },
  "meghalaya": { lat: 25.4670, lng: 91.3662 },
  "uttarakhand": { lat: 30.0668, lng: 79.0193 },
  "varanasi": { lat: 25.3176, lng: 82.9739 },
  "egypt": { lat: 26.8206, lng: 30.8025 },
  "cairo": { lat: 30.0444, lng: 31.2357 },
  "turkey": { lat: 38.9637, lng: 35.2433 },
  "istanbul": { lat: 41.0082, lng: 28.9784 },
  "kedarnath": { lat: 30.7352, lng: 79.0669 },
  "badrinath": { lat: 30.7433, lng: 79.4938 },
  "default": { lat: 20.5937, lng: 78.9629 }
};

const RegionQuickFacts = ({ regionData, regionName }) => {
  const [mounted, setMounted] = React.useState(false);
  const [coords, setCoords] = React.useState(
    regionCoordinates[regionName?.toLowerCase()] || regionCoordinates.default
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getIconConfig = (label) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('time') || lowerLabel.includes('visit') || lowerLabel.includes('season')) {
      return { 
        icon: CalendarClock, 
        color: "text-white", 
        bgColor: "bg-amber-400", 
        glow: "shadow-amber-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('currency') || lowerLabel.includes('money')) {
      return { 
        icon: Wallet, 
        color: "text-white", 
        bgColor: "bg-emerald-400",
        glow: "shadow-emerald-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('climate') || lowerLabel.includes('weather')) {
      return { 
        icon: ThermometerSun, 
        color: "text-white", 
        bgColor: "bg-orange-400",
        glow: "shadow-orange-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('time zone')) {
      return { 
        icon: Clock4, 
        color: "text-white", 
        bgColor: "bg-blue-400",
        glow: "shadow-blue-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('language')) {
      return { 
        icon: Globe, 
        color: "text-white", 
        bgColor: "bg-indigo-400",
        glow: "shadow-indigo-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('visa')) {
      return { 
        icon: FileCheck, 
        color: "text-white", 
        bgColor: "bg-teal-400",
        glow: "shadow-teal-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('capital')) {
      return { 
        icon: Building2, 
        color: "text-white", 
        bgColor: "bg-violet-400",
        glow: "shadow-violet-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    if (lowerLabel.includes('population')) {
      return { 
        icon: Users, 
        color: "text-white", 
        bgColor: "bg-pink-400",
        glow: "shadow-pink-500/50 shadow-lg",
        iconShadow: ""
      };
    }
    return { 
      icon: Sparkles, 
      color: "text-white", 
      bgColor: "bg-amber-400",
      glow: "shadow-amber-500/50 shadow-lg",
      iconShadow: ""
    };
  };

  const defaultFacts = [
    { label: "Best Time", value: "Sep to Apr" },
    { label: "Currency", value: "Local" },
    { label: "Climate", value: "Varied" },
    { label: "Time Zone", value: "GMT+5:30" },
    { label: "Language", value: "English" },
    { label: "Visa", value: "On Arrival" },
    { label: "Capital", value: "City" },
    { label: "Population", value: "10M+" }
  ];

  const facts = React.useMemo(() => {
    let baseFacts = [];
    
    if (mounted && regionData?.quickFacts && Array.isArray(regionData.quickFacts)) {
      // Filter out 'Insider Tips' as it has its own dedicated card section
      baseFacts = regionData.quickFacts
        .filter(fact => !fact.label.toLowerCase().includes('insider'))
        .map(fact => ({
          ...fact,
          ...getIconConfig(fact.label)
        }));
    }
    
    // If we have fewer than 8 facts from API, add defaults to fill remaining slots
    if (baseFacts.length < 8) {
      const existingLabels = baseFacts.map(f => f.label.toLowerCase());
      const additionalFacts = defaultFacts
        .filter(df => {
          const dfLower = df.label.toLowerCase();
          // Check if any existing label contains or is contained by this default label
          return !existingLabels.some(existing => 
            existing.includes(dfLower) || dfLower.includes(existing.split(' ')[0])
          );
        })
        .map(fact => ({
          ...fact,
          ...getIconConfig(fact.label)
        }));
      
      baseFacts = [...baseFacts, ...additionalFacts].slice(0, 8);
    }
    
    // If still no facts (not mounted yet), return empty to avoid hydration issues
    if (baseFacts.length === 0) {
      return defaultFacts.map(fact => ({
        ...fact,
        ...getIconConfig(fact.label)
      }));
    }
    
    return baseFacts;
  }, [mounted, regionData]);

  const displayName = regionName?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") || regionName;

  const mapUrl = `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${coords.lng},${coords.lat}&z=8&l=sat,skl&size=300,300&pt=${coords.lng},${coords.lat},pm2rdl`;

  if (!mounted) return null;

  return (
    <div className="w-full py-4 relative overflow-hidden bg-white/40 rounded-[2.2rem] px-4 md:px-5 select-none border border-slate-100/60 my-4 backdrop-blur-md shadow-sm">
      
      <div className="max-w-[1280px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
          
          {/* Section 1: MAP */}
          <div className="md:col-span-1 lg:col-span-3 py-1 flex flex-col">
            <div 
              className="relative w-full h-full aspect-square lg:aspect-auto rounded-[1.8rem] overflow-hidden border-2 border-white shadow-xl bg-slate-100 group flex-1"
            >
              <img src={mapUrl} alt={displayName} className="w-full h-full object-cover transition-transform duration-700 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-0.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-[1px] w-4 bg-amber-400"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">Destination</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight tracking-tighter drop-shadow-lg">
                    {displayName}
                  </h2>
                  
                  <div className="mt-3 flex">
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2 transition-all">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white">Interactive Map</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Section 2: FACTS (8 facts - responsive grid) */}
          <div className="md:col-span-1 lg:col-span-6 flex flex-col py-1">
            <div className="grid grid-cols-2 c-sm:grid-cols-2 c-md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 h-full">
              {facts.slice(0, 8).map((fact, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "p-3 rounded-[1.2rem] bg-gradient-to-br from-white to-slate-50 shadow-xl border-2 border-slate-200 flex flex-col items-center justify-center gap-2 group transition-all duration-300 h-full text-center -translate-y-1"
                  )}
                >
                  {/* Glowing Icon Container */}
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10 shrink-0",
                      fact.bgColor,
                      fact.glow
                    )}
                  >
                    <fact.icon className={cn("w-5 h-5 transition-transform", fact.color)} />
                  </div>
                  
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 leading-none">{fact.label}</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight truncate">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: HIGHLIGHTS */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-3 py-1">
          <Link 
            href={`/why-choose/${regionName?.toLowerCase()}`}
            className="flex-1 rounded-[1.8rem] bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-5 text-white relative shadow-xl overflow-hidden group border border-white/10 flex flex-col justify-center -translate-y-1 cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
            <Sparkles className="absolute -bottom-4 -left-4 w-24 h-24 text-white/10 -rotate-12 transition-transform duration-700 group-hover:rotate-0" />
              
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-md border border-white/10">
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Why Visit</span>
                  </div>
                </div>
                <p className="text-lg md:text-xl font-serif font-bold italic leading-tight tracking-tight mb-4 drop-shadow-sm">
                  "{regionData?.overview?.substring(0, 95) || `Experience the captivating magic in ${displayName}.`}{regionData?.overview?.length > 95 ? '...' : ''}"
                </p>
                <div className="mt-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transform group-hover:scale-105 transition-all duration-300">
                    Explore Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

          <Link
            href={`/factsheet/${regionName?.toLowerCase()}`}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-4 h-[70px] flex items-center gap-4 shadow-xl overflow-hidden relative shrink-0 -translate-y-1 cursor-pointer hover:scale-[1.02] hover:bg-slate-800 transition-all duration-300 group"
          >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-500/5 to-transparent"></div>
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/10 relative z-10 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-slate-900 fill-slate-900" />
              </div>
              <div className="min-w-0 relative z-10 flex-1">
                <p className="text-[9px] font-black uppercase tracking-[0.1em] text-amber-400 mb-1">Factsheet</p>
                <p className="text-xs font-medium italic text-slate-200 leading-tight line-clamp-1">
                  "Complete guide to {displayName} - All you need to know"
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg group-hover:scale-105 transition-all">
                  Read
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegionQuickFacts;
