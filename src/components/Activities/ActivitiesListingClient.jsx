"use client";

import { useState, useMemo, useEffect } from "react";
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
  DollarSign,
  Search,
  MapPin,
  Package
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActivityCard from "@/components/ui/ActivityCard";
import { useRegionsData } from "@/hooks/regions/useRegionsData";
import { themeMapData } from "@/config/themePackages";

export default function ActivitiesListingClient({ regionSlug }) {
  const { domesticRegions, internationalRegions, regionIsLoading } = useRegionsData();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
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
      category: "exploration-bundle",
      description: "Explore vibrant coral reefs and underwater marine life in crystal-clear waters",
      duration: "2-3 hours",
      priceRange: "$50-$100",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      icon: Waves,
      destinations: ["Baku", "Absheron"],
      packages: ["Caspian Adventure", "Baku Coastal Escape"],
      isRomantic: true,
      isInternational: false,
      regionName: "Absheron",
      regionSlug: "absheron"
    },
    {
      id: 2,
      title: "Mountain Trekking",
      slug: "mountain-trekking",
      category: "group-adventures",
      description: "Challenge yourself with guided treks through stunning mountain trails",
      duration: "Half day - Full day",
      priceRange: "$75-$150",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      icon: Mountain,
      destinations: ["Guba", "Gabala", "Sheki"],
      packages: ["Caucasian Peaks", "Nature Lovers Paradise"],
      isRomantic: false,
      isInternational: false,
      regionName: "Guba",
      regionSlug: "guba"
    },
    {
      id: 3,
      title: "Forest Safari",
      slug: "forest-safari",
      category: "solo-expedition",
      description: "Wildlife spotting adventure through lush forests and national parks",
      duration: "4-6 hours",
      priceRange: "$80-$120",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      icon: TreePine,
      destinations: ["Gabala", "Goygol"],
      packages: ["Wild Azerbaijan", "Green Escape"],
      isRomantic: false,
      isInternational: false,
      regionName: "Gabala",
      regionSlug: "gabala"
    },
    {
      id: 4,
      title: "Cycling Tours",
      slug: "cycling-tours",
      category: "relax-rejuvenate",
      description: "Pedal through scenic routes, villages, and countryside landscapes",
      duration: "3-4 hours",
      priceRange: "$40-$80",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80",
      icon: Bike,
      destinations: ["Baku Boulevard", "Sheki Village"],
      packages: ["Active Baku", "Silk Road by Bike"],
      isRomantic: true,
      isInternational: false,
      regionName: "Baku",
      regionSlug: "baku"
    },
    {
      id: 5,
      title: "Cultural Walking Tours",
      slug: "cultural-walking-tours",
      category: "educational",
      description: "Discover hidden alleys, local markets, and historical landmarks with expert guides",
      duration: "2-3 hours",
      priceRange: "$30-$60",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
      icon: Compass,
      destinations: ["Old City Baku", "Sheki Old Town"],
      packages: ["Historic Azerbaijan", "Cultural Heritage Tour"],
      isRomantic: false,
      isInternational: false,
      regionName: "Baku",
      regionSlug: "baku"
    },
    {
      id: 6,
      title: "Sailing & Boat Tours",
      slug: "sailing-boat-tours",
      category: "elite-escape",
      description: "Cruise along coastlines, explore islands, and enjoy sunset views from the water",
      duration: "2-4 hours",
      priceRange: "$60-$120",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6d?w=800&q=80",
      icon: Sailboat,
      destinations: ["Baku Bay", "Lankaran Coastal"],
      packages: ["Sunset Sail", "Maritime Experience"],
      isRomantic: true,
      isInternational: false,
      regionName: "Lankaran",
      regionSlug: "lankaran"
    },
    {
      id: 7,
      title: "Camping Experiences",
      slug: "camping-experiences",
      category: "solo-expedition",
      description: "Overnight camping under starlit skies with bonfire and local cuisine",
      duration: "Overnight",
      priceRange: "$90-$180",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      icon: Tent,
      destinations: ["Shahdag", "Xinaliq"],
      packages: ["Starry Night Expedition", "Mountain Camp"],
      isRomantic: true,
      isInternational: false,
      regionName: "Shahdag",
      regionSlug: "shahdag"
    },
    {
      id: 8,
      title: "Cooking Classes",
      slug: "cooking-classes",
      category: "family-funventure",
      description: "Learn to prepare authentic local dishes with professional chefs",
      duration: "3-4 hours",
      priceRange: "$50-$90",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
      icon: Utensils,
      destinations: ["Baku", "Ganja"],
      packages: ["Culinary Journey", "Tastes of Azerbaijan"],
      isRomantic: false,
      isInternational: false,
      regionName: "Ganja",
      regionSlug: "ganja"
    },
    {
      id: 9,
      title: "Art & Craft Workshops",
      slug: "art-craft-workshops",
      category: "educational",
      description: "Create handmade souvenirs in traditional art and craft sessions",
      duration: "2-3 hours",
      priceRange: "$35-$75",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
      icon: Palette,
      destinations: ["Baku Old City", "Lahij"],
      packages: ["Artisan Azerbaijan", "Craft & Culture"],
      isRomantic: false,
      isInternational: true,
      regionName: "Lahij",
      regionSlug: "lahij"
    }
  ];

  // Dynamic Regions from Header
  const flattenedInternationalRegions = useMemo(() => {
    if (!internationalRegions || !Array.isArray(internationalRegions)) return [];
    return internationalRegions.flatMap(continent => continent.regions || []);
  }, [internationalRegions]);

  const availableRegions = useMemo(() => {
    if (selectedLocationType === "International") {
      return flattenedInternationalRegions;
    }
    if (selectedLocationType === "Domestic") {
      return domesticRegions || [];
    }
    // "all" - combine both
    return [...(domesticRegions || []), ...flattenedInternationalRegions];
  }, [selectedLocationType, domesticRegions, flattenedInternationalRegions]);

  // Reset selected region when location type changes
  useEffect(() => {
    setSelectedRegion("all");
  }, [selectedLocationType]);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
      
      let matchesLocation = true;
      if (selectedLocationType === "International") matchesLocation = activity.isInternational;
      if (selectedLocationType === "Domestic") matchesLocation = !activity.isInternational;

      const matchesRegion = selectedRegion === "all" || activity.regionName === selectedRegion;

      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesLocation && matchesRegion && matchesSearch;
    });
  }, [selectedCategory, selectedLocationType, selectedRegion, searchTerm]);

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
              Explore curated experiences, from luxury escapes to soulful cultural tours synchronized with our global destinations.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        <div className="space-y-6 mb-12">
          {/* Filter Toolbar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            
            {/* Destinations Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destinations:</span>
            </div>

            {/* Single Row: Destinations, Search, and Travel Type */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6">
              {/* Destinations Dropdown */}
              <div className="w-full lg:w-auto lg:min-w-[250px]">
                <select 
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-100 text-slate-700 text-sm font-bold px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] cursor-pointer transition-all"
                  value={selectedRegion}
                >
                  <option value="all">Discover All Regions</option>
                  {availableRegions.map(region => (
                    <option key={region.id} value={region.name}>{region.name}</option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Where do you want to go or what to do?..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] transition-all text-slate-700"
                />
              </div>

              {/* Travel Type */}
              <div className="inline-flex p-1 bg-gray-100 rounded-full w-fit">
                <button
                  onClick={() => setSelectedLocationType("all")}
                  className={cn(
                    "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
                    selectedLocationType === "all"
                      ? "gradient-btn text-white shadow-md"
                      : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
                  )}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedLocationType("International")}
                  className={cn(
                    "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
                    selectedLocationType === "International"
                      ? "gradient-btn text-white shadow-md"
                      : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
                  )}
                >
                  International
                </button>
                <button
                  onClick={() => setSelectedLocationType("Domestic")}
                  className={cn(
                    "px-7 py-2.5 rounded-full text-base font-bold transition-all duration-300",
                    selectedLocationType === "Domestic"
                      ? "gradient-btn text-white shadow-md"
                      : "text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10"
                  )}
                >
                  Domestic
                </button>
              </div>
            </div>

            {/* Collections */}
            <div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-bold transition-all",
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md"
                      : "bg-white text-[#0146b3] border-2 border-gray-200 hover:border-[#0146b3]"
                  )}
                >
                  All Activities
                </button>
                {[
                  { slug: "water-sports", text: "Water Sports" },
                  { slug: "adventure", text: "Adventure" },
                  { slug: "nature", text: "Nature" },
                  { slug: "active", text: "Active" },
                  { slug: "culture", text: "Culture" },
                  { slug: "cultural", text: "Cultural" }
                ].map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-bold transition-all",
                      selectedCategory === category.slug
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md"
                        : "bg-white text-[#0146b3] border-2 border-gray-200 hover:border-[#0146b3]"
                    )}
                  >
                    {category.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filter Indicator */}
          {(selectedCategory !== "all" || selectedLocationType !== "all" || selectedRegion !== "all" || searchTerm) && (
            <div className="flex items-center gap-3 text-sm text-slate-500 font-bold animate-in fade-in slide-in-from-left-4 duration-300">
              <span className="uppercase text-[10px] tracking-widest text-slate-400">Filtered By:</span>
              <div className="flex flex-wrap gap-2">
                {selectedLocationType !== "all" && (
                  <span className="px-3 py-1 bg-[#0146b3]/10 text-[#0146b3] rounded-lg text-[10px] font-black uppercase">{selectedLocationType}</span>
                )}
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-lg text-[10px] font-black uppercase">{selectedCategory}</span>
                )}
                {selectedRegion !== "all" && (
                  <span className="px-3 py-1 bg-slate-800 text-white rounded-lg text-[10px] font-black uppercase">{selectedRegion}</span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">"{searchTerm}"</span>
                )}
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLocationType("all");
                    setSelectedRegion("all");
                    setSearchTerm("");
                  }}
                  className="text-[#0146b3] hover:underline text-[10px] font-black uppercase ml-2"
                >
                  Reset All
                </button>
              </div>
            </div>
          )}
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
                  relatedPackages: activity.packages,
                  regionName: activity.regionName,
                  regionSlug: activity.regionSlug
                }}
                hoverGradient="from-brand-green/95 to-emerald-900"
                ctaLabel="Learn More"
                onCtaClick={() => window.location.href = `/activities/${regionSlug || "azerbaijan"}/${activity.slug}`}
                secondaryCtaLabel={`Explore ${activity.regionName}`}
                onSecondaryCtaClick={() => window.location.href = `/packages/${activity.regionSlug}`}
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
