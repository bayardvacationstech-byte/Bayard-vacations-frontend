import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [expandedCards, setExpandedCards] = useState({});

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
  
  const journeyData = cityActivities.map((item, index) => {
    const style = getColorStyles(index);
    return {
      city: item.city,
      days: `DAY ${index + 1}`,
      icon: getIconForCity(item.city, index),
      bg: style.bg,
      border: style.border
    };
  });

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
      
      {/* Horizontal Scrollable Cards */}
      <div className="relative">
        {/* Right Fade Indicator - More prominent to show scrollability */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-10 hidden md:block"></div>
        
        <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-2 scrollbar-hide">
        <div className="flex gap-4">
          {cityActivities.map((cityData, index) => {
            const isExpanded = expandedCards[index];
            const hasMore = cityData.activities.length > 3;
            const displayedActivities = isExpanded 
              ? cityData.activities 
              : cityData.activities.slice(0, 3);

            return (
              <div 
                key={index} 
                className="flex-shrink-0 w-[230px] sm:w-[230px] md:w-[300px] lg:w-[280px] bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all flex flex-col min-h-[200px]"
              >
                {/* City Header */}
                <div className="mb-3 pb-2 border-b border-slate-200 h-14 flex items-center">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight line-clamp-2">
                    {cityData.city}
                  </h3>
                </div>
                
                {/* Activities List - Grows to fill space */}
                <div className="space-y-2 flex-grow">
                  {displayedActivities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-start gap-3 group/item">
                      <CheckCircle2 className="flex-shrink-0 w-3.5 h-3.5 mt-0.5 text-brand-blue group-hover/item:text-brand-blue transition-colors duration-300" />
                      <p className="text-slate-600 text-[11px] font-medium leading-snug group-hover/item:text-slate-900 transition-colors duration-300">
                        {activity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Read More/Less Button - Anchored to bottom */}
                {hasMore && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-auto pt-3 flex items-center gap-1 text-brand-blue hover:text-blue-700 text-xs font-semibold transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <span>Show Less</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200">
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

        {/* Flowchart - Horizontal Scrollable with Fade Indicators */}
        <div className="relative">
          {/* Left Fade Indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block"></div>
          
          {/* Right Fade Indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block"></div>
          
          <div className="overflow-x-auto pb-3 scrollbar-hide">
            <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
            {journeyData.map((journey, index) => (
              <React.Fragment key={index}>
                {/* City Card Node */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="relative group">
                    <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 ${journey.bg} rounded-full z-10 opacity-80`} />
                    <div className="w-24 h-36 md:w-28 md:h-36 rounded-[2rem] border-2 border-slate-100 bg-white flex flex-col items-center pt-4 pb-3 shadow-xl shadow-slate-200/40 group-hover:border-brand-blue/30 group-hover:shadow-2xl group-hover:shadow-blue-100/50 transition-all duration-500 ease-out relative overflow-hidden">
                      {/* Decorative Background Glow */}
                      <div className={`absolute -top-12 -right-12 w-24 h-24 ${journey.bg} opacity-0 group-hover:opacity-5 rounded-full blur-2xl transition-opacity duration-500`} />
                      
                      {/* Hexagon Icon Container */}
                      <div 
                        className="w-12 h-14 md:w-14 md:h-16 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500"
                        style={{
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #f1f5f9"
                        }}
                      >
                        <span className="text-2xl md:text-3xl filter drop-shadow-sm">{journey.icon}</span>
                      </div>

                      <div className="flex-grow flex items-center justify-center px-2 py-1">
                        <span 
                          className="text-[10px] md:text-[11px] font-black text-slate-800 uppercase tracking-tight leading-tight text-center line-clamp-2 px-1"
                          title={journey.city}
                        >
                          {journey.city}
                        </span>
                      </div>
                      
                      <div className="mt-auto px-3">
                        <span className="text-[8px] md:text-[9px] text-brand-blue font-bold px-2.5 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10 shrink-0 whitespace-nowrap">
                          {journey.days}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow - Only if not the last item */}
                {index < journeyData.length - 1 && (
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-6 md:w-8 h-0.5 ${journey.bg}`}></div>
                    <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] ${journey.border}`}></div>
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


