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
          Package <span className="text-brand-blue">Overview</span>
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
            <p className={`text-slate-600 text-base leading-relaxed font-medium ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {packageData?.description || 
                `Embark on an unforgettable ${packageData?.nights || 'multi'}-night journey through ${cities[0] || 'amazing destinations'}. This carefully curated package offers the perfect blend of adventure, relaxation, and cultural immersion. From the moment you arrive until your final departure, we ensure every detail is handled with the utmost care, allowing you to focus entirely on creating memories that will last a lifetime.`}
            </p>
            {!packageData?.description && isExpanded && (
              <p className="text-slate-600 text-base leading-relaxed font-medium mt-3">
                Explore iconic landmarks, savor authentic local cuisine, and retreat to hand-picked luxury accommodations. Whether you're seeking high-adrenaline activities or tranquil moments of reflection, our itinerary is designed to exceed your expectations.
              </p>
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
