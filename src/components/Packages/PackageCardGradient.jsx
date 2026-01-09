"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MapPin, Clock, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const PackageCardGradient = ({ item, className }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!item) return <div className="h-full w-full bg-slate-900 rounded-[2.5rem]" />;

  // Precise Data Extraction
  const title = String(item.packageTitle || item.packageName || "Premium Departure").replace(/"/g, '');
  const region = String(item.region || "Discovery");
  const days = Number(item.days || 0);
  const nights = Number(item.nights || 0);
  const price = Number(item.basePrice || item.offerPrice || 0);
  const slug = String(item.packageSlug || "");
  
  // Ultra-Robust Multi-Source Image Scavenger
  const images = useMemo(() => {
    const normalize = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };
    
    const rawCard = normalize(item.cardImages);
    const rawBanner = normalize(item.bannerImages);
    const rawMain = normalize(item.image || item.imageUrl);
    
    const combined = [...rawCard, ...rawBanner, ...rawMain];
    
    return combined.filter((img, index, self) => {
      const getUrl = (i) => typeof i === "string" ? i : i?.url;
      const url = getUrl(img);
      return url && index === self.findIndex((t) => getUrl(t) === url);
    });
  }, [item.cardImages, item.bannerImages, item.image, item.imageUrl]);

  const [swiper, setSwiper] = useState(null);

  return (
    <motion.div
      initial="rest"
      whileHover={isMobile ? undefined : "hover"}
      animate={isMobile ? "hover" : "rest"}
      onMouseEnter={() => {
        if (swiper && !isMobile) {
          swiper.slideNext();
          swiper.autoplay.start();
          swiper.params.autoplay.delay = 2000;
        }
      }}
      onMouseLeave={() => {
        if (swiper && !isMobile) {
          swiper.params.autoplay.delay = 5000;
        }
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[4rem] bg-slate-900 h-full w-full border border-slate-800 shadow-2xl will-change-transform",
        className
      )}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 }
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Section: Multi-Image Swiper */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {images.length > 0 ? (
          <Swiper
            modules={[SwiperPagination, Autoplay]}
            onSwiper={setSwiper}
            slidesPerView={1}
            spaceBetween={0}
            watchSlidesProgress={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={images.length > 1}
            nested={true}
            className="w-full h-full package-inner-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="w-full h-full">
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    alt={`${title} - ${idx}`}
                    src={typeof img === "string" ? img : img?.url}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    onError={(e) => {
                       e.target.src = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";
                       e.target.onerror = null;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/[0.03] font-black text-6xl italic -rotate-12 select-none tracking-tighter uppercase">BAYARD</span>
          </div>
        )}
        
        {/* Cinematic Mask: Adjusted for maximum image visibility and sharp focus */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 pointer-events-none group-hover:opacity-95 transition-opacity duration-700" />
      </div>

      {/* Surface Action Layer */}
      <div className="absolute top-0 inset-x-0 z-20 p-8 flex justify-between items-start pointer-events-none">
        <div className="flex gap-3 pointer-events-auto">
           {item.offerPrice ? (
              <span className="px-5 py-2 rounded-full bg-brand-blue/90 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase shadow-2xl border border-white/20">
                OFFER
              </span>
           ) : null}
        </div>
        
        <div className={cn(
          "flex gap-3 transition-opacity duration-500 pointer-events-auto",
          isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="bg-black/20 backdrop-blur-xl rounded-full p-3 text-white border border-white/10 hover:bg-brand-blue transition-colors cursor-pointer">
            <Heart className="w-4 h-4" />
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-full p-3 text-white border border-white/10 hover:bg-brand-blue transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Clickable Info Panel Container */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end">
        {/* State A: Editorial Hero Title - Maximum Contrast Protection */}
        <Link 
          href={`/packages/${region.toLowerCase().replace(/\s+/g, '-')}/${slug}`}
          className={cn("transition-all duration-500 no-underline", isMobile ? "p-6" : "p-8")}
        >
          <motion.div 
            className="space-y-4 p-8 rounded-[3rem] bg-black/20 backdrop-blur-sm border border-white/5"
            variants={{
              rest: { y: 0, opacity: 1 },
              hover: { y: -220, opacity: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-3xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-[0_8px_16px_rgba(0,0,0,1)]">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-white font-black uppercase tracking-[0.25em] drop-shadow-lg">
              <MapPin className="w-4 h-4 text-brand-blue" />
              {region}
            </div>
          </motion.div>
        </Link>

        {/* State B: Ultra-Obsidian Crystal Reveal */}
        <motion.div
           className={cn(
             "absolute bottom-0 inset-x-0 bg-black/45 backdrop-blur-[30px] backdrop-saturate-[180%] flex flex-col shadow-[0_-40px_120px_-15px_rgba(0,0,0,1)] border-t border-white/20 ring-1 ring-white/10 rounded-t-[4rem]",
             isMobile ? "p-6 gap-3 bg-black/35 backdrop-blur-[20px]" : "p-8 gap-5"
           )}
           variants={{
             rest: { y: "100%" },
             hover: { y: 0 }
           }}
           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle Specular Highlight Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent pointer-events-none rounded-t-[4rem]" />
          
          <Link href={`/packages/${region.toLowerCase().replace(/\s+/g, '-')}/${slug}`} className="block space-y-1 no-underline group/link">
             <h3 className={cn(
               "font-black text-white leading-tight tracking-tighter transition-colors drop-shadow-md",
               isMobile ? "text-lg line-clamp-1" : "text-2xl line-clamp-2 group-hover/link:text-brand-blue"
             )}>
              {title}
            </h3>
             <div className={cn(
               "flex items-center font-black uppercase tracking-[0.25em] text-white/80 drop-shadow-sm",
               isMobile ? "text-[8px] gap-3" : "text-[10px] gap-6"
             )}>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-blue" /> {days}D/{nights}N</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-blue" /> {region}</span>
            </div>
          </Link>

          <div className={cn(
            "flex items-center justify-between border-t border-white/10 mt-1",
            isMobile ? "pt-3" : "pt-8 mt-2"
          )}>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/50 font-black">Investment</p>
                {item.offerPrice && (
                  <span className="text-[9px] text-white/30 line-through font-bold">₹{Number(item.basePrice).toLocaleString()}</span>
                )}
              </div>
              <p className={cn("font-black text-white tracking-tighter drop-shadow-lg", isMobile ? "text-lg" : "text-2xl")}>
                ₹{price.toLocaleString()}
              </p>
            </div>
            <Link 
              href={`/packages/${region.toLowerCase().replace(/\s+/g, '-')}/${slug}`}
              className={cn(
                "rounded-full bg-brand-blue text-white font-bold shadow-lg transition-all hover:bg-brand-blue-hovered hover:scale-105 active:scale-95 flex items-center justify-center no-underline tracking-wider whitespace-nowrap",
                isMobile ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-xs"
              )}
            >
              VIEW PACKAGE
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PackageCardGradient;
