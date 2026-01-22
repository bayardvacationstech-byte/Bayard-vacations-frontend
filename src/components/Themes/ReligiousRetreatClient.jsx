"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Church, Waves, Sun, MapPin, Calendar, Users, Star, Sparkles, ChevronRight, Heart, Cloud, Globe, Sunrise, Moon } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Floating Spiritual Elements (Light Orbs)
const FloatingSpiritualElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "110%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.3,
          }}
          animate={{ 
            opacity: [0, 0.6, 0], 
            y: "-10%",
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute"
        >
          <div className="w-4 h-4 rounded-full bg-amber-200/40 blur-[4px] shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
        </motion.div>
      ))}
    </div>
  );
};

export default function ReligiousRetreatClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Divine Heritage Hero */}
      <div className="relative h-[85vh] md:h-[95vh] overflow-hidden flex items-center bg-[#FDF2E9]">
        {/* Ken Burns Animation */}
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 35, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920&q=80"
            alt="Divined religious background"
            fill
            className="object-cover opacity-95"
            priority
          />
        </motion.div>
        
        {/* Divine Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/70 via-amber-900/10 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-amber-950/30 z-10" />
        
        {/* Sacred Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 Q35 15, 30 30 Q25 15, 30 0 M30 30 Q35 45, 30 60 Q25 45, 30 30 M0 30 Q15 35, 30 30 Q15 25, 0 30 M30 30 Q45 35, 60 30 Q45 25, 30 30' stroke='white' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
        }} />
        
        <FloatingSpiritualElements />

        <Container className="relative z-20 pt-32 md:pt-40">
          <div className="max-w-4xl space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="space-y-6 md:space-y-10 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-amber-500/20 backdrop-blur-2xl rounded-lg border border-amber-400/30 shadow-2xl">
                <Sunrise className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold text-amber-50 uppercase tracking-[0.5em] font-serif">
                  Divine Heritage Collection
                </span>
              </div>

              <div className="space-y-2 md:space-y-4">
                <p className="text-amber-200 font-serif italic text-xl md:text-5xl opacity-90 leading-tight">
                  Journey to the soul
                </p>
                <h1 className="text-4xl sm:text-7xl md:text-[10rem] font-serif text-white leading-[0.85] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  Religious<br />
                  <span className="text-amber-400 opacity-90 italic">Retreats</span>
                </h1>
              </div>

              <p className="text-lg md:text-2xl text-amber-50/80 font-serif font-light leading-relaxed max-w-3xl border-l-2 border-amber-500/50 pl-6 md:pl-10">
                Experience the profound beauty of faith. From ancient temples to sacred cathedrals, discover pilgrimages that transcend time and restore the spirit.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 pt-4">
                <Button size="lg" className="h-14 md:h-18 px-10 md:px-14 rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-[0_20px_50px_rgba(217,119,6,0.3)] border-none font-serif text-lg tracking-widest transition-all hover:scale-105 active:scale-95 group">
                   Begin Your Journey
                   <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
                <Link href="#destinations">
                  <Button size="lg" variant="outline" className="h-14 md:h-18 px-10 md:px-14 rounded-xl border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md font-serif text-lg tracking-widest transition-all">
                    Sacred Intel
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Majestic Vertical Coordinates */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-32 py-10 opacity-20 z-20">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-4 vertical-text font-serif text-white text-xs tracking-[1.5em] uppercase">
                Divine Presence 0{i}
             </div>
           ))}
        </div>

        {/* Scroll Call to Action */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-amber-200/60 font-serif text-[10px] tracking-[1em] uppercase">
           <span>Descend</span>
           <motion.div 
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-[1px] h-20 bg-gradient-to-b from-amber-400 to-transparent"
           />
        </div>
      </div>

      {/* The Divine Connection Section */}
      <section className="py-24 md:py-48 bg-[#FFFDF9] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        
        <Container className="relative">
           <div className="text-center max-w-4xl mx-auto mb-20 md:mb-40 space-y-8">
              <div className="w-24 h-[1px] bg-amber-300 mx-auto" />
              <h2 className="text-5xl md:text-8xl font-serif text-amber-950 leading-tight">The Divine Connection</h2>
              <p className="text-xl md:text-2xl text-stone-500 font-serif leading-relaxed italic">
                 "Faith is taking the first step even when you don't see the whole staircase."
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
              {[
                { icon: Sunrise, title: "Faith", desc: "Guided spiritual experiences across diverse religions, honoring the sanctity of every tradition." },
                { icon: Sun, title: "Peace", desc: "Finding stillness in sacred silence, away from the modern world's noise and distractions." },
                { icon: Globe, title: "Heritage", desc: "Exploring architectural wonders and cultural artifacts that have stood for millennia." }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center space-y-10 group"
                >
                   <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors duration-700 group-hover:scale-110" />
                      <pillar.icon className="w-12 h-12 text-amber-700 relative z-10 transition-transform duration-700 group-hover:rotate-12" />
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-3xl font-serif text-amber-950 italic">{pillar.title}</h3>
                      <p className="text-stone-500 font-serif text-lg leading-relaxed font-light">{pillar.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </Container>
      </section>

      {/* Heritage Units (Packages Grid) */}
      <section id="destinations" className="py-24 md:py-40 bg-[#FBF9F4]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
            <div className="space-y-6 max-w-2xl">
              <span className="text-amber-600 font-serif font-bold text-xs uppercase tracking-[0.4em]">Ancient Paths</span>
              <h2 className="text-5xl md:text-8xl font-serif text-amber-950 leading-[0.9]">Select<br /><span className="italic font-light opacity-80">Journeys</span></h2>
            </div>
            
            <div className="flex bg-white/60 backdrop-blur-md p-2 rounded-2xl border border-amber-100 shadow-sm">
              <button
                onClick={() => setSelectedTab("international")}
                className={cn(
                  "px-10 py-4 rounded-xl font-serif text-sm tracking-widest transition-all duration-700",
                  selectedTab === "international"
                    ? "bg-amber-700 text-white shadow-xl"
                    : "text-amber-900/60 hover:text-amber-900"
                )}
              >
                Global Sacred
              </button>
              <button
                onClick={() => setSelectedTab("domestic")}
                className={cn(
                  "px-10 py-4 rounded-xl font-serif text-sm tracking-widest transition-all duration-700",
                  selectedTab === "domestic"
                    ? "bg-amber-700 text-white shadow-xl"
                    : "text-amber-900/60 hover:text-amber-900"
                )}
              >
                Holy India
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14">
            <AnimatePresence mode="wait">
              {currentPackages.map((pkg, index) => (
                <motion.div
                  key={`${selectedTab}-${pkg.id}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(120,53,15,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(120,53,15,0.15)] transition-all duration-700 flex flex-col h-full border border-amber-50 group-hover:border-amber-200">
                      {/* Heritage Image Header */}
                      <div className="relative h-[340px] overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                        
                        {/* Sacred Rating */}
                        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg transform group-hover:-translate-y-1 transition-all">
                           <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                           <span className="text-xs font-bold text-amber-950">{pkg.rating}</span>
                        </div>

                        {/* Location Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="inline-flex items-center gap-2.5 bg-amber-950/80 backdrop-blur-md px-4 py-2 rounded-lg text-white mb-2 border border-white/10">
                              <MapPin className="w-3.5 h-3.5 text-amber-300" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">{pkg.location}</span>
                           </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-8 md:p-10 flex-1 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">
                          <h3 className="text-2xl md:text-3xl font-serif text-amber-950 leading-tight group-hover:text-amber-700 transition-colors">
                            {pkg.title}
                          </h3>
                          
                          <div className="space-y-4">
                             {pkg.highlights.map((h, idx) => (
                               <div key={idx} className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-amber-400 opacity-60" />
                                  <span className="text-xs font-serif text-stone-600 italic">
                                    {h}
                                  </span>
                               </div>
                             ))}
                          </div>
                        </div>

                        <div className="pt-8 border-t border-amber-50 flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-amber-800/40 uppercase tracking-[0.2em]">Offering</p>
                            <p className="text-2xl font-serif text-amber-950">{pkg.price}</p>
                          </div>
                          <div className="w-12 h-12 rounded-full border border-amber-200 flex items-center justify-center group-hover:bg-amber-950 group-hover:border-amber-950 group-hover:text-amber-100 transition-all duration-700">
                             <ChevronRight className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Divine Call to Action */}
      <section className="py-32 md:py-56 bg-white relative overflow-hidden">
         {/* Subtle Mandala Background */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[800px] rounded-full border-[1px] border-amber-900 border-dashed animate-spin-slow" />
         </div>

         <Container className="relative">
            <div className="max-w-5xl mx-auto text-center space-y-16">
               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="space-y-8"
               >
                  <Church className="w-16 h-16 text-amber-600 mx-auto" />
                  <h2 className="text-6xl md:text-9xl font-serif text-amber-950 tracking-tight leading-none italic">
                     Answer the <br />
                     <span className="text-amber-700 not-italic font-light block mt-4">Sacred Call</span>
                  </h2>
               </motion.div>
               <p className="text-xl md:text-3xl text-stone-500 font-serif leading-relaxed max-w-3xl mx-auto font-light">
                  "Let your next journey be more than a vacation. Let it be a homecoming for your soul."
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                  <Button size="lg" className="h-18 md:h-20 px-14 md:px-20 rounded-xl bg-amber-950 hover:bg-stone-900 text-amber-100 font-serif text-xl tracking-widest shadow-2xl transition-all duration-700 hover:scale-105 active:scale-95">
                     Book Your Pilgrimage
                  </Button>
                  <Link href="/contact" className="group flex items-center gap-4 text-amber-900 font-serif text-sm tracking-widest uppercase border-b border-amber-900/20 pb-2 hover:border-amber-900 transition-all">
                     Sacred Consultation
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </div>
         </Container>
      </section>
    </div>
  );
}
