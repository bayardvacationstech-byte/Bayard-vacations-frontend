"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Backpack, Compass, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Coffee, Tent, Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function SoloExpeditionClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Solo travel packages data
  const soloPackages = {
    international: [
      {
        id: 1,
        title: "Iceland Solo Adventure",
        location: "Iceland",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
        price: "$2,999",
        rating: 4.9,
        highlights: ["Northern Lights", "Solo-Friendly Hostels", "Group Activities"],
        category: "Adventure & Nature",
        groupSize: "Solo with optional meetups"
      },
      {
        id: 2,
        title: "Bali Solo Wellness Retreat",
        location: "Bali, Indonesia",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        price: "$1,799",
        rating: 4.8,
        highlights: ["Yoga Sessions", "Solo Dining", "Cultural Workshops"],
        category: "Wellness & Culture",
        groupSize: "Individual experience"
      },
      {
        id: 3,
        title: "New Zealand Hiking Solo Trek",
        location: "New Zealand",
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        price: "$3,499",
        rating: 4.9,
        highlights: ["Guided Hikes", "Solo Camping", "Adventure Sports"],
        category: "Outdoor Adventure",
        groupSize: "Solo with guide support"
      },
      {
        id: 4,
        title: "Japan Cultural Solo Journey",
        location: "Tokyo & Kyoto, Japan",
        duration: "9 Days / 8 Nights",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
        price: "$2,899",
        rating: 4.8,
        highlights: ["Cultural Immersion", "Solo-Friendly Transport", "Local Experiences"],
        category: "Culture & Discovery",
        groupSize: "Independent exploration"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Ladakh Solo Motorcycle Tour",
        location: "Ladakh",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: "₹45,999",
        rating: 4.9,
        highlights: ["Bike Rental", "Safety Gear", "Solo Route Planning"],
        category: "Adventure Biking",
        groupSize: "Solo with backup support"
      },
      {
        id: 6,
        title: "Goa Solo Beach & Chill",
        location: "Goa",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        price: "₹28,999",
        rating: 4.6,
        highlights: ["Beach Hostel", "Water Sports", "Solo Traveler Meetups"],
        category: "Beach & Leisure",
        groupSize: "Solo with social options"
      },
      {
        id: 7,
        title: "Rishikesh Solo Adventure Camp",
        location: "Rishikesh",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
        price: "₹22,999",
        rating: 4.7,
        highlights: ["River Rafting", "Bungee Jumping", "Camping"],
        category: "Adventure Sports",
        groupSize: "Solo-friendly groups"
      },
      {
        id: 8,
        title: "Kerala Solo Backpacking Trail",
        location: "Kerala",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        price: "₹32,999",
        rating: 4.8,
        highlights: ["Backpacker Hostels", "Local Transport", "Village Homestays"],
        category: "Backpacking",
        groupSize: "Independent travel"
      }
    ]
  };

  const currentPackages = soloPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600">
        {/* Adventure Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L35 20 L45 22 L37 30 L39 40 L30 35 L21 40 L23 30 L15 22 L25 20 Z M10 40 L12 45 L17 46 L13 50 L14 55 L10 52 L6 55 L7 50 L3 46 L8 45 Z M50 40 L52 45 L57 46 L53 50 L54 55 L50 52 L46 55 L47 50 L43 46 L48 45 Z' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <Container className="relative h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                <Backpack className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Solo<br />
                <span className="text-cyan-200">Expedition</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things you. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-teal-700 hover:bg-cyan-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Browse Adventures
                </Button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                  alt="Solo traveler"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Your Adventure, Your Way</p>
                    <p className="text-sm text-slate-600">Freedom to explore independently</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Packages Section */}
      <Container className="py-8 md:py-12">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 rounded-full p-1.5">
            <button
              onClick={() => setSelectedTab("international")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "international"
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Domestic
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/packages/${pkg.id}`}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-black uppercase backdrop-blur-sm">
                        {pkg.category}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold">{pkg.rating}</span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-bold">{pkg.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Group Size */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{pkg.groupSize}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Starting from</p>
                        <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                      </div>
                      <div className="flex items-center gap-2 text-teal-600 font-bold group-hover:gap-3 transition-all">
                        <span className="text-sm">Explore</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Why Solo Travel Section */}
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Solo Travel?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover yourself while discovering the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Total Freedom", desc: "Travel at your own pace, make spontaneous decisions, and create your perfect itinerary without compromise." },
              { icon: Mountain, title: "Self Discovery", desc: "Solo travel pushes you out of your comfort zone, building confidence and revealing your true capabilities." },
              { icon: Coffee, title: "Safety & Support", desc: "Carefully curated solo-friendly accommodations, 24/7 support, and meetup opportunities whenever you want company." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
