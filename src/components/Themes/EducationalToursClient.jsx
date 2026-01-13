"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Globe, MapPin, Calendar, Users, Star, Award, ChevronRight, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function EducationalToursClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  // Educational tour packages data
  const educationalPackages = {
    international: [
      {
        id: 1,
        title: "Ancient Egypt & Pyramids Study Tour",
        location: "Cairo, Egypt",
        duration: "8 Days / 7 Nights",
        image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800",
        price: "$2,199",
        rating: 4.8,
        highlights: ["Pyramid of Giza", "Egyptian Museum", "Expert Egyptologist Guide"],
        category: "History & Archaeology",
        participants: "15-20 students"
      },
      {
        id: 2,
        title: "European Renaissance Art Journey",
        location: "Italy & France",
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800",
        price: "$3,499",
        rating: 4.9,
        highlights: ["Vatican Museums", "Uffizi Gallery", "Louvre Museum"],
        category: "Art & Culture",
        participants: "12-18 students"
      },
      {
        id: 3,
        title: "NASA Space Center Educational Tour",
        location: "Houston, USA",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800",
        price: "$1,899",
        rating: 4.7,
        highlights: ["NASA Johnson Space Center", "Astronaut Training", "Mission Control"],
        category: "Science & Technology",
        participants: "20-25 students"
      },
      {
        id: 4,
        title: "Amazon Rainforest Ecology Program",
        location: "Amazon, Brazil",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
        price: "$2,599",
        rating: 4.8,
        highlights: ["Biodiversity Research", "Indigenous Communities", "Wildlife Conservation"],
        category: "Environmental Studies",
        participants: "10-15 students"
      }
    ],
    domestic: [
      {
        id: 5,
        title: "Golden Triangle Heritage Tour",
        location: "Delhi-Agra-Jaipur",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
        price: "₹28,999",
        rating: 4.8,
        highlights: ["Taj Mahal", "Red Fort", "Amber Fort"],
        category: "History & Architecture",
        participants: "25-30 students"
      },
      {
        id: 6,
        title: "Kerala Science & Nature Program",
        location: "Kerala",
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
        price: "₹22,999",
        rating: 4.7,
        highlights: ["Science Museum", "Backwater Ecology", "Spice Plantations"],
        category: "Science & Nature",
        participants: "20-25 students"
      },
      {
        id: 7,
        title: "Rajasthan Cultural Immersion",
        location: "Rajasthan",
        duration: "7 Days / 6 Nights",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
        price: "₹32,999",
        rating: 4.9,
        highlights: ["Folk Arts", "Traditional Crafts", "Village Life Experience"],
        category: "Culture & Tradition",
        participants: "20-30 students"
      },
      {
        id: 8,
        title: "Himalayan Geography Field Study",
        location: "Himachal Pradesh",
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
        price: "₹26,999",
        rating: 4.6,
        highlights: ["Mountain Ecosystems", "Geological Formations", "Climate Studies"],
        category: "Geography & Environment",
        participants: "15-20 students"
      }
    ]
  };

  const currentPackages = educationalPackages[selectedTab];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15 L35 25 L45 25 L37 32 L40 42 L30 36 L20 42 L23 32 L15 25 L25 25 Z' fill='white' fill-opacity='0.3'/%3E%3C/svg%3E")`,
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
                <GraduationCap className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">
                  Learn & Explore
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Educational<br />
                <span className="text-amber-300">Tours</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                All things new. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Browse Tours
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  Custom Program
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
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
                  alt="Students learning"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Experiential Learning</p>
                    <p className="text-sm text-slate-600">Education beyond classrooms</p>
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
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              International
            </button>
            <button
              onClick={() => setSelectedTab("domestic")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                selectedTab === "domestic"
                  ? "bg-blue-600 text-white shadow-lg"
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
                      <div className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black uppercase backdrop-blur-sm">
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
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {/* Participants */}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{pkg.participants}</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
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
                      <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                        <span className="text-sm">Learn More</span>
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
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Why Educational Tours Matter?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Learning through experience creates lasting knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Hands-On Learning", desc: "Students engage directly with subjects, bringing textbook concepts to life through real-world experiences." },
              { icon: Globe, title: "Cultural Awareness", desc: "Exposure to different cultures, traditions, and perspectives broadens horizons and builds global citizenship." },
              { icon: Award, title: "Expert Guidance", desc: "Subject matter experts and qualified educators ensure educational value in every experience." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
