"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { getHotelsByIds } from "@/utils/firebase";
import { Wifi, Utensils, Wind, Car, Building2, Star, MapPin, Bed, CheckCircle2 } from "lucide-react";

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

  return (
    <section id="hotels-section" className="relative bg-white text-slate-900 py-8 md:py-12 rounded-3xl border border-slate-100 shadow-sm mb-4">
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

        {/* Hotel Grid - More Minimal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentHotels.map((hotel, idx) => (
            <motion.div 
              key={hotel.id || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-1">
                    {[...Array(parseInt(categoryLabels[selectedCategory]) || 5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                {/* 1. Hotel Name */}
                <h3 className="text-xl font-black mb-4 text-slate-900 group-hover:text-brand-blue transition-colors tracking-tight">
                  {hotel.name}
                </h3>

                {/* 2. Room Type & Amenities */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-brand-blue/5 rounded-lg">
                      <Bed className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Room Type</p>
                      <p className="text-sm font-bold text-slate-700">{hotel.roomType || "Signature Premium Suite"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(hotel.amenities || ["Wifi", "Breakfast", "AC", "Laundry"]).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg">
                        <CheckCircle2 size={12} className="text-brand-blue/60" />
                        <span className="text-[10px] font-bold text-slate-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Location */}
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">Location</p>
                      <p className="text-xs font-semibold text-slate-600 leading-relaxed italic">
                        {hotel.location || "Centrally located with easy access to attractions."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-white rounded-xl py-5 font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95"
                  >
                    <a href={hotel.googleUrl || "#"} target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>


    </section>
  );
};

export default PackageHotels;
