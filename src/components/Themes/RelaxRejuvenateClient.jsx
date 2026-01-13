"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flower, Sparkles, Waves, MapPin, Calendar, Users, Star, Heart, ChevronRight, Leaf, Sun } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function RelaxRejuvenateClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Wellness packages data
  const wellnessPackages = {
    international: [
      {
        id: 1,
        title: "Maldives Luxury Spa Retreat",
        location: "Maldives",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
        price: "$4,299",
        rating: 4.9,
        highlights: ["Overwater Spa", "Ayurvedic Treatments", "Yoga Sessions"],
        category: "Luxury Wellness",
        wellnessLevel: "Ultimate Relaxation"
      },
      {
        id: 2,
        title: "Bali Wellness & Detox Retreat",
        location: "Ubud, Bali",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        price: "$2,499",
        rating: 4.8,
        highlights: ["Detox Programs", "Meditation", "Balinese Massage"],
        category: "Holistic Healing",
        wellnessLevel: "Deep Cleansing"
      },
      {
        id: 3,
        title: "Thailand Yoga & Spa Escape",
        location: "Phuket, Thailand",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1540202404-a2f2a1d8d1c9?w=800",
        price: "$1,999",
        rating: 4.7,
        highlights: ["Daily Yoga", "Thai Massage", "Beach Meditation"],
        category: "Yoga & Spa",
        wellnessLevel: "Mindful Rejuvenation"
      },
      {
        id: 4,
        title: "Switzerland Alpine Wellness",
        location: "Swiss Alps",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: "$3,799",
        rating: 4.9,
        highlights: ["Mountain Spa", "Thermal Baths", "Alpine Air Therapy"],
        category: "Mountain Wellness",
        wellnessLevel: "Nature Healing"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Kerala Ayurveda Wellness",
        location: "Kerala",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        price: "₹38,999",
        rating: 4.9,
        highlights: ["Panchakarma", "Ayurvedic Cuisine", "Meditation"],
        category: "Ayurvedic Healing",
        wellnessLevel: "Traditional Therapy"
      },
      {
        id: 6,
        title: "Goa Beach Yoga Retreat",
        location: "Goa",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        price: "₹32,999",
        rating: 4.7,
        highlights: ["Beach Yoga", "Spa Treatments", "Organic Meals"],
        category: "Beach Wellness",
        wellnessLevel: "Coastal Calm"
      },
      {
        id: 7,
        title: "Rishikesh Spiritual Wellness",
        location: "Rishikesh",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
        price: "₹28,999",
        rating: 4.8,
        highlights: ["Yoga Ashram", "Ganga Meditation", "Sound Healing"],
        category: "Spiritual Healing",
        wellnessLevel: "Soul Rejuvenation"
      },
      {
        id: 8,
        title: "Himachal Wellness Retreat",
        location: "Dharamshala",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        price: "₹34,999",
        rating: 4.6,
        highlights: ["Mountain Views", "Tibetan Healing", "Nature Walks"],
        category: "Mountain Retreat",
        wellnessLevel: "Peaceful Escape"
      }
    ]
  };

  const currentPackages = wellnessPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500">
        {/* Peaceful Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='20' fill='none' stroke='white' stroke-width='2'/%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='white' stroke-width='1' opacity='0.5'/%3E%3Ccircle cx='40' cy='40' r='10' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
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
                <Flower className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Relax and<br />
                <span className="text-yellow-200">Rejuvenate</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things leisure. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-pink-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Find Your Peace
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Wellness Programs
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
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800"
                  alt="Spa relaxation"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Ultimate Wellness</p>
                    <p className="text-sm text-slate-600">Restore your mind, body & soul</p>
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
                      <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black uppercase backdrop-blur-sm">
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

                    {/* Wellness Level */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Leaf className="w-4 h-4" />
                      <span className="font-medium">{pkg.wellnessLevel}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
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
                        <span className="text-sm">Unwind</span>
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

      {/* Why Wellness Travel Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Wellness Retreats?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Recharge, refresh, and rediscover your best self
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Holistic Healing", desc: "Treatments and therapies designed to restore balance to your mind, body, and spirit through ancient and modern techniques." },
              { icon: Sun, title: "Stress Relief", desc: "Escape daily pressures in serene environments specifically chosen for their calming and restorative properties." },
              { icon: Waves, title: "Expert Care", desc: "Certified wellness professionals, trained therapists, and experienced yoga instructors guide your transformation journey." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
