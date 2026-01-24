import React, { useState, useEffect } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";
import { ChevronDown, ChevronUp, Clock, MapPin, Users, Plane, Star, Languages, Calendar, CheckCircle2 } from "lucide-react";

const OverviewSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cities = splitCityStr(packageData?.citiesList) || [];
  
  const highlights = Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
    ? packageData.highlights 
    : [];

  if (!isMounted) return null;

  const highlightsItems = packageData?.sections?.find(s => s.id === "package_highlights")?.items || [];

  const limit = isMobile ? 4 : 6;
  const visibleHighlights = isHighlightsExpanded ? highlightsItems : highlightsItems.slice(0, limit);

  return (
    <div className="space-y-4">

      {/* 2. Quick Facts & About Section */}
      <div className="md:bg-white md:rounded-3xl p-0 md:p-[15px] md:border md:border-slate-100 md:shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-5 md:top-6 w-1 h-10 bg-brand-blue rounded-r-full" />
        <h2 className="text-lg md:text-2xl font-black text-slate-900 mb-[15px] tracking-tight pl-3">
          Package <span className="text-brand-blue">Highlights</span>
        </h2>
        
        {/* Quick Facts Grid - Vertical on Mobile, Grid on Desktop */}
        <div className="mb-6 pb-[15px] border-b border-slate-100">
          <div className="md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-4 md:px-0 md:gap-6">
              {visibleHighlights.map((item, idx) => {
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
                  <div key={idx} className="flex gap-4 group w-full flex-shrink-0">
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

          {/* View All Button for Highlights */}
          {highlightsItems.length > limit && (
            <button
              onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
              className="mt-6 flex items-center gap-1 text-brand-blue text-[10px] font-black uppercase tracking-widest"
            >
              {isHighlightsExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>View All ({highlightsItems.length - limit} More)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Full Description with Read More */}
        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
          <div className="relative">
            {(() => {
              // 1. Prepare Description Content
              const overviewSection = packageData?.sections?.find(s => s.id === "package_overview");
              const paragraphs = overviewSection?.content || 
                (packageData?.description || "").split(/\n\s*\n|\n/).filter(Boolean);

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
