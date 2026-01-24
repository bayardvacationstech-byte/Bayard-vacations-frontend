"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Container from "@/components/ui/Container";
import { MapPin, Clock, Calendar, IndianRupee, ChevronRight, Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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
        if (typeof img === 'string') return { url: img };
        const url = img?.url || img?.urlRef;
        if (typeof url === 'string') return { url };
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

  return (
    <section className="relative w-full lg:h-screen bg-slate-950 overflow-hidden flex flex-col lg:block">
      {/* Immersive Background Swiper */}
      <div className="relative lg:absolute lg:inset-0 h-[60vh] md:h-[55vh] lg:h-auto z-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={validBannerImages.length > 1}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {validBannerImages.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: index === currentImageIndex ? 1 : 1.15 }}
                transition={{ duration: 8, ease: "linear" }}
                className="w-full h-full"
              >
                <Image
                  src={image.url}
                  alt={title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
              {/* Overlays for better depth - slightly brighter on mobile to keep it "clear" */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 lg:to-black/60 z-10" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 z-20 lg:absolute lg:inset-0">
        <Container className="h-full flex flex-col justify-start lg:justify-center pt-6 pb-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start lg:items-center h-full">
            
            {/* Title & Info Section */}
            <div className="lg:col-span-7 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-3 lg:space-y-6"
              >
                {/* Gallery Rail - Mobile Only (Top) */}
                <div className="w-full mb-4 lg:hidden overflow-hidden">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x intro-x">
                    {validBannerImages.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => swiperRef.current?.slideTo(index)}
                        className={cn(
                          "relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition-all snap-start",
                          currentImageIndex === index ? "border-yellow-400 scale-105" : "border-white/10 opacity-40"
                        )}
                      >
                        <Image src={image.url} alt={`Gallery ${index}`} fill className="object-cover" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:block">
                  <div className="inline-flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 bg-yellow-400/90 backdrop-blur-md rounded-full shadow-lg">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-slate-900" />
                    <span className="text-slate-900 font-bold text-[9px] lg:text-xs uppercase tracking-widest">{location}</span>
                  </div>

                  {/* Highlights - Mobile Only (Beside Badge) */}
                  <div className="flex lg:hidden items-center gap-4">
                    <div className="flex items-center gap-2 text-white text-base uppercase font-black tracking-wider">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      {packageData?.nights || "0"}N
                    </div>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <div className="flex items-center gap-2 text-white text-base uppercase font-black tracking-wider">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      {packageData?.days || (packageData?.nights ? packageData.nights + 1 : "0")}D
                    </div>
                    <div className="w-[1px] h-4 bg-white/20" />
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-white text-base font-bold">4.9</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col lg:block gap-2">
                  <h1 
                    className="text-white font-bold text-2xl md:text-6xl lg:text-7xl leading-tight lg:leading-[1.1] tracking-tight drop-shadow-2xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="lg:block">
                      {title.replace(/ - /g, ' — ')}
                    </span>
                  </h1>


                </div>

                {/* Social Proof - Desktop Only */}
                <div className="hidden lg:flex items-center gap-6 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-slate-800 overflow-hidden shadow-xl">
                        <Image 
                          src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                          alt="User" 
                          width={40} 
                          height={40} 
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-brand-blue flex items-center justify-center text-[10px] text-white font-bold shadow-xl">
                      +2k
                    </div>
                  </div>
                  <div className="text-white/80">
                    <div className="flex gap-1 text-yellow-400 mb-1">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xs font-medium tracking-wide">Loved by 2,000+ Travelers</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Price & Action Section */}
            <div className="lg:col-span-5 flex flex-col items-end gap-4 lg:gap-8">


              {/* Minimal Line 2: Price + Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={cn(
                  "w-full max-w-md relative group",
                  "lg:bg-white/10 lg:backdrop-blur-2xl lg:border lg:border-white/20 lg:rounded-[2.5rem] lg:p-10 lg:shadow-2xl"
                )}
              >
                <div className="relative z-10">
                  {/* Desktop Only Labels/Details */}
                  <div className="hidden lg:block space-y-6 mb-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Package Plan</p>
                        <h3 className="text-white text-2xl font-bold flex items-center gap-2">Premium Gateway</h3>
                      </div>
                      <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Best Value</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Duration</span>
                        </div>
                        <p className="text-white font-bold text-xl">{packageData?.nights || "0"} Nights</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Itinerary</span>
                        </div>
                        <p className="text-white font-bold text-xl">{packageData?.days || (packageData?.nights ? packageData.nights + 1 : "0")} Days</p>
                      </div>
                    </div>
                  </div>

                  {/* Line 2 Container: Unified Row on Mobile */}
                  <div className="hidden lg:flex lg:flex-col items-center lg:items-stretch gap-4">
                    {/* Price - Condensed for mobile */}
                    <div className={cn(
                      "flex-1 lg:flex-none",
                      "bg-white/5 lg:bg-gradient-to-r lg:from-brand-blue/40 lg:to-cyan-500/40 rounded-xl lg:rounded-2xl px-4 py-2 lg:p-6 flex items-center justify-center lg:block"
                    )}>
                      <div className="flex lg:block items-baseline gap-2">
                        <span className="text-white/60 text-[8px] lg:text-[10px] font-black uppercase tracking-widest lg:mb-1 block lg:inline">From </span>
                        <span className="text-white font-black text-xl lg:text-5xl tracking-tighter">
                          ₹{Math.floor((packageData?.basePrice || packageData?.price || 0) / 1000)}K
                        </span>
                      </div>
                    </div>

                    {/* Action Button - Compact for mobile */}
                    <button className="flex-1 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] lg:text-xs h-[42px] lg:h-auto lg:py-5 rounded-xl lg:rounded-2xl flex items-center justify-center">
                      Inquire
                    </button>
                  </div>

                  <p className="hidden lg:block text-center text-white/40 text-[9px] font-medium tracking-wider mt-4">
                    *Taxes & fees included. 24/7 Concierge Support.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* Desktop Floating Gallery Strip */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-12 z-30 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex justify-center gap-4 shadow-2xl relative">
          {validBannerImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={cn(
                "relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300",
                currentImageIndex === index ? "border-yellow-400 scale-110 z-10 shadow-lg shadow-yellow-400/20" : "border-transparent opacity-40 hover:opacity-100"
              )}
            >
              <Image src={image.url} alt={`Gallery ${index}`} fill className="object-cover" />
              {currentImageIndex === index && (
                <div className="absolute inset-0 bg-yellow-400/10 active:bg-transparent" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-40 hidden lg:flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white flex justify-center pt-2">
          <div className="w-1 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default PackageHero;
