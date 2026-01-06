"use client";

import {
  MapPin,
  Palmtree,
  Mountain,
  Compass,
  Star,
  Plane,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

export default function FeaturedDestinations() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  const banners = [
    { id: 0, name: "Paris", icon: <MapPin className="w-4 h-4" /> },
    { id: 1, name: "Bali", icon: <Palmtree className="w-4 h-4" /> },
    { id: 2, name: "Swiss Alps", icon: <Mountain className="w-4 h-4" /> },
    { id: 3, name: "Tokyo", icon: <Compass className="w-4 h-4" /> },
    { id: 4, name: "Maldives", icon: <Star className="w-4 h-4" /> },
    { id: 5, name: "New York", icon: <Plane className="w-4 h-4" /> },
    { id: 6, name: "Santorini", icon: <Camera className="w-4 h-4" /> },
    { id: 7, name: "Dubai", icon: <Star className="w-4 h-4" /> },
    { id: 8, name: "Iceland", icon: <Compass className="w-4 h-4" /> },
    { id: 9, name: "Rome", icon: <MapPin className="w-4 h-4" /> },
  ];

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll active tab into view - DISABLED
  // useEffect(() => {
  //   if (activeTabRef.current && tabsContainerRef.current) {
  //     // Only auto-scroll if the element is not already in view
  //     const container = tabsContainerRef.current;
  //     const activeTab = activeTabRef.current;
  //     
  //     const containerRect = container.getBoundingClientRect();
  //     const activeTabRect = activeTab.getBoundingClientRect();
  //     
  //     // Check if active tab is outside the visible area
  //     const isOutOfView = 
  //       activeTabRect.left < containerRect.left || 
  //       activeTabRect.right > containerRect.right;
  //     
  //     if (isOutOfView) {
  //       activeTab.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'nearest',
  //         inline: 'center'
  //       });
  //     }
  //   }
  // }, [activeBanner]);

  // Auto-rotate banners - only on client side
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient, banners.length]);

  const nextBanner = useCallback(() => {
    setActiveBanner((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevBanner = useCallback(() => {
    setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Don't render content until client-side
  if (!isClient) {
    return (
      <section className="relative w-full py-8 md:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-8">
            <div className="h-8 w-48 bg-gray-800/30 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-800/30 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="h-[320px] sm:h-[350px] md:h-[400px] bg-gray-800/30 rounded-xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="section-title-light mb-3 md:mb-4 px-2">
            Explore World Destinations
          </h2>
          <p className="section-subtitle-light max-w-lg md:max-w-2xl mx-auto px-2">
            Discover breathtaking destinations tailored for your next adventure
          </p>
        </div>

        {/* Navigation Tabs - Sliding Design */}
        <div className="mb-6 flex justify-center">
          <div ref={tabsContainerRef} className="inline-flex p-1 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-full overflow-x-auto scrollbar-hide max-w-full">
            {banners.map((banner) => (
              <button
                key={banner.id}
                ref={activeBanner === banner.id ? activeTabRef : null}
                onClick={() => setActiveBanner(banner.id)}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeBanner === banner.id
                    ? "bg-brand-blue shadow-lg text-white"
                    : "bg-white text-gray-700 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {banner.icon}
                <span>{banner.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Banner Content - Increased height for mobile */}
        <div className="relative h-[320px] sm:h-[350px] md:h-[400px] lg:h-[450px] mx-auto overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
          {/* Navigation Arrows */}
          <button
            onClick={prevBanner}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Previous destination"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
          </button>

          <button
            onClick={nextBanner}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Next destination"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
          </button>

          {/* Banners */}
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-500 ${
                activeBanner === index
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-full pointer-events-none"
              }`}
            >
              {/* Background Image with better gradient for mobile */}
              <div className="absolute inset-0">
                <img
                  src={getBannerImage(index)}
                  alt={banner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content - Fixed layout with top icon */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Top Section - Icon and Banner Name */}
                <div className="pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                    {banner.icon}
                    <span className="text-xs sm:text-sm text-white font-medium">
                      {banner.name}
                    </span>
                  </div>
                </div>

                {/* Bottom Section - Main Content */}
                <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
                  {/* Main content */}
                  <div className="max-w-2xl">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 line-clamp-2 sm:line-clamp-none">
                      {getBannerTitle(index)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-sm sm:text-base mb-3 sm:mb-4 md:mb-6 md:max-w-xl line-clamp-2 sm:line-clamp-3">
                      {getBannerDescription(index)}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <button className="group px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black rounded-full font-semibold text-sm sm:text-base hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl">
                        <span className="flex items-center gap-1 sm:gap-2">
                          Explore Now
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      <button className="group px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-sm sm:text-base border border-white/30 hover:bg-white/20 transition-all duration-300 active:scale-95">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Stats - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden md:block bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/30 shadow-2xl shadow-blue-500/50 min-w-[200px]">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                          {getBannerStats(index).duration}
                        </div>
                        <div className="text-white/90 text-sm uppercase tracking-widest font-semibold">
                          Days
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                          {getBannerStats(index).price}
                        </div>
                        <div className="text-white/90 text-sm uppercase tracking-widest font-semibold">
                          Starting From
                        </div>
                      </div>
                      <div className="text-center pt-4 border-t-2 border-white/30">
                        <div className="text-4xl md:text-5xl font-black text-yellow-300 mb-2 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]">
                          {getBannerStats(index).rating}
                        </div>
                        <div className="text-white/90 text-sm uppercase tracking-widest font-semibold">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="md:hidden mt-4 pt-4 border-t border-white/20 px-4 sm:px-6 pb-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-white mb-1">
                        {getBannerStats(index).duration}
                      </div>
                      <div className="text-white/70 text-xs">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-white mb-1">
                        {getBannerStats(index).price}
                      </div>
                      <div className="text-white/70 text-xs">From</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl font-bold text-white mb-1">
                        {getBannerStats(index).rating}
                      </div>
                      <div className="text-white/70 text-xs">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-4">
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveBanner(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeBanner === index
                    ? "bg-brand-blue w-6"
                    : "bg-slate-300 hover:bg-slate-400 w-2"
                }`}
                style={{
                  height: "8px",
                }}
                aria-label={`Go to destination ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add custom CSS for better mobile handling */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Better line clamping for mobile */
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </section>
  );
}

// Helper functions
function getBannerImage(index) {
  const images = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
  ];
  return images[index % images.length];
}

function getBannerTitle(index) {
  const titles = [
    "Parisian Dreams Come True",
    "Tropical Bali Paradise",
    "Majestic Swiss Alps",
    "Tokyo's Neon Wonderland",
    "Maldives Overwater Bliss",
    "New York City Energy",
    "Santorini Blue Domes",
    "Dubai's Golden Luxury",
    "Iceland's Northern Lights",
    "Rome's Ancient Glory",
  ];
  return titles[index % titles.length];
}

function getBannerDescription(index) {
  const descriptions = [
    "Experience romance in the City of Lights with iconic landmarks and cuisine",
    "Pristine beaches, ancient temples, and lush rice terraces await",
    "Breathtaking peaks and charming Alpine villages for every adventurer",
    "Immerse in neon-lit streets blending tradition and cutting-edge tech",
    "Crystal-clear lagoons and unforgettable sunsets in paradise",
    "The energy of Broadway, Central Park, and iconic skyline views",
    "Whitewashed houses and stunning Aegean Sea vistas",
    "World's tallest building meets desert luxury and innovation",
    "Geothermal wonders and dancing Northern Lights",
    "Walk through 2,000 years of history at iconic Roman sites",
  ];
  return descriptions[index % descriptions.length];
}

function getBannerStats(index) {
  const stats = [
    { duration: "7", price: "$1,299", rating: "4.9★" },
    { duration: "10", price: "$899", rating: "4.8★" },
    { duration: "8", price: "$1,599", rating: "4.7★" },
    { duration: "9", price: "$1,499", rating: "4.9★" },
    { duration: "7", price: "$2,199", rating: "5.0★" },
    { duration: "6", price: "$1,199", rating: "4.6★" },
    { duration: "7", price: "$1,499", rating: "4.8★" },
    { duration: "5", price: "$1,899", rating: "4.9★" },
    { duration: "8", price: "$1,799", rating: "4.7★" },
    { duration: "7", price: "$1,399", rating: "4.8★" },
  ];
  return stats[index % stats.length];
}
