import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Award, MapPin } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [expandedCards, setExpandedCards] = useState({});

const journeyData = [
  {
    city: "Baku",
    days: " 1 to 3",
    icon: "🏙️",
    bg: "bg-blue-500",
    border: "border-l-blue-500"
  },
  {
    city: "Gabala",
    days: " 4 to 6",
    icon: "🏔️",
    bg: "bg-emerald-500",
    border: "border-l-emerald-500"
  },
  {
    city: "Sheki",
    days: " 7 to 10",
    icon: "🏛️",
    bg: "bg-amber-500",
    border: "border-l-amber-500"
  }
];



  const HIGHLIGHTS_SECTIONS = [
    {
      id: "major_activities",
      heading: "MAJOR ACTIVITIES",
      type: "bulleted_list",
      items: [
        "Baku Old City Walking Tour – UNESCO World Heritage Site exploration",
        "Heydar Aliyev Center – Iconic modern architecture tour",
        "Fire Temple (Ateshgah) – Ancient spiritual sanctuary visit",
        "Burning Mountain (Yanardag) – Natural fire phenomenon experience",
        "Gobustan Rock Art & Museum – Prehistoric petroglyphs from Mesolithic age",
        "Mud Volcanoes Tour – Unique natural landscape exploration",
        "Azerbaijan National Carpet Museum – Cultural heritage showcase",
        "Maiden Tower – Historic fortress in Old City",
        "Gabala Mountain Tour – Scenic upland exploration",
        "Sheki Khan's Palace – Ancient royal residence",
        "Kish Church – Historical religious monument"
      ]
    },

  ];
  // Helpers for dynamic icons and colors
  const getIconForCity = (city = "", index) => {
    const cityLower = city.toLowerCase();
    if (cityLower.includes("arrival") || cityLower.includes("transfer")) return "🚗";
    if (cityLower.includes("safari") || cityLower.includes("wildlife")) return "🦁";
    if (cityLower.includes("lake") || cityLower.includes("river") || cityLower.includes("boat") || cityLower.includes("dawki")) return "🚤";
    if (cityLower.includes("trek") || cityLower.includes("bridge") || cityLower.includes("root")) return "🌲";
    if (cityLower.includes("temple") || cityLower.includes("kamakhya")) return "🛕";
    if (cityLower.includes("local") || cityLower.includes("sightseeing") || cityLower.includes("excursion")) return "📸";
    if (cityLower.includes("departure")) return "🛫";
    
    const defaultIcons = ["🏛️", "🎨", "⛰️", "🏙️", "🏞️", "✨"];
    return defaultIcons[index % defaultIcons.length];
  };

  const getColorStyles = (index) => {
    const styles = [
      { bg: "bg-brand-blue", border: "border-l-brand-blue" },
      { bg: "bg-teal-600", border: "border-l-teal-600" },
      { bg: "bg-rose-600", border: "border-l-rose-600" },
      { bg: "bg-blue-600", border: "border-l-blue-600" },
      { bg: "bg-orange-600", border: "border-l-orange-600" },
      { bg: "bg-emerald-600", border: "border-l-emerald-600" }
    ];
    return styles[index % styles.length];
  };

  // Dynamic data mapping
  const cityActivities = packageData?.packageHighlights || [];
  
  // const journeyData = cityActivities.map((item, index) => {
  //   const style = getColorStyles(index);
  //   return {
  //     city: item.city,
  //     days: `DAY ${index + 1}`,
  //     icon: getIconForCity(item.city, index),
  //     bg: style.bg,
  //     border: style.border
  //   };
  // });

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div id="highlights-section" className="bg-white rounded-3xl py-3 md:py-6 px-3 md:px-8 border border-slate-100 shadow-sm scroll-mt-32">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
          Major <span className="text-brand-blue">Highlights</span>
        </h2>
        
        {/* Scroll Hint - Right side of title */}
        <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm">
          <span>←</span>
          <span className="font-medium hidden sm:inline">Swipe to explore all cities</span>
          <span className="font-medium sm:hidden">Swipe</span>
          <span>→</span>
        </div>
      </div>
      
      {/* NEW PREMIUM EXPERIENCE CARDS DISPLAY */}
      <div className="mt-4 space-y-10">
        {HIGHLIGHTS_SECTIONS.map((section) => (
          <div key={section.id}>
            {/* Removed duplicate heading rendering */}
            
            {section.type === "bulleted_list" && (
              <div className="relative group/carousel">
                {/* Scroll Indicators */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
                
                {/* 2-Row Horizontal Scroll Grid */}
                <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-6 -mx-3 md:-mx-6 px-3 md:px-6 touch-pan-x snap-x scrollbar-hide auto-cols-[85vw] md:auto-cols-[calc(33.333%-16px)]">
                  {section.items.map((item, index) => {
                    const parts = item.split("–");
                    const title = parts[0].trim();
                    const desc = parts.slice(1).join("–").trim();
                    const number = (index + 1).toString().padStart(2, '0');
                    
                    const accentColors = [
                      "border-l-brand-blue text-brand-blue",
                      "border-l-teal-500 text-teal-600",
                      "border-l-rose-500 text-rose-600",
                      "border-l-amber-500 text-amber-600",
                    ];
                    const accentClass = accentColors[index % accentColors.length];
                    const bgClass = index % 2 === 0 ? "bg-slate-50" : "bg-white";

                    return (
                      <div 
                        key={index} 
                        className={`snap-start group relative flex flex-col p-4 md:p-5 rounded-2xl border border-slate-100 ${bgClass} hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full min-h-[140px]`}
                      >
                        <div className="absolute -right-4 -top-6 text-[60px] font-black text-slate-100/50 group-hover:text-slate-100 pointer-events-none select-none transition-colors duration-500 font-serif">
                          {number}
                        </div>

                        <div className="flex items-start gap-3 z-10 h-full">
                           {/* Left Accent Bar */}
                          <div className={`w-1 h-12 rounded-full ${accentClass.split(' ')[0]} flex-shrink-0 transition-all duration-300 group-hover:h-full group-hover:bg-opacity-80`}></div>
                          
                          <div className="flex-grow flex flex-col h-full">
                            <div className="flex items-center gap-2 mb-2">
                               <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-white border shadow-sm ${accentClass.split(' ')[1]}`}>
                                 EXPERIENCE {number}
                               </span>
                            </div>

                            <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-1 group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                              {title}
                            </h4>
                            
                            {desc && (
                              <div className="flex items-start gap-1.5 mt-auto pt-1">
                                <MapPin className="w-3 h-3 mt-0.5 text-slate-400 flex-shrink-0 group-hover:text-brand-blue/60 transition-colors" />
                                <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed group-hover:text-slate-600 transition-colors line-clamp-2">
                                  {desc}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


            {section.type === "latex_list" && (
              <div className="bg-gradient-to-br from-brand-blue/5 to-white rounded-3xl p-6 md:p-8 border border-brand-blue/10">
                <div className="flex flex-col gap-4">
                  {section.items.map((item, idx) => {
                    // Parse latex format: \item **Key:** Value
                    const cleanItem = item.replace(/^\\item\s*/, '');
                    const parts = cleanItem.split(":**"); // Split at the bold colon marker if commonly used or just regex
                    
                    // Simple parser for "**Key:** Value"
                    let key = "";
                    let value = cleanItem;
                    if (cleanItem.includes("**")) {
                       const match = cleanItem.match(/\*\*(.*?)\*\*(.*)/);
                       if (match) {
                         key = match[1].replace(":", "").trim(); // Remove colon from key if captured
                         value = match[2].trim();
                       }
                    }

                    return (
                      <div key={idx} className="flex gap-4 items-start p-3 hover:bg-white rounded-xl transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center mt-1">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                        </div>
                        <div className="flex-grow">
                           {key && (
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-1 opacity-80">{key}</h5>
                           )}
                           <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">{value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


    <div className="mt-6 pt-5 border-t border-slate-200">
      {/* Title */}
      <div className="max-w-xs mx-auto bg-brand-blue rounded-full py-2 px-8 mb-3 shadow-md border border-white/10">
        <h3 className="text-white text-[12px] md:text-sm font-black text-center tracking-widest uppercase">
          Journey Overview
        </h3>
      </div>

      {/* Scroll Hint */}
      <div className="flex items-center justify-center gap-2 mb-2 text-slate-500 text-xs">
        <span className="hidden md:inline">←</span>
        <span className="font-medium">Scroll to see all</span>
        <span className="hidden md:inline">→</span>
      </div>

      {/* Flowchart */}
      <div className="relative">
        {/* Fade Indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />

        <div className="overflow-x-auto pb-3 scrollbar-hide">
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
            {journeyData.map((journey, index) => (
              <React.Fragment key={index}>
                {/* City Card */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative group">
                    <div
                      className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 ${journey.bg} rounded-full z-10 opacity-80`}
                    />

                    <div className="w-24 h-36 md:w-28 md:h-36 rounded-[2rem] border-2 border-slate-100 bg-white flex flex-col items-center pt-4 pb-3 shadow-xl shadow-slate-200/40 group-hover:border-brand-blue/30 group-hover:shadow-2xl group-hover:shadow-blue-100/50 transition-all duration-500 ease-out relative overflow-hidden">
                      {/* Glow */}
                      <div
                        className={`absolute -top-12 -right-12 w-24 h-24 ${journey.bg} opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500`}
                      />

                      {/* Icon */}
                      <div
                        className="w-12 h-14 md:w-14 md:h-16 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #f1f5f9"
                        }}
                      >
                        <span className="text-2xl md:text-3xl">
                          {journey.icon}
                        </span>
                      </div>

                      {/* City Name */}
                      <div className="flex-grow flex items-center justify-center px-2 py-1">
                        <span className="text-[10px] md:text-[11px] font-black text-slate-800 uppercase tracking-tight leading-tight text-center line-clamp-2">
                          {journey.city}
                        </span>
                      </div>

                      {/* Days */}
                    {/* Days */}
<div className="mt-auto px-3">
  <span className="flex flex-col items-center justify-center text-[8px] md:text-[9px] text-brand-blue font-bold px-2.5 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10 whitespace-nowrap leading-tight">
    <span>{journey.days}</span>
    <span className="text-[7px] md:text-[8px] uppercase tracking-wide">
      Days
    </span>
  </span>
</div>

                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {index < journeyData.length - 1 && (
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-6 md:w-8 h-0.5 ${journey.bg}`} />
                    <div
                      className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] ${journey.border}`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>


    </div>
  );
};

export default HighlightsSection;


