import React, { useState, useEffect } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      <div className="md:bg-white md:rounded-[2rem] p-0 md:p-8 md:border md:border-slate-100 md:shadow-sm relative overflow-hidden scroll-mt-32">
        <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
        
        {/* Standard Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">
            Package <span className="text-brand-blue">Highlights</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-xl font-medium">Quick facts and details about your journey</p>
        </div>
        
        {/* Quick Facts Grid - Vertical on Mobile, Grid on Desktop */}
        <div className="mb-6 pb-[15px] border-b border-slate-100">
          <div className="md:mx-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 md:px-0 md:gap-y-6">
              {visibleHighlights.map((item, idx) => {
                // Comprehensive cleaning: remove \item, markdown stars, extra quotes, and trailing commas
                const cleanedItem = item
                  .replace(/^\\item\s*/, "") // Remove \item at the beginning
                  .replace(/\\/g, "") // Remove all backslashes
                  .replace(/^["'\s]+|["'\s]+,?$/g, "") // Remove leading/trailing quotes and trailing commas
                  .replace(/\*+/g, "") // Remove markdown stars
                  .trim();
                
                const match = cleanedItem.match(/^(.*?):\s*(.*)/);
                
                let label = "";
                let value = cleanedItem;
                
                if (match) {
                  label = match[1].trim();
                  value = match[2].trim();
                }

                // Unified Bullet Style (matches Major Highlights)
                return (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 transition-colors"></div>
                    </div>
                    <div className="min-w-0 flex-1 text-sm md:text-base leading-relaxed font-bold text-slate-900">
                      {label ? (
                        <>
                          <span className="transition-colors font-bold">
                            {label}:
                          </span>
                          <span className="ml-1">
                            {value}
                          </span>
                        </>
                      ) : (
                        <span className="transition-colors">
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* View All Button for Highlights */}
          {highlightsItems.length > limit && (
            <div className="pt-1 border-t border-slate-50 w-full">
              <button
                onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-xs uppercase tracking-widest w-full"
              >
                {isHighlightsExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>View All ({highlightsItems.length - limit} More)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Full Description with Read More */}
        <div className="space-y-3">
          <h3 className="text-base md:text-lg font-black text-slate-900">About {packageData?.packageTitle || "the Package"}:</h3>
          <div className="relative">
            {(() => {
              // 1. Prepare Description Content
              const overviewSection = packageData?.sections?.find(s => s.id === "package_overview");
              const paragraphs = overviewSection?.content || 
                (packageData?.description || "").split(/\n\s*\n|\n/).filter(Boolean);

              // 2. Render Based on State
              if (!isExpanded) {
                // Collapsed: Show condensed text with line clamp
                const cleanCollapseText = paragraphs.map(p => p.replace(/^["'\s]+|["'\s]+,?$/g, "").trim()).join(" ");
                return (
                   <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium line-clamp-3">
                    {cleanCollapseText}
                  </p>
                );
              } else {
                // Expanded: Show full paragraphs with proper spacing
                return (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                    {paragraphs.map((para, idx) => {
                      const cleanPara = para.replace(/^["'\s]+|["'\s]+,?$/g, "").trim();
                      return (
                        <p key={idx} className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                          {cleanPara}
                        </p>
                      );
                    })}
                  </div>
                );
              }
            })()}

            {/* Read More/Less Button */}
            <div className="pt-1 border-t border-slate-50 w-full mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex justify-end items-center gap-1 text-brand-blue font-bold text-xs uppercase tracking-widest w-full"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Read More</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
