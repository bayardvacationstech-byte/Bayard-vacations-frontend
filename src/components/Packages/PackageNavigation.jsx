"use client";
import React from "react";
import { motion } from "framer-motion";

const PackageNavigation = ({ activeSection, onScrollToSection, sections = [] }) => {

  return (
    <div className="sticky top-20 z-40 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="relative inline-flex">
            <div className="absolute -inset-1 bg-brand-blue/5 rounded-full blur-lg opacity-40"></div>
            
            <div className="relative flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-full overflow-x-auto scrollbar-hide max-w-[calc(100vw-24px)] md:max-w-max">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onScrollToSection(section.id)}
                  className={`relative flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 rounded-full whitespace-nowrap text-[11px] md:text-sm font-black uppercase tracking-widest ${
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
