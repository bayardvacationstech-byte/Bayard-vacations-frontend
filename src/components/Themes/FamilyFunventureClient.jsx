"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Smile, Baby, PartyPopper, MapPin, Calendar, Users, Star, Palmtree, ChevronRight, IceCream, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function FamilyFunventureClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Family packages data
  const familyPackages = {
    international: [
      {
        id: 1,
        title: "Disneyland Paris Magic Experience",
        location: "Paris, France",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1538682125382-f2fe46c7e5c3?w=800",
        price: "$3,799",
        rating: 4.9,
        highlights: ["Theme Park Tickets", "Character Meet & Greet", "Kids Club Activities"],
        category: "Theme Park Adventure",
        ageGroup: "All Ages"
      },
      {
        id: 2,
        title: "Dubai Family Fun Extravaganza",
        location: "Dubai, UAE",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
        price: "$2,999",
        rating: 4.8,
        highlights: ["Dubai Parks & Resorts", "Desert Safari", "Beach Activities"],
        category: "City & Adventure",
        ageGroup: "5+ Years"
      },
      {
        id: 3,
        title: "Singapore Universal Studios Adventure",
        location: "Singapore",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
        price: "$3,299",
        rating: 4.9,
        highlights: ["Universal Studios", "Sentosa Island", "Night Safari"],
        category: "Fun & Wildlife",
        ageGroup: "All Ages"
      },
      {
        id: 4,
        title: "Maldives Family Beach Paradise",
        location: "Maldives",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        price: "$4,299",
        rating: 4.8,
        highlights: ["Kids Club", "Water Sports", "Family Villa"],
        category: "Beach & Relaxation",
        ageGroup: "All Ages"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Goa Beach Family Getaway",
        location: "Goa",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        price: "₹42,999",
        rating: 4.7,
        highlights: ["Water Park", "Beach Games", "Dolphin Watching"],
        category: "Beach Fun",
        ageGroup: "All Ages"
      },
      {
        id: 6,
        title: "Manali Snow Adventure for Families",
        location: "Manali, Himachal",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        price: "₹36,999",
        rating: 4.6,
        highlights: ["Snow Activities", "Toy Train Ride", "Adventure Park"],
        category: "Mountain Adventure",
        ageGroup: "8+ Years"
      },
      {
        id: 7,
        title: "Rajasthan Royal Family Tour",
        location: "Rajasthan",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        price: "₹48,999",
        rating: 4.8,
        highlights: ["Palace Stays", "Camel Safari", "Cultural Shows"],
        category: "Heritage & Culture",
        ageGroup: "6+ Years"
      },
      {
        id: 8,
        title: "Kerala Backwater Family Cruise",
        location: "Kerala",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        price: "₹38,999",
        rating: 4.7,
        highlights: ["Houseboat Stay", "Village Tours", "Cooking Classes"],
        category: "Nature & Culture",
        ageGroup: "All Ages"
      }
    ]
  };

  const currentPackages = familyPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        {/* Playful Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='white'/%3E%3Ccircle cx='60' cy='20' r='6' fill='white'/%3E%3Ccircle cx='40' cy='50' r='10' fill='white'/%3E%3Ccircle cx='70' cy='60' r='5' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
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
                <Smile className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Family<br />
                <span className="text-yellow-300">Funventure</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things togetherness. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Explore Adventures
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Plan Your Trip
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
                  src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800"
                  alt="Happy family"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                    <PartyPopper className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Fun for Everyone</p>
                    <p className="text-sm text-slate-600">Memories that last forever</p>
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
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
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
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-black uppercase backdrop-blur-sm">
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
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Age Group */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Baby className="w-4 h-4" />
                      <span className="font-medium">{pkg.ageGroup}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-400" />
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
                      <div className="flex items-center gap-2 text-purple-600 font-bold group-hover:gap-3 transition-all">
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

      {/* Why Family Adventures Section */}
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Family Adventures with Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Creating joyful memories for the whole family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: IceCream, title: "Kid-Friendly Everything", desc: "From accommodations to activities, everything is designed with children in mind for maximum fun and safety." },
              { icon: Palmtree, title: "Stress-Free Planning", desc: "We handle all the details so parents can relax and enjoy quality time with their children." },
              { icon: Rocket, title: "Adventure for All Ages", desc: "Activities carefully curated to ensure everyone, from toddlers to grandparents, has a blast." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
