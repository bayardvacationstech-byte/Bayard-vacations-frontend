"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Heart, Share2, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";

const GroupPackageCard = ({ item, className }) => {
  // Robust image scavenging logic
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

  const displayImage = validImages[0]?.url || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200";
  const href = `/packages/${item.region}/${item.packageSlug}?group=true`;

  return (
    <div className={cn(
      "relative group h-[520px] w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl bg-slate-900 transition-all duration-700 hover:shadow-brand-blue/20",
      className
    )}>
      <Link href={href} className="block w-full h-full">
        {/* Background Image - Full height */}
        <div className="absolute inset-0 bg-slate-800">
          <Image
            src={displayImage}
            alt={item.packageTitle || "Group Tour"}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle top gradient for header clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
          
          {/* Strong bottom gradient for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />
        </div>

        {/* Top Badges & Actions */}
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="px-4 py-1.5 rounded-full bg-brand-blue/90 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                Group Departure
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-brand-blue transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area - Bottom Docked & Transparent (No solid box) */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-8 md:p-10 flex flex-col gap-2 md:gap-4">
          {/* Location & Duration Badges */}
          <div className="flex items-center gap-3 mb-1">
             <div className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {(item.region || "").split("-").join(" ")}
                </span>
             </div>
             <div className="w-1 h-1 rounded-full bg-white/30" />
             <div className="flex items-center gap-1.5 text-white/90">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {item.days}D / {item.nights}N
                </span>
             </div>
          </div>

          {/* Title - Large & Impactful */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] tracking-tight group-hover:text-brand-blue transition-colors duration-300">
            {item.packageTitle}
          </h3>

          {/* Footer - Price & CTA (Glassy Row) */}
          <div className="flex items-center justify-between mt-4 md:mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-[8px] md:text-[9px] font-black text-white/50 uppercase tracking-[0.3em] mb-1">
                Fixed Investment
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-4xl font-extrabold text-white tracking-tighter">
                  ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                </span>
                <span className="text-[10px] font-medium text-white/40 mb-1">/ person</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-6 py-4 rounded-2xl bg-brand-blue text-white text-[11px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.3)] group-active:scale-95 transition-all flex items-center gap-2 group/btn">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Highlight Decoration */}
        <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand-blue/30 rounded-[2.5rem] md:rounded-[3.5rem] transition-all duration-700 pointer-events-none z-30" />
      </Link>
    </div>
  );
};

export default GroupPackageCard;
