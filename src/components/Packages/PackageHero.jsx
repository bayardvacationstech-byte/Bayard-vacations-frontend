"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { MapPin, ChevronRight } from "lucide-react";

const PackageHero = ({ packageData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const validBannerImages = useMemo(() => 
    packageData?.bannerImages?.filter((image) => image && image?.url !== null) || [],
    [packageData]
  );

  const title = packageData?.packageTitle || "";
  const location = packageData?.region || "";

  // Auto-advance images every 6 seconds
  useEffect(() => {
    if (validBannerImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validBannerImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [validBannerImages.length]);

  const currentImage = validBannerImages[currentImageIndex]?.url || "/placeholder.jpg";

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
      <div className="relative w-full h-[90vh] flex items-stretch bg-slate-900">
        
        {/* Left Side - Featured Large Image */}
        <div className="hidden lg:flex w-3/5 relative overflow-hidden group">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
            <Image
              src={currentImage}
              alt={title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-black/20 to-transparent opacity-40" />
          </motion.div>

          {/* Image Navigation Dots on Image */}
          {validBannerImages.length > 1 && (
            <div className="absolute bottom-8 left-8 z-20 flex gap-2">
              {validBannerImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.3 }}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-10 h-3 bg-brand-green"
                      : "w-3 h-3 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Content & Image Grid */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between p-6 md:p-10 pt-32 md:pt-24 relative z-10">
          
          {/* Top Section - Title & Info */}
          <div className="space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 
                className="text-white font-bold text-4xl md:text-5xl leading-tight"
                style={{ fontFamily: "'Denton Test', serif" }}
              >
                {title}
              </h1>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand-green/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">Destination</p>
                <p className="text-white font-bold text-lg">{location}</p>
              </div>
            </motion.div>

            {/* Info Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-3"
            >
              {/* Duration */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Duration</p>
                <p className="text-white text-xl font-black">{packageData?.nights || "5"}<span className="text-xs text-white/50 ml-1">N</span></p>
              </div>

              {/* Days */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">Days</p>
                <p className="text-white text-xl font-black">{(packageData?.nights || 5) + 1}<span className="text-xs text-white/50 ml-1">D</span></p>
              </div>

              {/* Price */}
              <div className="bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 rounded-xl p-3">
                <p className="text-brand-blue/70 text-xs font-bold uppercase tracking-wider mb-1">From</p>
                <p className="text-white text-lg font-black">₹<span className="text-sm">{Math.floor((packageData?.price || 45000) / 1000)}K</span></p>
              </div>
            </motion.div>
          </div>

          {/* Highlights Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-white/50 text-xs uppercase tracking-wider font-semibold">Package Highlights</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/70 text-sm">Mountain trekking & scenic lake exploration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/70 text-sm">Traditional local culture & heritage tours</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/70 text-sm">Accommodation & daily meals included</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/70 text-sm">Expert guide & 24/7 customer support</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:hidden grid grid-cols-3 gap-3 mb-8"
          >
            {validBannerImages.slice(0, 3).map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.05 }}
                className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-brand-green ring-2 ring-brand-green"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <Image
                  src={image?.url || "/placeholder.jpg"}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Bottom - CTA & Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-start gap-4"
          >
            <button
              onClick={scrollToNext}
              className="group bg-brand-green hover:bg-brand-green/80 text-slate-950 font-bold px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:translate-x-1"
            >
              Explore Package
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/50 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              Scroll to see more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Image Grid - Right side overlay */}
        {validBannerImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:grid absolute bottom-10 right-10 grid-cols-2 gap-3 z-20 max-w-xs"
          >
            {validBannerImages.slice(1, 5).map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index + 1)}
                onHoverStart={() => setHoveredImageIndex(index)}
                onHoverEnd={() => setHoveredImageIndex(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative rounded-lg overflow-hidden border-2 backdrop-blur-sm transition-all ${
                  index + 1 === currentImageIndex
                    ? "border-brand-green ring-2 ring-brand-green w-32 h-32"
                    : "border-white/20 hover:border-white/40 w-28 h-28"
                }`}
              >
                <Image
                  src={image?.url || "/placeholder.jpg"}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {hoveredImageIndex === index && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PackageHero;
