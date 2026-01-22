"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  MapPin,
  Heart,
  Star,
  Sparkles,
  Camera,
  Globe,
  Compass,
  Users,
  Clock,
  Zap,
  Coffee,
  Trees,
  CloudSun,
  Palette,
  Mountain,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Info,
  X
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import ActivityCard from "@/components/ui/ActivityCard";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import WhyBayardVacations from "@/components/Packages/WhyBayardVacations";
import { cn } from "@/lib/utils";
import { useRegion } from "@/hooks/regions";
import { useWhyChooseRegion } from "@/hooks/regions/useWhyChooseRegion";

export default function WhyChooseRegionClient({ regionSlug }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState({ title: "", images: [] });
  const [isDescExpanded, setIsDescExpanded] = useState(false); // New state for hero description
  const [expandedHighlights, setExpandedHighlights] = useState({}); // State for individual highlights
  const [expandedFacts, setExpandedFacts] = useState({}); // State for individual facts lists
  const [expandedReasons, setExpandedReasons] = useState({}); // State for Why Visit reasons
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch region data to get the region ID
  const { regionData, isLoading: regionLoading } = useRegion(regionSlug);
  
  // Fetch why choose data using the region ID
  const { whyChooseData, isLoading: whyChooseLoading } = useWhyChooseRegion(regionData?.id);
  
  const isLoading = regionLoading || whyChooseLoading;

  // Icon mapping - converts string names to actual icon components
  const iconMap = {
    Sparkles,
    Mountain,
    Globe,
    Trees,
    MapPin,
    Zap,
    Heart,
    Camera,
    Clock,
    Compass,
    Palette,
    Coffee,
    Users,
    CloudSun,
  };

  // Helper function to get icon component from string name
  const getIcon = (iconName) => {
    return iconMap[iconName] || Sparkles;
  };

  // Process the data to convert icon strings to components
  const processRegionData = (data) => {
    if (!data) return null;
    
    return {
      ...data,
      highlights: data.highlights?.map(highlight => ({
        ...highlight,
        icon: getIcon(highlight.icon)
      })),
      activities: data.activities?.map(activity => ({
        ...activity,
        icon: getIcon(activity.icon)
      })),
      travelStyles: data.travelStyles?.map(style => ({
        ...style,
        icon: getIcon(style.icon)
      })),
      secrets: data.secrets?.map(secret => ({
        ...secret,
        icon: getIcon(secret.icon)
      })),
      whyVisitSection: data.whyVisitSection ? {
        ...data.whyVisitSection,
        reasons: data.whyVisitSection.reasons?.map(reason => ({
          ...reason,
          icon: getIcon(reason.icon)
        }))
      } : null
    };
  };

  // Use dynamic data from whyChooseData
  const rawRegionData = whyChooseData?.details;
  const regionDataProcessed = processRegionData(rawRegionData) || {
    featuredImage: "/img/default-region.jpg",
    overview: `${regionName} is a captivating destination that offers an unforgettable blend of culture, natural beauty, and unique experiences.`,
    whyVisit: `Discover the magic of ${regionName}, where every corner tells a story and every experience creates lasting memories.`,
    activities: []
  };
  
  const highlights = regionDataProcessed?.highlights || [];
  const activities = regionDataProcessed?.activities || [];
  
  // Handle scrolling to hash after data is loaded
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Wait a small bit for the dynamic content to fully render
        const timer = setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-600 font-bold tracking-widest uppercase">Loading...</div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Gallery Carousel Popup */}
      <GalleryCarousel
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedGallery.images}
        title={selectedGallery.title}
      />

      <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] md:min-h-[80vh]">
        <Image
          src={regionDataProcessed?.featuredImage || regionDataProcessed?.heroImage || "/img/default-region.jpg"}
          alt={regionName || "Region Gallery"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <Container className="relative h-full flex flex-col justify-between pt-24 md:pt-32 pb-8 md:pb-12">
          {/* Hero Content */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300 uppercase tracking-widest">
                  Why Visit
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white leading-tight tracking-tighter">
                Why Choose<br />
                <span className="text-amber-400">{regionName}?</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <p className={cn(
                "text-base sm:text-lg md:text-2xl text-white/90 max-w-4xl font-medium leading-relaxed drop-shadow-lg transition-all duration-300",
                !isDescExpanded && "line-clamp-3"
              )}>
                {regionDataProcessed?.overview}
              </p>
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="text-amber-400 text-sm font-bold uppercase tracking-wider mt-4 hover:text-amber-300 transition-colors"
              >
                {isDescExpanded ? "View Less" : "View More"}
              </button>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-8 md:py-12">
        {/* Why Visit Section */}
        <section className="mb-6 md:mb-10">
          <div className="mx-auto">
            <div className="text-center mb-4 md:mb-6">
              <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-black uppercase tracking-widest mb-3 md:mb-4">
                 {regionDataProcessed.whyVisitSection?.subTitle || "Discovery"}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight leading-tight">
                {regionDataProcessed.whyVisitSection?.mainTitle || `Why Visit ${regionName}?`}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed mb-8">
                {regionDataProcessed.whyVisitSection?.mainDescription || `Discover the magic of ${regionName}, where every corner tells a story and every experience creates lasting memories.`}
              </p>
            </div>

            {/* Reasons List - Responsive Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
              {(regionDataProcessed.whyVisitSection?.reasons || []).map((reason, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-blue to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10">
                      <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </div>
                   <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1 leading-tight">{reason.title}</h3>
                    <p className={cn(
                      "text-sm md:text-sm text-slate-600 leading-relaxed transition-all duration-300",
                      !expandedReasons[idx] && "line-clamp-4"
                    )}>
                      {reason.description}
                    </p>
                    <button
                      onClick={() => setExpandedReasons(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider mt-2 hover:underline"
                    >
                      {expandedReasons[idx] ? "View Less" : "Read More"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Quote */}
            {regionDataProcessed.whyVisitSection?.quote && (
              <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-center">
                <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-2">
                  "{regionDataProcessed.whyVisitSection.quote}"
                </blockquote>
                {regionDataProcessed.whyVisitSection.quoteAuthor && (
                  <p className="text-slate-300 font-medium">— {regionDataProcessed.whyVisitSection.quoteAuthor}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Highlights Section Header */}
        {highlights.length > 0 && (
          <div className="text-center mb-6 md:mb-8">
             <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2 tracking-tight">Key Highlights</h2>
             <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
               Deep dive into the unique experiences that define {regionName}.
             </p>
          </div>
        )}

        {/* Detailed Highlight Sections */}
        {regionDataProcessed.highlights && (
          <section className="mb-10 md:mb-16 space-y-12 md:space-y-16">
            {regionDataProcessed.highlights.map((highlight, index) => (
              <div 
                key={index} 
                id={highlight.slug || highlight.title.toLowerCase().replace(/ /g, "-")}
                className="scroll-mt-20 md:scroll-mt-24"
              >
                <Container>
                  <div className={cn(
                    "flex flex-col lg:items-center gap-6 md:gap-10",
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}>
                    {/* Visual content (Higher priority for mobile mobile) */}
                    <div className="flex-1 order-1 lg:order-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        {/* Main Image */}
                        <div 
                          className="relative h-[250px] sm:h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-10 group cursor-pointer"
                          onClick={() => {
                            setSelectedGallery({ title: highlight.title, images: highlight.gallery || [] });
                            setGalleryOpen(true);
                          }}
                        >
                          <Image
                            src={highlight.gallery?.[1]?.url || highlight.gallery?.[0]?.url || "https://images.unsplash.com/photo-1541810271221-23d612fc27df?w=1200"}
                            alt={highlight.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 flex items-center gap-2">
                               <Camera className="w-5 h-5 text-white" />
                               <span className="text-white font-black text-sm uppercase tracking-widest">View Gallery</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-4 md:p-8 bg-black/20 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/20 pointer-events-none">
                            <p className="text-white text-sm md:text-lg font-bold leading-relaxed italic">
                              "{highlight.gallery?.[1]?.caption || highlight.gallery?.[0]?.caption || highlight.description}"
                            </p>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className={cn(
                          "absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 bg-brand-gold/10 rounded-full blur-2xl md:blur-3xl",
                          index % 2 !== 0 && "right-auto -left-6 md:-left-10"
                        )} />
                        
                        {/* Floating stats or badges (hidden on smallest screens) */}

                      </motion.div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 space-y-4 md:space-y-6 order-2 lg:order-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-3 border border-brand-gold/20">
                            <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            Highlight No. 0{index + 1}
                         </div>
                         <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-1 tracking-tight leading-tight">
                            {highlight.title}
                         </h2>
                         <p className="text-lg md:text-xl font-bold text-slate-500 mb-2 leading-tight">
                            {highlight.description}
                         </p>
                         
                         <div className="h-1 w-12 md:w-16 bg-brand-gold rounded-full mb-3" />
                         
                         <p className={cn(
                            "text-sm md:text-base text-slate-600 leading-relaxed transition-all duration-300",
                            !expandedHighlights[index] && "line-clamp-3"
                         )}>
                            {highlight.detailedContent || "Explore the profound beauty and cultural depth of this region through its most iconic landmarks and natural wonders."}
                         </p>
                         <button
                            onClick={() => setExpandedHighlights(prev => ({ ...prev, [index]: !prev[index] }))}
                            className="text-brand-blue text-xs font-bold uppercase tracking-wider mb-4 md:mb-6 hover:underline"
                         >
                            {expandedHighlights[index] ? "View Less" : "Read More"}
                         </button>
 
                         {highlight.keyFacts && (
                           <div className="space-y-3 md:space-y-4">
                              <h4 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Info className="w-3.5 h-3.5 text-brand-blue" />
                                Facts & Information
                              </h4>
                               <div className="grid grid-cols-1 gap-2 md:gap-3">
                                 {(expandedFacts[index] ? highlight.keyFacts : highlight.keyFacts.slice(0, 3)).map((fact, idx) => (
                                   <div key={idx} className="flex gap-3 p-3 md:p-3.5 bg-white border border-slate-100 rounded-xl md:rounded-2xl shadow-sm">
                                     <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue font-bold text-xs">
                                       {idx + 1}
                                     </div>
                                     <p className="text-xs md:text-sm text-slate-600 font-medium leading-tight">{fact}</p>
                                   </div>
                                 ))}
                               </div>
                               {highlight.keyFacts.length > 3 && (
                                 <button
                                   onClick={() => setExpandedFacts(prev => ({ ...prev, [index]: !prev[index] }))}
                                   className="text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider mt-2 hover:underline flex items-center gap-1"
                                 >
                                   {expandedFacts[index] ? "Show Less" : `Show More (${highlight.keyFacts.length - 3} more)`}
                                 </button>
                               )}
                           </div>
                         )}
                      </motion.div>
                    </div>
                  </div>
                </Container>
              </div>
            ))}
          </section>
        )}
        {/* Travel Styles & Seasonal Guide */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12 md:mb-16">
          {/* Traveler Type Matching */}
          <div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-green" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Perfect For...</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regionDataProcessed.travelStyles?.map((style, i) => (
                <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col gap-6 hover:shadow-xl hover:border-brand-green/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-green group-hover:text-white transition-all transform group-hover:rotate-6">
                    <style.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-2 uppercase text-sm tracking-wide">{style.type}</h4>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{style.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Beauty */}
          <div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                  <CloudSun className="w-6 h-6 text-brand-blue" />
               </div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Best Time to Visit</h3>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-[100px] group-hover:bg-brand-blue/30 transition-colors duration-1000" />
               {regionDataProcessed.seasonalGuide?.map((s, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative z-10 flex justify-between items-start gap-4 border-b border-white/10 pb-6 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-brand-blue font-black uppercase text-xs tracking-[0.2em] mb-2">{s.season}</p>
                      <p className="text-slate-300 text-sm font-semibold leading-relaxed">{s.highlight}</p>
                    </div>
                    <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border border-white/5">{s.status}</span>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Regional Secrets */}
        {regionDataProcessed.secrets && (
           <section className="mb-12 md:mb-16">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                    Hidden Gems
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">Regional Secrets</h2>
                  <p className="text-xl text-slate-600 font-medium">The hidden dimensions of {regionName}'s majesty.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {regionDataProcessed.secrets.map((secret, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <secret.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-wide">{secret.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{secret.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
           </section>
        )}

        {/* Top Activities */}
        {activities.length > 0 && (
          <section className="mb-10 md:mb-16">
            <div className="text-center mb-8">
               <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-3 tracking-tight">Top Activities</h2>
               <p className="text-lg text-slate-500 font-medium">Iconic experiences you simply cannot miss.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {activities.map((activity, index) => (
                <ActivityCard 
                  key={index} 
                  data={{
                    name: activity.name,
                    badge: activity.category,
                    title: activity.name,
                    description: activity.description,
                    image: activity.image,
                    icon: activity.icon,
                    isPopular: activity.difficulty === "Easy",
                    highlightsTitle: "Visit Highlights:",
                    highlights: [
                      "Expert local guides included",
                      "Skip-the-line access available",
                      "Photo opportunities guaranteed"
                    ],
                    regionName: regionName,
                    regionSlug: regionSlug
                  }}
                  hoverGradient="from-brand-blue/95 to-blue-900"
                  ctaLabel="Explore Activity"
                  onCtaClick={() => router.push(`/activities/${regionSlug}/${activity.slug}`)}
                  onCardClick={() => router.push(`/activities/${regionSlug}/${activity.slug}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="text-center relative">
           <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
           {/* Why Bayard Vacations */}
        <WhyBayardVacations />
        </section>
      </Container>
    </div>
    </>
  );
}
