"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Church, Waves, Sun, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Heart, Cloud } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function ReligiousRetreatClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Religious retreat packages data
  const religiousPackages = {
    international: [
      {
        id: 1,
        title: "Vatican & Rome Pilgrimage",
        location: "Vatican City & Rome, Italy",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800",
        price: "$2,899",
        rating: 4.9,
        highlights: ["Vatican Museums", "St. Peter's Basilica", "Papal Audience"],
        category: "Christian Pilgrimage",
        spiritualLevel: "All Levels"
      },
      {
        id: 2,
        title: "Mecca & Medina Umrah Journey",
        location: "Saudi Arabia",
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
        price: "$3,499",
        rating: 4.9,
        highlights: ["Holy Kaaba", "Prophet's Mosque", "Spiritual Guidance"],
        category: "Islamic Pilgrimage",
        spiritualLevel: "All Levels"
      },
      {
        id: 3,
        title: "Jerusalem Holy Land Tour",
        location: "Jerusalem, Israel",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1544047567-245119f71b0c?w=800",
        price: "$3,199",
        rating: 4.8,
        highlights: ["Western Wall", "Church of Holy Sepulchre", "Via Dolorosa"],
        category: "Multi-Faith Pilgrimage",
        spiritualLevel: "All Levels"
      },
      {
        id: 4,
        title: "Buddhist Meditation Retreat Thailand",
        location: "Chiang Mai, Thailand",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1563368718-3eba2b541d91?w=800",
        price: "$1,899",
        rating: 4.7,
        highlights: ["Temple Stay", "Meditation Sessions", "Monk Teachings"],
        category: "Buddhist Retreat",
        spiritualLevel: "Beginners Welcome"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Varanasi Spiritual Journey",
        location: "Varanasi, Uttar Pradesh",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
        price: "₹32,999",
        rating: 4.9,
        highlights: ["Ganga Aarti", "Temple Visits", "Yoga & Meditation"],
        category: "Hindu Pilgrimage",
        spiritualLevel: "All Levels"
      },
      {
        id: 6,
        title: "Amritsar Golden Temple Pilgrimage",
        location: "Amritsar, Punjab",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800",
        price: "₹28,999",
        rating: 4.8,
        highlights: ["Golden Temple", "Langar Service", "Wagah Border"],
        category: "Sikh Pilgrimage",
        spiritualLevel: "All Levels"
      },
      {
        id: 7,
        title: "Rishikesh Yoga & Spiritual Retreat",
        location: "Rishikesh, Uttarakhand",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: "₹24,999",
        rating: 4.7,
        highlights: ["Ashram Stay", "Daily Yoga", "Ganga Meditation"],
        category: "Yoga & Wellness",
        spiritualLevel: "Beginners Welcome"
      },
      {
        id: 8,
        title: "Char Dham Yatra",
        location: "Uttarakhand",
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        price: "₹48,999",
        rating: 4.9,
        highlights: ["Four Sacred Shrines", "Mountain Temples", "Spiritual Guidance"],
        category: "Hindu Pilgrimage",
        spiritualLevel: "Moderate Fitness"
      }
    ]
  };

  const currentPackages = religiousPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600">
        {/* Peaceful Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 Q60 40 50 60 Q40 40 50 20 M30 50 Q40 60 50 50 Q40 40 30 50 M70 50 Q60 60 50 50 Q60 40 70 50' stroke='white' fill='none' stroke-width='2'/%3E%3C/svg%3E")`,
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
                <Church className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Religious<br />
                <span className="text-yellow-200">Retreat</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things spiritual. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Explore Journeys
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Plan Pilgrimage
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
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
                  alt="Temple meditation"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Inner Peace Awaits</p>
                    <p className="text-sm text-slate-600">Journey to spiritual enlightenment</p>
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
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
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
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black uppercase backdrop-blur-sm">
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
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Spiritual Level */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Sun className="w-4 h-4" />
                      <span className="font-medium">{pkg.spiritualLevel}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
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
                      <div className="flex items-center gap-2 text-amber-700 font-bold group-hover:gap-3 transition-all">
                        <span className="text-sm">Begin Journey</span>
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

      {/* Why Spiritual Journeys Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Choose Spiritual Journeys?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find peace, purpose, and connection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Inner Peace", desc: "Guided spiritual experiences designed to bring tranquility, clarity, and deep inner reflection." },
              { icon: Cloud, title: "Sacred Spaces", desc: "Visit revered sites and holy places that have inspired faith and devotion for centuries." },
              { icon: Waves, title: "Mindful Guidance", desc: "Expert spiritual leaders and guides accompany you, ensuring meaningful and respectful experiences." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
