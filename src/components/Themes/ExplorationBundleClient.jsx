"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Map, Tent, MapPin, Calendar, Users, Star, Mountain, ChevronRight, Backpack, TreePine, Flame } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function ExplorationBundleClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Adventure packages data
  const adventurePackages = {
    international: [
      {
        id: 1,
        title: "Patagonia Trekking Expedition",
        location: "Chile & Argentina",
        duration: "12 Days / 11 Nights",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        price: "$4,299",
        rating: 4.9,
        highlights: ["Torres del Paine", "Glacier Hiking", "Wild Camping"],
        category: "Extreme Trekking",
        adventureLevel: "Advanced"
      },
      {
        id: 2,
        title: "African Safari Adventure",
        location: "Kenya & Tanzania",
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
        price: "$5,999",
        rating: 5.0,
        highlights: ["Big Five Safari", "Serengeti Camp", "Maasai Village"],
        category: "Wildlife Expedition",
        adventureLevel: "Moderate"
      },
      {
        id: 3,
        title: "Iceland Northern Lights Trek",
        location: "Iceland",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
        price: "$3,799",
        rating: 4.8,
        highlights: ["Aurora Hunting", "Volcano Hiking", "Ice Caves"],
        category: "Arctic Adventure",
        adventureLevel: "Intermediate"
      },
      {
        id: 4,
        title: "New Zealand Multi-Sport Adventure",
        location: "New Zealand",
        duration: "11 Days / 10 Nights",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        price: "$4,599",
        rating: 4.9,
        highlights: ["Bungee Jumping", "White Water Rafting", "Mountain Biking"],
        category: "Multi-Adventure",
        adventureLevel: "Advanced"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Ladakh Adventure Expedition",
        location: "Ladakh",
        duration: "9 Days / 8 Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: "₹54,999",
        rating: 4.9,
        highlights: ["High Altitude Trekking", "Monastery Visits", "Camping"],
        category: "Mountain Adventure",
        adventureLevel: "Advanced"
      },
      {
        id: 6,
        title: "Spiti Valley Exploration",
        location: "Himachal Pradesh",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        price: "₹42,999",
        rating: 4.8,
        highlights: ["Remote Villages", "Desert Mountains", "Buddhist Culture"],
        category: "Cultural Expedition",
        adventureLevel: "Moderate"
      },
      {
        id: 7,
        title: "Rishikesh Adventure Bundle",
        location: "Rishikesh",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
        price: "₹32,999",
        rating: 4.7,
        highlights: ["River Rafting", "Rock Climbing", "Bungee Jumping"],
        category: "Adventure Sports",
        adventureLevel: "Intermediate"
      },
      {
        id: 8,
        title: "Andaman Island Exploration",
        location: "Andaman & Nicobar",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        price: "₹48,999",
        rating: 4.8,
        highlights: ["Scuba Diving", "Island Hopping", "Jungle Trekking"],
        category: "Island Adventure",
        adventureLevel: "Moderate"
      }
    ]
  };

  const currentPackages = adventurePackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600">
        {/* Adventure Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 80 L30 60 L40 70 L50 50 L60 65 L70 55 L80 70' stroke='white' stroke-width='3' fill='none'/%3E%3Cpath d='M15 40 L25 35 L35 45 L45 30 L55 40 L65 35 L75 45' stroke='white' stroke-width='2' fill='none' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
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
                <Compass className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Exploration<br />
                <span className="text-yellow-300">Bundle</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things adventure. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Start Exploring
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Adventure Bundles
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
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800"
                  alt="Adventure explorer"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Epic Adventures Await</p>
                    <p className="text-sm text-slate-600">Explore the unexplored</p>
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
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
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
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-black uppercase backdrop-blur-sm">
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
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-green-700 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Adventure Level */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mountain className="w-4 h-4" />
                      <span className="font-medium">{pkg.adventureLevel}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600" />
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
                      <div className="flex items-center gap-2 text-green-700 font-bold group-hover:gap-3 transition-all">
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

      {/* Why Adventure Travel Section */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Exploration Bundles?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Push your limits and discover the extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Tent, title: "All-Inclusive Packages", desc: "Everything you need for your adventure—gear, guides, permits, and accommodations all bundled together." },
              { icon: Backpack, title: "Expert Guidance", desc: "Professional adventure guides with local expertise ensure your safety while maximizing the thrill." },
              { icon: TreePine, title: "Authentic Experiences", desc: "Off-the-beaten-path destinations and unique activities that go beyond typical tourist trails." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
