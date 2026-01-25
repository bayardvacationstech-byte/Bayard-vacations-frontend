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
    <section className="relative w-full lg:h-screen bg-gradient-to-br from-[#0146b3] via-[#003488] to-[#0146b3] overflow-hidden flex flex-col lg:block">
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
            
            {/* Title & Info Section - Mobile Only now (since Desktop moved to right) */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-3 lg:space-y-6"
              >
                {/* Gallery Rail - Mobile Only (Top) */}
                <div className="w-full mb-4 lg:hidden overflow-hidden">
                  <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide snap-x intro-x">
                    {validBannerImages.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => swiperRef.current?.slideTo(index)}
                        className={cn(
                          "relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border transition-all snap-start",
                          currentImageIndex === index ? "border-yellow-400 scale-105" : "border-white/10"
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

            {/* PC Layout - Right Panel */}
            <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 lg:h-full flex-col justify-center bg-[#0146b3]/95 backdrop-blur-sm -my-8 py-20 px-12 lg:-mr-[calc((100vw-1280px)/2+2rem)] lg:pr-[calc((100vw-1280px)/2+4rem)] xl:-mr-[calc((100vw-1280px)/2+2rem)] xl:pr-[calc((100vw-1280px)/2+4rem)] relative z-30">
              
              <div className="space-y-8 w-full max-w-lg">
                <h1 className="text-white font-bold text-5xl lg:text-6xl leading-tight font-serif">
                  {title.replace(/ - /g, ' — ')}
                </h1>

                {/* Destination Badge */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-700/50 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <MapPin className="text-yellow-400 w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">Destination</span>
                    <span className="text-white font-bold text-xl uppercase tracking-wider">{location}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-900/40 rounded-2xl p-4 border border-white/5">
                    <span className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase block mb-1">Duration</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">{packageData?.nights || 0}</span>
                      <span className="text-yellow-400 font-bold text-sm">N</span>
                    </div>
                  </div>
                  <div className="bg-blue-900/40 rounded-2xl p-4 border border-white/5">
                    <span className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase block mb-1">Days</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">{packageData?.days || 0}</span>
                      <span className="text-yellow-400 font-bold text-sm">D</span>
                    </div>
                  </div>
                  <div className="bg-blue-900/40 rounded-2xl p-4 border border-white/5">
                    <span className="text-yellow-400 text-[9px] font-bold tracking-[0.2em] uppercase block mb-1">From</span>
                    <div className="text-3xl font-bold text-white">₹{Math.floor((packageData?.basePrice || packageData?.price || 0) / 1000)}K</div>
                  </div>
                </div>

                {/* Gallery Items */}
                <div className="flex gap-4 pt-4">
                   {validBannerImages.slice(0, 3).map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      className={cn(
                        "relative w-36 h-36 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer",
                        currentImageIndex === index ? "border-yellow-400" : "border-transparent hover:border-white/20"
                      )}
                    >
                      <Image src={image.url} alt={`Gallery ${index}`} fill className="object-cover" />
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Container>
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
