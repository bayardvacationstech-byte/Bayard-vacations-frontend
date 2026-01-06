"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { 
  Waves, 
  Mountain, 
  TreePine, 
  Bike,
  Compass,
  Sailboat,
  Tent,
  Utensils,
  Palette,
  Music,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  MapPin,
  Clock,
  DollarSign
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionActivities = ({ regionName = "this destination", activities = [] }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Default mock activities if none provided from backend
  const defaultActivities = [
    {
      id: 1,
      title: "Scuba Diving & Snorkeling",
      category: "Water Sports",
      description: "Explore vibrant coral reefs and underwater marine life in crystal-clear waters",
      duration: "2-3 hours",
      priceRange: "$50-$100",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      icon: Waves,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Mountain Trekking",
      category: "Adventure",
      description: "Challenge yourself with guided treks through stunning mountain trails",
      duration: "Half day - Full day",
      priceRange: "$75-$150",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      icon: Mountain,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Forest Safari",
      category: "Nature",
      description: "Wildlife spotting adventure through lush forests and national parks",
      duration: "4-6 hours",
      priceRange: "$80-$120",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      icon: TreePine,
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Cycling Tours",
      category: "Active",
      description: "Pedal through scenic routes, villages, and countryside landscapes",
      duration: "3-4 hours",
      priceRange: "$40-$80",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80",
      icon: Bike,
      difficulty: "Easy"
    },
    {
      id: 5,
      title: "Cultural Walking Tours",
      category: "Culture",
      description: "Discover hidden alleys, local markets, and historical landmarks with expert guides",
      duration: "2-3 hours",
      priceRange: "$30-$60",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
      icon: Compass,
      difficulty: "Easy"
    },
    {
      id: 6,
      title: "Sailing & Boat Tours",
      category: "Water Sports",
      description: "Cruise along coastlines, explore islands, and enjoy sunset views from the water",
      duration: "2-4 hours",
      priceRange: "$60-$120",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6d?w=800&q=80",
      icon: Sailboat,
      difficulty: "Easy"
    },
    {
      id: 7,
      title: "Camping Experiences",
      category: "Adventure",
      description: "Overnight camping under starlit skies with bonfire and local cuisine",
      duration: "Overnight",
      priceRange: "$90-$180",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      icon: Tent,
      difficulty: "Intermediate"
    },
    {
      id: 8,
      title: "Cooking Classes",
      category: "Cultural",
      description: "Learn to prepare authentic local dishes with professional chefs",
      duration: "3-4 hours",
      priceRange: "$50-$90",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      icon: Utensils,
      difficulty: "Easy"
    },
    {
      id: 9,
      title: "Art & Craft Workshops",
      category: "Cultural",
      description: "Create handmade souvenirs in traditional art and craft sessions",
      duration: "2-3 hours",
      priceRange: "$35-$75",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      icon: Palette,
      difficulty: "Easy"
    },
    {
      id: 10,
      title: "Live Music & Dance Shows",
      category: "Entertainment",
      description: "Experience authentic cultural performances and traditional dance",
      duration: "1-2 hours",
      priceRange: "$25-$50",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
      icon: Music,
      difficulty: "Easy"
    }
  ];

  const allActivities = activities.length > 0 ? activities : defaultActivities;
  
  // Get unique categories
  const categories = ["all", ...new Set(allActivities.map(a => a.category))];
  
  // Filter activities based on selected category
  const displayActivities = selectedCategory === "all" 
    ? allActivities 
    : allActivities.filter(a => a.category === selectedCategory);

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
                <Compass className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  Things To Do
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Top Activities in{" "}
                <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              <p className="text-xl text-slate-600">
                Adventure awaits! Discover exciting activities and unforgettable experiences
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex gap-2 lg:flex-shrink-0">
              <button className="activities-prev-btn p-3 rounded-full border-2 border-slate-200 hover:border-brand-green hover:bg-brand-green/10 transition-all">
                <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
              </button>
              <button className="activities-next-btn p-3 rounded-full border-2 border-slate-200 hover:border-brand-green hover:bg-brand-green/10 transition-all">
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
                {category === "all" ? "All Activities" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: ".activities-prev-btn",
            nextEl: ".activities-next-btn",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-8"
        >
          {displayActivities.map((activity) => {
            const Icon = activity.icon || Compass;
            
            return (
              <SwiperSlide key={activity.id}>
                <div
                  className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl h-[420px]"
                  onMouseEnter={() => setHoveredId(activity.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Background Image - Full Card */}
                  <div className="absolute inset-0">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Simple Gradient Overlay - Lighter */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Badges */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Category Badge */}
                      <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                        <Icon className="w-3.5 h-3.5 text-slate-700" />
                        <span className="text-xs font-bold text-slate-900 uppercase">{activity.category}</span>
                      </div>

                      {/* Difficulty Badge */}
                      {activity.difficulty && (
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase shadow-md ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </div>
                      )}
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-3">
                      {/* Title */}
                      <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg">
                        {activity.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-white/95 text-base leading-relaxed line-clamp-2 drop-shadow-md">
                        {activity.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4">
                        {activity.duration && (
                          <div className="flex items-center gap-1.5 text-white/95">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-semibold">{activity.duration}</span>
                          </div>
                        )}
                        {activity.priceRange && (
                          <div className="flex items-center gap-1.5 text-white/95">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-semibold">{activity.priceRange}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay - More Info */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-green/95 to-brand-green opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-full group-hover:translate-y-0">
                    <div className="h-full p-6 flex flex-col justify-between overflow-y-auto">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-2xl font-black text-white leading-tight">
                            {activity.title}
                          </h4>
                          <Icon className="w-6 h-6 text-white/80" />
                        </div>
                        
                        {/* Full Description */}
                        <p className="text-white/95 text-sm leading-relaxed mb-4">
                          {activity.description}
                        </p>

                        {/* Highlights/Details */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-bold text-white/90 uppercase tracking-wider">What's Included:</h5>
                          <ul className="space-y-2 text-white/90 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>Professional guide & equipment</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>Safety briefing & insurance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>Transport & refreshments</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Footer - Meta & CTA */}
                      <div className="space-y-3 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-semibold">{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm font-semibold">{activity.priceRange}</span>
                          </div>
                        </div>
                        
                        <button className="w-full px-6 py-3 rounded-xl gradient-btn text-white font-bold uppercase tracking-wide transition-all duration-300">
                          Book Now
                        </button>
                      </div>
                    </div>
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

export default RegionActivities;
