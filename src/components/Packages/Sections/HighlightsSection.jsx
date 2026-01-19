import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [expandedCards, setExpandedCards] = useState({});

  // Dummy data with 8 cities to enable horizontal scrolling
  const cityActivities = [
    {
      city: "ROME",
      activities: [
        "Colosseum & Roman Forum",
        "Vatican City & Museums",
        "Trastevere Nights",
        "Trevi Fountain Visit",
        "Spanish Steps",
        "Pantheon Tour"
      ]
    },
    {
      city: "FLORENCE",
      activities: [
        "Duomo & Baptistery",
        "Uffizi Gallery",
        "Tuscan Day Trip",
        "Ponte Vecchio Walk",
        "Boboli Gardens"
      ]
    },
    {
      city: "PISA",
      activities: [
        "Leaning Tower",
        "Piazza dei Miracoli",
        "Ponte Vecio"
      ]
    },
    {
      city: "VENICE",
      activities: [
        "Grand Canal Gondola",
        "St. Mark's Square",
        "Doge's Palace",
        "Rialto Bridge",
        "Murano Island Visit"
      ]
    },
    {
      city: "MILAN",
      activities: [
        "Duomo di Milano",
        "The Last Supper",
        "Galleria Vittorio Emanuele II",
        "Sforza Castle",
        "Navigli District"
      ]
    },
    {
      city: "NAPLES",
      activities: [
        "Pompeii Ruins",
        "Mount Vesuvius",
        "Naples Historic Center",
        "Pizza Making Class"
      ]
    },
    {
      city: "CINQUE TERRE",
      activities: [
        "Monterosso Beach",
        "Vernazza Harbor",
        "Hiking Trails",
        "Local Wine Tasting"
      ]
    },
    {
      city: "AMALFI COAST",
      activities: [
        "Positano Village",
        "Amalfi Cathedral",
        "Ravello Gardens",
        "Coastal Boat Tour",
        "Limoncello Tasting"
      ]
    }
  ];

  // Journey data for flowchart
  const journeyData = [
    { city: "ROME", days: "DAY 1-3", icon: "🏛️", color: "teal-600" },
    { city: "FLORENCE", days: "DAY 4-5", icon: "🎨", color: "slate-400" },
    { city: "PISA", days: "DAY 6", icon: "🗼", color: "rose-600" },
    { city: "VENICE", days: "DAY 7-9", icon: "🚤", color: "slate-400" },
    { city: "MILAN", days: "DAY 10-11", icon: "🏙️", color: "blue-600" },
    { city: "NAPLES", days: "DAY 12-13", icon: "🍕", color: "orange-600" }
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
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-10"></div>
        
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
                className="flex-shrink-0 w-[280px] sm:w-[280px] md:w-[300px] lg:w-[280px] bg-slate-50 rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all"
              >
                {/* City Header */}
                <div className="mb-3 pb-2 border-b border-slate-200">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
                    {cityData.city}
                  </h3>
                </div>
                
                {/* Activities List */}
                <div className="space-y-2">
                  {displayedActivities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 border-slate-400 mt-0.5" />
                      <p className="text-slate-600 text-xs font-medium leading-snug">
                        {activity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Read More/Less Button */}
                {hasMore && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-3 flex items-center gap-1 text-brand-blue hover:text-blue-700 text-xs font-semibold transition-colors"
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
        <div className="max-w-md mx-auto bg-brand-blue rounded-xl py-1.5 px-6 mb-3">
          <h3 className="text-white text-sm md:text-lg font-black text-center tracking-wide uppercase">
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
                {/* City Circle */}
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-3 border-${journey.color} bg-white flex flex-col items-center justify-center shadow-md`}>
                    <span className="text-lg md:text-xl">{journey.icon}</span>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-900">{journey.city}</span>
                    <span className="text-[7px] md:text-[8px] text-slate-500 font-medium">{journey.days}</span>
                  </div>
                </div>

                {/* Arrow - Only if not the last item */}
                {index < journeyData.length - 1 && (
                  <div className="flex items-center">
                    <div className={`w-6 md:w-8 h-0.5 bg-${journey.color}`}></div>
                    <div className={`w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-${journey.color}`}></div>
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


