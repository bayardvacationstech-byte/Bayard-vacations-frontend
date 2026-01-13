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
import ActivityCard from "@/components/ui/ActivityCard";

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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Iconic Cities in </span>
                <span className="inline sm:hidden">Cities in </span>
                <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              <p className="hidden sm:block text-xl text-slate-600 truncate md:whitespace-normal">
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
              <ActivityCard 
                data={{
                  name: city.name,
                  badge: city.name,
                  title: city.title || city.name,
                  description: city.description,
                  image: city.image,
                  icon: city.icon,
                  isPopular: true,
                  highlightsTitle: "Top Attractions:",
                  highlights: [
                    "Historical landmarks & architecture",
                    "Local artisan markets"
                  ]
                }}
                hoverGradient="from-brand-green/95 to-brand-green"
                ctaLabel="View Packages"
                onCtaClick={() => console.log("View packages for:", city.name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default RegionCities;
