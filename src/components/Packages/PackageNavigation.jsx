"use client";
import React from "react";
import { motion } from "framer-motion";

const PackageNavigation = ({ activeSection, onScrollToSection }) => {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "stay", label: "Stay" },
    { id: "inclusions", label: "Inclusions" },
  ];

  return (
    <div className="sticky top-20 z-40  py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="relative inline-flex">
            <div className="absolute -inset-2 bg-brand-blue/10 rounded-full blur-xl opacity-60"></div>
            
            <div className="relative flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-full overflow-x-auto scrollbar-hide max-w-[calc(100vw-2rem)]">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onScrollToSection(section.id)}
                  className={`relative flex-shrink-0 px-6 py-3 transition-all duration-300 rounded-full whitespace-nowrap text-sm font-black uppercase tracking-widest ${
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
    </div>
  );
};

export default PackageNavigation;
