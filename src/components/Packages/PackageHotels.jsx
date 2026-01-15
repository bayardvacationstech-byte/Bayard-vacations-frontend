"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { getHotelsByIds } from "@/utils/firebase";
import { Wifi, Utensils, Wind, Car, Building2, Star, MapPin, Bed, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";

const PackageHotels = ({ packageData }) => {
  const [hotelsByCategory, setHotelsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const details = packageData?.hotelDetails;
        
        if (details && typeof details === 'object') {
          const categories = Object.keys(details).filter(k => k !== "baseCategory" && details[k].hotelIds?.length > 0);
          
          if (categories.length > 0) {
            const newHotelsByCategory = {};
            
            // Fetch hotels for each category
            for (const cat of categories) {
              const hotelDetails = await getHotelsByIds(details[cat].hotelIds);
              newHotelsByCategory[cat] = hotelDetails.filter(h => h);
            }
            
            setHotelsByCategory(newHotelsByCategory);
            
            // Set initial category (baseCategory or first available)
            const baseCat = details.baseCategory || categories[0];
            setSelectedCategory(newHotelsByCategory[baseCat] ? baseCat : categories[0]);
          } else {
            useDummyFallback();
          }
        } else {
          useDummyFallback();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("PackageHotels: Error:", error);
        useDummyFallback();
        setIsLoading(false);
      }
    };

    const useDummyFallback = () => {
      const dummyHotels = [
        {
          id: "dummy-1",
          name: "The Royal Serenity Resort",
          roomType: "Premium Ocean Suite",
          location: "Prime Beachfront, 5 mins from Old Town",
          amenities: ["Free Wifi", "Private Pool", "Spa Access", "Breakfast"],
          description: "A sanctuary of luxury nestled in prime beachfront location, featuring world-class spa facilities and private panoramic balconies.",
          images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-2",
          name: "Azure Bay Luxury Suites",
          roomType: "Deluxe Panorama View",
          location: "City Center, Steps from the Opera House",
          amenities: ["Free Wifi", "Gym", "Rooftop Bar", "All Inclusive"],
          description: "Contemporary elegance meets traditional charm. Enjoy breathtaking sunset views, artisanal local cuisine, and direct access to crystal-clear waters.",
          images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-3",
          name: "Grand Horizon Palace",
          roomType: "Presidential Grand Suite",
          location: "Skyline District, 2km from Central Station",
          amenities: ["Free Wifi", "Butler", "Chauffeur", "VIP Lounge"],
          description: "Experience unparalleled hospitality in our signature grand suites, designed with exquisite details and offering 24/7 dedicated butler service.",
          images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        }
      ];

      setHotelsByCategory({
        threestar: dummyHotels,
        fourstar: dummyHotels.map(h => ({...h, name: h.name.replace("Resort", "Premium")})),
        fivestar: dummyHotels.map(h => ({...h, name: h.name.replace("Resort", "Luxury")}))
      });
      setSelectedCategory("fourstar");
    };

    fetchHotelDetails();
  }, [packageData]);

  if (isLoading) return null;

  const categories = Object.keys(hotelsByCategory);
  const currentHotels = hotelsByCategory[selectedCategory] || [];

  const categoryLabels = {
    twostar: "2 Star",
    threestar: "3 Star",
    fourstar: "4 Star",
    fivestar: "5 Star"
  };

  const getAmenityIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('wifi')) return <Wifi size={14} className="text-brand-blue" />;
    if (n.includes('breakfast') || n.includes('meal') || n.includes('dining')) return <Utensils size={14} className="text-brand-blue" />;
    if (n.includes('ac') || n.includes('air conditioning')) return <Wind size={14} className="text-brand-blue" />;
    if (n.includes('pool')) return <Building2 size={14} className="text-brand-blue" />;
    if (n.includes('spa') || n.includes('gym')) return <Building2 size={14} className="text-brand-blue" />;
    return <CheckCircle2 size={14} className="text-brand-blue" />;
  };

  const renderHotelCard = (hotel, idx) => (
    <motion.div 
      key={hotel.id || idx}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 h-full"
    >
      {/* Image Section - Reduced Height */}
      <div className="relative w-full h-[180px] overflow-hidden">
        <Image
          src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Premium Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-slate-900/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">Handpicked</span>
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/20 flex items-center gap-0.5">
            {[...Array(parseInt(categoryLabels[selectedCategory]) || 5)].map((_, i) => (
              <Star key={i} size={9} className="fill-yellow-500 text-yellow-500" />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section - Compact */}
      <div className="p-4 flex-1 flex flex-col">
        {/* 1. Hotel Name */}
        <h3 className="text-lg font-black mb-3 text-slate-900 group-hover:text-brand-blue transition-colors tracking-tight line-clamp-1">
          {hotel.name}
        </h3>

        {/* 2. Room Type - Inline */}
        <div className="flex items-center gap-2 mb-3">
          <Bed className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
          <p className="text-xs font-bold text-slate-700 line-clamp-1">{hotel.roomType || "Signature Premium Suite"}</p>
        </div>

        {/* 3. Amenities - Compact */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(hotel.amenities || ["Wifi", "Breakfast", "AC", "Laundry"]).slice(0, 4).map((amenity, i) => (
            <div key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg">
              {getAmenityIcon(amenity)}
              <span className="text-[9px] font-bold text-slate-700">{amenity}</span>
            </div>
          ))}
        </div>

        {/* 4. Location - Compact */}
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0 mt-0.5" />
          <p className="text-[10px] font-semibold text-slate-600 leading-relaxed line-clamp-2">
            {hotel.location || "Centrally located with easy access to attractions."}
          </p>
        </div>

        {/* CTA - Compact */}
        <div className="mt-auto">
          <Button
            asChild
            variant="outline"
            className="w-full border-brand-blue/40 text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl py-3 font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95"
          >
            <a href={hotel.googleUrl || "#"} target="_blank" rel="noopener noreferrer">
              View on Map
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="hotels-section" className="relative bg-transparent text-slate-900 py-10 md:py-16 overflow-hidden scroll-mt-24 mb-4">
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 relative">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/5 border border-brand-blue/10 rounded-full text-[10px] font-bold text-brand-blue mb-4 uppercase tracking-widest">
              <span className="text-xs">🏨</span> Handpicked Stays
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Premium <span className="text-brand-blue">Accommodations</span>
            </h2>
            <p className="text-base font-medium text-slate-500 leading-relaxed">
              Discover our curated selection of top-rated hotels. Filter by rating to find your perfect stay.
            </p>
          </div>

          {/* New Filter UI - Horizontal Scroll on Mobile */}
          <div className="flex overflow-x-auto lg:flex-wrap gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 w-full lg:w-fit scrollbar-hide">
            {categories.sort().map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                    : "text-slate-500 hover:text-brand-blue hover:bg-white"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Swiper Carousel */}
        <div className="block md:hidden">
          <Swiper
            modules={[Pagination, FreeMode]}
            pagination={{ clickable: true }}
            slidesPerView={1.1}
            spaceBetween={16}
            freeMode={true}
            className="!pb-12"
          >
            {currentHotels.map((hotel, idx) => (
              <SwiperSlide key={hotel.id || idx}>
                {renderHotelCard(hotel, idx)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentHotels.map((hotel, idx) => renderHotelCard(hotel, idx))}
        </div>
      </Container>


    </section>
  );
};

export default PackageHotels;
