"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SectionNav = ({ sections, activeSection }) => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 180; // Account for sticky header + filters + nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-3 whitespace-nowrap">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.05 * index }}
              className={cn(
                "px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer relative",
                isActive
                  ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-sm"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {section.label}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNav;
