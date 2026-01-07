"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { MapPin } from "lucide-react";

const PackageHero = ({ packageData }) => {
  const validBannerImages = useMemo(() => 
    packageData?.bannerImages?.filter((image) => image && image?.url !== null) || [],
    [packageData]
  );

  // Take the first image as the static main banner
  const mainImage = validBannerImages[0]?.url || "/placeholder.jpg";
  
  // The rest of the images will scroll in the side stack
  // We double the array to create a seamless infinite loop effect
  const sideImages = useMemo(() => {
    const images = validBannerImages.length > 1 ? validBannerImages.slice(1) : [validBannerImages[0]];
    // If we have few images, repeat them to ensure the sidebar is always full
    return [...images, ...images, ...images].filter(img => img?.url);
  }, [validBannerImages]);

  const title = packageData?.packageTitle || "";
  const location = packageData?.region || "";

  const scrollToNext = () => {
    const element = document.getElementById("package-navigation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
    }
  };

  const getDynamicFontSize = () => {
    const length = title.length;
    if (length > 35) return "clamp(30px, 4vw, 45px)";
    if (length > 25) return "clamp(40px, 6vw, 60px)";
    return "clamp(50px, 7vw, 85px)";
  };

  return (
    <section className="relative h-[90vh] min-h-[650px] w-full overflow-hidden bg-slate-950">
      {/* Refined Mosaic Grid: 8/4 Split */}
      <div className="absolute inset-0 z-0 grid grid-cols-12 gap-1 p-1 md:p-2">
        
        {/* Main Large Image Container (Left 8/12) */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative col-span-12 md:col-span-8 h-full rounded-xl md:rounded-3xl overflow-hidden group"
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Focused Visual Overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

          {/* Overlaid Content ONLY on Main Image */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-3xl"
            >
              {/* Destination Tag */}
              <div className="mb-4 md:mb-6 px-4 py-1.5 bg-brand-green/20 backdrop-blur-md border border-brand-green/30 rounded-full flex items-center gap-2 w-fit shadow-xl">
                <MapPin size={14} className="text-brand-green" />
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-white">{location}</span>
              </div>

              <h1 
                className="mb-6 md:mb-8 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] uppercase tracking-tight text-white"
                style={{ 
                  fontFamily: "'Denton Test', serif",
                  fontWeight: 400,
                  fontSize: getDynamicFontSize(),
                  lineHeight: "0.9",
                }}
              >
                {title}
              </h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button
                  onClick={scrollToNext}
                  className="bg-brand-green hover:bg-brand-green/90 text-white rounded-full px-10 py-7 text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Explore Package
                </Button>
                
                <p className="hidden md:block max-w-sm text-white/70 text-sm font-medium leading-relaxed drop-shadow-md border-l border-white/20 pl-6">
                  Experience {location} like never before with our signature curated journey through heritage and nature.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Side Stack of Scrolling Images (Right 4/12) */}
        <div className="hidden md:block col-span-4 relative h-full overflow-hidden rounded-3xl">
          <motion.div 
            className="flex flex-col gap-2 pointer-events-none"
            animate={{ 
              y: ["0%", "-50%"] 
            }}
            transition={{ 
              duration: sideImages.length * 4,
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {sideImages.map((img, idx) => (
              <div 
                key={`${img.url}-${idx}`} 
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-inner"
              >
                <Image
                  src={img.url}
                  alt={`Gallery ${idx}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
          </motion.div>
          
          {/* Subtle vignette on scroller edges */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default PackageHero;
