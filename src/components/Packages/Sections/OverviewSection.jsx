import React, { useState } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";
import { ChevronDown, ChevronUp, Clock, MapPin, Users, Plane, Star, Languages, Calendar, CheckCircle2 } from "lucide-react";

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
      <div className="md:bg-white md:rounded-3xl p-0 md:p-[15px] md:border md:border-slate-100 md:shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-5 md:top-6 w-1 h-10 bg-brand-blue rounded-r-full" />
        <h2 className="text-lg md:text-2xl font-black text-slate-900 mb-[15px] tracking-tight pl-3">
          Package <span className="text-brand-blue">Highlights</span>
        </h2>
        
        {/* Quick Facts Grid - 2 Rows Horizontal Scroll on Mobile */}
        <div className="mb-6 pb-[15px] border-b border-slate-100">
          <div className="overflow-x-auto scrollbar-hide -mx-4 md:mx-0">
            <div className="grid grid-rows-2 grid-flow-col gap-x-4 gap-y-6 px-4 md:px-0 md:grid-rows-none md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {(packageData?.sections?.find(s => s.id === "package_highlights")?.items || [
                "\\item *Duration:* 5 Nights / 6 Days all-inclusive experience",
                "\\item *Destinations Covered:* Baku • Gabala • Gobustan • Absheron Peninsula • Sheki",
                "\\item *Perfect For:* First-time visitors and culture enthusiasts",
                "\\item *Travel Style:* Guided private tours with comfortable transportation",
                "\\item *Highlights:* Blend of ancient heritage, modern architecture, and natural wonders",
                "\\item *Language:* English-speaking professional guides throughout",
                "\\item *Best Time to Visit:* April-May and September-October"
              ]).map((item, idx) => {
                // Robust Parsing
                const cleanItem = item.replace(/^\\item\s*/, '');
                // Matches *Key:* Value or **Key:** Value or Key: Value
                const match = cleanItem.match(/^(\*{1,2})?(.*?)(\*{1,2})?:\s*(.*)/);
                
                let label = "";
                let value = cleanItem;
                
                if (match) {
                  // match[2] is the label (key)
                  // match[4] is the value
                  label = match[2].trim().replace(/\*/g, ''); // Ensure no residual stars
                  value = match[4].trim();
                }

                // Icon Mapping
                const getIcon = (label) => {
                  const l = label.toLowerCase();
                  if (l.includes("duration")) return <Clock className="w-5 h-5 text-brand-blue" />;
                  if (l.includes("destination")) return <MapPin className="w-5 h-5 text-emerald-500" />;
                  if (l.includes("perfect") || l.includes("group") || l.includes("for:")) return <Users className="w-5 h-5 text-orange-500" />;
                  if (l.includes("style") || l.includes("transfer")) return <Plane className="w-5 h-5 text-blue-500" />;
                  if (l.includes("highlight")) return <Star className="w-5 h-5 text-amber-400" />;
                  if (l.includes("language")) return <Languages className="w-5 h-5 text-purple-500" />;
                  if (l.includes("time") || l.includes("when")) return <Calendar className="w-5 h-5 text-rose-500" />;
                  return <CheckCircle2 className="w-5 h-5 text-slate-400" />;
                };

                return (
                  <div key={idx} className="flex gap-4 group w-[280px] md:w-auto flex-shrink-0">
                    <div className="flex-shrink-0 mt-0.5 p-1.5 bg-slate-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-100">
                      {getIcon(label)}
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
                      <span className="block text-sm md:text-base font-medium text-slate-700 leading-snug">{value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full Description with Read More */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
          <div className="relative">
            {(() => {
              // 1. Prepare Description Content
              const overviewSection = packageData?.sections?.find(s => s.id === "package_overview");
              const paragraphs = overviewSection?.content || 
                (packageData?.description || `Azerbaijan is a captivating destination where East meets West, blending ancient Silk Road heritage with cutting-edge modernity.
Known as the "Land of Fire," Azerbaijan showcases diverse landscapes from medieval mountain towns to cosmopolitan Baku.
This 5-night journey captures the essence of this enchanting nation—explore UNESCO-listed Old City bazaars, witness natural fire phenomena on mountainsides, uncover prehistoric rock carvings, and immerse yourself in centuries-old traditions.
Whether admiring the Flame Towers or wandering Sheki's historic bazaars, every moment reveals the soul of the Caucasus.
This carefully curated package ensures you experience Azerbaijan's most memorable attractions while enjoying comfortable accommodations and expert local guidance.`).split(/\n\s*\n|\n/).filter(Boolean);

              // 2. Render Based on State
              if (!isExpanded) {
                // Collapsed: Show condensed text with line clamp
                return (
                   <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-3">
                    {paragraphs.join(" ")}
                  </p>
                );
              } else {
                // Expanded: Show full paragraphs with proper spacing
                return (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                    {paragraphs.map((para, idx) => (
                       <p key={idx} className="text-slate-600 text-sm leading-relaxed font-medium">
                        {para}
                      </p>
                    ))}
                  </div>
                );
              }
            })()}

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
