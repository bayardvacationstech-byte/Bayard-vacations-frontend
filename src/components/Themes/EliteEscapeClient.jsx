"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Crown, Diamond, Martini, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Award, Gem } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

export default function EliteEscapeClient({ initialRegions = [], initialPackages = [] }) {
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Get regions that actually have Elite Escape packages
  const availableRegions = Array.from(new Set(initialPackages.map(pkg => pkg.region))).sort();

  // Filter packages based on selected region
  const filteredPackages = selectedRegion === "All"
    ? initialPackages
    : initialPackages.filter(pkg => pkg.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L50 25 L35 30 L30 45 L25 30 L10 25 L25 20 Z' fill='gold' opacity='0.5'/%3E%3C/svg%3E")`,
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-amber-300 uppercase tracking-widest">
                  Travel Theme
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Elite<br />
                <span className="text-amber-400">Escape</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                All things luxury. Discover our handpicked domestic and international arrivals curated specifically for this theme.
              </p>

              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 hover:from-amber-600 hover:to-yellow-600 font-black px-8 py-6 rounded-2xl shadow-xl">
                  Explore Luxury
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500/20 font-black px-8 py-6 rounded-2xl backdrop-blur-sm">
                  VIP Concierge
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
              <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-amber-500/20">
                <Image
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  alt="Luxury resort"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-amber-500/30">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <Diamond className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <p className="font-black text-white">Exclusive Experiences</p>
                    <p className="text-sm text-amber-300">Where luxury meets perfection</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Packages Section */}
      <Container className="py-8 md:py-12">
        {/* Region Filter */}
        <div className="flex flex-col items-center mb-12 space-y-4">
          <p className="text-amber-400 font-bold uppercase tracking-widest text-sm">Select Destination</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedRegion("All")}
              className={`px-6 py-2.5 rounded-full font-bold transition-all border ${
                selectedRegion === "All"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 border-transparent shadow-lg"
                  : "text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
              }`}
            >
              All Regions
            </button>
            {availableRegions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all border ${
                  selectedRegion === region
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 border-transparent shadow-lg"
                    : "text-amber-300 border-amber-500/30 hover:bg-amber-500/10"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/packages/${pkg.region?.toLowerCase().replace(/\s+/g, '-')}/${pkg.packageSlug}`}>
                  <div className="group bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-amber-500/20">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={pkg.cardImages?.[0]?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"}
                        alt={pkg.packageTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-xs font-black uppercase backdrop-blur-sm">
                          ₹{pkg.basePrice?.toLocaleString()}
                        </div>
                      </div>

                      {/* Days */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-slate-900/95 px-2 py-1 rounded-full border border-amber-500/30">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-bold text-white">{pkg.days}D / {pkg.nights}N</span>
                      </div>

                      {/* Location */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-bold">{pkg.region}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {pkg.packageTitle}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {pkg.packageTags?.slice(0, 2).map((tag, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] text-amber-300 font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 font-medium italic">Premium Escapes</p>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold group-hover:gap-3 transition-all">
                          <span className="text-sm">View Package</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-[3rem] border border-dashed border-amber-500/20">
            <Diamond className="w-12 h-12 text-amber-500 opacity-30 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">No Elite Packages Found</h3>
            <p className="text-slate-400">We are currently handpicking exclusive experiences for this region. Stay tuned!</p>
            <Button onClick={() => setSelectedRegion("All")} className="mt-6 bg-amber-500 text-slate-900 font-bold rounded-xl">View All Regions</Button>
          </div>
        )}
      </Container>

      {/* Why Elite Travel Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 md:py-24 border-t border-amber-500/20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose Elite Escapes?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the pinnacle of luxury travel with Bayard Vacations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Crown, title: "VIP Treatment", desc: "From private airport transfers to dedicated concierge service, every detail is handled with excellence." },
              { icon: Gem, title: "Exclusive Access", desc: "Private villas, Michelin-star dining, and experiences money can't typically buy—all arranged for you." },
              { icon: Sparkles, title: "Uncompromising Quality", desc: "5-star accommodations, premium amenities, and world-class service at every touchpoint of your journey." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-slate-800/50 rounded-2xl border border-amber-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
