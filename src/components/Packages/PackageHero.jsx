"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Container from "@/components/ui/Container";
import { MapPin, ChevronRight, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const PackageHero = ({ packageData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const swiperRef = useRef(null);

  const dummyBannerImages = [
    { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=2000" },
    { url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000" },
    { url: "https://images.unsplash.com/photo-1512100356956-c1227c331f01?auto=format&fit=crop&q=80&w=2000" }
  ];

  const validBannerImages = useMemo(() => {
    const rawImages = packageData?.bannerImages || [];
    const filtered = rawImages
      .map(img => {
        // Handle cases where img itself is a string/URL
        if (typeof img === 'string') return { url: img };
        // Handle cases where img is an object with url or urlRef
        const url = img?.url || img?.urlRef;
        if (typeof url === 'string') return { url };
        // Fallback for direct string value inside object if any
        if (img && typeof img === 'object' && Object.keys(img).length === 0) return null;
        return img?.url ? img : null;
      })
      .filter(Boolean);
    
    return filtered.length > 0 ? filtered : dummyBannerImages;
  }, [packageData]);

  const title = packageData?.packageTitle || "";
  const location = packageData?.region || "";

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      setCurrentImageIndex(index);
      swiperRef.current.slideToLoop(index);
    }
  };

  const scrollToNext = () => {
    const element = document.getElementById("package-navigation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-slate-950 overflow-hidden">
      <div className="relative w-full min-h-screen lg:min-h-0 lg:h-[90vh] flex flex-col lg:flex-row items-stretch bg-slate-900">
        
        {/* Background Layer (Shared Swiper for Mobile and Desktop Backdrop) */}
        <div className="absolute inset-x-0 top-0 bottom-[40vh] lg:bottom-0 z-0 lg:w-3/5">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={validBannerImages.length > 1}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {validBannerImages.map((image, index) => (
              <SwiperSlide key={index} className="w-full h-full relative">
                <Image
                  src={image.url}
                  alt={title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                {/* Desktop Content Blending Overlay */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-950 to-transparent opacity-90" />
                
                {/* Mobile Cinematic Overlays - Adjusted for better visibility */}
                <div className="lg:hidden absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div className="lg:hidden absolute inset-0 bg-black/10 z-0" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Navigation Dots (Bottom Left) */}
        {validBannerImages.length > 1 && (
          <div className="absolute bottom-8 left-12 z-20 hidden lg:flex gap-2">
            {validBannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === currentImageIndex
                    ? "w-8 bg-brand-blue"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Right Side / Content Panel */}
        <div className="relative w-full lg:w-2/5 ml-auto flex flex-col p-6 md:p-12 pt-28 lg:pt-32 pb-16 lg:pb-12 z-10 lg:bg-[#030712] border-l border-white/5">
          
          {/* Mobile Stories Bars (Top) */}
          <div className="lg:hidden absolute top-16 left-6 right-6 flex gap-1.5 z-30">
            {validBannerImages.map((_, index) => (
              <div key={index} className="h-[2px] flex-1 bg-white/20 rounded-full overflow-hidden">
                {index === currentImageIndex && (
                  <motion.div 
                    layoutId="progress-bar-mobile"
                    className="h-full bg-white shadow-[0_0_8px_white]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
                {index < currentImageIndex && <div className="h-full w-full bg-white/60" />}
              </div>
            ))}
          </div>

          {/* Content Wrapper */}
          <div className="w-full space-y-4 lg:space-y-12 mb-6 md:mb-0">
            {/* Header Content */}
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-white font-bold text-4xl md:text-5xl lg:text-5xl leading-[1.2] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </motion.h1>

              {/* Destination Chip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 py-2"
              >
                <div className="w-12 h-12 bg-[#0a1a3a] rounded-xl flex items-center justify-center border border-white/5">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#3b82f6] font-black text-[10px] uppercase tracking-[0.2em] mb-0.5">Destination</span>
                  <span className="text-white font-bold text-xl uppercase tracking-wider">{location}</span>
                </div>
              </motion.div>
            </div>

            {/* Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-4 md:p-6 rounded-3xl flex flex-col justify-center min-h-[90px] md:min-h-[100px]">
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Duration</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">{packageData?.nights || "3"}</span>
                  <span className="text-white/40 text-[10px] md:text-xs font-black uppercase ml-1">N</span>
                </div>
              </div>

              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-4 md:p-6 rounded-3xl flex flex-col justify-center min-h-[90px] md:min-h-[100px]">
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Days</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">{(packageData?.nights || 3) + 1}</span>
                  <span className="text-white/40 text-[10px] md:text-xs font-black uppercase ml-1">D</span>
                </div>
              </div>

              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-4 md:p-6 rounded-3xl flex flex-col justify-center min-h-[90px] md:min-h-[100px]">
                <p className="text-[#3b82f6] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">From</p>
                <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">₹{Math.floor((packageData?.price || 45000) / 1000)}K</span>
              </div>
            </motion.div>

            {/* Split Content: Highlights & Grid */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 lg:items-start pt-4">
              {/* Left: Highlights */}
              <div className="flex-1 space-y-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Package Highlights</p>
                  <div className="space-y-4">
                    {[
                      "Mountain trekking & scenic lake exploration",
                      "Traditional local culture & heritage tours",
                      "Accommodation & daily meals included",
                      "Expert guide & 24/7 customer support"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,102,255,0.8)]" />
                        <p className="text-white/70 text-sm font-medium leading-none">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mobile Thumbnail Row (Visible only on Mobile) */}
              <div className="lg:hidden flex gap-3 overflow-x-auto py-2 px-1 scrollbar-none snap-x shrink-0">
                {validBannerImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center ${
                      index === currentImageIndex
                        ? "border-brand-blue ring-4 ring-brand-blue/10 scale-105"
                        : "border-white/5 opacity-40"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Desktop Thumbnail Grid (Synced - Visible only on Desktop) */}
              <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
                {validBannerImages.slice(0, 4).map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    whileHover={{ scale: 1.05 }}
                    className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${
                      index === currentImageIndex
                        ? "border-brand-blue ring-4 ring-brand-blue/10 scale-105"
                        : "border-white/5 opacity-40 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile-only Scroll Indicator */}
          <button 
            className="lg:hidden text-white/40 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 pt-12 pb-4 mt-auto"
            onClick={scrollToNext}
          >
            Scroll To Journey
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageHero;
