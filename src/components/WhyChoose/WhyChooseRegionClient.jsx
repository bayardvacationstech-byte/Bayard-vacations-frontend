"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Heart, 
  Star,
  Sparkles,
  Camera,
  Globe
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function WhyChooseRegionClient({ regionSlug }) {
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Generate dummy data based on region
  const regionData = {
    featuredImage: "/img/default-region.jpg",
    overview: `${regionName} is a captivating destination that offers an unforgettable blend of culture, natural beauty, and unique experiences. From stunning landscapes to rich heritage, this region promises memories that will last a lifetime.`,
    whyVisit: `Discover the magic of ${regionName}, where every corner tells a story and every experience creates lasting memories. Whether you're seeking adventure, relaxation, or cultural immersion, ${regionName} has something special to offer every traveler.`,
    highlights: [
      { title: "Stunning Landscapes", description: `Experience breathtaking natural beauty throughout ${regionName}` },
      { title: "Rich Culture", description: "Immerse yourself in local traditions and heritage" },
      { title: "Unique Cuisine", description: "Savor authentic flavors and culinary delights" },
      { title: "Warm Hospitality", description: "Feel welcomed by friendly locals" },
      { title: "Historic Sites", description: "Explore ancient monuments and landmarks" },
      { title: "Adventure Activities", description: "Exciting experiences for thrill-seekers" }
    ],
    attractions: [
      { name: "Historic Landmarks", description: "Visit iconic sites rich in history and culture" },
      { name: "Natural Wonders", description: "Discover pristine landscapes and scenic beauty" },
      { name: "Cultural Centers", description: "Experience local art, music, and traditions" },
      { name: "Local Markets", description: "Shop for authentic crafts and souvenirs" }
    ]
  };
  
  const highlights = regionData?.highlights || [];
  const attractions = regionData?.attractions || [];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={regionData?.featuredImage || regionData?.heroImage || "/img/default-region.jpg"}
          alt={regionName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Container className="relative h-full flex flex-col justify-between py-8 md:py-12">
          {/* Back Button */}
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName} Packages
            </Button>
          </Link>

          {/* Hero Content */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Why Visit
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                Why Choose<br />
                <span className="text-amber-400">{regionName}?</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl font-medium leading-relaxed"
            >
              {regionData?.overview || `Discover the magic and wonder that makes ${regionName} an unforgettable destination.`}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        {/* Why Visit Section */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                The Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
                What Makes {regionName} Special
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                {regionData?.whyVisit || regionData?.description || regionData?.overview}
              </p>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        {highlights.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                Highlights
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                Key Attractions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {highlight.title || highlight.name || highlight}
                  </h3>
                  {highlight.description && (
                    <p className="text-slate-600">
                      {highlight.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Attractions Section */}
        {attractions.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                Must See
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">
                Top Attractions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {attraction.image && (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={attraction.image}
                        alt={attraction.name || attraction.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                        {regionName}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {attraction.name || attraction.title || attraction}
                    </h3>
                    {attraction.description && (
                      <p className="text-slate-600 line-clamp-3">
                        {attraction.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-amber-400" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Explore {regionName}?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our curated packages and start planning your dream vacation today.
          </p>
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              View {regionName} Packages
            </Button>
          </Link>
        </section>
      </Container>
    </div>
  );
}
