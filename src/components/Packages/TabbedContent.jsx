"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PackageIncludeIcon from "@/components/PackageIncludeIcon";
import { splitCityStr } from "@/lib/utils";
import ItineraryMap from "./ItineraryMap";

const TabbedContent = ({ packageData }) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedDays, setExpandedDays] = useState([0]);

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

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "stay", label: "Stay" },
    { id: "inclusions", label: "Inclusions" },
  ];

  const cities = splitCityStr(packageData?.citiesList);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Overview Section Component
  const OverviewSection = () => (
    <div className="space-y-8">
            {/* Standard Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full text-[10px] font-bold text-brand-green border border-brand-green/20 mb-4 uppercase tracking-widest">
                <span className="text-xs">✨</span> Premium Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Package <span className="text-brand-green">Overview</span>
              </h2>
              <p className="text-xl text-slate-600">Discover the heart of your journey</p>
            </div>

            {/* Premium Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(100px,auto)]">
              
              {/* Hero Card - Duration & Overview */}
              <div className="col-span-12 md:col-span-8 row-span-2 relative group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10 blur-3xl transition-all duration-700" />
                <div className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-full text-xs font-semibold text-brand-green uppercase tracking-wider mb-4 border border-brand-green/20">
                        <span className="w-2 h-2 bg-brand-green rounded-full" />
                        Premium Package
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        {packageData?.nights || "4"}N / {(packageData?.nights || 4) + 1}D
                        <span className="block text-lg md:text-xl font-normal text-slate-500 mt-2">
                          Adventure Awaits
                        </span>
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
                      {packageData?.description || 
                        `Embark on an unforgettable ${packageData?.nights || 'multi'}-night journey through ${cities[0] || 'amazing destinations'}. This carefully curated package offers the perfect blend of adventure, relaxation, and cultural immersion.`}
                    </p>
                    
                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-blue-100 flex items-center justify-center shadow-sm">
                          <span className="text-xl">🌆</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{cities.length}</div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider">Cities</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 flex items-center justify-center shadow-sm">
                          <span className="text-xl">⭐</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{packageData?.hotelCategory || "Premium"}</div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider">Hotels</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center shadow-sm">
                          <span className="text-xl">🍽️</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">Included</div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider">Meals</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Cards */}
              <div className="col-span-6 md:col-span-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl blur-2xl opacity-60" />
                <div className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 flex flex-col justify-center overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 text-8xl opacity-10">🗓️</div>
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                      {packageData?.nights || "4"}
                    </div>
                    <div className="text-slate-700 font-medium mt-1">Nights of Magic</div>
                    <div className="text-xs text-cyan-600/70 mt-2">+ {(packageData?.nights || 4) + 1} Days of Adventure</div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-6 md:col-span-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-3xl blur-2xl opacity-60" />
                <div className="relative h-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 flex flex-col justify-center overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">✨</div>
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">
                      {packageData?.itineraries?.length || "5"}+
                    </div>
                    <div className="text-slate-700 font-medium mt-1">Experiences</div>
                    <div className="text-xs text-violet-500/70 mt-2">Curated Just For You</div>
                  </div>
                </div>
              </div>

              {/* Destinations Section */}
              <div className="col-span-12 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 overflow-hidden">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent rounded-full" />
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                        <span className="text-lg">🌏</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Your Journey Destinations</h4>
                        <p className="text-xs text-slate-500">{cities.length} amazing locations to explore</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {cities.map((city, index) => (
                      <div
                        key={index}
                        className="group/city relative"
                      >
                        <div className="relative flex items-center gap-3 px-5 py-3 bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-green/30 rounded-2xl transition-all duration-300 cursor-pointer">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 transition-all">
                            <span className="text-sm">📍</span>
                          </div>
                          <div>
                            <span className="text-slate-900 font-semibold group-hover/city:text-brand-green transition-colors">
                              {city}
                            </span>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                              Day {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Journey Line */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>🛫</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20" />
                      <span>Your Journey</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20" />
                      <span>🛬</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Preview Images */}
              {packageData?.bannerImages?.slice(0, 3).length > 0 && (
                <div className="col-span-12 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <span className="text-lg">📸</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Experience Highlights</h4>
                      <p className="text-xs text-slate-500">A glimpse of what awaits you</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {packageData.bannerImages.slice(0, 3).map((image, index) => (
                      <div
                        key={index}
                        className="relative group/img aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                      >
                        <div className="relative h-full rounded-2xl overflow-hidden border border-slate-200 group-hover/img:border-brand-blue/50 transition-all">
                          <Image
                            src={image.url}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/img:opacity-80 transition-opacity" />
                          <div className="absolute inset-0 flex items-end p-4">
                            <div>
                                <div className="text-white font-semibold text-sm">
                                  {index === 0 ? "Adventure" : index === 1 ? "Culture" : "Relaxation"}
                                </div>
                                <div className="text-white/80 text-xs">Explore</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
    </div>
  );

  // Itinerary Section Component
  const ItinerarySection = () => (
    <div className="space-y-10">
      {/* Standard Header Block - Above Split Layout */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="flex-1 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full text-[10px] font-bold text-orange-600 border border-orange-100 mb-4 uppercase tracking-widest">
            <span className="text-xs">🗺️</span> Journey Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Our Travel <span className="text-orange-500">Timeline</span>
          </h2>
          <p className="text-xl text-slate-600">
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
            <span>Download Itinary</span>
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
        {/* Left Column - Sticky Map */}
        <div className="lg:col-span-5 sticky top-40 space-y-6">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <ItineraryMap 
              itineraries={packageData?.itineraries} 
              citiesList={packageData?.citiesList}
            />
          </div>
        </div>

        {/* Right Column - Timeline List */}
        <div className="lg:col-span-7 space-y-6">

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



  // Stay Section Component
  const StaySection = () => (
    <div className="space-y-12">
            {/* Standard Header with Enhanced Badge */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="flex-1 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/5 rounded-full text-[10px] font-bold text-brand-blue border border-brand-blue/10 mb-5 uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                  </span>
                  Premium Stay Experience
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">
                  Your <span className="text-brand-green italic font-serif">Luxury</span> Accommodation
                </h2>
                <p className="text-xl text-slate-500 font-light leading-relaxed">Handpicked retreats & boutiques for ultimate comfort</p>
              </div>

              {/* Luxury Category Badge */}
              <div className="lg:flex-shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-green/20 to-brand-blue/20 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] px-8 py-6 shadow-2xl flex flex-col items-center gap-2 min-w-[200px]">
                    <div className="flex gap-1.5 text-2xl">
                      {[...Array(packageData?.hotelCategory === "Premium" ? 4 : packageData?.hotelCategory === "Luxury" ? 5 : 3)].map((_, i) => (
                        <span key={i} className="drop-shadow-sm pointer-events-none">⭐</span>
                      ))}
                    </div>
                    <div className="h-px w-12 bg-slate-100 my-1" />
                    <span className="font-black text-slate-900 uppercase tracking-[0.15em] text-[10px]">
                      {packageData?.hotelCategory || "Premium"} Selection
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vibrant Glassmorphism Amenities Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "📶", label: "High-Speed WiFi", sub: "Unlimited Connectivity", color: "blue", bg: "bg-blue-500/10", text: "text-blue-600" },
                { icon: "🍳", label: "Signature Breakfast", sub: "Gourmet Selections", color: "green", bg: "bg-emerald-500/10", text: "text-emerald-600" },
                { icon: "❄️", label: "Climate Control", sub: "Personalized Settings", color: "blue", bg: "bg-sky-500/10", text: "text-sky-600" },
                { icon: "🚗", label: "Private Transfers", sub: "Doorstep Service", color: "blue", bg: "bg-indigo-500/10", text: "text-indigo-600" },
              ].map((amenity, index) => (
                <div
                  key={amenity.label}
                  className="group relative"
                >
                  <div className={`absolute -inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  <div className="relative bg-white border border-slate-100 rounded-[2rem] p-6 transition-all duration-500 hover:border-brand-green/20 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden">
                    {/* Background Decorative Glow */}
                    <div className={`absolute -right-4 -top-4 w-16 h-16 ${amenity.bg} rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity`} />
                    
                    <div className={`w-16 h-16 rounded-2xl ${amenity.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-inner`}>
                      <span className="text-3xl filter drop-shadow-sm">{amenity.icon}</span>
                    </div>
                    <h5 className="text-slate-900 font-black text-base mb-1 relative z-10">{amenity.label}</h5>
                    <p className={`text-[10px] ${amenity.text} font-black uppercase tracking-widest relative z-10`}>{amenity.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hotel Details Presentation */}
            {packageData?.hotelDetails && typeof packageData.hotelDetails === 'object' && !Array.isArray(packageData.hotelDetails) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {Object.entries(packageData.hotelDetails).map(([city, hotelInfo], index) => (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-green/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
                    
                    <div className="relative bg-white border border-slate-100 group-hover:border-brand-green/20 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                      {/* Floating City Tag */}
                      <div className="absolute top-6 left-6 z-10">
                        <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg group-hover:bg-brand-green transition-colors duration-500">
                          <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-[10px]">
                            {index + 1}
                          </span>
                          <span className="font-black text-[11px] uppercase tracking-widest">{city}</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="pt-20 p-8">
                        <div className="flex items-start gap-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-brand-green/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform duration-500 overflow-hidden">
                               <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-transparent opacity-50" />
                               <span className="text-4xl relative z-10">🏨</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <h5 className="font-black text-slate-900 text-2xl leading-tight group-hover:text-brand-green transition-colors duration-500">
                              {typeof hotelInfo === 'string' ? hotelInfo : hotelInfo?.name || hotelInfo?.hotelName || 'Premium Resort'}
                            </h5>
                            
                            {typeof hotelInfo === 'object' && hotelInfo?.rating && (
                              <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                  {[...Array(parseInt(hotelInfo.rating) || 4)].map((_, i) => (
                                    <span key={i} className="text-brand-green text-sm">⭐</span>
                                  ))}
                                </div>
                                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg">
                                  {hotelInfo.rating} Star Class
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2">
                              {["Breakfast Included", "AC Rooms", "Free WiFi"].map(tag => (
                                <span key={tag} className="text-[10px] font-black uppercase tracking-wider text-slate-400 border border-slate-100 px-3 py-1.5 rounded-xl group-hover:border-brand-green/10 transition-colors">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative Base */}
                      <div className="px-8 pb-6 flex justify-between items-center bg-slate-50/50">
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Verified Property Partner</span>
                         <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Luxury Splash Card - Enhanced Vibrancy */
              <div className="relative group mt-12">
                {/* Multi-layered Animated Glow */}
                <div className="absolute -inset-10 bg-gradient-to-br from-brand-green/20 via-brand-blue/20 to-transparent rounded-[4rem] blur-[80px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000" />
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-green/10 to-brand-blue/10 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-white border border-white rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-1">
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-[3.25rem] flex flex-col md:flex-row items-center gap-12 p-12 md:p-20 relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    
                    <div className="relative flex-shrink-0">
                       {/* Animated glowing orbit */}
                       <div className="absolute inset-[-50px] border border-brand-green/20 rounded-full animate-[spin_20s_linear_infinite] border-dashed" />
                       <div className="absolute inset-[-30px] border border-brand-blue/20 rounded-full animate-[spin_25s_linear_infinite_reverse] border-dashed" />
                       
                       <div className="relative w-44 h-44 bg-white border border-slate-100 rounded-[3rem] flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-700">
                         <span className="text-8xl filter drop-shadow-xl">🏨</span>
                         <div className="absolute -bottom-2 -right-2 bg-brand-green text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <span className="text-2xl">✨</span>
                         </div>
                       </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-8 relative z-10">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full text-[10px] font-black text-brand-green uppercase tracking-[0.2em] mb-2">
                          <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                          Signature Collection
                        </div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.9]">
                          Curated <span className="text-brand-green italic font-serif">Hospitality</span>
                        </h3>
                        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-xl">Where every stay is a masterpiece of comfort</p>
                      </div>

                      <p className="text-slate-600 max-w-xl leading-relaxed text-lg">
                        We partner with an elite selection of 4 and 5-star properties, ensuring your nights are as extraordinary as your days. Expect prime locations, exceptional service, and premium amenities.
                      </p>

                      <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                        {[
                          { icon: "🛌", text: "Premium Linen", color: "text-blue-500" },
                          { icon: "🍴", text: "Gourmet Dining", color: "text-emerald-500" },
                          { icon: "🏊", text: "Luxury Assets", color: "text-indigo-500" }
                        ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                              <span className="text-2xl">{item.icon}</span>
                              <span className={`font-black text-[11px] uppercase tracking-widest ${item.color}`}>{item.text}</span>
                           </div>
                        ))}
                      </div>

                       <div className="pt-8 flex items-center justify-center md:justify-start gap-4">
                          <div className="h-px w-16 bg-slate-200" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Verified Property Partner Network</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
  );

  // Inclusions Section Component
  const InclusionsSection = () => (
    <div className="space-y-10">
            {/* Standard Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-[10px] font-bold text-brand-blue border border-brand-blue/20 mb-4 uppercase tracking-widest">
                <span className="text-xs">📋</span> Plan Details
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight border-none">
                Package <span className="text-brand-green">Inclusions</span>
              </h2>
              <p className="text-xl text-slate-600">Everything you need to know for a seamless journey</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Includes Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-brand-green/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="relative h-full bg-white border border-slate-200 group-hover:border-brand-green/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
                  {/* Header */}
                  <div className="relative px-6 py-5 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-brand-green/20 rounded-xl blur-md opacity-50" />
                        <div className="relative w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xl font-bold text-slate-900">What's Included</h5>
                        <p className="text-slate-500 text-xs">{packageData?.includes?.length || 0} benefits included</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Items List */}
                  <div className="p-5 space-y-2">
                    {packageData?.includes?.map((item, index) => (
                      <div 
                        key={index}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-green/10 flex items-center justify-center group-hover/item:bg-brand-green transition-all">
                          <svg className="w-3.5 h-3.5 text-brand-green group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-600 text-sm leading-relaxed group-hover/item:text-slate-900 transition-colors">
                          {typeof item === "string" ? item : item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-1 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
                </div>
              </div>

              {/* Excludes Card */}
              {packageData?.excludes && packageData.excludes.length > 0 && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="relative h-full bg-white border border-slate-200 group-hover:border-rose-300/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
                    {/* Header */}
                    <div className="relative px-6 py-5 bg-slate-50 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-rose-500/20 rounded-xl blur-md opacity-50" />
                          <div className="relative w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xl font-bold text-slate-900">Not Included</h5>
                          <p className="text-slate-500 text-xs">Items you'll need to arrange</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Items List */}
                    <div className="p-5 space-y-2">
                      {packageData.excludes.map((item, index) => (
                        <div 
                          key={index}
                          className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover/item:bg-rose-500 transition-all">
                            <svg className="w-3.5 h-3.5 text-rose-500 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <span className="text-slate-600 text-sm leading-relaxed group-hover/item:text-slate-900 transition-colors">
                            {typeof item === "string" ? item : item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Pro Tip Card */}
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl blur-xl" />
              <div className="relative bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg">💡</span>
                </div>
                <div>
                  <h6 className="text-brand-blue font-semibold mb-1">Pro Tip</h6>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Book early to secure the best rates and availability. Contact our travel experts for any customization requests or special requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
  );

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-blue-50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="py-12 text-center">
          <h2
            className="text-4xl sm:text-5xl font-black text-slate-900 mb-4"
          >
            Package <span className="text-brand-green">Details</span>
          </h2>
          <div className="flex justify-center">
            <div className="h-1.5 w-24 bg-brand-blue rounded-full"></div>
          </div>
        </div>

        {/* Sticky Navigation */}
        <div className="sticky top-20 z-40 mb-12">
          <div className="flex justify-center">
            <div className="relative inline-flex">
              <div className="absolute -inset-2 bg-brand-blue/10 rounded-full blur-xl opacity-60"></div>
              
              <div className="relative flex items-center gap-2 p-1 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-full shadow-xl overflow-x-auto scrollbar-hide max-w-[calc(100vw-2rem)]">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative flex-shrink-0 px-4 py-1.5 transition-all duration-300 rounded-full whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-slate-500 hover:text-brand-blue"
                    }`}
                  >
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeSectionPill"
                        className="absolute inset-0 bg-brand-blue rounded-full shadow-lg shadow-brand-blue/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{section.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {/* Overview Section */}
          <div id="overview" className="scroll-mt-32">
            <OverviewSection />
          </div>

          {/* Itinerary Section */}
          <div id="itinerary" className="scroll-mt-32">
            <ItinerarySection />
          </div>



          {/* Stay Section */}
          <div id="stay" className="scroll-mt-32">
            <StaySection />
          </div>

          {/* Inclusions Section */}
          <div id="inclusions" className="scroll-mt-32 pb-16">
            <InclusionsSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabbedContent;
