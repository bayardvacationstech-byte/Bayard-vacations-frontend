"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { 
  Heart, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Star,
  Users,
  Compass,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";
import BadgeSection from "@/components/BadgeSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ThemedPackageCard = ({ item, theme = "romantic", className, isGroup = false }) => {
  const cardRef = useRef(null);

  // Theme Styles Configuration
  const themeStyles = {
    romantic: {
      card: "border-rose-100 hover:rotate-1 hover:-translate-y-2 hover:shadow-rose-100/50",
      title: "font-playfair text-rose-600 italic font-bold",
      featureDot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]",
      featureText: "text-rose-800 italic",
      price: "text-rose-600 font-playfair",
      cta: "bg-gradient-to-br from-rose-400 to-rose-700 rounded-[50%_50%_50%_12px] shadow-rose-200",
      badge: "bg-rose-50 text-rose-600",
      icon: <Heart className="w-4 h-4 fill-rose-500" />
    },
    group: {
      card: "border-emerald-100 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-emerald-100/50 -rotate-1 hover:rotate-0",
      title: "font-space-grotesk text-emerald-800 uppercase tracking-tight",
      featureDot: "bg-emerald-500 rounded-sm rotate-45",
      featureText: "text-emerald-700 font-medium",
      price: "text-emerald-800 font-space-grotesk",
      cta: "bg-gradient-to-br from-emerald-500 to-emerald-800 rounded-xl rotate-3",
      badge: "bg-emerald-100 text-emerald-800",
      icon: <Users className="w-4 h-4 fill-emerald-600" />
    },
    family: {
      card: "border-blue-100 hover:-translate-y-2 hover:shadow-blue-100/50 rounded-[30px_30px_30px_60px]",
      title: "font-montserrat text-blue-700 font-extrabold",
      featureDot: "bg-orange-400",
      featureText: "text-blue-800 font-semibold",
      price: "text-blue-700 font-bold",
      cta: "bg-gradient-to-br from-blue-500 to-orange-500 rounded-full animate-bounce-subtle",
      badge: "bg-blue-100 text-blue-700 rounded-xl",
      icon: <Sparkles className="w-4 h-4 fill-blue-500" />
    },
    solo: {
      card: "border-slate-200 hover:-translate-y-2 hover:shadow-slate-200/50 bg-gradient-to-b from-white to-slate-50",
      title: "font-crimson text-slate-800 font-semibold tracking-tight",
      featureDot: "bg-transparent border-2 border-slate-600 h-2 w-2",
      featureText: "text-slate-600 italic font-crimson",
      price: "text-slate-800 font-crimson font-bold",
      cta: "bg-slate-800 rounded-sm shadow-[4px_4px_0px_0px_#cbd5e0] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none",
      badge: "bg-slate-100 border border-slate-200 text-slate-600",
      icon: <MapPin className="w-4 h-4 text-slate-500" />
    },
    elite: {
      card: "border-amber-100 hover:-translate-y-2 hover:shadow-amber-100/50 bg-gradient-to-br from-white to-amber-50/30",
      title: "font-playfair text-amber-900 font-normal tracking-wide",
      featureDot: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-200",
      featureText: "text-amber-800 font-medium",
      price: "text-amber-700 font-playfair",
      cta: "bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg",
      badge: "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 text-amber-700",
      icon: <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
    },
    relax: {
      card: "border-green-100 hover:-translate-y-2 hover:shadow-green-100/50 bg-gradient-to-b from-white to-green-50/30",
      title: "font-montserrat text-green-700 font-light tracking-wider",
      featureDot: "bg-green-300",
      featureText: "text-green-800 font-light",
      price: "text-green-700 font-light",
      cta: "bg-gradient-to-br from-green-400 to-green-700 rounded-full shadow-green-200",
      badge: "bg-green-100/60 backdrop-blur-md text-green-800",
      icon: <Sparkles className="w-4 h-4 fill-green-400" />
    },
    explore: {
      card: "border-orange-100/50 hover:rotate-1 hover:-translate-y-2 hover:shadow-orange-100/50 bg-gradient-to-br from-[#fffaf0] to-white [clip-path:polygon(0_0,100%_0,100%_95%,95%_100%,0_100%)]",
      title: "font-space-grotesk text-orange-900 uppercase font-bold tracking-wider",
      featureDot: "bg-orange-500 [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] h-2.5 w-2.5",
      featureText: "text-orange-900 font-medium",
      price: "text-orange-800 font-space-grotesk",
      cta: "bg-gradient-to-br from-orange-400 to-orange-800 [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]",
      badge: "bg-yellow-100 text-orange-900 [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)] px-5",
      icon: <Compass className="w-4 h-4 text-orange-600" />
    },
    religious: {
      card: "border-amber-100 hover:-translate-y-2 hover:shadow-amber-100/50 bg-gradient-to-b from-white via-amber-50/50 to-amber-100/50",
      title: "font-crimson text-amber-900 font-normal tracking-tight",
      featureDot: "bg-radial-gradient from-amber-300 to-amber-600 shadow-amber-200",
      featureText: "text-amber-900 font-crimson italic",
      price: "text-amber-900 font-crimson",
      cta: "bg-gradient-to-br from-amber-400 to-amber-700 rounded-full",
      badge: "bg-amber-50 border border-amber-200 text-amber-800",
      icon: <Info className="w-4 h-4 fill-amber-500" />
    },
    educational: {
      card: "border-slate-200 hover:-translate-y-2 hover:shadow-slate-200/50 bg-white relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[repeating-linear-gradient(45deg,#e53e3e,#e53e3e_10px,#ffffff_10px,#ffffff_20px,#3182ce_20px,#3182ce_30px,#ffffff_30px,#ffffff_40px)] before:opacity-30",
      title: "font-crimson text-slate-800 font-bold",
      featureDot: "bg-slate-600 rounded-none h-1.5 w-1.5",
      featureText: "text-slate-700 font-crimson",
      price: "text-slate-800 font-playfair font-bold",
      cta: "bg-slate-800 rounded-md",
      badge: "bg-purple-50 border border-purple-100 text-purple-700 font-crimson",
      icon: <Info className="w-4 h-4 fill-purple-500" />
    }
  };

  const style = themeStyles[theme] || themeStyles.romantic;

  // Image Scavenger logic
  const validImages = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...(item.cardImage ? [{ url: item.cardImage }] : []),
      ...(item.cardImageRef ? [{ url: item.cardImageRef }] : []),
    ];

    const seen = new Set();
    return rawImages
      .map(img => {
        const url = typeof img === "string" ? img : img?.url;
        return url ? { url } : null;
      })
      .filter(img => {
        if (!img?.url || seen.has(img.url)) return false;
        seen.add(img.url);
        return true;
      });
  }, [item.cardImages, item.cardImage, item.cardImageRef]);

  const regionSlug = useMemo(() => {
    if (item.regionSlug) return item.regionSlug;
    if (!item.region) return "unknown";
    return item.region.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }, [item.region, item.regionSlug]);

  const href = isGroup
    ? `/packages/${regionSlug}/${item.packageSlug}?group=true`
    : `/packages/${regionSlug}/${item.packageSlug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <Link href={href} className="block h-full group">
        <div className={cn(
          "relative bg-white rounded-[30px] overflow-hidden transition-all duration-500 h-full flex flex-col border shadow-xl bg-white",
          style.card,
          className
        )}>
          {/* Card Image Area */}
          <div className="relative h-[240px] sm:h-[320px] overflow-hidden group/img">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              loop={validImages.length > 1}
              autoplay={{ delay: 5000 }}
              navigation={{
                nextEl: `.swiper-next-${item.id}`,
                prevEl: `.swiper-prev-${item.id}`,
              }}
              className="h-full w-full"
            >
              {validImages.length > 0 ? (
                validImages.map((img, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={img.url}
                      alt={item.packageTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="h-full w-full bg-slate-100 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-slate-300" />
                </div>
              )}
            </Swiper>

            {/* Image Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 pointer-events-none" />
            
            {/* Top Overlays */}
            <div className="absolute inset-x-5 top-5 flex justify-between items-start z-20">
              <BadgeSection item={item} />
              
              <div className={cn(
                "px-3 py-1.5 flex items-center gap-1.5 rounded-full font-black text-[10px] shadow-xl backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                style.badge
              )}>
                {style.icon}
                <span>4.9</span>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            {validImages.length > 1 && (
              <>
                <button className={cn(
                  `swiper-prev-${item.id} absolute left-4 top-1/2 -translate-y-1/2 z-30`,
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                )}>
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button className={cn(
                  `swiper-next-${item.id} absolute right-4 top-1/2 -translate-y-1/2 z-30`,
                  "w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300",
                  "opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                )}>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            <div className="absolute inset-x-5 bottom-5 flex justify-between items-center z-20">
              <div className="flex items-center gap-2 text-white font-bold drop-shadow-md">
                <MapPin className="w-4 h-4" />
                <span className="capitalize">{item.location || regionSlug.split("-").join(" ")}</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.days}D / {item.nights}N</span>
              </div>
            </div>
          </div>

          {/* Card Content Area */}
          <div className="p-8 flex-1 flex flex-col">
            <h3 className={cn("text-2xl mb-6 leading-tight", style.title)}>
              "{item.packageTitle}"
            </h3>

            <div className="space-y-3 mb-8">
              {(item.highlights || ["Bespoke Experiences", "Luxury Accommodations", "Private Transfers"]).slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={cn("h-2 w-2 rounded-full shrink-0", style.featureDot)} />
                  <span className={cn("text-sm transition-colors", style.featureText)}>{hl}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Curated Price</p>
                <p className={cn("text-2xl font-black", style.price)}>
                  {item.offerPrice || item.basePrice ? `₹${formatPrice(item.offerPrice || item.basePrice)}` : "Contact for Pricing"}
                </p>
              </div>
              <button className={cn("w-14 h-14 flex items-center justify-center text-white transition-all transform group-hover:scale-110", style.cta)}>
                <ChevronRight className="w-7 h-7 stroke-[3px]" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ThemedPackageCard;
