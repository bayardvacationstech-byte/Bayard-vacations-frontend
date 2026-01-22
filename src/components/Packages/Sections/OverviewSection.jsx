import React, { useState } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

const OverviewSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cities = splitCityStr(packageData?.citiesList) || ["Main Destination"];
  
  // High-quality dummy highlights
  const dummyHighlights = [
    "Experience the rich culture and stunning landscapes with our expert local guides.",
    "Unwind in hand-picked premium accommodations featuring world-class amenities.",
    "Discover hidden gems and iconic landmarks with a perfectly balanced itinerary.",
    "Enjoy hassle-free travel with private transfers and personalized support 24/7.",
    "Authentic local dining experiences included to savor the true flavors of the region."
  ];

  const highlights = Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
    ? packageData.highlights 
    : dummyHighlights;

  return (
    <div className="space-y-4">

      {/* 2. Quick Facts & About Section */}
      <div className="bg-white rounded-3xl py-2 md:py-4 px-3 md:px-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-5 md:top-6 w-1 h-10 bg-brand-blue rounded-r-full" />
        <h2 className="text-lg md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
          Package <span className="text-brand-blue">Highlights</span>
        </h2>
        
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 md:gap-x-12 mb-2 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Activity Location:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.region || "Exotic Destination"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Starting Day:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.startingDay || "Flexible"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Duration:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.nights || 4}N / {(packageData?.nights || 4) + 1}D</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Hotel Category:</span>
            <span className="text-brand-blue font-black text-sm text-right px-3 py-1 bg-brand-blue/5 rounded-lg border border-brand-blue/10">
              {packageData?.hotelCategory ? (
                packageData.hotelCategory.toLowerCase() === "threestar" ? "3-Star" :
                packageData.hotelCategory.toLowerCase() === "fourstar" ? "4-Star" :
                packageData.hotelCategory.toLowerCase() === "fivestar" ? "5-Star" :
                packageData.hotelCategory
              ) : "Premium Stay"}
            </span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Distance Covered:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.distanceCovered || "As per Itinerary"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Meals:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.mealsDetails || "Personalized Selection"}</span>
          </div>
        </div>

        {/* Full Description with Read More */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
          <div className="relative">
            {/* Paragraph 1 - Always visible (truncated if collapsed) */}
            <p className={`text-slate-600 text-base leading-relaxed font-medium ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {packageData?.description || "Azerbaijan is a captivating destination where East meets West, blending ancient Silk Road heritage with cutting-edge modernity."}
            </p>

            {/* Additional Paragraphs - Only visible when expanded.
                Using static content from user request if no dynamic description is present. 
            */}
            {(!packageData?.description && isExpanded) && (
              <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Known as the "Land of Fire," Azerbaijan showcases diverse landscapes from medieval mountain towns to cosmopolitan Baku.
                </p>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  This 5-night journey captures the essence of this enchanting nation—explore UNESCO-listed Old City bazaars, witness natural fire phenomena on mountainsides, uncover prehistoric rock carvings, and immerse yourself in centuries-old traditions.
                </p>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Whether admiring the Flame Towers or wandering Sheki's historic bazaars, every moment reveals the soul of the Caucasus.
                </p>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  This carefully curated package ensures you experience Azerbaijan's most memorable attractions while enjoying comfortable accommodations and expert local guidance.
                </p>
              </div>
            )}
            
            {/* Read More/Less Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-brand-blue hover:text-blue-700 text-sm font-semibold transition-colors"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
