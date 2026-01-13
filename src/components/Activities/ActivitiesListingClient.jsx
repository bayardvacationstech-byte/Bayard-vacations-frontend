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
import { Search, MapPin, Package } from "lucide-react";
import ActivityCard from "@/components/ui/ActivityCard";

export default function ActivitiesListingClient({ regionSlug }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Enriched activities data with destination and package mappings
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
      icon: Waves,
      destinations: ["Baku", "Absheron"],
      packages: ["Caspian Adventure", "Baku Coastal Escape"]
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
      icon: Mountain,
      destinations: ["Guba", "Gabala", "Sheki"],
      packages: ["Caucasian Peaks", "Nature Lovers Paradise"]
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
      icon: TreePine,
      destinations: ["Gabala", "Goygol"],
      packages: ["Wild Azerbaijan", "Green Escape"]
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
      icon: Bike,
      destinations: ["Baku Boulevard", "Sheki Village"],
      packages: ["Active Baku", "Silk Road by Bike"]
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
      icon: Compass,
      destinations: ["Old City Baku", "Sheki Old Town"],
      packages: ["Historic Azerbaijan", "Cultural Heritage Tour"]
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
      icon: Sailboat,
      destinations: ["Baku Bay", "Lankaran Coastal"],
      packages: ["Sunset Sail", "Maritime Experience"]
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
      icon: Tent,
      destinations: ["Shahdag", "Xinaliq"],
      packages: ["Starry Night Expedition", "Mountain Camp"]
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
      icon: Utensils,
      destinations: ["Baku", "Ganja"],
      packages: ["Culinary Journey", "Tastes of Azerbaijan"]
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
      icon: Palette,
      destinations: ["Baku Old City", "Lahij"],
      packages: ["Artisan Azerbaijan", "Craft & Culture"]
    }
  ];

  const categories = ["all", ...new Set(activities.map(a => a.category))];
  
  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-green to-green-900 text-white py-16 md:py-24">
        <Container>
          <Link href={regionSlug ? `/packages/${regionSlug}` : "/packages"}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName || "All"} Packages
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
                Experience More
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              {regionName ? `Activities in ${regionName}` : "All Activities"}
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
              Explore curated experiences, from high-adrenaline adventures to soul-stirring cultural tours across the region.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
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

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search activities or places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ActivityCard 
                data={{
                  name: activity.title,
                  badge: activity.category,
                  title: activity.title,
                  description: activity.description,
                  image: activity.image,
                  icon: activity.icon,
                  isPopular: true,
                  highlightsTitle: "Recommended Locations:",
                  highlights: activity.destinations,
                  relatedPackages: activity.packages // Passing new contextual data
                }}
                hoverGradient="from-brand-green/95 to-emerald-900"
                ctaLabel="Learn More"
                onCtaClick={() => window.location.href = `/activities/${regionSlug || "azerbaijan"}/${activity.slug}`}
              />
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No activities found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
