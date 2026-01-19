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
  Loader2,
  Calendar,
  CheckCircle
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

export default function ActivitiesListingClient({ regionSlug, initialRegions = [] }) {
  const router = useRouter();
  const { domesticRegions, internationalRegions, regionIsLoading } = useRegionsData(initialRegions);
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

  // Get unique categories from activities based on selected region and location type
  const categories = useMemo(() => {
    const filteredByBasics = allActivities.filter(a => {
      const regionMatch = selectedRegion === "all" || a.regionSlug === selectedRegion;
      const typeMatch = selectedLocationType === "all" || 
        (selectedLocationType === "International" && a.isInternational) ||
        (selectedLocationType === "Domestic" && !a.isInternational);
      return regionMatch && typeMatch;
    });
    
    const uniqueCategories = getUniqueCategories(filteredByBasics);
    return uniqueCategories.map(cat => ({
      id: cat,
      slug: cat,
      name: formatCategoryName(cat)
    }));
  }, [allActivities, selectedRegion, selectedLocationType]);

  // Get unique cities based on selected region and location type
  const availableCities = useMemo(() => {
    const filteredByBasics = allActivities.filter(a => {
      const regionMatch = selectedRegion === "all" || a.regionSlug === selectedRegion;
      const typeMatch = selectedLocationType === "all" || 
        (selectedLocationType === "International" && a.isInternational) ||
        (selectedLocationType === "Domestic" && !a.isInternational);
      return regionMatch && typeMatch;
    });
    
    return getUniqueCities(filteredByBasics).map(city => ({
      id: city.slug,
      slug: city.slug,
      name: city.name
    }));
  }, [allActivities, selectedRegion, selectedLocationType]);

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

  // Reset city and category when region changes
  useEffect(() => {
    setSelectedCity("all");
    setSelectedCategory("all");
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left Column: Header Area (60% width on desktop) */}
            <div className="lg:col-span-3">
              <div className="relative pl-6 border-l-4 border-brand-green py-2 mb-6">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  {selectedRegion !== "all" ? `Experience ${regionName}` : "Curated Experiences"}
                </h2>
                <div className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  {selectedRegion !== "all" 
                    ? `Discover the soul of ${regionName} through our handpicked collection of activities. Whether you're seeking adrenaline-pumping adventures or deep cultural immersions, our experiences are designed to connect you deeply with the local heritage.`
                    : "Welcome to our global collection of curated activities. At Bayard Vacations, we believe that travel is about more than just visiting a place—it's about the stories you create and the connections you make across international and domestic destinations."
                  }
                </div>
              </div>
            </div>

            {/* Right Column: Highlights Info Grid (40% width on desktop) */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-8">
                {selectedRegion !== "all" ? (
                  // Region-specific Highlights
                  <>
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">{availableCities.length} CITIES EXPLORED</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Diverse urban gems and hidden villages awaiting your visit.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">{filteredActivities.length} DYNAMIC ACTIVITIES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">From high-octane adventures to spiritual retreats.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">{categories.length} ACTIVITY THEMES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Hand-vetted categories including Culture and Nature.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0 border border-rose-100 group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">PREMIUM SELECTION</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Physically verified for safety and quality standards.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0 border border-cyan-100 group-hover:scale-110 transition-transform">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">OPTIMAL TRAVEL TIME</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Best experienced during seasonal festival peaks.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">EASY BOOKING PROCESS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Seamless concierge-led service for your peace of mind.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Global Highlights
                  <>
                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">50+ GLOBAL DESTINATIONS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">From the Caucasus peaks to the beaches of Bali.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">{allActivities.length} CURATED ACTIVITIES</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Our ever-expanding library of luxury experiences.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-1">LUXURY VETTED STANDARDS</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[180px]">Uncompromising standards for service and safety.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-[80px] z-[50] bg-white/80 backdrop-blur-md pt-2 pb-1 -mx-4 px-4 mb-8 rounded-2xl transition-all duration-300 shadow-sm border border-slate-50">
          {/* Filter Toolbar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
            


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
                    <option key={region.id} value={region.slug}>{region.name}</option>
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
            <div className="flex items-center gap-3">
              {/* Sticky All Activities Button */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "w-[130px] py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 sticky left-0 z-10 flex items-center justify-center",
                  "bg-slate-900 text-white shadow-[4px_0_12px_-2px_rgba(0,0,0,0.15)]",
                  selectedCategory !== "all" && "opacity-90 hover:opacity-100"
                )}
              >
                All Activities
              </button>
              
              {/* Scrollable Category Pills */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap flex-shrink-0",
                      selectedCategory === category.slug
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-md scale-105"
                        : "bg-white text-slate-600 border-2 border-gray-100 hover:border-yellow-400/50"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter Pills - Show when cities are available */}
            {availableCities.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {/* Sticky All Cities Button */}
                <button
                  onClick={() => setSelectedCity("all")}
                  className={cn(
                    "w-[130px] py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 sticky left-0 z-10 flex items-center justify-center",
                    "bg-slate-900 text-white shadow-[4px_0_12px_-2px_rgba(0,0,0,0.15)]",
                    selectedCity !== "all" && "opacity-90 hover:opacity-100"
                  )}
                >
                  All Cities
                </button>
                
                {/* Scrollable City Pills */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1">
                  {availableCities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city.slug)}
                      className={cn(
                        "px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap flex-shrink-0",
                        selectedCity === city.slug
                          ? "bg-gradient-to-r from-brand-blue to-brand-blue-hovered text-white shadow-md scale-105"
                          : "bg-white text-slate-600 border-2 border-gray-100 hover:border-brand-blue/50"
                      )}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
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
                    <span className="px-3 py-1 bg-brand-blue text-white rounded-lg text-[10px] font-black uppercase">{selectedCity}</span>
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
