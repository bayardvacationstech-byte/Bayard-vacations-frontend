import React, { useState, useEffect } from "react";
import { MapPin, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

const HighlightsSection = ({ packageData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  if (!isMounted) return null;
  
  // Determine highlights sections from packageData.sections
  const highlightItems = packageData?.sections?.find(s => 
    s.id === "major_activities" || s.id === "package_highlights"
  )?.items || [];


  const limit = isMobile ? 3 : 6;
  const visibleItems = isExpanded ? highlightItems : highlightItems.slice(0, limit);

  return (
    <div id="highlights-section" className="md:bg-white md:rounded-3xl p-0 md:p-6 md:border md:border-slate-100 md:shadow-sm scroll-mt-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Major <span className="text-brand-blue">Highlights</span>
        </h2>
      </div>
      
      {/* Simple List of Highlights - No Boxes */}
      <div className="space-y-4 px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 md:gap-y-6">
          {visibleItems.map((item, index) => {
            const parts = item.split("–");
            const title = parts[0].trim();
            const desc = parts.slice(1).join("–").trim();
            
            return (
              <div 
                key={index} 
                className="flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-brand-blue transition-colors"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-base md:text-lg leading-tight group-hover:text-brand-blue transition-colors">
                    {title}
                  </h4>
                  {desc && (
                    <p className="text-slate-500 text-sm md:text-base mt-1 leading-relaxed">
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Read More / Show Less Button */}
        {highlightItems.length > limit && (
          <div className="pt-1 border-t border-slate-50">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex justify-end items-center gap-1 text-orange-500 font-bold text-xs uppercase tracking-widest w-full"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Collapse Highlights</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>View All ({highlightItems.length - limit} More)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightsSection;
