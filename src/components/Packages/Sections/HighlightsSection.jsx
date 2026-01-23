import React from "react";
import { MapPin, Sparkles } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  // Dynamic journey data based on packageHighlights
  const cityActivities = packageData?.packageHighlights || [];
  
  const journeyData = cityActivities.length > 0 
    ? cityActivities.map((item, index) => {
        const style = getColorStyles(index);
        return {
          city: item.city,
          days: `Day ${index + 1}`,
          icon: getIconForCity(item.city, index),
          bg: style.bg,
          border: style.border
        };
      })
    : [
        {
          city: "Baku",
          days: "1 to 3",
          icon: "🏙️",
          bg: "bg-blue-500",
          border: "border-l-blue-500"
        },
        {
          city: "Gabala",
          days: "4 to 6",
          icon: "🏔️",
          bg: "bg-emerald-500",
          border: "border-l-emerald-500"
        },
        {
          city: "Sheki",
          days: "7 to 10",
          icon: "🏛️",
          bg: "bg-amber-500",
          border: "border-l-amber-500"
        }
      ];

  // Determine highlights sections from packageData.sections or fallback to static
  const HIGHLIGHTS_SECTIONS = packageData?.sections?.filter(s => 
    s.id === "major_activities" || s.id === "package_highlights"
  ) || [
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

  return (
    <div id="highlights-section" className="md:bg-white md:rounded-3xl p-0 md:p-4 md:border md:border-slate-100 md:shadow-sm scroll-mt-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-0">
        <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
          Major <span className="text-brand-blue">Highlights</span>
        </h2>
        
        <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm">
          <span>←</span>
          <span className="font-medium hidden sm:inline">Swipe</span>
          <span>→</span>
        </div>
      </div>
      
      {/* Horizontal Scroll - Compact Cards */}
      {HIGHLIGHTS_SECTIONS.map((section) => (
        <div key={section.id}>
          {section.type === "bulleted_list" && (
            <div className="relative">
              {/* Fade Indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
              
              {/* Scrollable Container */}
              <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 md:mx-0">
                <div className="flex gap-3 px-4 md:px-0">
                  {section.items.map((item, index) => {
                    const parts = item.split("–");
                    const title = parts[0].trim();
                    const desc = parts.slice(1).join("–").trim();
                    const number = (index + 1).toString().padStart(2, '0');
                    
                    const accentColors = [
                      { border: "border-l-brand-blue", text: "text-brand-blue", bg: "bg-brand-blue/5" },
                      { border: "border-l-teal-500", text: "text-teal-600", bg: "bg-teal-50" },
                      { border: "border-l-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
                      { border: "border-l-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
                    ];
                    const accent = accentColors[index % accentColors.length];

                    return (
                      <div 
                        key={index} 
                        className="group relative bg-white border border-slate-200 rounded-xl p-3 hover:shadow-lg hover:border-brand-blue/30 transition-all duration-300 w-[280px] md:w-[320px] flex-shrink-0"
                      >
                        {/* Left Accent */}
                        <div className={`absolute left-0 top-3 bottom-3 w-1 ${accent.border} rounded-r-full`} />

                        {/* Content */}
                        <div className="pl-3">
                          {/* Badge and Number */}
                          <div className="flex items-center justify-between mb-2">
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${accent.bg}`}>
                              <Sparkles className={`w-3 h-3 ${accent.text}`} />
                              <span className={`text-[9px] font-bold uppercase tracking-wide ${accent.text}`}>
                                Experience {number}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-2">
                            {title}
                          </h4>
                          
                          {/* Description */}
                          {desc && (
                            <div className="flex items-start gap-1.5">
                              <MapPin className="w-3 h-3 mt-0.5 text-slate-400 flex-shrink-0" />
                              <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                                {desc}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Journey Overview */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-brand-blue text-white px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
            Journey Overview
          </div>
        </div>

        {/* Journey Cards - Horizontal Scroll */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 justify-center px-4 md:px-0">
            {journeyData.map((journey, index) => (
              <div 
                key={index}
                className="group relative bg-white border-2 border-slate-100 rounded-lg p-2 hover:border-brand-blue/30 hover:shadow-md transition-all duration-300 w-20 md:w-28 flex-shrink-0"
              >
                {/* Top Accent */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 ${journey.bg} rounded-full`} />

                {/* Icon */}
                <div className="text-center mb-1">
                  <div className="w-10 h-10 md:w-14 md:h-14 mx-auto bg-slate-50 rounded-lg flex items-center justify-center text-xl md:text-2xl group-hover:scale-105 transition-transform">
                    {journey.icon}
                  </div>
                </div>

                {/* City Name */}
                <div className="text-center mb-1">
                  <h5 className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-tight line-clamp-2 leading-tight">
                    {journey.city}
                  </h5>
                </div>

                {/* Days Badge */}
                <div className="text-center">
                  <span className="inline-block text-[8px] md:text-[10px] text-brand-blue font-semibold px-1.5 py-0.5 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                    {journey.days}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightsSection;
