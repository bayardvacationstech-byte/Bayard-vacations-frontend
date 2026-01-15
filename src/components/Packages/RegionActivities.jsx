"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
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
  ChevronUp,
  MapPin,
  Clock,
  DollarSign,
  Info,
  X
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";
import ActivityCard from "@/components/ui/ActivityCard";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const RegionActivities = ({ regionName = "this destination", regionData = null }) => {
  const router = useRouter();
  const { region: regionSlug } = useParams();
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get icon based on category name
  const getCategoryIcon = (category) => {
    const categoryLower = category?.toLowerCase() || "";
    
    if (categoryLower.includes("water") || categoryLower.includes("diving") || categoryLower.includes("sailing")) return Waves;
    if (categoryLower.includes("mountain") || categoryLower.includes("trek") || categoryLower.includes("hiking")) return Mountain;
    if (categoryLower.includes("nature") || categoryLower.includes("forest") || categoryLower.includes("safari")) return TreePine;
    if (categoryLower.includes("bike") || categoryLower.includes("cycling")) return Bike;
    if (categoryLower.includes("cultural") || categoryLower.includes("culture") || categoryLower.includes("sightseeing")) return Palette;
    if (categoryLower.includes("music") || categoryLower.includes("dance") || categoryLower.includes("entertainment")) return Music;
    if (categoryLower.includes("food") || categoryLower.includes("cooking") || categoryLower.includes("culinary")) return Utensils;
    if (categoryLower.includes("camping") || categoryLower.includes("overnight")) return Tent;
    if (categoryLower.includes("sailing") || categoryLower.includes("boat")) return Sailboat;
    
    return Compass; // Default icon
  };

  // Extract activities from API data
  const apiActivities = regionData?.activities || [];
  
  // Transform API activities to component format
  const transformedApiActivities = apiActivities.map((activity, index) => ({
    id: `api-${index}`,
    title: activity.title || "Untitled Activity",
    category: activity.category || "General",
    description: activity.description || "",
    duration: activity.tourDuration || "Duration varies",
    priceRange: activity.priceFrom || "Contact for pricing",
    image: activity.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    icon: getCategoryIcon(activity.category),
    difficulty: "Easy" // Default since API doesn't provide this
  }));

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
    }
  ];

  // Combine API activities with dummy activities
  const allActivities = transformedApiActivities.length > 0 
    ? [...transformedApiActivities, ...defaultActivities.slice(0, 3)] // Add 3 dummy activities
    : defaultActivities; // Use all dummy if no API data
  
  // Get unique categories (excluding "all" since we'll use an Explore button instead)
  const categories = [...new Set(allActivities.map(a => a.category))];
  
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
    <section className="bg-white py-4 md:py-6">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            {/* Left: Title Section */}
            <div className="flex-1 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
                <Compass className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  Things To Do
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Top Activities in </span>
                <span className="inline sm:hidden">Activities in </span>
                <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              <p className="hidden sm:block text-xl text-slate-600 truncate md:whitespace-normal">
                Adventure awaits! Discover exciting activities and unforgettable experiences
              </p>
            </div>
            
            {/* Right: Explore Button */}
            <Link href={`/activities/${regionName?.toLowerCase()}`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap">
                Explore More
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          {/* Category Filter Pills - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 pb-2 -mb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-yellow-400 text-slate-900 shadow-sm"
                  : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              All Activities
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-slate-900 shadow-sm"
                    : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Carousel */}
        <div className="relative group/nav mt-8">
          {/* Overlay Navigation Buttons */}
          <button className="activities-prev-btn absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeftIcon className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="activities-next-btn absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={12}
          slidesPerView={1.15}
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
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="pb-8"
        >
          {displayActivities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <ActivityCard 
                data={{
                  name: activity.title,
                  badge: activity.category,
                  title: activity.title,
                  description: activity.description,
                  image: activity.image,
                  icon: activity.icon,
                  isPopular: activity.difficulty === "Easy",
                  highlightsTitle: "What's Included:",
                  highlights: [
                    "Professional guide & equipment",
                    "Safety briefing & insurance",
                    "Transport & refreshments"
                  ]
                }}
                hoverGradient="from-brand-green/95 to-emerald-900"
                ctaLabel="Learn More"
                onCtaClick={() => router.push(`/activities/${regionSlug}/${activity.title.toLowerCase().replace(/\s+/g, '-')}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  </section>
  );
}

export default RegionActivities;
