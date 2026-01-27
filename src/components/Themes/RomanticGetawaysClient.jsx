"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Play, Info, Camera, Clock, Utensils, Music } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PackageCard from "@/components/ui/PackageCard";

// Floating Hearts Background Component
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "100%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: "-20%",
            rotate: Math.random() * 360 + 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 15, 
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart 
            className={cn(
              "w-8 h-8",
              i % 3 === 0 ? "text-pink-200 fill-pink-200" : 
              i % 3 === 1 ? "text-rose-300 fill-rose-300" : 
              "text-red-200 fill-red-200"
            )} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default function RomanticGetawaysClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFF9FA]">
      {/* Immersive Hero Section */}
      <div className="relative h-[85vh] md:h-[95vh] overflow-hidden flex items-center">
        {/* Ken Burns Effect Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1920&q=80"
            alt="Romantic background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-rose-800/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-rose-950/40 z-10" />
        
        <FloatingHearts />

        <Container className="relative z-20 pt-40 pb-12 md:pt-48 md:pb-0">
          <div className="max-w-4xl space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-pulse" />
                <span className="text-sm font-black text-rose-100 uppercase tracking-[0.3em] font-sans">
                  The Romance Collection
                </span>
              </div>

              <div className="space-y-1 md:space-y-2">
                <p className="text-rose-200 font-cursive text-2xl md:text-5xl tracking-wide opacity-90 mb-[-5px] md:mb-[-20px] ml-1" style={{ fontFamily: 'Damion, cursive' }}>
                  Handpicked
                </p>
                <h1 className="text-4xl sm:text-7xl md:text-9xl font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  Romantic<br />
                  <span className="text-rose-400">Getaways</span>
                </h1>
              </div>

              <p className="text-lg md:text-2xl text-rose-50 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                Escape to the world's most intimate corners. Where every sunset is a celebration and every moment becomes a timeless memory.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4">
                <Button size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none font-black text-base md:text-lg uppercase tracking-widest active:scale-95 transition-all">
                  Book Your Escape
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-md font-black text-base md:text-lg uppercase tracking-widest active:scale-95 transition-all">
                  Customize Love
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Floating "Couples Card" */}
        <Container className="absolute bottom-12 right-0 hidden lg:block z-30">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="ml-auto w-[380px] group"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-400/30 group-hover:scale-110 transition-transform duration-500">
                  <Star className="w-8 h-8 text-rose-300 fill-rose-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Elite Romance</h3>
                  <p className="text-rose-100/70 text-sm leading-relaxed font-medium">
                    "Bayard transformed our honeymoon into a living dream. The attention to detail was magical."
                  </p>
                  <div className="flex gap-1 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-60">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Unveil Romance</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/50 to-transparent" />
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-[120px] -mr-48 -mt-48" />
        <Container className="relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Curated Experiences</span>
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-serif text-slate-900 tracking-tight leading-tight">
              Where <span className="text-rose-500 italic">Love</span> Meets the World’s Grandeur
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
              We don't just plan trips; we orchestrate love stories. Our romance collection spans the globe, from the turquoise lagoons of the Maldives to the royal palaces of Udaipur.
            </p>
          </div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="pb-24">
        <Container>
          {/* Tab Switcher */}
          <div className="flex justify-center mb-16 px-4">
            <div className="inline-flex bg-slate-100/80 backdrop-blur-sm rounded-[2rem] p-2 shadow-inner border border-slate-200/50">
              <button
                onClick={() => setSelectedTab("international")}
                className={cn(
                  "px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 active:scale-95",
                  selectedTab === "international"
                    ? "bg-rose-600 text-white shadow-2xl shadow-rose-600/30 scale-105"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Global Destinations
              </button>
              <button
                onClick={() => setSelectedTab("domestic")}
                className={cn(
                  "px-10 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-500 active:scale-95",
                  selectedTab === "domestic"
                    ? "bg-rose-600 text-white shadow-2xl shadow-rose-600/30 scale-105"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                Incredible India
              </button>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="wait">
              {currentPackages.map((pkg, index) => (
                <PackageCard 
                  key={`${selectedTab}-${pkg.id}`} 
                  variant="rose"
                  item={{
                    ...pkg,
                    packageTitle: pkg.title,
                    region: pkg.location,
                    cardImages: [{ url: pkg.image }]
                  }} 
                />
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Why Choose Section - Redesigned */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none" />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-900/40 rounded-full blur-[150px] -mr-64 -mt-64 animate-float" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[150px] -ml-64 -mb-64 animate-floatSlow" />

        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Our Romance Philosophy</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  Why Trust Us With Your <span className="text-rose-500 italic font-serif">Heart?</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-10">
                {[
                  { icon: Heart, title: "Emotion-First Curation", desc: "We don't just book rooms; we secure the specific table with the best sunset view, and the villa with the most privacy." },
                  { icon: Sparkles, title: "Secret Inclusions", desc: "Private beach setups, surprise champagne arrivals, and localized romance traditions you won't find anywhere else." },
                  { icon: Users, title: "24/7 Romance Concierge", desc: "Need a last-minute flower delivery in a remote village? Our team makes the impossible happen for your love story." }
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-8 group"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <h3 className="text-2xl font-black text-white tracking-tight">{feature.title}</h3>
                      <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative z-10 w-full aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=1000&q=80"
                  alt="Romantic sunset"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="p-8 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20">
                    <p className="text-2xl font-black text-white italic leading-relaxed">
                      "Distance is just a test to see how far love can travel."
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative Card Behind */}
              <div className="absolute top-10 -right-10 w-full aspect-square bg-rose-600 rounded-[4rem] -z-10 opacity-30 transform rotate-6 border border-white/20" />
            </div>
          </div>
        </Container>
      </section>

      {/* Final Premium CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Container className="text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-tight">
              Ready to Write Your Next<br />
              <span className="text-rose-500">Chapter Together?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-2xl shadow-rose-600/30 border-none font-black text-lg uppercase tracking-widest transition-all">
                Talk to a Specialist
              </Button>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-100">
                    <Image src={`https://i.pravatar.cc/150?u=${i + 130}`} alt="Agent" width={48} height={48} />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-rose-100 flex items-center justify-center text-rose-600 text-xs font-black">
                  +12
                </div>
              </div>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Join 500+ couples who celebrated with us last month</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
