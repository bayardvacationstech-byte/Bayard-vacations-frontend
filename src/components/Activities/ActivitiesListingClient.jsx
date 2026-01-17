"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Compass, 
  ArrowLeft,
  Clock,
  DollarSign,
  Search,
  MapPin,
  Package,
  Star,
  Loader2
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ActivityCard from "@/components/ui/ActivityCard";
import { useRegionsData } from "@/hooks/regions/useRegionsData";
import { useActivitiesData } from "@/hooks/activities/useActivitiesData";
import { themeMapData } from "@/config/themePackages";
import { 
  getUniqueCategories, 
  getUniqueCities, 
  formatCategoryName,
  filterActivities 
} from "@/utils/activityUtils";

export default function ActivitiesListingClient({ regionSlug }) {
  const router = useRouter();
  const { domesticRegions, internationalRegions, regionIsLoading } = useRegionsData();
  const { activities: allActivities, loading: activitiesLoading } = useActivitiesData(regionSlug);
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocationType, setSelectedLocationType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState(regionSlug || "all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get unique categories from activities
  const categories = useMemo(() => {
    const uniqueCategories = getUniqueCategories(allActivities);
    return uniqueCategories.map(cat => ({
      id: cat,
      slug: cat,
      name: formatCategoryName(cat)
    }));
  }, [allActivities]);

  // Get unique cities based on selected region
  const availableCities = useMemo(() => {
    const filteredByRegion = selectedRegion === "all" 
      ? allActivities 
      : allActivities.filter(a => a.regionSlug === selectedRegion);
    
    return getUniqueCities(filteredByRegion).map(city => ({
      id: city.slug,
      slug: city.slug,
      name: city.name
    }));
  }, [allActivities, selectedRegion]);

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

  // Reset selected region and city when location type changes
  useEffect(() => {
    if (!regionSlug) {
      setSelectedRegion("all");
    }
    setSelectedCity("all");
  }, [selectedLocationType, regionSlug]);

  // Reset city when region changes
  useEffect(() => {
    setSelectedCity("all");
  }, [selectedRegion]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return filterActivities(allActivities, {
      category: selectedCategory,
      locationType: selectedLocationType,
      region: selectedRegion,
      city: selectedCity,
      searchTerm
    });
  }, [allActivities, selectedCategory, selectedLocationType, selectedRegion, selectedCity, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-green to-green-900 text-white pt-32 pb-16 lg:pt-48 lg:pb-24 relative overflow-hidden">
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
            
            <h1 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
               {regionName ? `Activities in ${regionName}` : "All Activities"}
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
              Explore curated experiences, from luxury escapes to soulful cultural tours synchronized with our global destinations.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 md:py-12">
        {/* Overview Section - Positioned Above Filters */}
        <div className="mb-8 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
            {/* Left Column: Overview Text */}
            <div className="lg:col-span-2 relative pl-6 border-l-4 border-brand-green flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                {selectedRegion !== "all" ? `Experience ${regionName}` : "Curated Experiences"}
              </h2>
              <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                <p>
                  {selectedRegion !== "all" 
                    ? `Discover the soul of ${regionName} through our handpicked collection of activities. Whether you're seeking adrenaline-pumping adventures, deep cultural immersions, or tranquil moments of reflection, our experiences are designed to connect you deeply with the local heritage and natural beauty of this magnificent region. Each activity is carefully selected to provide an authentic perspective and create lasting memories.`
                    : "Welcome to our global collection of curated activities. At Bayard Vacations, we believe that travel is about more than just visiting a place—it's about the stories you create and the connections you make. Explore our diverse range of experiences across international and domestic destinations, each carefully selected to ensure your journey is nothing short of extraordinary."
                  }
                </p>
              </div>
            </div>

            {/* Right Column: Quick Highlights Sidebar */}
            <div className="lg:col-span-1 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm h-full flex flex-col justify-center">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                {selectedRegion !== "all" ? `${regionName} Highlights` : "Why Bayard?"}
              </h4>
              <ul className="space-y-5">
                {[
                  { icon: Compass, label: "Expert Local Guides", desc: "Native insights & storytelling" },
                  { icon: Package, label: "Tailored Packages", desc: "Unique curated itineraries" },
                  { icon: Star, label: "Premium Service", desc: "Veth-vetted luxury standards" },
                  { icon: MapPin, label: "Iconic Locations", desc: "Best-in-class destinations" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-green shadow-sm border border-slate-100 shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-tight">{item.label}</p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky top-[80px] z-[50] bg-white/80 backdrop-blur-md pt-2 pb-1 -mx-4 px-4 mb-8 rounded-2xl transition-all duration-300 shadow-sm border border-slate-50">
          {/* Filter Toolbar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            


            {/* Single Row: Destinations, Search, and Travel Type */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center mb-6">
              {/* Destinations Dropdown */}
              {!regionSlug && (
                <div className="w-full lg:w-auto lg:min-w-[250px]">
                  <select 
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-100 text-slate-700 text-sm font-bold px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] cursor-pointer transition-all"
                    value={selectedRegion}
                  >
                    <option value="all">Discover All Regions</option>
                    {availableRegions.map(region => (
                      <option key={region.id} value={region.slug}>{region.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Cities Dropdown - Show when region is selected */}
              {availableCities.length > 0 && (
                <div className="w-full lg:w-auto lg:min-w-[200px]">
                  <select 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-100 text-slate-700 text-sm font-bold px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#0146b3]/20 focus:border-[#0146b3] cursor-pointer transition-all"
                    value={selectedCity}
                  >
                    <option value="all">All Cities</option>
                    {availableCities.map(city => (
                      <option key={city.id} value={city.slug}>{city.name}</option>
                    ))}
                  </select>
                </div>
              )}

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
              {!regionSlug && (
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
              )}
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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-bold transition-all",
                      selectedCategory === category.slug
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md"
                        : "bg-white text-[#0146b3] border-2 border-gray-200 hover:border-[#0146b3]"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Active Filter Indicator - Moved Inside for tighter gap */}
            {(selectedCategory !== "all" || selectedLocationType !== "all" || selectedRegion !== "all" || selectedCity !== "all" || searchTerm) && (
              <div className="flex items-center gap-3 text-sm text-slate-500 font-bold mt-6 pt-5 border-t border-slate-100 animate-in fade-in slide-in-from-left-4 duration-300">
                <span className="uppercase text-[10px] tracking-widest text-slate-400">Filtered By:</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {selectedLocationType !== "all" && (
                    <span className="px-3 py-1 bg-[#0146b3]/10 text-[#0146b3] rounded-lg text-[10px] font-black uppercase">{selectedLocationType}</span>
                  )}
                  {selectedCategory !== "all" && (
                    <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-lg text-[10px] font-black uppercase">{selectedCategory}</span>
                  )}
                  {selectedRegion !== "all" && (
                    <span className="px-3 py-1 bg-slate-800 text-white rounded-lg text-[10px] font-black uppercase">{selectedRegion}</span>
                  )}
                  {selectedCity !== "all" && (
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-black uppercase">{selectedCity}</span>
                  )}
                  {searchTerm && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">"{searchTerm}"</span>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedLocationType("all");
                    setSelectedRegion("all");
                    setSelectedCity("all");
                    setSearchTerm("");
                  }}
                  className="text-brand-red hover:underline text-[10px] font-black uppercase px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  Reset All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Activities Grid */}
        {activitiesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-brand-green animate-spin mx-auto mb-4" />
              <p className="text-lg text-slate-600 font-medium">Loading activities...</p>
            </div>
          </div>
        ) : (
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
                    badge: activity.badge || formatCategoryName(activity.category),
                    title: activity.title,
                    description: activity.description,
                    image: activity.image,
                    icon: activity.icon,
                    isPopular: activity.isPopular,
                    highlightsTitle: "What's Included:",
                    highlights: activity.highlights?.slice(0, 3) || [
                      "Professional guide & equipment",
                      "Safety briefing & insurance",
                      "Transport & refreshments"
                    ],
                    cityName: activity.cityName,
                    regionName: activity.regionName,
                    regionSlug: activity.regionSlug
                  }}
                  hoverGradient="from-brand-green/95 to-emerald-900"
                  ctaLabel="Learn More"
                  onCtaClick={() => router.push(`/activities/${activity.regionSlug}/${activity.slug}`)}
                  onCardClick={() => router.push(`/activities/${activity.regionSlug}/${activity.slug}`)}
                  secondaryCtaLabel={`Explore ${activity.regionName}`}
                  onSecondaryCtaClick={() => router.push(`/packages/${activity.regionSlug}`)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!activitiesLoading && filteredActivities.length === 0 && (
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
