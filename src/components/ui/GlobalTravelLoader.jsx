"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plane, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const GlobalTravelLoader = ({ className, text = "Curating your experience..." }) => {
  return (
    <div className={cn("fixed inset-0 z-[9999] flex flex-col items-center justify-center w-full h-full bg-white", className)}>
      
      {/* 1. The Faux-3D Globe Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
         
         {/* Globe Shadow (Ground) */}
         <div className="absolute bottom-4 w-40 h-4 bg-black/10 blur-xl rounded-[100%]" />

         {/* THE GLOBE SPHERE */}
         <motion.div 
            className="relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.4),0_20px_50px_rgba(1,70,179,0.3)] bg-gradient-to-br from-[#0146b3] to-[#003488]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         >
            {/* Glossy Reflection (Top Left) */}
            <div className="absolute top-4 left-4 w-20 h-10 bg-white/20 rounded-full blur-md transform -rotate-45" />

            {/* Simulated Continents (Blobs moving across) */}
            <motion.div 
                className="absolute inset-0"
                animate={{ x: ["-100%", "0%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {/* Continent 1 - Using Gold/White tint for landmasses to contrast with Deep Blue */}
                <div className="absolute top-[20%] left-[20%] w-16 h-12 bg-white/10 rounded-full blur-[2px]" />
                <div className="absolute top-[50%] left-[60%] w-24 h-24 bg-white/5 rounded-full blur-[4px]" />
                <div className="absolute bottom-[20%] left-[10%] w-12 h-10 bg-white/10 rounded-full blur-[2px]" />
            </motion.div>
             <motion.div 
                className="absolute inset-0"
                initial={{ x: "100%" }}
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                 <div className="absolute top-[30%] left-[40%] w-20 h-14 bg-white/10 rounded-full blur-[2px]" />
            </motion.div>
         </motion.div>

         {/* ORBITAL RING */}
         <motion.div 
            className="absolute w-[120%] h-[120%] rounded-full border border-dashed border-[#BF9106]/40"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         />

         {/* GOLDEN PLANE */}
         <motion.div
            className="absolute w-[140%] h-[140%]"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                 <motion.div
                     initial={{ scale: 1 }}
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="relative"
                 >
                     {/* Plane Icon */}
                     <div className="p-3 bg-white rounded-full shadow-lg border-2 border-[#BF9106]">
                         <Plane className="w-8 h-8 md:w-10 md:h-10 text-[#BF9106] fill-[#BF9106]" />
                     </div>
                     {/* Contrail */}
                     <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-white to-transparent blur-[2px]" />
                 </motion.div>
             </div>
         </motion.div>

         {/* Floating Clouds (Foreground) */}
         <motion.div
             className="absolute top-[20%] -left-[20%]"
             animate={{ x: ["500%", "-200%"] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
         >
             <Cloud className="w-12 h-12 text-[#0146b3]/20 fill-white drop-shadow-md" />
         </motion.div>
         <motion.div
             className="absolute bottom-[20%] -right-[20%]"
             animate={{ x: ["-500%", "200%"] }}
             transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 0 }}
         >
             <Cloud className="w-16 h-16 text-[#0146b3]/20 fill-white drop-shadow-md" />
         </motion.div>

      </div>

      {/* TYPOGRAPHY */}
      <motion.div 
        className="mt-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[#0146b3] font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">
            Bayard Vacations
        </span>
        <div className="flex items-center gap-2 mt-3">
             <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#BF9106]" />
             <p className="text-[#BF9106] text-xs md:text-sm font-sans font-medium tracking-[0.2em] uppercase">
                 {text}
             </p>
             <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#BF9106]" />
        </div>
      </motion.div>

    </div>
  );
};

export default GlobalTravelLoader;
