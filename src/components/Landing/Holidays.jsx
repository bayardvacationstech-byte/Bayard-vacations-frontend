// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import { Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import PackageCard from "@/components/Landing/PackageCard";
// import Container from "@/components/ui/Container";
// import { Button } from "@/components/ui/button";
// import { MoveLeft, MoveRight } from "lucide-react";
// import { useCuratedPackages } from "@/hooks/packages";
// import AnimatedText from "./AnimatedText";
// import { Skeletons } from "../Skeleton";
// import { cn } from "@/lib/utils";
// import { ANIMATED_TEXT } from "@/config";

// const Holidays = ({
//   initialInternationalPackages = [],
//   initialDomesticPackages = [],
// }) => {
//   const [swiper, setSwiper] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeTab, setActiveTab] = useState("international");
//   const [filterType, setFilterType] = useState("curated"); // Will be updated by useEffect
//   const [mounted, setMounted] = useState(false);

//   // Get curated packages for both domestic and international
//   const { packages: internationalPackages, isLoading: internationalLoading } =
//     useCuratedPackages("international", initialInternationalPackages);
//   const { packages: domesticPackages, isLoading: domesticLoading } =
//     useCuratedPackages("domestic", initialDomesticPackages);

//   // Combine packages based on active tab
//   const curatedPackages = useMemo(() => {
//     if (activeTab === "international") {
//       return internationalPackages;
//     } else {
//       return domesticPackages;
//     }
//   }, [activeTab, internationalPackages, domesticPackages]);

//   const isLoading = internationalLoading || domesticLoading;

//   // Filter packages based on selected filter type
//   const packages = useMemo(() => {
//     switch (filterType) {
//       case "trending":
//         return curatedPackages.filter((pkg) => pkg.trending);
//       case "curated":
//         return curatedPackages
//           .filter((pkg) => pkg.curated)
//           .sort((a, b) => a.basePrice - b.basePrice);
//       case "bestseller":
//         return curatedPackages.filter((pkg) => pkg.bestseller);
//       case "underrated":
//         return curatedPackages.filter(
//           (pkg) => pkg.packageTags && pkg.packageTags.includes("underrated")
//         );
//       case "visafree":
//         return curatedPackages.filter(
//           (pkg) => pkg.packageTags && pkg.packageTags.includes("visafree")
//         );
//       case "value":
//         return curatedPackages.filter(
//           (pkg) => pkg.packageTags && pkg.packageTags.includes("value")
//         );
//       default:
//         return curatedPackages.filter((pkg) => pkg.curated);
//     }
//   }, [curatedPackages, filterType]);

//   // Check if there are packages for each filter type
//   const hasTrendingPackages = curatedPackages.some((pkg) => pkg.trending);
//   const hasCuratedPackages = curatedPackages.some((pkg) => pkg.curated);
//   const hasBestsellerPackages = curatedPackages.some((pkg) => pkg.bestseller);
//   const hasUnderratedPackages = curatedPackages.some(
//     (pkg) => pkg.packageTags && pkg.packageTags.includes("underrated")
//   );
//   const hasVisaFreePackages = curatedPackages.some(
//     (pkg) => pkg.packageTags && pkg.packageTags.includes("visafree")
//   );
//   const hasValuePackages = curatedPackages.some(
//     (pkg) => pkg.packageTags && pkg.packageTags.includes("value")
//   );

//   // Set initial filter type based on available filters
//   useEffect(() => {
//     if (!mounted || (!isLoading && curatedPackages.length > 0)) {
//       if (activeTab === "international") {
//         // For international, default to curated
//         if (hasCuratedPackages) {
//           setFilterType("curated");
//         } else if (hasTrendingPackages) {
//           setFilterType("trending");
//         } else if (hasBestsellerPackages) {
//           setFilterType("bestseller");
//         } else if (hasVisaFreePackages) {
//           setFilterType("visafree");
//         } else if (hasValuePackages) {
//           setFilterType("value");
//         } else if (hasUnderratedPackages) {
//           setFilterType("underrated");
//         }
//       } else {
//         // For domestic, use the original priority order
//         if (hasVisaFreePackages) {
//           setFilterType("visafree");
//         } else if (hasTrendingPackages) {
//           setFilterType("trending");
//         } else if (hasCuratedPackages) {
//           setFilterType("curated");
//         } else if (hasBestsellerPackages) {
//           setFilterType("bestseller");
//         } else if (hasValuePackages) {
//           setFilterType("value");
//         } else if (hasUnderratedPackages) {
//           setFilterType("underrated");
//         }
//       }
//     }
//   }, [
//     mounted,
//     isLoading,
//     curatedPackages,
//     activeTab,
//     hasVisaFreePackages,
//     hasTrendingPackages,
//     hasCuratedPackages,
//     hasBestsellerPackages,
//     hasValuePackages,
//     hasUnderratedPackages,
//   ]);

//   // Set mounted state to prevent hydration issues
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 576);
//     };

//     // Initial check
//     handleResize();

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Clean up
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [mounted]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     // Auto-select the first available filter when switching tabs
//     if (tab === "international") {
//       // For international, prioritize curated
//       if (hasCuratedPackages) {
//         setFilterType("curated");
//       } else if (hasTrendingPackages) {
//         setFilterType("trending");
//       } else if (hasBestsellerPackages) {
//         setFilterType("bestseller");
//       } else if (hasVisaFreePackages) {
//         setFilterType("visafree");
//       } else if (hasUnderratedPackages) {
//         setFilterType("underrated");
//       } else {
//         setFilterType("curated"); // fallback to curated
//       }
//     } else {
//       // For domestic, use the original priority order
//       if (hasVisaFreePackages) {
//         setFilterType("visafree");
//       } else if (hasTrendingPackages) {
//         setFilterType("trending");
//       } else if (hasCuratedPackages) {
//         setFilterType("curated");
//       } else if (hasBestsellerPackages) {
//         setFilterType("bestseller");
//       } else if (hasUnderratedPackages) {
//         setFilterType("underrated");
//       } else {
//         setFilterType("curated"); // fallback to curated
//       }
//     }
//   };

//   const handleFilterChange = (type) => {
//     setFilterType(type);
//   };

//   const getAnimatedTexts = () => {
//     return activeTab === "international"
//       ? ANIMATED_TEXT.INTERNATIONAL
//       : ANIMATED_TEXT.DOMESTIC;
//   };

//   // Show skeleton during initial mount to prevent hydration mismatch
//   if (!mounted || isLoading) {
//     return (
//       <Container className="space-y-4 px-0 sm:px-5">
//         <div className="flex items-center justify-between gap-4">
//           <Skeletons.Text.XL />
//           <Skeletons.Button.MD />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <Skeletons.Card.LG />
//           <Skeletons.Card.LG />
//           <Skeletons.Card.LG />
//           <Skeletons.Card.LG />
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container className="sm:px-5">
//       {/* Main Header with Tabs and Animated Text */}
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
//         <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="flex items-center w-fit">
//             <button
//               onClick={() => handleTabChange("international")}
//               className={cn(
//                 "text-lg font-medium transition-colors relative border-b-2 px-4",
//                 activeTab === "international"
//                   ? "text-brand-blue border-brand-blue"
//                   : "text-gray-600 hover:text-gray-800"
//               )}
//             >
//               International
//               {activeTab === "international" && (
//                 <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-blue" />
//               )}
//             </button>
//             <button
//               onClick={() => handleTabChange("domestic")}
//               className={cn(
//                 "text-lg font-medium transition-colors relative border-b-2 px-4",
//                 activeTab === "domestic"
//                   ? "text-brand-blue border-brand-blue"
//                   : "text-gray-600 hover:text-gray-800"
//               )}
//             >
//               Domestic
//               {activeTab === "domestic" && (
//                 <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-blue" />
//               )}
//             </button>
//           </div>

//           {/* Animated Text - Hidden on mobile */}
//           <div className="hidden sm:block">
//             <AnimatedText items={getAnimatedTexts()} />
//           </div>
//         </div>
//       </div>

//       {/* Filter Buttons */}
//       <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:overflow-visible sm:pb-0 sm:flex-wrap">
//         {hasVisaFreePackages && (
//           <Button
//             variant={filterType === "visafree" ? "default" : "outline"}
//             onClick={() => handleFilterChange("visafree")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "visafree" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Visa Free
//           </Button>
//         )}
//         {hasTrendingPackages && (
//           <Button
//             variant={filterType === "trending" ? "default" : "outline"}
//             onClick={() => handleFilterChange("trending")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "trending" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Trending
//           </Button>
//         )}
//         {hasCuratedPackages && (
//           <Button
//             variant={filterType === "curated" ? "default" : "outline"}
//             onClick={() => handleFilterChange("curated")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "curated" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Curated
//           </Button>
//         )}
//         {hasBestsellerPackages && (
//           <Button
//             variant={filterType === "bestseller" ? "default" : "outline"}
//             onClick={() => handleFilterChange("bestseller")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "bestseller" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Bestseller
//           </Button>
//         )}
//         {hasValuePackages && (
//           <Button
//             variant={filterType === "value" ? "default" : "outline"}
//             onClick={() => handleFilterChange("value")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "value" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Value
//           </Button>
//         )}
//         {hasUnderratedPackages && (
//           <Button
//             variant={filterType === "underrated" ? "default" : "outline"}
//             onClick={() => handleFilterChange("underrated")}
//             className={cn(
//               "rounded-full border border-[#595959] text-[#5D5D5D] whitespace-nowrap flex-shrink-0",
//               filterType === "underrated" &&
//                 "border-brand-blue bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20"
//             )}
//           >
//             Underrated
//           </Button>
//         )}
//       </div>

//       {/* Package Cards Slider */}
//       <div className="relative flex items-center">
//         {packages.length > 0 ? (
//           <>
//             <button
//               onClick={() => swiper?.slidePrev()}
//               disabled={packages.length < 4}
//               aria-disabled={packages.length < 4}
//               tabIndex={packages.length < 4 ? -1 : 0}
//               className={cn(
//                 `
//     hidden md:flex
//     absolute -left-12 top-1/2 -translate-y-1/2
//     z-10
//     h-12 w-12
//     items-center justify-center
//     rounded-full
//     bg-white
//     shadow-lg
//     text-black
//     transition
//     `,
//                 packages.length < 4
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:scale-110"
//               )}
//             >
//               <MoveLeft className="h-5 w-5" />
//             </button>

//             <Swiper
//               key={`${activeTab}-${filterType}`}
//               enabled={packages.length >= 4}
//               modules={[Navigation]}
//               loop
//               centeredSlides={isMobile}
//               onSwiper={(swiper) => setSwiper(swiper)}
//               slidesPerView={"auto"}
//               breakpoints={{
//                 "@0.50": {
//                   slidesPerView: 1.2,
//                   spaceBetween: 8,
//                 },
//                 "@0.836": {
//                   slidesPerView: 4,
//                   spaceBetween: 8,
//                 },
//                 "@1.336": {
//                   slidesPerView: 4,
//                   spaceBetween: 8,
//                 },
//               }}
//               className="section-slider"
//             >
//               {packages.map((item) => (
//                 <SwiperSlide key={item.id} className="mb-2 w-full">
//                   <PackageCard item={item} className="shadow-none" />
//                 </SwiperSlide>
//               ))}
//               {/* Pad with empty slides if less than 4 */}
//               {packages.length < 4 &&
//                 Array.from({ length: 4 - packages.length }).map((_, idx) => (
//                   <SwiperSlide key={`empty-${idx}`} className="mb-2 w-full">
//                     <div className="h-full w-full min-h-[350px] bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center opacity-50">
//                       {/* Empty placeholder */}
//                     </div>
//                   </SwiperSlide>
//                 ))}
//             </Swiper>
//             <button
//               onClick={() => swiper?.slideNext()}
//               disabled={packages.length < 4}
//               aria-disabled={packages.length < 4}
//               tabIndex={packages.length < 4 ? -1 : 0}
//               className={cn(
//                 `
//     hidden md:flex
//     absolute -right-12 top-1/2 -translate-y-1/2
//     z-10
//     h-12 w-12
//     items-center justify-center
//     rounded-full
//     bg-white
//     shadow-lg
//     text-black
//     transition
//     `,
//                 packages.length < 4
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:scale-110"
//               )}
//             >
//               <MoveRight className="h-5 w-5" />
//             </button>
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-64">
//             <div className="text-gray-500">No packages available</div>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// };

// export default Holidays;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { Navigation } from "swiper/modules";

import PackageCard from "@/components/Landing/PackageCard";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useCuratedPackages } from "@/hooks/packages";
import { Skeletons } from "../Skeleton";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/navigation";

const Holidays = ({
  initialInternationalPackages = [],
  initialDomesticPackages = [],
}) => {
  const [swiper, setSwiper] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("international");
  const [filterType, setFilterType] = useState("curated");

  // Data
  const { packages: internationalPackages, isLoading: intlLoading } =
    useCuratedPackages("international", initialInternationalPackages);

  const { packages: domesticPackages, isLoading: domLoading } =
    useCuratedPackages("domestic", initialDomesticPackages);

  const curatedPackages = useMemo(() => {
    return activeTab === "international"
      ? internationalPackages
      : domesticPackages;
  }, [activeTab, internationalPackages, domesticPackages]);

  const isLoading = intlLoading || domLoading;

  // Define the has* variables
  const hasVisaFreePackages = useMemo(
    () => curatedPackages.some((pkg) => pkg.packageTags?.includes("visafree")),
    [curatedPackages]
  );

  const hasTrendingPackages = useMemo(
    () => curatedPackages.some((pkg) => pkg.trending),
    [curatedPackages]
  );

  const hasCuratedPackages = useMemo(
    () => curatedPackages.some((pkg) => pkg.curated),
    [curatedPackages]
  );

  const hasBestsellerPackages = useMemo(
    () => curatedPackages.some((pkg) => pkg.bestseller),
    [curatedPackages]
  );

  const hasValuePackages = useMemo(
    () => curatedPackages.some((pkg) => pkg.packageTags?.includes("value")),
    [curatedPackages]
  );

  const hasUnderratedPackages = useMemo(
    () =>
      curatedPackages.some((pkg) => pkg.packageTags?.includes("underrated")),
    [curatedPackages]
  );

  // Filters
  const packages = useMemo(() => {
    switch (filterType) {
      case "trending":
        return curatedPackages.filter((p) => p.trending);
      case "bestseller":
        return curatedPackages.filter((p) => p.bestseller);
      case "visafree":
        return curatedPackages.filter((p) =>
          p.packageTags?.includes("visafree")
        );
      case "value":
        return curatedPackages.filter((p) => p.packageTags?.includes("value"));
      case "underrated":
        return curatedPackages.filter((p) =>
          p.packageTags?.includes("underrated")
        );
      default:
        return curatedPackages.filter((p) => p.curated);
    }
  }, [curatedPackages, filterType]);

  // Mount fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-select filter based on available packages
  useEffect(() => {
    if (!mounted) return;

    if (activeTab === "international") {
      if (hasCuratedPackages) setFilterType("curated");
      else if (hasTrendingPackages) setFilterType("trending");
      else if (hasVisaFreePackages) setFilterType("visafree");
      else if (hasValuePackages) setFilterType("value");
      else if (hasUnderratedPackages) setFilterType("underrated");
    } else {
      if (hasVisaFreePackages) setFilterType("visafree");
      else if (hasTrendingPackages) setFilterType("trending");
      else if (hasCuratedPackages) setFilterType("curated");
      else if (hasValuePackages) setFilterType("value");
      else if (hasUnderratedPackages) setFilterType("underrated");
    }
  }, [
    activeTab,
    mounted,
    hasCuratedPackages,
    hasTrendingPackages,
    hasBestsellerPackages,
    hasVisaFreePackages,
    hasValuePackages,
    hasUnderratedPackages,
  ]);

  const currentLoading = intlLoading || domLoading;
  const hasData = curatedPackages.length > 0;

  // Only show skeleton if we're loading AND have no data to show
  if (!mounted || (currentLoading && !hasData)) {
    return (
      <Container className="space-y-4 px-0 sm:px-5">
        <div className="flex justify-between">
          <Skeletons.Text.XL />
          <Skeletons.Button.MD />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
          <Skeletons.Card.LG />
        </div>
      </Container>
    );
  }

  return (
    <Container className="sm:px-5">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-4 md:mb-8">
        <div className="flex-1">
          <h2 className="section-title-light mb-1 md:mb-2">Signature Collections</h2>
          <p className="section-subtitle-light hidden sm:block text-xs sm:text-sm md:text-base">Hand-picked hotspots our travelers are loving right now</p>
        </div>

        {/* Tab Switcher - Same as ExploreDestinations */}
        <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit">
          <button
            onClick={() => setActiveTab("international")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
              activeTab === "international" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            International
          </button>
          <button
            onClick={() => setActiveTab("domestic")}
            className={cn(
              "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
              activeTab === "domestic" 
                ? "gradient-btn text-white shadow-md" 
                : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* FILTERS - Static and Persistent */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-4 scrollbar-hide relative z-50">
        <Button
          key="visafree"
          variant={filterType === "visafree" ? "default" : "outline"}
          onClick={() => setFilterType("visafree")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "visafree" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Visa-Free Escapes
        </Button>

        <Button
          key="trending"
          variant={filterType === "trending" ? "default" : "outline"}
          onClick={() => setFilterType("trending")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "trending" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Hot Right Now
        </Button>

        <Button
          key="curated"
          variant={filterType === "curated" ? "default" : "outline"}
          onClick={() => setFilterType("curated")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "curated" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Signature Picks
        </Button>

        {/* <Button
          key="bestseller"
          variant={filterType === "bestseller" ? "default" : "outline"}
          onClick={() => setFilterType("bestseller")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "bestseller" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Bestsellers
        </Button> */}

        <Button
          key="value"
          variant={filterType === "value" ? "default" : "outline"}
          onClick={() => setFilterType("value")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "value" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Smart Value Trips
        </Button>

        <Button
          key="underrated"
          variant={filterType === "underrated" ? "default" : "outline"}
          onClick={() => setFilterType("underrated")}
          className={cn(
            "rounded-full border border-gray-100 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 text-sm font-bold px-6 py-2.5 flex-shrink-0 transition-all",
            filterType === "underrated" && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 border-transparent hover:opacity-90"
          )}
        >
          Hidden Gems
        </Button>
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >

      {/* SLIDER */}
      <div className="relative">
        <button
          onClick={() => swiper?.slidePrev()}
          disabled={packages.length < 4}
          className={cn(
            "hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center",
            packages.length < 4 && "opacity-40 cursor-not-allowed"
          )}
        >
          <MoveLeft />
        </button>

        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation]}
          loop={packages.length > 4}
          slidesPerView={1.2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {packages.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!h-auto">
               {/* Keep standard padding */}
               <PackageCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiper?.slideNext()}
          disabled={packages.length < 4}
          className={cn(
            "hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow items-center justify-center",
            packages.length < 4 && "opacity-40 cursor-not-allowed"
          )}
        >
          <MoveRight />
        </button>
      </div>
      </motion.div>
      </AnimatePresence>
      </div>
    </Container>
  );
};

export default Holidays;