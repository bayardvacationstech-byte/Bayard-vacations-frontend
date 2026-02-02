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
  Info,
  Crown,
  CheckCircle,
  Tent,
  Landmark,
  Waves,
  Mountain,
  Smile,
  University,
  Church
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
      card: "border-orange-100 hover:rotate-1 hover:shadow-orange-200/40 rounded-[40px_15px_40px_15px] bg-gradient-to-br from-white to-orange-50/20 transition-all duration-500",
      title: "font-sans text-slate-900 font-black tracking-tight",
      featureDot: "bg-orange-500 ring-4 ring-orange-100",
      featureText: "text-slate-700 font-medium",
      price: "text-orange-600 font-black",
      cta: "bg-gradient-to-br from-orange-500 to-pink-500 rounded-[15px_30px_15px_30px] shadow-lg shadow-orange-200/50",
      badge: "bg-white/80 backdrop-blur-md text-orange-600 rounded-full border border-orange-100",
      icon: <Smile className="w-4 h-4 fill-orange-500 text-white stroke-[3px]" />
    },
    solo: {
      card: "border-purple-500/10 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] solo-card",
      title: "font-display text-white font-bold tracking-tight",
      featureDot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]",
      featureText: "text-gray-300 font-medium",
      price: "text-white font-display",
      cta: "bg-gradient-to-br from-purple-500 to-purple-800 group-hover:from-aurora-400 group-hover:to-purple-600 rounded-lg",
      badge: "bg-purple-600 text-white font-bold uppercase tracking-wider px-4 [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)]",
      icon: <Compass className="w-4 h-4 text-aurora-400" />
    },
    elite: {
      card: "bg-[#0a0a0a] border-white/5 hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.1)] transition-all duration-700 group overflow-hidden",
      title: "font-serif text-white group-hover:text-amber-500 transition-colors tracking-tight",
      featureDot: "bg-amber-500 rounded-none h-1 w-1",
      featureText: "text-gray-400 font-light",
      price: "text-amber-500 font-serif font-bold",
      cta: "bg-amber-500 text-black hover:bg-white hover:text-black transition-all duration-500 rounded-none h-12 w-12 flex items-center justify-center p-0",
      badge: "bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold tracking-[0.2em] px-4",
      icon: <Crown className="w-4 h-4 text-amber-500" />
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
    exploration: {
      card: "bg-white border-2 border-transparent hover:border-terra-500/20 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden",
      title: "font-sans text-charcoal font-bold tracking-tight",
      featureDot: "bg-sand-500 rounded-full h-1.5 w-1.5 shadow-[0_0_8px_rgba(233,196,106,0.6)]",
      featureText: "text-gray-600 font-medium",
      price: "text-terra-600 font-bold",
      cta: "bg-charcoal text-white hover:bg-terra-500 transition-colors rounded-full h-12 w-12 flex items-center justify-center p-0",
      badge: "bg-gradient-to-br from-terra-500 to-terra-600 text-white font-bold tracking-wider px-4 [clip-path:polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)] py-2 pb-4",
      icon: <Mountain className="w-4 h-4 text-white" />
    },
    religious: {
      card: "border-burgundy-500/10 hover:-translate-y-2 hover:shadow-2xl bg-white card-sacred",
      title: "font-serif text-burgundy-700 font-bold tracking-tight",
      featureDot: "bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.4)]",
      featureText: "text-stone-600 font-medium italic font-serif",
      price: "text-burgundy-700 font-serif",
      cta: "bg-burgundy-600 hover:bg-burgundy-700 rounded-full",
      badge: "glass-sacred text-burgundy-700 font-bold uppercase tracking-wider px-4",
      icon: <Church className="w-4 h-4 text-gold-600" />
    },
    educational: {
      card: "border-indigo-900/10 hover:-translate-y-2 hover:shadow-indigo-950/10 bg-white rounded-sm architect-border transition-all duration-500",
      title: "font-serif text-indigo-950 font-bold tracking-tight",
      featureDot: "bg-amber-400 rounded-none h-1.5 w-1.5",
      featureText: "text-slate-600 font-serif",
      price: "text-indigo-900 font-serif font-bold",
      cta: "bg-gradient-to-br from-indigo-950 to-indigo-800 rounded-sm shadow-indigo-900/10",
      badge: "bg-amber-50 border border-amber-200 text-amber-700 font-bold tracking-widest px-3",
      icon: <University className="w-4 h-4 text-amber-600" />
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
