"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PremiumPackageCard = ({ item, className, isGroup = false }) => {
  const [swiper, setSwiper] = useState(null);

  // Robust image scavenging logic (consistent with LandingPackageCard)
  const validImages = useMemo(() => {
    const scavenger = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return [val];
    };

    const rawImages = [
      ...scavenger(item.cardImages),
      ...scavenger(item.bannerImages),
      ...scavenger(item.images),
      ...scavenger(item.imageRefs),
      ...scavenger(item.itineraries?.flatMap(it => it.imageRefs || [])),
      ...(item.cardImage ? [{ url: item.cardImage }] : []),
      ...(item.cardImageRef ? [{ url: item.cardImageRef }] : []),
      ...(item.bannerImage ? [{ url: item.bannerImage }] : []),
      ...(item.image ? [{ url: item.image }] : []),
      ...(item.imageUrl ? [{ url: item.imageUrl }] : []),
      ...(item.featuredImage ? [{ url: item.featuredImage }] : []),
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
  }, [item]);

  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  // Helper to extract relevant tags for the top section
  const topTags = useMemo(() => {
    const tags = [];
    if (item.trending) tags.push({ label: "Hot Right Now", icon: "✨", type: "trending" });
    if (item.curated) tags.push({ label: "Signature Pick", icon: "🏆", type: "curated" });
    
    // Scavenge for other tags like budget/value
    const hasBudgetTag = (item.packageTags || []).some(t => t.toLowerCase().includes('budget') || t.toLowerCase().includes('value'));
    if (hasBudgetTag) {
      tags.push({ label: "Value Choice", icon: "💰", type: "value" });
    }

    // Add tailored tag
    const tailored = Array.isArray(item.tailored_tag) ? item.tailored_tag[0] : item.tailored_tag;
    if (tailored) {
        tags.push({ 
            label: tailored.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
            icon: "📍",
            type: "tailored"
        });
    }

    return tags.slice(0, 2); // Show max 2 at top
  }, [item]);

  return (
    <div className={cn(
      "travel-card group w-full relative overflow-hidden h-[480px] sm:h-[520px] rounded-[28px] bg-black shadow-xl hover:shadow-2xl transition-all duration-500",
      className
    )}>
      <Link href={href} className="block w-full h-full">
        {/* Full Priority Image / Swiper */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            onSwiper={setSwiper}
            loop={validImages.length > 1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !size-1.5 !bg-white !opacity-40 !mx-1",
              bulletActiveClass: "!opacity-100 !w-5 !rounded-full transition-all",
            }}
            className="h-full w-full"
          >
            {validImages.length > 0 ? (
              validImages.map((img, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={img.url}
                    alt={item.packageTitle || "Package"}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <span className="text-white/20">No Images</span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          
          {/* Edge Vignette */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Top Tags - Glassmorphism & Highlighting */}
        <div className="absolute top-5 left-5 right-5 z-20 flex flex-wrap gap-2">
          {topTags.map((tag, idx) => (
            <div 
              key={idx}
              className={cn(
                "tag inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase text-white backdrop-blur-2xl border transition-all duration-300 hover:translate-y-[-2px] shadow-lg",
                tag.type === "trending" && "bg-orange-500/60 border-orange-400 shadow-orange-500/40",
                tag.type === "curated" && "bg-rose-600/70 border-rose-400 shadow-rose-600/40",
                tag.type === "value" && "bg-blue-600/70 border-blue-400 shadow-blue-600/40",
                tag.type === "tailored" && "bg-violet-600/60 border-violet-400 shadow-violet-600/40"
              )}
            >
              <span className="text-xs filter drop-shadow-md">{tag.icon}</span>
              <span className="drop-shadow-sm">{tag.label}</span>
            </div>
          ))}
        </div>

        {/* Floating Middle Badges */}
        <div className="absolute bottom-[135px] left-5 right-5 z-20 flex justify-between items-center">
          <div className="location-badge inline-flex items-center px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white font-black text-xs tracking-wider uppercase transition-all hover:bg-black/60 hover:scale-105">
            {item.region?.split("-").join(" ")}
          </div>
          <div className="duration-badge px-4 py-2 bg-blue-600/90 backdrop-blur-md border border-white/30 rounded-full text-white font-black text-[13px] shadow-lg shadow-blue-600/40 transition-all hover:scale-105 hover:shadow-blue-600/60">
            {item.days}D / {item.nights}N
          </div>
        </div>

        {/* Bottom Content Panel - Frosted Glass */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 pb-7 z-20 bg-white/15 backdrop-blur-2xl border-t border-white/30"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 15%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%)"
          }}
        >
          <h2 className="text-2xl font-[900] text-white mb-2 leading-tight drop-shadow-lg line-clamp-1 tracking-tight">
            {item.packageTitle}
          </h2>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
              <div className="text-3xl font-[900] text-white drop-shadow-lg flex items-baseline gap-1">
                <span className="text-xl font-bold">₹</span>
                {formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
              </div>
              {item.offerPrice > 0 && (
                <div className="text-xs text-white/60 line-through font-bold ml-1">
                  ₹{formatPrice(item.basePrice)}
                </div>
              )}
            </div>
            
            <div className="cta-button w-12 h-12 rounded-2xl bg-white/90 shadow-xl flex items-center justify-center text-slate-900 transition-all duration-300 group-hover:translate-x-1 offset-x-[-4px] hover:scale-110 hover:bg-white">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Bottom Pagination container (to match reference visual) */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 swiper-pagination !static !w-auto h-1.5" />
      </Link>
    </div>
  );
};

export default PremiumPackageCard;
