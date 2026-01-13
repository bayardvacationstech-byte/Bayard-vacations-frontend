
"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format } from "date-fns";

import { cn, splitCityStr } from "@/lib/utils";
import { formatPrice } from "@/utils/offerUtils";
import useExpandedCard from "../../hooks/useExpandedCard";
import useModal from "../../hooks/useModal";
import BadgeSection from "../BadgeSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PackageCard = ({ item, className, isGroup = false }) => {
  const cities = splitCityStr(item.citiesList || "");
  const visibleCities = useMemo(() => cities.slice(0, 3), [cities]);

  const { openModal, setRegion } = useModal();
  const { isCardExpanded } = useExpandedCard();
  const cardRef = useRef(null);

  const Slot = Link;
  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  const handleContactExpert = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegion(item.region);
    openModal();
  };

  return (
    <Slot
      ref={cardRef}
      href={href}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl sm:rounded-3xl bg-black group",
        className
      )}
    >
      {/* IMAGE SECTION */}
      <div
        className="
          relative w-full overflow-hidden
          aspect-[3/4] sm:aspect-[3/4]
          rounded-2xl sm:rounded-3xl
        "
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: `.swiper-btn-next-${item.id}`,
            prevEl: `.swiper-btn-prev-${item.id}`,
          }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {(item.cardImages || []).map(
            (img, i) =>
              img?.url && (
                <SwiperSlide key={i}>
                  <Image
                    src={img.url}
                    alt={img?.title || "Package Image"}
                    fill
                    priority={i === 0}
                    className="
                      object-cover
                      transition-transform duration-700
                      swiper-slide-active:scale-105
                    "
                  />
                </SwiperSlide>
              )
          )}

          {/* DESKTOP NAV BUTTONS - Only show if multiple images */}
          {item.cardImages?.length > 1 && (
            <>
              <button 
                className={`swiper-btn-prev-${item.id} hidden sm:flex absolute left-3 top-1/2 z-50 -translate-y-1/2 
                  p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl
                  opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 hover:bg-white/40 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button 
                className={`swiper-btn-next-${item.id} hidden sm:flex absolute right-3 top-1/2 z-50 -translate-y-1/2 
                  p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl
                  opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-125 hover:bg-white/40 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </Swiper>

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* BADGES */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 flex gap-2">
        <BadgeSection item={item} />
      </div>

      {/* GLASS INFO PANEL - Optimized for Mobile */}
      <div
        className="
          absolute inset-x-0 bottom-0 z-30
          bg-gradient-to-t from-black/95 via-black/80 to-transparent
          backdrop-blur-lg
          border-t-2 border-brand-blue/30
          rounded-t-2xl sm:rounded-t-3xl
        "
      >
        {/* Accent Color Bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-yellow-400 to-brand-blue"></div>
        
        <div className="relative px-4 sm:px-6 pb-2 sm:pb-4 pt-4 sm:pt-6">
          {/* REGION + DURATION */}
          <div className="mb-2 flex items-center justify-between gap-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-brand-blue/90 to-brand-blue/70 backdrop-blur-sm">
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-white drop-shadow-lg">
                {item.region}
              </span>
            </div>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[11px] font-bold text-white border border-white/30">
              {item.days}D/{item.nights}N
            </span>
          </div>

          {/* TITLE - More compact on mobile */}
          <h3 className="mb-2 sm:mb-3 line-clamp-2 text-xs sm:text-base font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {item.packageTitle}
          </h3>

          {/* PRICE + CTA ROW */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            {/* PRICE OR CONTACT MESSAGE */}
            {(item.offerPrice === 0 || !item.offerPrice) && (item.basePrice === 0 || !item.basePrice) ? (
              <div className="w-full sm:flex-shrink-0 sm:flex-1">
                <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white shadow-lg">
                  <p className="text-[9px] sm:text-sm font-bold leading-tight text-brand-blue">
                    Contact an Expert
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex-shrink-0">
                  <p className="text-base sm:text-xl font-black leading-none text-yellow-400 drop-shadow-lg">
                    ₹{formatPrice(item.offerPrice > 0 ? item.offerPrice : item.basePrice)}
                  </p>
                  {item.offerPrice > 0 && (
                    <p className="mt-0.5 text-[9px] sm:text-[11px] text-white/60 line-through">
                      ₹{formatPrice(item.basePrice)}
                    </p>
                  )}
                </div>

                {/* DISCOUNT BADGE */}
                {item.offerPrice > 0 && item.basePrice > 0 && (
                  <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-brand-accent to-yellow-400 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-black text-black shadow-lg">
                    {Math.round(((item.basePrice - item.offerPrice) / item.basePrice) * 100)}% OFF
                  </span>
                )}
              </div>
            )}

            {/* CTA BUTTONS - Stack on very small screens */}
            <div className="flex w-full sm:w-auto sm:flex-1 items-center gap-3 sm:gap-4">
              <div className="flex-1 rounded-xl bg-brand-blue hover:bg-brand-blue-hovered px-2 sm:px-3 py-1.5 sm:py-2 text-center text-[9px] sm:text-[11px] font-black text-white cursor-pointer transition-all shadow-lg">
                View
              </div>

              {!isGroup && (
                <button
                  onClick={handleContactExpert}
                  className="flex-shrink-0 rounded-xl bg-brand-green hover:bg-brand-green/90 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-black text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] transform hover:scale-105"
                >
                  Call
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Slot>
  );
};

export default PackageCard;

