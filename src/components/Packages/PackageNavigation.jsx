"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PackageNavigation = ({ activeSection, onScrollToSection, sections = [], isBottomBarVisible }) => {

  return (
    <div className={cn(
      "z-40 transition-all duration-500",
      "fixed md:sticky",
      "bottom-0 md:top-[90px] md:bottom-auto",
      "left-0 right-0 px-0 pb-0 md:px-2 md:py-4",
      "h-[60px] md:h-auto"
    )}>
      <div className="w-full h-full md:w-auto md:h-auto md:max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-full">
          <div className="relative flex w-full h-full md:w-auto md:h-auto md:inline-flex">
            {/* Glossy Background for the entire bar */}
            <div className="absolute inset-0 bg-white md:bg-white/80 md:backdrop-blur-xl rounded-none md:rounded-full border-t border-slate-200/80 md:border shadow-none md:shadow-md" />
            
            <div className="relative flex items-center justify-start md:justify-center gap-2 p-1.5 px-4 md:px-1.5 rounded-none md:rounded-full overflow-x-auto scrollbar-hide w-full md:w-auto md:max-w-max">
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
