"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { 
  Building2, 
  Map as MapIcon, 
  Mountain, 
  Castle, 
  Waves,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  Navigation as NavigationIcon,
  Camera,
  Star
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionCities = ({ regionName = "this destination", cities = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Default mock cities if none provided (Tailored for Azerbaijan/Premium destinations)
  const defaultCities = [
    {
      id: "baku",
      name: "Baku",
      type: "Metropolis",
      tagline: "The City of Winds",
      description: "Where shimmering futuristic skyscrapers meet the ancient whispers of the UNESCO-listed Old City.",
      highlights: ["Flame Towers", "Old City (Icherisheher)", "Caspian Sea"],
      image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80",
      icon: Building2,
      category: "Modern"
    },
    {
      id: "gabala",
      name: "Gabala",
      type: "Mountain Resort",
      tagline: "The Switzerland of Azerbaijan",
      description: "A breathtaking alpine escape surrounded by emerald forests and the majestic Caucasus Mountains.",
      highlights: ["Tufandag Ropeway", "Nohur Lake", "Yeddi Gozel Waterfall"],
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      icon: Mountain,
      category: "Nature"
    },
    {
      id: "sheki",
      name: "Sheki",
      type: "Silk Road Jewel",
      tagline: "The Cultural Soul",
      description: "Famous for its vibrant stained glass, royal palaces, and authentic local delicacies from the Silk Road era.",
      highlights: ["Khan's Palace", "Caravanserai", "Sheki Halva"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
      icon: Castle,
      category: "Historic"
    },
    {
      id: "ganja",
      name: "Ganja",
      type: "Historic Hub",
      tagline: "City of Gardens",
      description: "An ancient center of poetry and culture, adorned with beautiful parks and distinctive red-brick architecture.",
      highlights: ["Nizami Ganjavi Mausoleum", "Bottle House", "Shah Abbas Mosque"],
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
      icon: MapIcon,
      category: "Historic"
    },
    {
      id: "quba",
      name: "Quba",
      type: "Nature Retreat",
      tagline: "The Apple Capital",
      description: "Famed for its scenic mountain passes, cascading waterfalls, and the unique cultural heritage of Red Village.",
      highlights: ["Afurja Waterfall", "Red Village", "Gachresh Forest"],
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      icon: Mountain,
      category: "Nature"
    },
    {
      id: "lankaran",
      name: "Lankaran",
      type: "Coastal Escapes",
      tagline: "The Citric Coast",
      description: "A subtropical paradise where the black sand beaches meet lush tea plantations and orange groves.",
      highlights: ["Black Sand Beaches", "Hirkan National Park", "Old Prison & Lighthouse"],
      image: "https://images.unsplash.com/photo-1493558103817-58593965b2d9?w=800&q=80",
      icon: Waves,
      category: "Coastal"
    }
  ];

  const allCities = cities.length > 0 ? cities : defaultCities;
  
  // Get unique categories for filtering
  const categories = ["all", ...new Set(allCities.map(c => c.category))];
  
  // Filter based on selected category
  const displayCities = selectedCategory === "all" 
    ? allCities 
    : allCities.filter(c => c.category === selectedCategory);

  return (
    <section className="bg-slate-50 py-12 md:py-20 relative overflow-hidden">
      {/* Decorative Textural Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container>
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div className="flex-1 max-w-3xl">
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
            
            {/* Navigation Buttons */}
            <div className="flex gap-2 lg:flex-shrink-0">
              <button className="cities-prev-btn p-3 rounded-full border-2 border-slate-200 hover:border-brand-green hover:bg-brand-green/10 transition-all">
                <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
              </button>
              <button className="cities-next-btn p-3 rounded-full border-2 border-slate-200 hover:border-brand-green hover:bg-brand-green/10 transition-all">
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </div>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-brand-green text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category === "all" ? "All Cities" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Cities Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: ".cities-prev-btn",
            nextEl: ".cities-next-btn",
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-8"
        >
          {displayCities.map((city) => {
            const Icon = city.icon || MapIcon;
            return (
              <SwiperSlide key={city.id}>
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl h-[520px] bg-white">
                  {/* Background Image - Full Card */}
                  <div className="absolute inset-0">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Type Badge */}
                      <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                        <Icon className="w-3.5 h-3.5 text-slate-700" />
                        <span className="text-xs font-bold text-slate-900 uppercase">{city.type}</span>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-4">
                      {/* City Name & Rating */}
                      <div>
                        <h3 className="text-4xl font-black text-white leading-tight drop-shadow-lg mb-2">
                          {city.name}
                        </h3>
                        <p className="text-white/95 text-base italic leading-relaxed drop-shadow-md">
                          "{city.tagline}"
                        </p>
                      </div>
                      
                      {/* Description */}
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow-md">
                        {city.description}
                      </p>

                      {/* Must Visit Tags */}
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-white/80 uppercase tracking-wider">Must Visit:</h5>
                        <div className="flex flex-wrap gap-2">
                          {city.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} className="text-xs font-semibold text-white/95 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer - Avatars & CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/20">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm">
                              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="traveller" />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-white/90 flex items-center justify-center">
                            <span className="text-[9px] font-black text-slate-700">+1k</span>
                          </div>
                        </div>

                        <button className="px-6 py-2.5 rounded-xl gradient-btn text-white font-bold text-sm uppercase tracking-wide transition-all duration-300 shadow-lg flex items-center gap-2">
                          View Packages
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Explore Badge */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-1.5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
};

export default RegionCities;
