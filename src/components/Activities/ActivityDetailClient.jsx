"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin,
  Calendar,
  Check,
  Star,
  ChevronRight,
  Compass
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function ActivityDetailClient({ regionSlug, activitySlug }) {
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  const activityName = activitySlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Dummy activity data
  const activity = {
    title: activityName,
    category: "Adventure",
    description: `Experience the thrill of ${activityName} in ${regionName}. This unforgettable activity combines adventure, culture, and natural beauty for an experience you'll never forget.`,
    longDescription: `Immerse yourself in an extraordinary ${activityName} experience in the heart of ${regionName}. Our expert guides will lead you through breathtaking landscapes, sharing local insights and ensuring your safety every step of the way. Whether you're a beginner or experienced adventurer, this activity is designed to create lasting memories.`,
    duration: "3-4 hours",
    priceRange: "$75-$150",
    groupSize: "2-12 people",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    included: [
      "Professional guide",
      "All necessary equipment",
      "Safety gear and insurance",
      "Transport to/from activity location",
      "Refreshments and snacks",
      "Souvenir photo package"
    ],
    highlights: [
      `Spectacular views of ${regionName}`,
      "Expert local guide",
      "Small group experience",
      "All skill levels welcome",
      "Flexible booking options"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Container className="relative h-full flex flex-col justify-between py-8 md:py-12">
          <Link href={`/activities/${regionSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Activities
            </Button>
          </Link>

          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/20 backdrop-blur-md rounded-full border border-brand-green/30 mb-4">
                <Compass className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  {activity.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                {activity.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 max-w-3xl font-medium leading-relaxed mt-4">
                {activity.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                  <DollarSign className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white">{activity.priceRange}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-4">About This Activity</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {activity.longDescription}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What's Included */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-4">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activity.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Image Gallery */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {activity.images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={img}
                      alt={`${activity.title} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Price From
                  </div>
                  <div className="text-4xl font-black text-brand-green">
                    {activity.priceRange.split('-')[0]}
                    <span className="text-lg text-slate-600 font-medium"> /person</span>
                  </div>
                </div>

                <div className="space-y-3 py-6 border-y border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Duration</span>
                    </div>
                    <span className="font-bold text-slate-900">{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Group Size</span>
                    </div>
                    <span className="font-bold text-slate-900">{activity.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">Location</span>
                    </div>
                    <span className="font-bold text-slate-900">{regionName}</span>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-brand-green hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book This Activity
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  Free cancellation up to 24 hours before activity
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
