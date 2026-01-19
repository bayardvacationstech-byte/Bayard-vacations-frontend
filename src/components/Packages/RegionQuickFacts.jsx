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
  Users,
  Info,
  Plane,
  Flame,
  Landmark,
  ShieldCheck,
  Banknote,
  Mountain,
  Theater
} from "lucide-react";
import { useRegionFactSheet } from "@/hooks/regions";

/**
 * RegionQuickFacts Component
 * A "Minimalist Classic" design that focuses on typography and clean information hierarchy.
 * Removes shadows, decorative backgrounds, and complex card containers.
 */
const RegionQuickFacts = ({ regionData, regionName, whyChooseData }) => {
  const [mounted, setMounted] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isDescExpanded, setIsDescExpanded] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { factSheetData, isLoading: factSheetLoading } = useRegionFactSheet(regionData?.id);

  const isAzerbaijan = regionName?.toLowerCase().includes('azerbaijan');

  // Icon mapping for dynamic data
  const iconMap = {
    CalendarClock, Wallet, ThermometerSun, Clock4, Globe, Zap,
    Sparkles, MapPin, FileCheck, Building2, Users, Info,
    Plane, Flame, Landmark, ShieldCheck, Banknote, Mountain, Theater,
    "Calendar": CalendarClock,
    "ThermometerSun": ThermometerSun,
    "Clock": Clock4,
    "FileCheck": FileCheck,
    "Wallet": Wallet,
    "Globe": Globe,
    "Building2": Building2,
    "Users": Users,
  };

  const getIcon = (iconName) => {
    return iconMap[iconName] || Info;
  };

  // Helper to map color strings to tailwind classes
  const getColorClass = (color) => {
    const colorMap = {
      blue: "text-blue-600",
      amber: "text-amber-600",
      emerald: "text-emerald-600",
      orange: "text-orange-600",
      indigo: "text-indigo-600",
      teal: "text-teal-600",
      violet: "text-violet-600",
      pink: "text-pink-600",
      rose: "text-rose-600",
      slate: "text-slate-600",
    };
    return colorMap[color] || "text-blue-600";
  };

  // Helper to get icon config
  const getFactConfig = (label) => {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('visit') || lowerLabel.includes('season') || (lowerLabel.includes('time') && !lowerLabel.includes('zone'))) {
      return { icon: CalendarClock, label: "Best Season", color: "text-blue-600" };
    }
    if (lowerLabel.includes('currency') || lowerLabel.includes('money')) {
      return { icon: Wallet, label: "Currency", color: "text-blue-600" };
    }
    if (lowerLabel.includes('climate') || lowerLabel.includes('weather')) {
      return { icon: ThermometerSun, label: "Climate", color: "text-blue-600" };
    }
    if (lowerLabel.includes('time zone')) {
      return { icon: Clock4, label: "Time Zone", color: "text-blue-600" };
    }
    if (lowerLabel.includes('safety')) {
      return { icon: FileCheck, label: "Safety", color: "text-blue-600" };
    }
    if (lowerLabel.includes('language')) {
      return { icon: Globe, label: "Language", color: "text-blue-600" };
    }
    if (lowerLabel.includes('visa')) {
      return { icon: FileCheck, label: "Visa", color: "text-blue-600" };
    }
    if (lowerLabel.includes('capital')) {
      return { icon: Building2, label: "Capital", color: "text-blue-600" };
    }
    if (lowerLabel.includes('population')) {
      return { icon: Users, label: "Population", color: "text-blue-600" };
    }
    return { icon: Info, label: label, color: "text-slate-400" };
  };

  const processedFacts = React.useMemo(() => {
    // 1. Use dynamic factsheet data if available
    if (factSheetData?.details?.essentials) {
      return factSheetData.details.essentials.map(fact => ({
        label: fact.label,
        value: fact.value,
        icon: getIcon(fact.icon),
        color: getColorClass(fact.color)
      }));
    }

    // 2. Use dynamic data from whyChooseData
    if (whyChooseData?.details?.quickFacts) {
      return whyChooseData.details.quickFacts.map(fact => ({ ...fact, ...getFactConfig(fact.label) }));
    }

    // Fallback to hardcoded Azerbaijan data
    const azerbaijanFacts = [
      { label: "Best Season", value: "Apr–Jun" },
      { label: "Language", value: "Azeri, Eng" },
      { label: "Currency", value: "AZN" },
      { label: "Safety", value: "Very Safe" },
      { label: "Time Zone", value: "GMT+4" },
      { label: "Visa", value: "₹2,200 (e-visa)" },
      { label: "Capital", value: "Baku" },
      { label: "Population", value: "10.1M" }
    ];

    const defaultFacts = [
      { label: "Best Season", value: "Sep to Apr" },
      { label: "Currency", value: "Local" },
      { label: "Climate", value: "Varied" },
      { label: "Time Zone", value: "GMT+5:30" },
      { label: "Language", value: "English" },
      { label: "Visa", value: "On Arrival" },
      { label: "Capital", value: "City" },
      { label: "Population", value: "10M+" }
    ];

    if (isAzerbaijan) {
      return azerbaijanFacts.map(fact => ({ ...fact, ...getFactConfig(fact.label) }));
    }

    let facts = [];
    if (mounted && regionData?.quickFacts && Array.isArray(regionData.quickFacts)) {
      facts = regionData.quickFacts
        .filter(fact => !fact.label.toLowerCase().includes('insider'))
        .map(fact => ({
          ...fact,
          ...getFactConfig(fact.label)
        }));
    }
    
    if (facts.length < 4) {
      const existingLabels = facts.map(f => f.label.toLowerCase());
      const additional = defaultFacts
        .filter(df => !existingLabels.some(existing => existing.includes(df.label.toLowerCase())))
        .map(fact => ({
          ...fact,
          ...getFactConfig(fact.label)
        }));
      facts = [...facts, ...additional].slice(0, 8);
    }
    
    return facts;
  }, [mounted, regionData, isAzerbaijan, regionName, whyChooseData, factSheetData]);

  // Convert regionName to slug for URLs
  const regionSlug = regionName?.toLowerCase().replace(/\s+/g, '-');

  if (!mounted) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm shadow-slate-100/50 pt-8 pb-6">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Overview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-blue-600 whitespace-nowrap">Destination Overview</span>
                <div className="h-[1.5px] md:h-[2px] flex-1 md:w-12 bg-blue-600/20" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 tracking-tighter leading-tight md:leading-[0.95] mb-2 md:mb-4">
                About {factSheetData?.details?.hero?.title || whyChooseData?.details?.whyVisitSection?.mainTitle?.replace('Why Visit ', '') || regionName}
              </h2>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-400 mb-4 md:mb-8 max-w-sm">
                {factSheetData?.details?.hero?.subtitle || whyChooseData?.details?.whyVisitSection?.subTitle || "Exploring the heart of the region"}
              </p>
              
              <div className="relative">
                <p className={cn(
                  "text-slate-600 text-sm lg:text-base leading-relaxed max-w-xl transition-all duration-300",
                  !isDescExpanded && "line-clamp-3"
                )}>
                  {factSheetData?.details?.history?.description || whyChooseData?.details?.overview || regionData?.overview || "Discover the unique culture and landscapes of this incredible region."}
                </p>
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="text-blue-600 text-xs font-bold uppercase tracking-wider mt-2 hover:text-blue-700 transition-colors"
                >
                  {isDescExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Facts Grid & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {processedFacts.map((fact, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-100 group-hover:border-blue-100 transition-colors shadow-sm shadow-slate-100/50">
                      <fact.icon className={cn("w-5 h-5", fact.color)} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{fact.label}</span>
                  </div>
                  <div className="pl-0.5">
                    <span className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">{fact.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs Repositioned to Right */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-6">
              <div className="flex items-center justify-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Link href={`/factsheet/${regionSlug}`}>
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 sm:py-3 sm:px-8 bg-slate-900 rounded-full group cursor-pointer hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                    <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-white whitespace-nowrap">Factsheet</span>
                    <Zap className="w-3 sm:w-4 h-3 sm:h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </Link>
                <Link href={`/why-choose/${regionSlug}`}>
                  <div className="flex items-center justify-center gap-2 py-2.5 px-4 sm:py-3 sm:px-8 bg-amber-400 rounded-full group cursor-pointer hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-200/50 transition-all">
                    <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-900 whitespace-nowrap">Why Visit?</span>
                    <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
                  </div>
                </Link>
              </div>

              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-center gap-2 group cursor-pointer py-2.5 sm:py-0 sm:ml-auto"
              >
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                  {isExpanded ? "Less" : "Full Guide"}
                </span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ArrowRight className={cn("w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform", isExpanded ? "rotate-90" : "rotate-0")} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <motion.div
           initial={false}
           animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
           className="overflow-hidden"
        >
          <div className="mt-8 pt-8 pb-12 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-blue-100 pb-3 inline-block">Why Choose {regionName}?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {(() => {
                  // Use dynamic factsheet reasons first
                  if (factSheetData?.details?.history?.cards) {
                    return factSheetData.details.history.cards.map((card, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <Info className={cn("w-5 h-5", getColorClass(card.color))} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{card.title}</h4>
                          <p className="text-sm text-slate-500 leading-tight line-clamp-3">{card.content}</p>
                        </div>
                      </div>
                    ));
                  }

                  // Use dynamic data from whyChooseData
                  const reasons = whyChooseData?.details?.whyChooseReasons || [
                    { icon: "Plane", title: "Direct & Easy Access", text: "4.5 hours from India with visa-free entry (₹2,200 e-visa)", color: "text-blue-600" },
                    { icon: "Flame", title: "Unique Natural Wonders", text: "Eternal fire mountains, mud volcanoes, and pristine Caspian beaches", color: "text-orange-600" },
                    { icon: "Landmark", title: "Rich Cultural Heritage", text: "UNESCO Heritage sites including ancient Baku Old City and Sheki's Silk Road palaces", color: "text-amber-600" },
                    { icon: "Building2", title: "Modern Meets Ancient", text: "Futuristic Flame Towers and Zaha Hadid's architectural masterpiece alongside 1000-year-old caravanserais", color: "text-indigo-600" },
                    { icon: "Banknote", title: "Budget-Friendly", text: "Complete 5-7 day trip for ₹40,000–₹80,000 with flights and accommodation", color: "text-emerald-600" },
                    { icon: "ShieldCheck", title: "Safe & Welcoming", text: "One of the safest countries in the region, known for hospitality to Indian travelers", color: "text-slate-600" }
                  ];

                  return reasons.map((item, idx) => {
                    const IconComponent = getIcon(item.icon);
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <IconComponent className={cn("w-5 h-5", item.color)} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-tight">{item.text}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-blue-100 pb-3 inline-block">Must-Experience Attractions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                  // Use dynamic factsheet items first
                  if (factSheetData?.details?.food?.items) {
                    return factSheetData.details.food.items.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-sm transition-all">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-blue-100 transition-colors">
                          <Zap className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.name}</span>
                      </div>
                    ));
                  }

                  // Use dynamic data if available
                  const attractions = whyChooseData?.details?.mustExperienceAttractions || [
                    { icon: "Flame", text: "Yanar Dag (Eternal Flame Mountains)", color: "text-orange-600" },
                    { icon: "Landmark", text: "Baku Old City (UNESCO Heritage)", color: "text-amber-600" },
                    { icon: "Building2", text: "Flame Towers & Heydar Aliyev Center", color: "text-indigo-600" },
                    { icon: "Mountain", text: "Gobustan Rock Art & Mud Volcanoes", color: "text-slate-600" },
                    { icon: "Mountain", text: "Gabala Mountains & Adventure Hub", color: "text-blue-600" },
                    { icon: "Theater", text: "Sheki Khan's Palace & Silk Road Legacy", color: "text-purple-600" }
                  ];

                  return attractions.map((item, idx) => {
                    const IconComponent = getIcon(item.icon);
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-sm transition-all">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-blue-100 transition-colors">
                          <IconComponent className={cn("w-4 h-4", item.color)} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{item.text}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegionQuickFacts;
