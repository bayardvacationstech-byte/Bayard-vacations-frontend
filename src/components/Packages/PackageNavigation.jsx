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
      "left-0 right-0 px-0 md:px-2 md:py-4",
      "h-[75px] md:h-auto"
    )}>
      <div className="w-full h-full md:w-auto md:h-auto md:max-w-7xl mx-auto px-0 md:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-full">
          <div className="relative flex w-full h-full md:w-auto md:h-auto md:inline-flex">
            {/* Background: Solid White on mobile, Glossy White on desktop */}
            <div className="absolute inset-0 bg-white md:bg-white/90 md:backdrop-blur-2xl rounded-none md:rounded-full border-t border-brand-blue/10 md:border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-lg" />
            
            <div className="relative flex items-center justify-around md:justify-center gap-0 md:gap-2 p-0 md:p-1.5 px-0 md:px-1.5 rounded-none md:rounded-full overflow-hidden w-full md:w-auto md:max-w-max">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => onScrollToSection(section.id)}
                    className={cn(
                      "relative flex flex-1 md:flex-none flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-1 md:px-6 py-2.5 md:py-3 transition-all duration-300 rounded-none md:rounded-full whitespace-nowrap font-black uppercase tracking-widest",
                      isActive
                        ? "text-brand-blue md:text-white"
                        : "text-slate-500 md:text-slate-500 hover:text-brand-blue"
                    )}
                  >
                    {/* Desktop Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSectionPill"
                        className="absolute inset-0 hidden md:block bg-brand-blue rounded-full shadow-lg shadow-brand-blue/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    {/* Mobile Active Background Tint - Very subtle blue */}
                    {isActive && (
                      <div className="absolute inset-x-2 inset-y-1.5 bg-brand-blue/5 rounded-xl md:hidden" />
                    )}
                    
                    {/* Mobile Top Indicator Line */}
                    {isActive && (
                      <div className="absolute top-0 left-1/3 right-1/3 h-1 bg-brand-blue rounded-b-full md:hidden" />
                    )}
                    
                    <span className="relative z-10 flex flex-col md:flex-row items-center gap-1 md:gap-2">
                      {section.icon && (
                        <section.icon 
                          size={22} 
                          className={cn(
                            "transition-all duration-300",
                            isActive ? "scale-110 opacity-100" : "opacity-60"
                          )} 
                        />
                      )}
                      <span className="text-[8px] xs:text-[10px] md:text-sm">{section.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageNavigation;
