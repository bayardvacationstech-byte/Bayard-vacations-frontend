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
    <section className="relative w-full max-w-[100vw] bg-slate-950 overflow-hidden">
      <div className="relative w-full flex flex-col lg:flex-row items-stretch bg-slate-950 overflow-hidden">
        
        {/* Background Layer / Image Area */}
        <div className="relative lg:absolute h-[65vh] md:h-[75vh] lg:h-full lg:inset-y-0 lg:left-0 lg:w-3/5 z-0">
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
                {/* Overlays */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-950 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-20" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Title Overlay (Only on image) */}
          <div className="lg:hidden absolute inset-0 z-30 flex flex-col justify-end p-6 pb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight drop-shadow-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Desktop Navigation Dots */}
          {validBannerImages.length > 1 && (
            <div className="absolute bottom-8 left-12 z-40 hidden lg:flex gap-2">
              {validBannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    index === currentImageIndex
                      ? "w-8 bg-brand-blue"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile Stories Bars (Moved here to stay on image) */}
          <div className="lg:hidden absolute top-6 left-6 right-6 flex gap-1.5 z-50">
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
        </div>

        {/* Content Panel (Below image on mobile, Side on desktop) */}
        <div className="relative w-full lg:w-2/5 lg:ml-auto flex flex-col p-6 md:p-12 lg:pt-32 pb-16 lg:pb-12 z-10 lg:bg-[#030712] border-l border-white/5">
          
          {/* Content Wrapper */}
          <div className="w-full space-y-8 lg:space-y-12">
            
            {/* Mobile-only Gallery (First in content) */}
            <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-2 px-2">
              {validBannerImages.slice(0, 5).map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center ${
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

            {/* Desktop Title (Hidden on mobile) */}
            <div className="hidden lg:block space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-bold lg:text-5xl leading-[1.2] tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </motion.h1>
            </div>

            {/* Destination Chip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 py-2"
            >
              <div className="w-12 h-12 bg-[#0a1a3a] rounded-xl flex items-center justify-center border border-white/5">
                <MapPin className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-yellow-400 font-black text-[10px] uppercase tracking-[0.2em] mb-0.5">Destination</span>
                <span className="text-white font-bold text-xl uppercase tracking-wider">{location}</span>
              </div>
            </motion.div>

            {/* Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col justify-center min-h-[80px]">
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 md:mb-2">Duration</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">{packageData?.nights || "3"}</span>
                  <span className="text-yellow-400 text-sm md:text-base font-black uppercase ml-1">N</span>
                </div>
              </div>

              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col justify-center min-h-[80px]">
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 md:mb-2">Days</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">{(packageData?.nights || 3) + 1}</span>
                  <span className="text-yellow-400 text-sm md:text-base font-black uppercase ml-1">D</span>
                </div>
              </div>

              <div className="bg-[#111827]/60 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col justify-center min-h-[80px]">
                <p className="text-yellow-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 md:mb-2">From</p>
                <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">₹{Math.floor((packageData?.price || 45000) / 1000)}K</span>
              </div>
            </motion.div>

            {/* Content Grouping: Highlights & Desktop Thumbnails */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start pt-4">
              {/* Highlights (Hidden on Mobile as per request) */}
              <div className="hidden lg:block flex-1">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Package Highlights</p>
                <div className="space-y-4">
                  {(Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
                    ? packageData.highlights.slice(0, 4) 
                    : [
                      "Grand Mosque Visit & Cultural Tour",
                      "Desert Safari with BBQ Dinner",
                      "Burj Khalifa Observation Deck",
                      "Dhow Cruise Dinner Experience"
                    ]
                  ).map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(0,102,255,0.8)]" />
                      <p className="text-white/70 text-sm font-medium leading-none">{typeof item === 'string' ? item : item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop-only Thumbnail Grid */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-3 shrink-0">
                {validBannerImages.slice(0, 4).map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative lg:w-32 lg:h-32 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-300 ${
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

          <button 
            className="lg:hidden text-white/40 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 pt-12"
            onClick={scrollToNext}
          >
            Scroll To Journey
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>↓</motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageHero;
