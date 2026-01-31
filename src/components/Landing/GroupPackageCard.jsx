"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Clock, 
  Share2, 
  ChevronRight, 
  Users, 
  Star,
  Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";

const GroupPackageCard = ({ item, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Robust image scavenging logic (consistent with other cards)
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

  const displayImage = validImages[0]?.url || "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80";
  const href = `/packages/${item.region}/${item.packageSlug}?group=true`;

  // Mock "Joined by" count based on ID to keep it consistent
  const joinedCount = useMemo(() => {
    const idNum = parseInt(item.id?.replace(/[^0-9]/g, '') || '0') % 900 + 1000;
    return idNum.toLocaleString();
  }, [item.id]);

  // Split title if it contains "Group" for the blue accent
  const RenderTitle = () => {
    const title = item.packageTitle || "";
    if (title.toLowerCase().includes("group")) {
      const parts = title.split(/(Group)/i);
      return (
        <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-md leading-tight tracking-tight">
          {parts[0]}<br />
          <span className="text-blue-400">{parts[1]} {parts.slice(2).join("")}</span>
        </h2>
      );
    }
    return (
      <h2 className="text-xl md:text-2xl font-black text-white drop-shadow-md leading-tight tracking-tight">
        {title}
      </h2>
    );
  };

  return (
    <div 
      className={cn(
        "relative w-full h-[500px] md:h-[550px] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl group cursor-pointer transition-all duration-500 hover:translate-y-[-8px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className="block w-full h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={displayImage}
            alt={item.packageTitle || "Group Tour"}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/90 via-transparent to-transparent z-0" />
        </div>

        {/* Top Badge Section */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
          <div className="animate-pulse-slow flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full border border-blue-400/30 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <Users className="w-4 h-4 text-white" />
            <span className="text-white text-[10px] font-black tracking-widest uppercase">Group Departure</span>
          </div>
          
          <div className="flex flex-col items-end">
             <button 
               className="p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 transform hover:rotate-12 shadow-md"
               onClick={(e) => { e.preventDefault(); /* Share logic */ }}
             >
               <Share2 className="w-4 h-4 text-white" />
             </button>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col gap-3">
          {/* Location & Duration Tags */}
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-1.5 text-white text-[11px] font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <MapPin className="w-4 h-4 text-red-500 drop-shadow-sm" />
              <span>{(item.region || "").split("-").join(" ")}</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-1.5 text-white text-[11px] font-black uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <Clock className="w-4 h-4 text-blue-500 drop-shadow-sm" />
              <span>{item.days}D / {item.nights}N</span>
            </div>
          </div>

          {/* Title */}
          <div className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            <RenderTitle />
          </div>

          {/* Divider */}
          <div className="w-16 h-1 bg-blue-600 rounded-full shadow-lg" />

          {/* Price & CTA Section */}
          <div className="flex items-end justify-between pt-2">
            <div className="flex flex-col gap-1">
              <p className="text-white/80 text-[9px] font-black tracking-[0.3em] uppercase drop-shadow-md">Starting from</p>
              <div className="flex items-baseline gap-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                  ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                </span>
              </div>
            </div>
            
            <div className="px-5 py-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center gap-2 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:scale-105 transition-all">
              <span>View Details</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          
          {/* Trust Badge */}
          <div className="flex items-center gap-3 pt-5 mt-2 border-t border-white/10 group-hover:border-white/20 transition-colors">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-slate-900 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600" />
                </div>
              ))}
            </div>
            <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Joined by {joinedCount}+ travelers</span>
          </div>
        </div>

        {/* Hover Reveal Extra Info */}
        <div className={cn(
          "absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20 transition-all duration-500",
          item.highlights?.length > 0 ? "" : "hidden",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
            <Compass className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-white text-xl font-black mb-4 tracking-tight drop-shadow-md">
            The Journey Includes
          </h3>
          <ul className="space-y-3 mb-8">
            {item.highlights?.slice(0, 4).map((highlight, idx) => (
              <li key={idx} className="text-white/80 text-sm font-medium flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="px-8 py-4 bg-white text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.2em] transform hover:scale-105 transition-all active:scale-95">
             Explore Itinerary
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GroupPackageCard;
