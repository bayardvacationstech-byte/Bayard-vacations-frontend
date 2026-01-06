"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatPrice } from "@/utils/offerUtils";
import { cn } from "@/lib/utils";
import BadgeSection from "../BadgeSection";

const LandingPackageCard = ({ item, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const images = item.cardImages || [];

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(index);
  };

  // Auto slide
  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  const handleCardClick = (e) => {
    if (
      e.target.closest(".pkg-prev") ||
      e.target.closest(".pkg-next") ||
      e.target.closest(".custom-pagination-dot")
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link
      href={`/packages/${item.region}/${item.packageSlug}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative block h-full overflow-hidden rounded-2xl shadow-lg bg-black hover:shadow-2xl transition-shadow duration-300",
        className
      )}
    >
      {/* IMAGE SECTION */}
      <div className="relative h-[420px] overflow-hidden">
        {/* IMAGES */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            {img?.url && (
              <Image
                src={img.url}
                alt={img?.title || "Package"}
                fill
                priority={index === 0}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 z-10" />

        {/* CUSTOM NAVIGATION BUTTONS */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className={cn(
                "pkg-prev absolute left-3 top-1/2 -translate-y-1/2 z-30",
                "p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl",
                "transition-all duration-500 transform",
                // On mobile: always visible, on desktop: visible on hover
                isMobile
                  ? "opacity-100 translate-x-0 hover:scale-125 hover:bg-white/40"
                  : isHovered
                    ? "opacity-100 translate-x-0 hover:scale-125 hover:bg-white/40"
                    : "opacity-0 -translate-x-4"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5 md:size-6" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className={cn(
                "pkg-next absolute right-3 top-1/2 -translate-y-1/2 z-30",
                "p-2 rounded-full bg-white/20 backdrop-blur-xl text-white shadow-2xl",
                "transition-all duration-500 transform",
                // On mobile: always visible, on desktop: visible on hover
                isMobile
                  ? "opacity-100 translate-x-0 hover:scale-125 hover:bg-white/40"
                  : isHovered
                    ? "opacity-100 translate-x-0 hover:scale-125 hover:bg-white/40"
                    : "opacity-0 translate-x-4"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="size-5 md:size-6" />
            </button>
          </>
        )}

        {/* CUSTOM PAGINATION DOTS - Always visible */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-30 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => goToSlide(idx, e)}
                className={cn(
                  "custom-pagination-dot transition-all duration-300 rounded-full",
                  "focus:outline-none focus:ring-2 focus:ring-white/50",
                  currentIndex === idx
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 z-20">
          <BadgeSection item={item} />
        </div>

        {/* CONTENT OVERLAY */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 text-white">
          {/* Region + Duration */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
              {item.region}
            </span>
            <span className="text-xs font-semibold bg-brand-green/90 backdrop-blur-sm px-3 py-1 rounded-full">
              {item.days}D / {item.nights}N
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold leading-snug line-clamp-2 mb-3 drop-shadow-lg">
            {item.packageTitle.replace(/"/g, "")}
          </h3>

          {/* PRICE LOGIC */}
          {item.offerPrice > 0 ? (
            <div>
              <p className="text-lg font-bold">
                ₹ {formatPrice(item.offerPrice)}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="line-through text-white/60">
                  ₹ {formatPrice(item.basePrice)}
                </span>
                <span className="text-green-400 font-semibold">
                  SAVE ₹ {formatPrice(item.savingsAmount)}
                </span>
              </div>
            </div>
          ) : item.basePrice > 0 ? (
            <p className="text-lg font-bold">₹ {formatPrice(item.basePrice)}</p>
          ) : (
            <p className="text-sm font-semibold">Contact Expert for Price</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default LandingPackageCard;
