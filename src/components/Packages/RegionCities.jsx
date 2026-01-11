"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { 
  Building2, 
  Map as MapIcon, 
  Mountain, 
  Castle, 
  Waves,
  ChevronLeft as ChevronLeftIcon,
  Navigation as NavigationIcon,
  Camera,
  Star,
  ChevronUp,
  Info,
  X,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionCities = ({ regionName = "this destination", regionData = null }) => {
  const [selectedCity, setSelectedCity] = useState("all");

  // Extract cities from regionData.mustDoExperiences.categories
  const cityCategories = regionData?.mustDoExperiences?.categories || [];
  
  // Transform the data into a usable format - Mix real API data with demo data
  const apiCities = cityCategories.map((cityData, index) => {
    const cityName = cityData.category?.trim() || `City ${index + 1}`;
    const items = cityData.items || [];
    const firstItem = items[0] || {};
    
    return {
      id: cityName.toLowerCase().replace(/\s+/g, '-'),
      name: cityName,
      title: firstItem.title || cityName,
      description: firstItem.description || "",
      image: firstItem.image || firstItem.imageUrl || "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80",
      icon: MapIcon
    };
  });

  // Add demo cities for better presentation (will be replaced by real API data later)
  const demoCities = [
    {
      id: 'gabala',
      name: 'Gabala',
      title: 'Nature & Adventure in Gabala',
      description: 'Experience the stunning mountain landscapes, adventure parks, and natural beauty of Gabala, Azerbaijan\'s premier mountain resort destination.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      icon: MapIcon
    },
    {
      id: 'sheki',
      name: 'Sheki',
      title: 'Historic Silk Road City',
      description: 'Discover the ancient Silk Road heritage, magnificent Khan\'s Palace, and traditional crafts in this charming historic mountain town.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      icon: MapIcon
    },
    {
      id: 'guba',
      name: 'Guba',
      title: 'Mountain Carpets & Culture',
      description: 'Explore the famous carpet-weaving traditions, apple orchards, and scenic mountain villages of northern Azerbaijan.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      icon: MapIcon
    }
  ];

  // Combine API cities with demo cities
  const allCities = [...apiCities, ...demoCities];
  
  // Get unique city names for filtering
  const cityNames = ["all", ...allCities.map(c => c.name)];
  
  // Filter based on selected city
  const displayCities = selectedCity === "all" 
    ? allCities 
    : allCities.filter(c => c.name === selectedCity);
  
  // If no data, don't render the section
  if (allCities.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-6 md:py-8 relative overflow-hidden">
      {/* Decorative Textural Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
                <NavigationIcon className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  Cities to Explore
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Iconic Cities in{" "}
                <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              <p className="text-xl text-slate-600">
                Adventure awaits! Discover exciting cities and unforgettable experiences
              </p>
            </div>
            
            {/* Explore More Button */}
            <Link href="/packages">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap"
              >
                Explore More
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
          
          {/* City Filter Buttons - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 pb-2 -mb-2">
            {cityNames.map((cityName) => (
              <button
                key={cityName}
                onClick={() => setSelectedCity(cityName)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCity === cityName
                    ? "bg-yellow-400 text-slate-900 shadow-sm"
                    : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cityName === "all" ? "All Cities" : cityName}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Carousel */}
        <div className="relative group/nav mt-8">
          {/* Overlay Navigation Buttons */}
          <button className="cities-prev-btn absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeftIcon className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="cities-next-btn absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.15}
          navigation={{
            prevEl: ".cities-prev-btn",
            nextEl: ".cities-next-btn",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-12"
        >
          {displayCities.map((city) => (
            <SwiperSlide key={city.id}>
              <CityCard city={city} />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default RegionCities;

// Sub-component for City Card to handle local state
function CityCard({ city }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = city.icon || MapIcon;

  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl h-[420px]"
    >
      {/* Background Image - Full Card */}
      <div className="absolute inset-0">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-700 scale-105"
        />
      </div>

      {/* Simple Gradient Overlay - Lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3">
          {/* City Badge */}
          <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
            <Icon className="w-3.5 h-3.5 text-slate-700" />
            <span className="text-xs font-bold text-slate-900 uppercase">{city.name}</span>
          </div>

          {/* Popular/Featured Badge */}
          <div className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase shadow-md flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>Popular</span>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="space-y-3 relative">
          {/* Mobile Arrow Handle Toggle - Gold Style */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="md:hidden absolute -top-14 right-2 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all z-30 ring-4 ring-white/10"
          >
            {isExpanded ? (
              <X className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-6 h-6 animate-bounce-slow" />
            )}
          </button>

          {/* Title */}
          <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg">
            {city.title || city.name}
          </h3>
          
          {/* Description */}
          {city.description && (
            <p className="text-white/95 text-base leading-relaxed line-clamp-2 drop-shadow-md">
              {city.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/95">
              <NavigationIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">Explore City</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/95">
              <Camera className="w-4 h-4" />
              <span className="text-sm font-semibold">Photo Spots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover/Click Overlay - More Info */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-brand-green/95 to-brand-green transition-all duration-500 z-40",
        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0"
      )}>
        <div className="h-full p-6 flex flex-col">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-2xl font-black text-white leading-tight">
                {city.title || city.name}
              </h4>
              <div className="flex items-center gap-2">
                <Icon className="w-6 h-6 text-white/80 flex-shrink-0" />
                {/* Mobile Close Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="md:hidden p-1 rounded-full bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Full Description */}
            {city.description && (
              <p className="text-white/95 text-sm leading-relaxed mb-4">
                {city.description}
              </p>
            )}

            {/* Highlights/Details */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white/90 uppercase tracking-wider">Top Attractions:</h5>
              <ul className="space-y-2 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Historical landmarks & architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Local artisan markets</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer - Meta & CTA */}
          <div className="space-y-3 pt-4 border-t border-white/20">
            <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg text-slate-900 font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95">
              View Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
