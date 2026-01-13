"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Users, Star, Sparkles, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function RomanticGetawaysClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Romantic packages data
  const romanticPackages = {
    international: [
      {
        id: 1,
        title: "Maldives Honeymoon Paradise",
        location: "Maldives",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
        price: "$2,499",
        rating: 4.9,
        highlights: ["Overwater Villa", "Candlelight Dinner", "Couples Spa"],
        category: "Luxury Romance"
      },
      {
        id: 2,
        title: "Paris Love Story",
        location: "Paris, France",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        price: "$3,299",
        rating: 4.8,
        highlights: ["Eiffel Tower Dinner", "Seine River Cruise", "Wine Tasting"],
        category: "Classic Romance"
      },
      {
        id: 3,
        title: "Santorini Sunset Romance",
        location: "Santorini, Greece",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        price: "$2,799",
        rating: 4.9,
        highlights: ["Caldera View Suite", "Private Yacht Tour", "Sunset Watching"],
        category: "Island Romance"
      },
      {
        id: 4,
        title: "Bali Tropical Love Escape",
        location: "Bali, Indonesia",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        price: "$1,999",
        rating: 4.7,
        highlights: ["Private Pool Villa", "Balinese Spa", "Beach Dinner"],
        category: "Tropical Romance"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Kashmir Valley Romance",
        location: "Kashmir, India",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800",
        price: "₹45,999",
        rating: 4.8,
        highlights: ["Houseboat Stay", "Shikara Ride", "Mughal Gardens"],
        category: "Mountain Romance"
      },
      {
        id: 6,
        title: "Goa Beach Love",
        location: "Goa, India",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
        price: "₹32,999",
        rating: 4.6,
        highlights: ["Beachfront Resort", "Sunset Cruise", "Candlelight Dinner"],
        category: "Beach Romance"
      },
      {
        id: 7,
        title: "Udaipur Royal Romance",
        location: "Udaipur, India",
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        price: "₹38,999",
        rating: 4.9,
        highlights: ["Palace Hotel Stay", "Lake Pichola Boat Ride", "Royal Dining"],
        category: "Heritage Romance"
      }
    ]
  };

  const currentPackages = romanticPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-red-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 C 25 10, 20 15, 20 20 C 20 25, 25 30, 30 35 C 35 30, 40 25, 40 20 C 40 15, 35 10, 30 10 Z' fill='white' fill-opacity='0.3'/%3E%3C/svg%3E")`,
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
                <Heart className="w-4 h-4 text-white fill-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Love & Romance
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Romantic<br />
                <span className="text-amber-300">Getaways</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things love. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Explore Packages
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Customize Trip
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
                  src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800"
                  alt="Romantic couple"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Perfect for Couples</p>
                    <p className="text-sm text-slate-600">Unforgettable memories await</p>
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
                  ? "bg-rose-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-rose-600 text-white shadow-lg"
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
                      <div className="px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-black uppercase backdrop-blur-sm">
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
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                      {pkg.title}
                    </h3>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
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
                      <div className="flex items-center gap-2 text-rose-600 font-bold group-hover:gap-3 transition-all">
                        <span className="text-sm">View Details</span>
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

      {/* Why Choose Section */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Choose Our Romantic Packages?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We create magical moments that last a lifetime
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Curated for Love", desc: "Every detail designed to enhance romance and create unforgettable memories together." },
              { icon: Sparkles, title: "Exclusive Experiences", desc: "Private dinners, couples spa, and special moments just for the two of you." },
              { icon: Users, title: "Expert Planning", desc: "Our romance specialists ensure every moment is perfect, from arrival to departure." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
