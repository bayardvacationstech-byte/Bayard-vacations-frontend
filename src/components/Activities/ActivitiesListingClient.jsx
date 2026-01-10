"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Compass, 
  Waves, 
  Mountain, 
  TreePine, 
  Bike, 
  Palette, 
  Utensils, 
  Tent, 
  Sailboat,
  Music,
  ArrowLeft,
  Clock,
  DollarSign
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ActivitiesListingClient({ regionSlug }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Dummy activities data
  const activities = [
    {
      id: 1,
      title: "Scuba Diving & Snorkeling",
      slug: "scuba-diving-snorkeling",
      category: "Water Sports",
      description: "Explore vibrant coral reefs and underwater marine life in crystal-clear waters",
      duration: "2-3 hours",
      priceRange: "$50-$100",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      icon: Waves
    },
    {
      id: 2,
      title: "Mountain Trekking",
      slug: "mountain-trekking",
      category: "Adventure",
      description: "Challenge yourself with guided treks through stunning mountain trails",
      duration: "Half day - Full day",
      priceRange: "$75-$150",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      icon: Mountain
    },
    {
      id: 3,
      title: "Forest Safari",
      slug: "forest-safari",
      category: "Nature",
      description: "Wildlife spotting adventure through lush forests and national parks",
      duration: "4-6 hours",
      priceRange: "$80-$120",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      icon: TreePine
    },
    {
      id: 4,
      title: "Cycling Tours",
      slug: "cycling-tours",
      category: "Active",
      description: "Pedal through scenic routes, villages, and countryside landscapes",
      duration: "3-4 hours",
      priceRange: "$40-$80",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80",
      icon: Bike
    },
    {
      id: 5,
      title: "Cultural Walking Tours",
      slug: "cultural-walking-tours",
      category: "Culture",
      description: "Discover hidden alleys, local markets, and historical landmarks with expert guides",
      duration: "2-3 hours",
      priceRange: "$30-$60",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
      icon: Compass
    },
    {
      id: 6,
      title: "Sailing & Boat Tours",
      slug: "sailing-boat-tours",
      category: "Water Sports",
      description: "Cruise along coastlines, explore islands, and enjoy sunset views from the water",
      duration: "2-4 hours",
      priceRange: "$60-$120",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6d?w=800&q=80",
      icon: Sailboat
    },
    {
      id: 7,
      title: "Camping Experiences",
      slug: "camping-experiences",
      category: "Adventure",
      description: "Overnight camping under starlit skies with bonfire and local cuisine",
      duration: "Overnight",
      priceRange: "$90-$180",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      icon: Tent
    },
    {
      id: 8,
      title: "Cooking Classes",
      slug: "cooking-classes",
      category: "Cultural",
      description: "Learn to prepare authentic local dishes with professional chefs",
      duration: "3-4 hours",
      priceRange: "$50-$90",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      icon: Utensils
    },
    {
      id: 9,
      title: "Art & Craft Workshops",
      slug: "art-craft-workshops",
      category: "Cultural",
      description: "Create handmade souvenirs in traditional art and craft sessions",
      duration: "2-3 hours",
      priceRange: "$35-$75",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      icon: Palette
    }
  ];

  const categories = ["all", ...new Set(activities.map(a => a.category))];
  
  const filteredActivities = selectedCategory === "all" 
    ? activities 
    : activities.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-green to-green-900 text-white py-16 md:py-24">
        <Container>
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName} Packages
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold uppercase tracking-wider">
                Things To Do
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              All Activities in<br />
              <span className="text-amber-400">{regionName}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
              Discover exciting activities and unforgettable experiences in {regionName}.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                selectedCategory === category
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {category === "all" ? "All Activities" : category}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/activities/${regionSlug}/${activity.slug}`}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-xl hover:shadow-2xl h-[420px] flex flex-col bg-white"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                      <Icon className="w-3.5 h-3.5 text-slate-700" />
                      <span className="text-xs font-bold text-slate-900 uppercase">{activity.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-brand-green transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-green">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm font-bold">{activity.priceRange}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
