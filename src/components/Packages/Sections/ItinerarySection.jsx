import React, { useState } from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";

const ItinerarySection = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState([0]);
  const cities = splitCityStr(packageData?.citiesList);

  const toggleDay = (index) => {
    setExpandedDays(prev => 
      prev.includes(index) 
        ? prev.filter(id => id !== index)
        : [...prev, index]
    );
  };

  const toggleAllDays = () => {
    if (expandedDays.length === packageData?.itineraries?.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(packageData?.itineraries?.map((_, i) => i));
    }
  };

  return (
    <div id="itinerary" className="bg-white rounded-3xl py-6 md:py-6 md:px-6 scroll-mt-48 mb-6 border border-slate-100 shadow-sm">
      {/* Standard Header Block - Above Split Layout */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="flex-1 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full text-[10px] font-bold text-orange-600 border border-orange-100 mb-4 uppercase tracking-widest">
            <span className="text-xs">🗺️</span> Journey Workflow
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Your <span className="text-brand-green">Daily Itinerary</span></h2>
          <p className="text-lg font-medium text-slate-600">
            A carefully curated day-by-day plan for your perfect adventure
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0 lg:flex-shrink-0">
          <button
            onClick={() => window.print()}
            className="group relative px-6 py-3 bg-white text-black font-black text-[11px] uppercase tracking-widest transition-all shadow-md shadow-brand-green/20 hover:shadow-brand-green/20 hover:-translate-y-0.5 active:scale-95 rounded-2xl flex items-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="text-sm">📥</span> 
            <span>Download Itinerary</span>
          </button>

          <button
            onClick={toggleAllDays}
            className="px-6 py-3 bg-white border-2 border-slate-100 hover:border-brand-blue/30 rounded-2xl text-brand-blue font-black text-[11px] uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            {expandedDays.length === packageData?.itineraries?.length ? "Collapse All Days" : "Expand All Days"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Timeline List */}
        <div className="lg:col-span-12 space-y-6">

        <div className="relative">
          {/* Timeline connector line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/20 via-brand-blue/40 to-brand-blue/20 opacity-30" />
          
          {packageData?.itineraries?.map((day, index) => (
            <div
              key={index}
              className="relative pl-16 md:pl-20 pb-8 last:pb-0"
            >
              {/* Timeline Node */}
              <div className="absolute left-0 top-0">
                <div className="relative">
                  {/* Day badge */}
                  <div className="relative w-12 h-12 md:w-16 md:h-16 gradient-btn rounded-2xl flex flex-col items-center justify-center shadow-md border border-white/20">
                    <span className="text-[10px] md:text-xs font-bold text-white/70 uppercase tracking-wider">Day</span>
                    <span className="text-lg md:text-2xl font-black text-white leading-none">{(index + 1).toString().padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
              
              {/* Content Card - Accordion Style */}
              <div className="group relative">
                <div className={`relative bg-white/80 backdrop-blur-xl border rounded-3xl overflow-hidden transition-all duration-500 ${expandedDays.includes(index) ? 'border-brand-green/30' : 'border-slate-200 hover:border-slate-300'}`}>
                  {/* Clickable Card Header */}
                  <button 
                    onClick={() => toggleDay(index)}
                    className="w-full text-left relative p-5 md:p-6 flex items-center justify-between gap-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      {/* Location badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/5 rounded-full text-xs font-medium text-brand-green border border-brand-green/20 mb-2">
                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                        {cities[index % cities.length] || "Destination"}
                      </div>
                      
                      {/* Title */}
                      <h5 className={`text-lg md:text-xl font-bold transition-colors leading-tight truncate ${expandedDays.includes(index) ? 'text-brand-green' : 'text-slate-900'}`}>
                        {day.title}
                      </h5>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${expandedDays.includes(index) ? 'bg-brand-green rotate-180' : 'bg-slate-100'}`}>
                      <svg 
                        className={`w-5 h-5 transition-colors ${expandedDays.includes(index) ? 'text-white' : 'text-slate-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Expandable Content Area */}
                  {expandedDays.includes(index) && (
                    <div className="overflow-hidden">
                      {/* Decorative line */}
                      <div className="mx-6 h-px bg-slate-100" />
                        
                        <div className="px-5 md:px-6 py-5 md:py-6">
                          {/* Description with enhanced formatting */}
                          <div className="space-y-3 mb-6">
                            {day.description?.split("\n").map((line, lineIndex) => {
                              if (!line.trim()) return null;
                              
                              const formatLine = (content) => {
                                const colonIndex = content.indexOf(":");
                                if (colonIndex !== -1) {
                                  const beforeColon = content.substring(0, colonIndex);
                                  const afterColon = content.substring(colonIndex);
                                  return (
                                    <>
                                      <span className="font-semibold text-brand-green">
                                        {beforeColon}
                                      </span>
                                      <span className="text-slate-600">{afterColon}</span>
                                    </>
                                  );
                                }
                                return content;
                              };

                              // Handle bullet points with icons
                              if (line.startsWith("•")) {
                                const content = line.substring(1).trim();
                                return (
                                  <div 
                                    key={lineIndex} 
                                    className="flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group/item"
                                  >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-green/10 flex items-center justify-center transition-all">
                                      <span className="text-brand-green text-xs">✦</span>
                                    </div>
                                    <span className="text-slate-700 text-sm leading-relaxed">{formatLine(content)}</span>
                                  </div>
                                );
                              } else if (line.trim()) {
                                return (
                                  <div key={lineIndex} className="text-slate-600 text-sm leading-relaxed pl-1">
                                    {formatLine(line.trim())}
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>

                          {/* Image Gallery - Premium Masonry Style */}
                          {day.imageRefs && day.imageRefs.length > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center">
                                  <span className="text-xs">📸</span>
                                </div>
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Photo Gallery</span>
                              </div>
                              
                              {day.imageRefs.length === 1 ? (
                                <div className="relative aspect-video rounded-2xl overflow-hidden group/img cursor-pointer">
                                  <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200">
                                    <Image
                                      src={day.imageRefs[0].url}
                                      alt={day.imageRefs[0].title || `Day ${index + 1} Image`}
                                      fill
                                      className="object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    {day.imageRefs[0].title && (
                                      <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <p className="text-white font-semibold text-lg">{day.imageRefs[0].title}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className={`grid gap-2 ${day.imageRefs.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                                  {day.imageRefs.slice(0, 6).map((image, imgIndex) => (
                                    <div
                                      key={imgIndex}
                                      className={`relative rounded-xl overflow-hidden group/img cursor-pointer ${imgIndex === 0 && day.imageRefs.length > 3 ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'}`}
                                    >
                                      <div className="relative h-full rounded-xl overflow-hidden border border-slate-200">
                                        <Image
                                          src={image.url}
                                          alt={image.title || `Image ${imgIndex + 1}`}
                                          fill
                                          className="object-cover transform group-hover/img:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 flex items-end p-3">
                                          <div>
                                            <p className="text-white text-xs font-medium line-clamp-2">
                                              {image.title || "Experience"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Footer decoration */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Journey End Marker */}
          <div className="relative pl-16 md:pl-20 pt-4">
            <div className="absolute left-0 top-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
                <span className="text-2xl">🏁</span>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-emerald-700 font-medium">End of Journey</p>
              <p className="text-slate-500 text-sm">Your adventure awaits!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ItinerarySection;
