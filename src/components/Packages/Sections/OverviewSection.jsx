import React from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";

const OverviewSection = ({ packageData }) => {
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
    <div className="space-y-4 md:space-y-6 mb-4">


      {/* 2. Quick Facts & About Section */}
      <div className="bg-white rounded-3xl py-6 md:py-8 px-5 md:px-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-6 md:top-8 w-1 h-12 bg-brand-blue rounded-r-full" />
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">
          Package <span className="text-brand-blue">Overview</span>
        </h2>
        
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-5 gap-x-8 md:gap-x-16 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-slate-100">
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Activity Location:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.region || "Exotic Destination"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Starting Day:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.startingDay || "Friday"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Duration:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">{packageData?.nights || 4}N / {(packageData?.nights || 4) + 1}D</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Hotel Category:</span>
            <span className="text-brand-blue font-black text-sm text-right px-3 py-1 bg-brand-blue/5 rounded-lg border border-brand-blue/10">{packageData?.hotelCategory || "4-Star Premium"}</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Distance Covered:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">~450 Km</span>
          </div>
          <div className="flex items-center justify-between group">
            <span className="text-slate-500 font-bold text-sm group-hover:text-brand-blue transition-colors">Meals:</span>
            <span className="text-slate-900 font-black text-sm text-right px-3 py-1 bg-slate-50 rounded-lg">All Meals Included</span>
          </div>
        </div>

        {/* Full Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            {packageData?.description || 
              `Embark on an unforgettable ${packageData?.nights || 'multi'}-night journey through ${cities[0] || 'amazing destinations'}. This carefully curated package offers the perfect blend of adventure, relaxation, and cultural immersion. From the moment you arrive until your final departure, we ensure every detail is handled with the utmost care, allowing you to focus entirely on creating memories that will last a lifetime.`}
          </p>
          {!packageData?.description && (
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              Explore iconic landmarks, savor authentic local cuisine, and retreat to hand-picked luxury accommodations. Whether you're seeking high-adrenaline activities or tranquil moments of reflection, our itinerary is designed to exceed your expectations.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
