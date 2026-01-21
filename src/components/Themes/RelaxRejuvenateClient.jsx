"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Sparkles, Waves, MapPin, Calendar, Users, Star, Heart, ChevronRight, Leaf, Sun, Wind, Cloud, Moon, Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Floating Zen Elements (Lotus Petals)
const FloatingZenElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: "-10%", 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: "110%",
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            rotate: Math.random() * 720
          }}
          transition={{ 
            duration: Math.random() * 15 + 15, 
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "easeInOut"
          }}
          className="absolute"
        >
          <Flower className="w-6 h-6 text-pink-100/40 fill-pink-100/20" />
        </motion.div>
      ))}
    </div>
  );
};

export default function RelaxRejuvenateClient() {
  const [selectedTab, setSelectedTab] = useState("international");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Immersive Serenity Hero */}
      <div className="relative h-[85vh] md:h-[95vh] overflow-hidden flex items-center bg-[#E5E1DA]">
        {/* Ken Burns Effect */}
        <motion.div 
          initial={{ scale: 1, x: "-1%" }}
          animate={{ scale: 1.1, x: "1%" }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
            alt="Serene wellness background"
            fill
            className="object-cover opacity-90"
            priority
          />
        </motion.div>
        
        {/* Soft Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100/60 via-stone-50/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-200/80 via-transparent to-stone-100/30 z-10" />
        
        <FloatingZenElements />

        <Container className="relative z-20 pt-32 md:pt-40">
          <div className="max-w-4xl space-y-4 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4 md:space-y-8 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/40 backdrop-blur-xl rounded-full border border-white/60 shadow-sm">
                <Leaf className="w-5 h-5 text-sage-600 fill-sage-600/20" />
                <span className="text-[10px] md:text-xs font-bold text-stone-700 uppercase tracking-[0.4em] font-sans">
                  The Sanctuary Collection
                </span>
              </div>

              <div className="space-y-1 md:space-y-2">
                <p className="text-sage-700 font-serif italic text-xl md:text-4xl opacity-80 mb-2">
                  Inner peace starts here
                </p>
                <h1 className="text-4xl sm:text-7xl md:text-[9rem] font-serif text-stone-900 leading-[0.9] tracking-tight lowercase">
                  Relax &<br />
                  <span className="text-sage-600 font-light translate-x-4 md:translate-x-12 block">Rejuvenate</span>
                </h1>
              </div>

              <p className="text-base md:text-2xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto md:mx-0 px-4 md:px-0">
                Shed the weight of the world. Rediscover stillness in earth’s most tranquil sanctuaries, curated for the modern soul.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 pt-2 md:pt-6">
                <Button size="lg" className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-xl border-none font-medium text-base md:text-lg tracking-wide transition-all duration-300">
                  Find Your Peace
                </Button>
                <Link href="#packages">
                  <Button size="lg" variant="ghost" className="h-12 md:h-auto text-stone-700 hover:bg-stone-100/50 font-medium text-base md:text-lg tracking-wide flex items-center gap-2 group">
                    Wellness Programs
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
        
        {/* Side Accents */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-24 opacity-20">
           <Waves className="w-8 h-8 text-stone-900" />
           <Sun className="w-8 h-8 text-stone-900" />
           <Moon className="w-8 h-8 text-stone-900" />
        </div>

        {/* Breath Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <div className="w-10 h-10 rounded-full border border-stone-900 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 rounded-full bg-stone-900"
              />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-900">Exhale</span>
        </div>
      </div>

      {/* The Three Pillars Section */}
      <section className="py-24 md:py-40 bg-white">
        <Container>
           <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 space-y-6">
              <div className="w-16 h-[2px] bg-sage-400 mx-auto" />
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900 lowercase italic">The Three Pillars of Serenity</h2>
              <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed">
                 We believe true rejuvenation occurs at the intersection of mind, body, and spirit. Each of our sanctuaries is vetted for these three core experiences.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
              {[
                { icon: Sun, title: "Mind", desc: "Digital detox, guided meditation, and neurological rest in silence-first environments." },
                { icon: Leaf, title: "Body", desc: "Organic nutrition, ancient holistic treatments, and low-impact movement for physical restoration." },
                { icon: Heart, title: "Spirit", desc: "Communion with nature, spiritual discovery, and soulful connections that transcend the mundane." }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center space-y-8 group"
                >
                   <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 bg-sage-50 rounded-full group-hover:scale-110 transition-transform duration-700" />
                      <pillar.icon className="w-10 h-10 text-sage-600 relative z-10" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-2xl font-serif italic text-stone-900 lowercase">{pillar.title}</h3>
                      <p className="text-stone-500 font-light leading-relaxed">{pillar.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </Container>
      </section>

      {/* Sanctuary Units (Packages Grid) */}
      <section id="packages" className="py-24 bg-[#F9F7F5]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 md:mb-24">
            <div className="space-y-4 max-w-xl">
              <span className="text-sage-600 font-bold text-xs uppercase tracking-[0.3em]">Curation</span>
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Handpicked <br />Sanctuaries</h2>
            </div>
            
            <div className="flex bg-stone-200/50 p-1.5 rounded-full border border-stone-200">
              <button
                onClick={() => setSelectedTab("international")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "international"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Global Safaris
              </button>
              <button
                onClick={() => setSelectedTab("domestic")}
                className={cn(
                  "px-8 py-3 rounded-full font-medium text-sm transition-all duration-500",
                  selectedTab === "domestic"
                    ? "bg-white text-stone-900 shadow-lg"
                    : "text-stone-500 hover:text-stone-700"
                )}
              >
                Local Zen
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="wait">
              {currentPackages.map((pkg, index) => (
                <motion.div
                  key={`${selectedTab}-${pkg.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col h-full border border-stone-100 hover:border-sage-200">
                      {/* Artistic Image Header */}
                      <div className="relative h-[320px] overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-700" />
                        
                        {/* Rating Overlay */}
                        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full">
                           <Sparkles className="w-3.5 h-3.5 text-sage-500" />
                           <span className="text-[10px] font-bold text-stone-800 tracking-tight">{pkg.rating}</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="inline-flex items-center gap-2 bg-sage-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-white mb-2">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-bold uppercase tracking-widest">{pkg.location}</span>
                           </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-8 flex-1 flex flex-col justify-between space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-2xl font-serif text-stone-900 lowercase leading-tight group-hover:text-sage-700 transition-colors">
                            {pkg.title}
                          </h3>
                          
                          <div className="flex flex-wrap gap-2">
                             {pkg.highlights.map((h, idx) => (
                               <span key={idx} className="text-[9px] font-bold text-sage-600/70 border border-sage-100 px-2 py-1 rounded-full uppercase tracking-widest">
                                 {h}
                               </span>
                             ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">Investment</p>
                            <p className="text-xl font-serif text-stone-900">{pkg.price}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-sage-600 group-hover:border-sage-600 group-hover:text-white transition-all duration-500">
                             <ChevronRight className="w-5 h-5" />
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

      {/* The Sanctuary Experience CTA */}
      <section className="py-32 md:py-48 bg-[#E5E1DA] overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
         <Container className="relative">
            <div className="max-w-4xl mx-auto text-center space-y-12">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="space-y-6"
               >
                  <Flower className="w-12 h-12 text-sage-600 mx-auto" />
                  <h2 className="text-5xl md:text-8xl font-serif text-stone-900 tracking-tight leading-none lowercase italic">
                     Ready to begin your <br />
                     <span className="text-sage-600 not-italic font-light block mt-4">transformation?</span>
                  </h2>
               </motion.div>
               <p className="text-xl md:text-2xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed italic">
                  "Your journey to tranquility isn't a destination, it's a decision. Let us find your stillness."
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <Button size="lg" className="h-16 px-14 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xl shadow-2xl transition-all duration-500 hover:scale-105">
                     Book Your Sanctuary
                  </Button>
                  <Link href="/contact" className="text-stone-900 font-bold uppercase tracking-[0.3em] text-xs border-b-2 border-stone-900/20 pb-1 hover:border-sage-600 transition-colors">
                     Consult a Wellness Architect
                  </Link>
               </div>
            </div>
         </Container>
      </section>
    </div>
  );
}
