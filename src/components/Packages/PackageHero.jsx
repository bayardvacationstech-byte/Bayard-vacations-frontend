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
    <section className="relative h-[95vh] min-h-[700px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* 1. Dynamic Blurred Background (Slow Motion) */}
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.4 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src={mainImage}
          alt=""
          fill
          className="object-cover blur-[80px] brightness-50"
        />
      </motion.div>

      {/* 2. Layered Floating Decoration (Abstract blobs) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px]" 
        />
      </div>

      <Container className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-6xl flex items-center justify-center">
          
          {/* 3. The Main Photo Canvas (The "Floating Frame") */}
          <div className="relative z-20">
            {/* Main Canvas */}
            <motion.div
              initial={{ y: 80, opacity: 0, rotate: -2 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] sm:w-[350px] md:w-[420px] aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border-[10px] md:border-[15px] border-white/5 backdrop-blur-sm group"
            >
              <Image
                src={mainImage}
                alt={title}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Sub Canvas (Secondary smaller image for depth) */}
            <motion.div
              initial={{ x: -100, y: 100, opacity: 0, rotate: -15 }}
              animate={{ x: -50, y: -40, opacity: 1, rotate: -8 }}
              transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
              className="absolute -bottom-10 -left-20 w-32 md:w-48 aspect-square rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl z-30 hidden sm:block"
            >
              <Image
                src={sideImages[0]?.url || mainImage}
                alt=""
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* 4. Artistic Typography (Overlapping) */}
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              className="text-center w-full px-4"
            >
              <h1 
                className="text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ 
                  fontFamily: "'Denton Test', serif",
                  fontSize: "clamp(55px, 14vw, 170px)",
                  lineHeight: "0.8",
                  fontWeight: 900,
                  letterSpacing: "-0.05em"
                }}
              >
                {title.split(' ').map((word, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.8 + (i * 0.15), duration: 1, ease: "easeOut" }}
                    className="block last:italic last:text-brand-green last:font-light last:mt-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* 5. Floating Glass Stat Cards */}
          {/* Card A: Location */}
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 md:left-[-15%] top-[10%] z-50 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center gap-4 group hover:bg-white/20 transition-colors"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-green/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/20">
              <MapPin className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">Experience</p>
              <p className="text-white font-bold text-sm md:text-lg">{location}</p>
            </div>
          </motion.div>

          {/* Card B: Duration */}
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-4 md:right-[-10%] top-[40%] z-50 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center group hover:bg-white/20 transition-colors"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Stay</p>
            <p className="text-white font-black text-3xl md:text-5xl leading-none">
              {packageData?.nights || "5"}
              <span className="text-lg md:text-xl font-light text-white/50 ml-1">N</span>
            </p>
          </motion.div>

          {/* Card C: Price/Budget */}
          <motion.div
            animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[5%] md:left-[-5%] bottom-[10%] z-50 bg-brand-blue/20 backdrop-blur-2xl border border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start group hover:bg-brand-blue/30 transition-colors"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue/80 mb-1">Starting From</p>
            <p className="text-white font-black text-2xl md:text-4xl tracking-tight">
               <span className="text-base md:text-lg font-light mr-1">₹</span>
               {packageData?.price?.toLocaleString() || "45,000"}
            </p>
          </motion.div>

          {/* 6. Scroll Prompt */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Scroll To Discover</div>
            <button 
              onClick={scrollToNext}
              className="w-10 h-16 md:w-12 md:h-20 border-2 border-white/20 rounded-full flex justify-center p-2 group hover:border-brand-green transition-colors"
            >
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 md:h-4 bg-brand-green rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"
              />
            </button>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default PackageHero;
