"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Globe, MapPin, Calendar, Users, Star, Award, ChevronRight, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { usePackagesByTheme } from "@/hooks/packages";
import PackageCard from "@/components/ui/PackageCard";

export default function EducationalToursClient() {
  const [selectedTab, setSelectedTab] = useState("international");

  const { 
    packages: allThemePackages, 
    isLoading, 
    error 
  } = usePackagesByTheme("educational");

  const educationalPackages = useMemo(() => {
    if (!allThemePackages) return { international: [], domestic: [] };
    
    // Deduplicate by package ID
    const uniqueMap = new Map();
    allThemePackages.forEach(pkg => {
      if (pkg.id && !uniqueMap.has(pkg.id)) {
        uniqueMap.set(pkg.id, pkg);
      }
    });
    const uniquePackages = Array.from(uniqueMap.values());
    
    return {
      international: uniquePackages.filter(pkg => !pkg.domestic),
      domestic: uniquePackages.filter(pkg => pkg.domestic)
    };
  }, [allThemePackages]);

  const currentPackages = educationalPackages[selectedTab] || [];

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
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-white p-6 animate-pulse flex flex-col h-full shadow-lg">
                <div className="h-56 bg-slate-100 rounded-2xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded-lg w-1/2"></div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end">
                   <div className="space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-16"></div>
                      <div className="h-6 bg-slate-100 rounded w-24"></div>
                   </div>
                   <div className="h-8 bg-slate-100 rounded-lg w-20"></div>
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="wait">
              {currentPackages.map((pkg, index) => (
                <PackageCard 
                  key={`${selectedTab}-${pkg.id}`} 
                  item={pkg}
                />
              ))}
            </AnimatePresence>
          )}
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
