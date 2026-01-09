// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Navigation, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import Link from "next/link";
// import packageCardData from "../../data/packageCardData";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { formatPrice } from "@/utils/offerUtils";
// import { cn, splitCityStr } from "@/lib/utils";
// import useExpandedCard from "../../hooks/useExpandedCard";
// import useModal from "../../hooks/useModal";
// import { usePathname } from "next/navigation";
// import BadgeSection from "../BadgeSection";
// import { format } from "date-fns";

// const PackageCard = ({
//   item = packageCardData,
//   className,
//   isGroup = false,
// }) => {
//   const [displayCities, setDisplayCities] = useState(false);
//   const cities = splitCityStr(item.citiesList);
//   const { toggleCardExpansion, isCardExpanded } = useExpandedCard();
//   const { openModal, setRegion } = useModal();
//   const cardRef = useRef(null);
//   const isExpanded = isCardExpanded(item.id);

//   // Memoize the cities display configuration
//   const citiesConfig = React.useMemo(() => {
//     const CITY_LENGTH_THRESHOLD = 7;
//     const DEFAULT_VISIBLE_CITIES = 3;
//     const REDUCED_VISIBLE_CITIES = 2;

//     const hasLongCity = cities.some(
//       (city, idx) =>
//         idx < DEFAULT_VISIBLE_CITIES && city.length > CITY_LENGTH_THRESHOLD
//     );

//     return {
//       visibleCount: hasLongCity
//         ? REDUCED_VISIBLE_CITIES
//         : DEFAULT_VISIBLE_CITIES,
//       hasLongCity,
//       totalCount: cities.length,
//     };
//   }, [cities]);

//   // Reset displayCities when card is collapsed
//   useEffect(() => {
//     if (!isExpanded) {
//       setDisplayCities(false);
//     }
//   }, [isExpanded]);

//   const toggleShowAllCities = (e) => {
//     e.preventDefault();

//     if (!isExpanded) {
//       toggleCardExpansion(item.id);
//       setTimeout(() => {
//         setDisplayCities(true);
//       }, 300);
//     } else {
//       setDisplayCities(false);
//       toggleCardExpansion(null);
//     }
//   };

//   const handleContactExpert = (e) => {
//     e.preventDefault();
//     setRegion(item.region);
//     openModal();
//   };

//   const GroupAdventureDetails = () => {
//     if (isGroup && item.groupAdventure && item.groupAdventure?.tripDates[0]) {
//       return (
//         <div className="flex flex-col sm:grid sm:grid-cols-[1fr_1px_1fr] justify-between px-4 pt-2 text-xs gap-2 sm:gap-8">
//           <p>
//             <span className="font-semibold">Upcoming Date:</span>{" "}
//             {format(
//               new Date(item.groupAdventure?.tripDates[0]?.startDate),
//               "dd MMM yy"
//             )}
//           </p>
//           <div className="border-l border-gray-200 h-full hidden sm:block" />
//           <div>
//             <span className="font-semibold">Total Seats:</span>{" "}
//             {item.groupAdventure?.tripDates[0]?.totalSeats}
//           </div>
//         </div>
//       );
//     }

//     if (isGroup && item.groupAdventure && !item.groupAdventure?.tripDates[0]) {
//       return (
//         <div className="grid grid-cols-1 justify-between px-4 pt-2 text-xs text-muted-foreground">
//           <p>Information not available</p>
//         </div>
//       );
//     }
//   };

//   const Slot = isGroup ? Link : "article";
//   const href = isGroup
//     ? `/packages/${item.region}/${item.packageSlug}${isGroup ? "?group=true" : ""}`
//     : null;

//   return (
//     <Slot
//       ref={cardRef}
//       style={{
//         maxHeight: cardRef.current?.offsetHeight,
//       }}
//       className={cn(
//         "package-card relative flex flex-col overflow-hidden rounded bg-white border border-gray-300 group",
//         className,
//         {
//           "h-full max-h-[1300px]": isGroup,
//         }
//       )}
//       href={href}
//     >
//       {/* Image Section */}
//       <div
//         className={cn(
//           "relative w-full overflow-hidden transition-all duration-300 ease-in-out aspect-[5/3.35]"
//         )}
//       >
//         <Swiper
//           className="group h-full"
//           modules={[Navigation, Pagination]}
//           loop={true}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           pagination={{
//             clickable: true,
//             el: ".swiper-pagination",
//             bulletClass:
//               "swiper-pagination-bullet custom-bullet !size-1.5 !rounded-full !mx-0.5",
//             bulletActiveClass:
//               "swiper-pagination-bullet-active custom-bullet-active",
//           }}
//         >
//           {(item.cardImages || []).map(
//             (img, i) =>
//               img?.url && (
//                 <SwiperSlide key={i}>
//                   <Image
//                     alt={img?.title || "NA"}
//                     src={img.url}
//                     width={1200}
//                     height={800}
//                     className="size-full rounded object-cover"
//                   />
//                 </SwiperSlide>
//               )
//           )}
//           <div className="swiper-button-prev !size-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <ChevronLeftIcon className="!size-4" />
//           </div>
//           <div className="swiper-button-next !size-4 !rounded-full !bg-white !text-black !shadow-md after:!text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <ChevronRightIcon className="!size-4" />
//           </div>

//           {/* Custom Pagination Container */}
//           <div
//             className={cn(
//               "group-hover:opacity-100 opacity-100 sm:opacity-0 transition-opacity duration-300 swiper-pagination whitespace-nowrap !bottom-3 !w-auto !left-1/2 !transform !-translate-x-1/2 max-h-3 flex items-center justify-center px-1 !py-1.5 shadow-xl !bg-white !rounded-full",
//               {
//                 "!opacity-0": item.cardImages?.length <= 1,
//                 "!opacity-50 group-hover:!opacity-100":
//                   item.cardImages?.length > 1,
//               }
//             )}
//           ></div>
//         </Swiper>
//       </div>

//       <div className="absolute left-0 top-0 z-10 p-2">
//         <div className="animate-fadeIn flex gap-2">
//           <BadgeSection item={item} />
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-1 justify-between flex-col py-4 transition-all duration-300 ease-in-out">
//         <div className="flex flex-col px-4 gap-2">
//           {/* Title */}
//           <div
//             className={cn("flex items-center gap-2", {
//               "flex-col items-start": isGroup,
//             })}
//           >
//             {isGroup && (
//               <div className="flex justify-between items-center gap-2 w-full">
//                 <h2 className="text-xs text-gray-900 uppercase tracking-wide border-2 rounded-full px-2 py-1">
//                   {item.region}
//                 </h2>

//                 <div className="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-brand-green text-white">
//                   {item.days}D/{item.nights}N
//                 </div>
//               </div>
//             )}

//             <h3
//               className={cn(
//                 "text-sm font-medium text-black line-clamp-2 flex items-start group-hover:underline",
//                 {
//                   "col-span-3": isGroup,
//                   "min-h-10": !isGroup,
//                 }
//               )}
//               id="package-title"
//             >
//               {item.packageTitle.split('"')}
//             </h3>
//           </div>

//           {/* Duration */}
//           {!isGroup && (
//             <p className="mb-2 text-xs text-[#99A1AF] font-medium tracking-wider">
//               {item.days} days & {item.nights} nights
//             </p>
//           )}
//         </div>

//         {/* Cities/Locations */}
//         {!isGroup && (
//           <div className="flex flex-col gap-4">
//             <div className="h-px bg-gray-200" />

//             {/* Cities/Locations */}
//             <div
//               className={cn(
//                 "flex gap-2 px-4 transition-all duration-300 ease-in-out whitespace-nowrap",
//                 {
//                   "py-4 flex-wrap": isExpanded,
//                 }
//               )}
//             >
//               {(isExpanded && displayCities
//                 ? cities
//                 : cities.slice(0, citiesConfig.visibleCount)
//               ).map((city, index) => (
//                 <span
//                   key={index}
//                   className="animate-fadeIn rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium capitalize text-gray-700"
//                 >
//                   {city?.toLowerCase()}
//                 </span>
//               ))}
//               {!isExpanded &&
//                 citiesConfig.totalCount > citiesConfig.visibleCount && (
//                   <span
//                     onClick={toggleShowAllCities}
//                     className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-700 hover:bg-gray-200"
//                   >
//                     +{citiesConfig.totalCount - citiesConfig.visibleCount}
//                   </span>
//                 )}
//               {isExpanded &&
//                 displayCities &&
//                 citiesConfig.totalCount > citiesConfig.visibleCount && (
//                   <span
//                     onClick={toggleShowAllCities}
//                     className="cursor-pointer rounded-full border border-[#E3002275] bg-[#E300220F] px-3 py-1 text-[10px] font-medium text-[#E3002275] hover:bg-gray-300"
//                   >
//                     Show less
//                   </span>
//                 )}
//             </div>

//             <div className="h-px bg-gray-200" />
//           </div>
//         )}

//         {/* Group Adventure Details - Show when icon is present and if home page */}
//         <GroupAdventureDetails />

//         <div className="flex flex-col justify-end gap-3">
//           {/* Price */}
//           <div className="mt-1 px-4">
//             {item.offerPrice ? (
//               <div>
//                 <div
//                   className={cn("flex items-center gap-2", {
//                     "justify-between": isGroup,
//                   })}
//                 >
//                   <div className="space-y-0">
//                     {item.offerPrice > 0 && (
//                       <span className="text-[10px] text-gray-600">
//                         Starts @
//                       </span>
//                     )}
//                     {item.offerPrice === 0 ? null : (
//                       <p className="text-base font-semibold tracking-tight leading-4">
//                         INR {formatPrice(item.offerPrice)}
//                       </p>
//                     )}
//                   </div>

//                   {item.offerPrice > 0 && (
//                     <div className="flex translate-y-5 flex-col items-center gap-2 sm:translate-y-0 sm:flex-row">
//                       <p className="text-sm text-muted-foreground line-through">
//                         INR {formatPrice(item.basePrice)}
//                       </p>
//                       <span className="h-fit rounded-md bg-green-100 p-0.5 text-xs font-medium text-[#237648]">
//                         SAVE INR. {formatPrice(item.savingsAmount)}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-0">
//                 {item.basePrice > 0 && (
//                   <span className="text-[10px] text-gray-600">Starts @</span>
//                 )}
//                 {item.basePrice === 0 ? null : (
//                   <p className="text-base font-semibold tracking-tight leading-4">
//                     INR {formatPrice(item.basePrice)}
//                   </p>
//                 )}
//               </div>
//             )}
//             {isGroup && (item.offerPrice || item.basePrice) > 0 && (
//               <div className="text-xs text-muted-foreground">
//                 Per Person Twin Sharing
//               </div>
//             )}
//           </div>
//           {/* Action Button(s) */}
//           {!isGroup && (
//             <>
//               {item.offerPrice === 0 ||
//               (!item.offerPrice && item.basePrice === 0) ? (
//                 <div className="px-4">
//                   <div className="mb-2 font-semibold">
//                     Contact an Expert for Prices
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <Link
//                       href={`/packages/${item.region}/${item.packageSlug}${isGroup ? "?group=true" : ""}`}
//                     >
//                       <div className="w-full rounded border-2 border-gray-300 bg-white px-4 py-2 whitespace-nowrap text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50">
//                         Show details
//                       </div>
//                     </Link>
//                     <button
//                       onClick={handleContactExpert}
//                       className="w-full rounded border border-[#CCDAF0] bg-brand-blue px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-brand-blue-hovered"
//                     >
//                       Contact
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="px-4 flex justify-between items-center gap-2">
//                   <Link
//                     href={`/packages/${item.region}/${item.packageSlug}${isGroup ? "?group=true" : ""}`}
//                     className="w-full"
//                   >
//                     <div className="whitespace-nowrap rounded bg-brand-blue border-[#CCDAF0] px-4 py-2 text-center text-xs font-medium text-white transition hover:bg-brand-blue-hovered">
//                       Show details
//                     </div>
//                   </Link>
//                   <button className="w-full" onClick={handleContactExpert}>
//                     <div className="w-full whitespace-nowrap rounded bg-[#F9F9F9] border border-[#CAD5E2] px-4 py-2 text-center text-xs font-medium transition hover:bg-[#F9F9F9]/40">
//                       Book now
//                     </div>
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </Slot>
//   );
// };

// export default PackageCard;




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

  const Slot = isGroup ? Link : "article";
  const href = isGroup
    ? `/packages/${item.region}/${item.packageSlug}?group=true`
    : `/packages/${item.region}/${item.packageSlug}`;

  const handleContactExpert = (e) => {
    e.preventDefault();
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
        "
      >
        {/* Accent Color Bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-brand-accent to-brand-blue"></div>
        
        <div className="relative px-2 sm:px-4 pb-2 sm:pb-4 pt-4 sm:pt-6">
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
                <div className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white shadow-lg">
                  <p className="text-[9px] sm:text-sm font-bold leading-tight text-brand-blue">
                    Contact an Expert
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex-shrink-0">
                  <p className="text-base sm:text-xl font-black leading-none text-brand-accent drop-shadow-lg">
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
            <div className="flex w-full sm:w-auto sm:flex-1 items-center gap-1.5 sm:gap-2">
              {isGroup ? (
                <div className="flex-1 rounded-lg bg-brand-blue hover:bg-brand-blue-hovered px-2 sm:px-3 py-1.5 sm:py-2 text-center text-[9px] sm:text-[11px] font-black text-white cursor-pointer transition-all shadow-lg">
                  View
                </div>
              ) : (
                <Link
                  href={href}
                  className="flex-1 rounded-lg bg-brand-blue hover:bg-brand-blue-hovered px-2 sm:px-3 py-1.5 sm:py-2 text-center text-[9px] sm:text-[11px] font-black text-white transition-all shadow-lg"
                >
                  View
                </Link>
              )}

              {!isGroup && (
                <button
                  onClick={handleContactExpert}
                  className="flex-shrink-0 rounded-lg bg-brand-green hover:bg-brand-green/90 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[11px] font-black text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] transform hover:scale-105"
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

