"use client";
import React from "react";
import Container from "@/components/ui/Container";
import { 
  Plane, 
  Landmark, 
  Banknote, 
  Flame, 
  Building2, 
  ShieldCheck,
  Mountain,
  Palmtree,
  Camera,
  Star,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureCard = ({ icon: Icon, title, description, iconColor }) => (
  <div className="flex gap-4">
    <div className={cn("w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100", iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="space-y-1">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  </div>
);

const AttractionCard = ({ icon: Icon, title, iconColor }) => (
  <div className="flex items-center gap-4 bg-[#f8fafc]/50 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300">
    <div className={cn("w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white border border-slate-100", iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm md:text-base font-bold text-slate-700 tracking-tight">{title}</span>
  </div>
);

const PackageHighlights = ({ packageData }) => {
  const regionName = packageData?.region || "the Destination";

  // 1. Dynamic Highlights (Left Side)
  const highlightsList = Array.isArray(packageData?.highlights) && packageData.highlights.length > 0 
    ? packageData.highlights.slice(0, 6).map((h, i) => ({
        icon: [Plane, Star, Landmark, Banknote, Building2, ShieldCheck][i % 6],
        title: (typeof h === 'string' ? h : h.text).split(' - ')[0], // Clean up 'Attraction - Details' if present
        description: (typeof h === 'string' ? h : h.text).split(' - ')[1] || "Experience the best of " + regionName,
        iconColor: ["text-blue-500", "text-yellow-500", "text-amber-600", "text-emerald-500", "text-indigo-500", "text-slate-600"][i % 6]
      }))
    : [
        { icon: Star, title: "Burj Khalifa Observation", description: "At the Top viewing experience from the world's tallest building", iconColor: "text-yellow-500" },
        { icon: Flame, title: "Desert Safari & BBQ", description: "Thrilling dune bashing followed by traditional dinner under stars", iconColor: "text-orange-500" },
        { icon: Landmark, title: "Grand Mosque Tour", description: "Explore the stunning architecture and spiritual heritage", iconColor: "text-amber-600" },
        { icon: Plane, title: "Private Airport Transfers", description: "Seamless and comfortable arrival/departure services", iconColor: "text-blue-500" },
        { icon: Building2, title: "Modern City Sightseeing", description: "Discover the futuristic skyline and panoramic city views", iconColor: "text-indigo-500" },
        { icon: ShieldCheck, title: "Luxury Accommodation", description: "Hand-picked premium stays for maximum comfort", iconColor: "text-emerald-500" },
      ];

  // 2. Dynamic Attractions (Right Side)
  // Extract attraction names from itinerary titles if available
  const attractionsList = Array.isArray(packageData?.itineraries) && packageData.itineraries.length > 0
    ? packageData.itineraries.slice(0, 6).map((day, i) => ({
        icon: [Flame, Building2, Mountain, Landmark, Camera, MapPin][i % 6],
        title: day.title.split(':').pop().split(' - ').shift().trim(), // Clean up day titles like "Day 1: Burj Khalifa"
        iconColor: ["text-orange-500", "text-indigo-500", "text-blue-500", "text-amber-600", "text-purple-500", "text-rose-500"][i % 6]
      }))
    : [
        { icon: Flame, title: "Yanar Dag (Eternal Flame)", iconColor: "text-orange-500" },
        { icon: Building2, title: "Flame Towers & Modern City", iconColor: "text-indigo-500" },
        { icon: Mountain, title: "Scenic Highlands & Adventure Hub", iconColor: "text-blue-500" },
        { icon: Landmark, title: "UNESCO World Heritage Sites", iconColor: "text-amber-600" },
        { icon: Camera, title: "Stunning Photography Spots", iconColor: "text-purple-500" },
        { icon: MapPin, title: "Signature Local Experiences", iconColor: "text-rose-500" },
      ];

  return (
    <section className="bg-white py-10 md:py-14 border-y border-slate-100">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Side: Package Highlights */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
              Package <span className="text-brand-blue">Highlights</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {highlightsList.map((item, idx) => (
                <FeatureCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* Right Side: Must-Experience Attractions */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
              Must-Experience <span className="text-brand-blue">Attractions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {attractionsList.map((item, idx) => (
                <AttractionCard key={idx} {...item} />
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default PackageHighlights;
