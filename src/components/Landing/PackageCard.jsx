"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { formatPrice } from "@/utils/offerUtils";
import { cn } from "@/lib/utils";
import BadgeSection from "../BadgeSection";
import Link from "next/link";

const LandingPackageCard = ({ item, className }) => {
  const cardRef = useRef(null);

  const DefaultBasePrice = () => {
    if (item.basePrice === 0)
      return (
        <div className="space-y-1">
          <p className="text-base font-semibold text-gray-900">
            Contact an Expert for Prices
          </p>
        </div>
      );
    return (
      <div className="space-y-1">
        {item.basePrice === 0 ? null : (
          <p className="text-base font-semibold text-gray-900">
            INR {formatPrice(item.basePrice)}
          </p>
        )}
      </div>
    );
  };

  const OfferPrice = () => {
    if (item.offerPrice === 0) return null;
    return (
      <div className="space-y-1">
        <p className="text-base font-semibold text-gray-900">
          INR {formatPrice(item.offerPrice)}
        </p>
        {item.offerPrice > 0 && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 line-through">
              INR {formatPrice(item.basePrice)}
            </p>
            <span className="text-xs font-medium text-green-600">
              SAVE INR {formatPrice(item.savingsAmount)}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Link
      ref={cardRef}
      href={`/packages/${item.region}/${item.packageSlug}`}
      style={{
        maxHeight: cardRef.current?.offsetHeight,
      }}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg bg-white border border-gray-300 h-full group",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative w-full overflow-hidden aspect-[5/3.35]">
        <Swiper
          className="group h-full"
          modules={[Navigation, Pagination]}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            bulletClass:
              "swiper-pagination-bullet custom-bullet !size-1.5 !rounded-full !mx-0.5",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
        >
          {(item.cardImages || []).map(
            (img, i) =>
              img?.url && (
                <SwiperSlide key={i}>
                  <Image
                    alt={img?.title || "NA"}
                    src={img.url}
                    width={1200}
                    height={800}
                    className="size-full object-cover rounded-b-lg"
                  />
                </SwiperSlide>
              )
          )}
          <div className="swiper-button-prev !size-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronLeftIcon className="!size-4" />
          </div>
          <div className="swiper-button-next !size-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRightIcon className="!size-4" />
          </div>

          {/* Custom Pagination Container */}
          <div
            className={cn(
              "group-hover:opacity-100 opacity-100 sm:opacity-0 transition-opacity duration-300 swiper-pagination whitespace-nowrap !bottom-3 !w-auto !left-1/2 !transform !-translate-x-1/2 max-h-3 flex items-center justify-center px-1 !py-1.5 shadow-xl !bg-white !rounded-full",
              {
                "!opacity-0": item.cardImages?.length <= 1,
                "!opacity-50 group-hover:!opacity-100":
                  item.cardImages?.length > 1,
              }
            )}
          ></div>
        </Swiper>
      </div>

      {/* Badges Section */}
      <div className="absolute left-0 top-0 z-10 p-2">
        <div className="animate-fadeIn flex gap-2">
          <BadgeSection item={item} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Country/Region and Duration */}
        <div className="mb-2">
          <div className="flex justify-between items-center gap-2">
            <h2 className="text-xs text-gray-900 uppercase tracking-wide border-2 rounded-full px-2 py-1">
              {item.region}
            </h2>

            <div className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-brand-green text-white">
              {item.days}D/{item.nights}N
            </div>
          </div>
        </div>

        {/* Package Title */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-6 group-hover:underline">
          {item.packageTitle.split('"')}
        </h3>

        {/* Price Section */}
        <div className="mt-auto">
          {item.offerPrice ? <OfferPrice /> : <DefaultBasePrice />}
        </div>
      </div>
    </Link>
  );
};

export default LandingPackageCard;
