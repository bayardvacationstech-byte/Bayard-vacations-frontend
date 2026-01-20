import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [expandedCards, setExpandedCards] = useState({});

  // Static data for city highlights
  const cityActivities = [
    {
      city: "HANOI ARRIVAL - CITY TOUR WITH LOCAL LUNCH (SIC)",
      activities: [
        "Temple of Literature: Visit Vietnam's first university, a historic Confucian temple",
        "Ho Chi Minh Mausoleum: Explore the iconic monument and surrounding complex",
        "Old Quarter Walking Tour: Wander through the bustling streets and traditional shops",
        "Hoan Kiem Lake: Relax by the scenic lake and visit Ngoc Son Temple",
        "Water Puppet Show: Experience traditional Vietnamese water puppetry"
      ]
    },
    {
      city: "HANOI",
      activities: [
        "Hoa Lu Ancient Capital: Explore the historic temples of the Dinh and Le dynasties",
        "Tam Coc Boat Ride: Cruise through stunning limestone karsts and rice paddies",
        "Mua Cave Viewpoint: Climb 500 steps for panoramic views of Ninh Binh",
        "Bich Dong Pagoda: Visit the beautiful three-level pagoda carved into limestone",
        "Cycling Tour: Ride through scenic countryside and local villages"
      ]
    },
    {
      city: "HALF DAY FANSIPAN TOUR + LUNCH",
      activities: [
        "Fansipan Cable Car Ride: Experience the world's longest cable car journey",
        "Summit Exploration: Reach the 'Roof of Indochina' at 3,143 meters",
        "Mountain Pagoda Complex: Visit beautiful spiritual sites at the summit",
        "Panoramic Mountain Views: Enjoy breathtaking views of the Hoang Lien Son range",
        "Photography Opportunities: Capture stunning landscapes and cloud-covered peaks"
      ]
    },
    {
      city: "DANANG",
      activities: [
        "Marble Mountains: Explore sacred caves, pagodas, and marble stone villages",
        "My Khe Beach: Relax on one of the world's most beautiful beaches",
        "Dragon Bridge: Watch the spectacular fire and water show",
        "Han River Cruise: Enjoy a scenic evening cruise with city views",
        "Linh Ung Pagoda: Visit the iconic Lady Buddha statue overlooking the sea"
      ]
    }
  ];

  // Static data for journey overview
  const journeyData = [
    {
      city: "HANOI ARRIVAL - CITY TOUR WITH LOCAL LUNCH (SIC)",
      days: "DAY 1",
      icon: "🏛️",
      bg: "bg-brand-blue",
      border: "border-l-brand-blue"
    },
    {
      city: "HANOI",
      days: "DAY 2-4",
      icon: "🎨",
      bg: "bg-teal-600",
      border: "border-l-teal-600"
    },
    {
      city: "HALF DAY FANSIPAN TOUR + LUNCH",
      days: "DAY 5",
      icon: "🗼",
      bg: "bg-rose-600",
      border: "border-l-rose-600"
    },
    {
      city: "DANANG",
      days: "DAY 6",
      icon: "🚤",
      bg: "bg-blue-600",
      border: "border-l-blue-600"
    },
    {
      city: "BA NA HILLS + GOLDEN BRIDGE + LUNCH",
      days: "DAY 7",
      icon: "🏙️",
      bg: "bg-orange-600",
      border: "border-l-orange-600"
    },
    {
      city: "DEPARTURE",
      days: "DAY 8",
      icon: "🏞️",
      bg: "bg-emerald-600",
      border: "border-l-emerald-600"
    }
  ];

  const toggleExpand = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-white rounded-3xl py-3 md:py-6 px-3 md:px-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
          Package <span className="text-brand-blue">Highlights</span>
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
                <div className="mb-3 pb-2 border-b border-slate-200">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                    {cityData.city}
                  </h3>
                </div>
                
                {/* Activities List - Grows to fill space */}
                <div className="space-y-2 flex-grow">
                  {displayedActivities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 border-slate-400 mt-0.5" />
                      <p className="text-slate-600 text-xs font-medium leading-snug">
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
                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 ${journey.bg} rounded-full z-10`} />
                    <div className="w-20 h-24 md:w-24 md:h-28 rounded-2xl border-2 border-slate-100 bg-white flex flex-col items-center justify-center shadow-lg shadow-slate-200/50 group-hover:border-brand-blue/30 transition-all duration-300">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <span className="text-xl md:text-2xl">{journey.icon}</span>
                      </div>
                      <span className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-tighter">{journey.city}</span>
                      <span className="text-[8px] md:text-[9px] text-brand-blue font-bold mt-1 px-2 py-0.5 bg-brand-blue/5 rounded-full">{journey.days}</span>
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


