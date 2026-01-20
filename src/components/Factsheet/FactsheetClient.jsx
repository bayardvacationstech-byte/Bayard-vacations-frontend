"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionNav from "@/components/Packages/SectionNav";
import { 
  ArrowLeft, 
  Calendar,
  Wallet,
  ThermometerSun,
  Clock,
  Globe,
  FileCheck,
  Building2,
  Users,
  Plane,
  Lightbulb,
  Info,
  Smartphone,
  CreditCard,
  Compass,
  Car,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronDown,
  Star,
  Flame,
  Landmark,
  Banknote,
  ShieldCheck,
  Mountain,
  Camera,
  Heart,
  Train,
  Bus
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GalleryCarousel from "@/components/ui/GalleryCarousel";
import { useRegion } from "@/hooks/regions/useRegion";
import { useRegionFactSheet } from "@/hooks/regions/useRegionFactSheet";

export default function FactsheetClient({ regionSlug }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState({ title: "", images: [] });

  // Fetch region data to get ID
  const { regionData, isLoading: regionLoading } = useRegion(regionSlug);
  
  // Fetch factsheet data using region ID
  const { factSheetData, isLoading: factSheetLoading } = useRegionFactSheet(regionData?.id);
  
  const isLoading = regionLoading || factSheetLoading;

  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Static region data lookup
  const REGION_DATA = {
    azerbaijan: {
      heroTitle: "Azerbaijan",
      heroSubtitle: "Where East meets West in a blaze of fire, ancient history, and cutting-edge modernity.",
      heroImage: "https://images.unsplash.com/photo-1541810271221-23d612fc27df?q=80&w=2070",
      essentials: [
        { icon: Calendar, label: "Best Time", value: "Apr - Oct", color: "amber" },
        { icon: Wallet, label: "Currency", value: "AZN (₼)", color: "emerald" },
        { icon: ThermometerSun, label: "Climate", value: "9/11 Zones", color: "orange" },
        { icon: Clock, label: "Time Zone", value: "UTC+4", color: "blue" },
        { icon: Globe, label: "Language", value: "Azeri", color: "indigo" },
        { icon: FileCheck, label: "Visa", value: "ASAN E-Visa", color: "teal" },
        { icon: Building2, label: "Capital", value: "Baku", color: "violet" },
        { icon: Users, label: "Population", value: "10M+", color: "pink" }
      ],
      fastFacts: [
        { label: "Calling Code", value: "+994" },
        { label: "Power Plug", value: "Type C & F (220V)" },
        { label: "Tipping", value: "10% is standard" },
        { label: "Emergency", value: "112" }
      ],
      history: {
        title: "A Journey Through Time",
        description: "Azerbaijan, known as the 'Land of Fire' for its ancient fire-worshipping sites and natural gas flames, stands proudly at the crossroads of Europe and Asia. From the Sasanid Empire to Soviet rule, it has emerged as a beacon of modern independence.",
        milestones: [
          { title: "Stone Age (8th-5th Millennia BC)", content: "Gobustan petroglyphs testify to early human settlement, depicting hunting, farming, and the Yalli dance." },
          { title: "Caucasian Albania (4th Century BC)", content: "One of the earliest Christian states in the region, leaving behind architectural marvels like the Kish Church." },
          { title: "Safavid Empire (1501-1736)", content: "The Golden Age of Azerbaijani culture, where the Safavid dynasty unified the region and made Persian culture flourish." },
          { title: "Oil Boom (19th Century)", content: "Baku became the world's leading oil producer, sparking an architectural renaissance and European influence." },
          { title: "Independence (1991)", content: "Regained sovereignty on August 30, 1991, blending medieval charm with futuristic architecture." },
          { title: "Modern Prosperity", content: "The 21st century saw a surge in development, from the Flame Towers to hosting world-class events like Formula 1." }
        ],
        spotlight: {
          title: "The Maiden Tower",
          content: "A 12th-century monument in Baku's Old City, shrouded in mystery and legends. It's a UNESCO World Heritage site and an iconic symbol of Azerbaijani heritage.",
          icon: Building2
        },
        tags: ["Stone Age Roots", "Silk Road Hub", "Zoroastrian Heritage"],
        stats: [
          { label: "Independence", value: "1991", desc: "Modern sovereignty regained" },
          { label: "Capital", value: "Baku", desc: "The City of Winds" }
        ]
      },
      climate: {
        title: "Time Zone & Climate",
        timeZone: "UTC+4 (AZT)",
        difference: "30 minutes behind IST",
        bestMonths: "April, May, June, September & October",
        seasons: [
          { name: "Spring", emoji: "🌸", months: "Apr – Jun", temp: "15–25°C", highlight: "Best for sightseeing. Mild weather and blooming landscape." },
          { name: "Summer", emoji: "☀️", months: "Jul – Aug", temp: "25–32°C", highlight: "Ideal for Caspian beaches and outdoor festivals." },
          { name: "Autumn", emoji: "🍂", months: "Sep – Oct", temp: "15–22°C", highlight: "Ideal travel time. Golden landscapes and pleasant harvest." },
          { name: "Winter", emoji: "❄️", months: "Nov – Mar", temp: "5–10°C", highlight: "Cool and calm. Budget-friendly streets and cozy charm." }
        ],
        packing: [
          "Layered clothing for varying altitudes",
          "Comfortable walking shoes for Old City cobbles",
          "Sunscreen and sunglasses for mountain treks",
          "Modest attire for religious site visits"
        ]
      },
      language: {
        official: "Azerbaijani (Azəri)",
        context: "A Turkic language written in Latin script. Russian is widely understood, and English is growing fast in tourism.",
        phrases: [
          { label: "Hello", phrase: "Salam" },
          { label: "Thank you", phrase: "Təşəkkür edirəm" },
          { label: "Goodbye", phrase: "Sağ olun" },
          { label: "Please", phrase: "Xahiş edirəm" },
          { label: "How much?", phrase: "Nə qədərdir?" },
          { label: "Where is...?", phrase: "...haradadır?" }
        ],
        signage: [
          { label: "Entrance", value: "Giriş" },
          { label: "Exit", value: "Çıxış" },
          { label: "Open", value: "Açıq" },
          { label: "Closed", value: "Bağlı" }
        ]
      },
      culture: {
        vibe: "Elite Hospitality",
        description: "A modern secular society with deep roots in religious tolerance and 'Novruz' traditions. Guests are treated as sacred.",
        rules: [
          { icon: "🤝", label: "Greetings", desc: "Handshake is standard; men wait for women to offer hand first." },
          { icon: "🕌", label: "Religious Sites", desc: "Dress modestly; cover shoulders and knees." },
          { icon: "☕", label: "The Golden Rule", desc: "Never refuse Tea; it's a cornerstone of social life." }
        ],
        dos: [
          "Remove shoes when entering a local home",
          "Ask for permission before photographing people",
          "Offer seats to elders in public transport"
        ],
        donts: [
          "Don't discuss sensitive regional politics",
          "Don't be overly loud or affectionate in public",
          "Don't point your feet at people while sitting"
        ],
        etiquette: {
          dining: "Wait for the eldest to start eating. Bread is sacred; never place it face down.",
          gifting: "Odd numbers of flowers are for joy; even numbers are for mourning."
        }
      },
      food: {
        title: "The Saffron Flavors",
        description: "Azerbaijani cuisine is a ritual of fresh herbs, succulent meats, and the legendary Saffron Plov.",
        featuredImage: "https://images.unsplash.com/photo-1541810271221-23d612fc27df?q=80&w=2070",
        items: [
          { name: "Plov", desc: "National saffron rice dish", image: "https://images.unsplash.com/photo-1633910309485-df87f3b60f1b?q=80&w=2070" },
          { name: "Dolma", desc: "Stuffed grape leaves", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=2070" },
          { name: "Qutab", desc: "Crispy filled flatbreads", image: "https://images.unsplash.com/photo-1541014741259-df529411b96a?q=80&w=2070" },
          { name: "Tea Culture", desc: "Served in Armudu glasses with jam", image: "https://images.unsplash.com/photo-1512075135822-67cdd9dd7314?q=80&w=2070" },
          { name: "Kebab", desc: "Grilled succulent meats", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070" },
          { name: "Pakhlava", desc: "Sweet layered baklava", image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=2070" }
        ],
        drinks: [
          { name: "Sherbet", value: "Fruit & flower infused water" },
          { name: "Ayran", value: "Salted yogurt drink" }
        ]
      },
      transport: {
        title: "Move with Ease",
        bakuCard: "BakıKart: Your universal pass for Metro and Modern Buses. Refill at any station.",
        arrival: "Heydar Aliyev Int'l Airport (GYD) is your main gateway, 20km from Baku center.",
        apps: ["Bolt", "Uber (Azerbaijan version)"],
        stats: [
          { icon: Plane, label: "Airport", value: "GYD", desc: "20 mins from center" },
          { icon: Smartphone, label: "Taxi", value: "Bolt/Uber", desc: "Safe and affordable" },
          { icon: Car, label: "Inter-city", value: "Fast Trains", desc: "Baku to Ganja/Sheki" }
        ]
      },
      visa: {
        title: "ASAN VISA",
        description: "Azerbaijan offers a seamless E-Visa process for over 90 countries through the official portal.",
        process: [
          "Apply online at the official ASAN portal.",
          "Pay the processing fee (~$26 USD).",
          "Receive your E-Visa via email within 3 business days.",
          "Standard validity is 30 days for a single entry."
        ],
        requirements: "Passport must be valid for at least 6 months beyond your stay. If staying over 15 days, registration with the State Migration Service is mandatory."
      },
      shopping: {
        title: "Treasures of Azerbaijan",
        description: "From intricate hand-woven carpets to aromatic spices, Azerbaijan's bazaars and boutiques offer unique treasures for every traveler.",
        categories: [
          { name: "Silk & Textiles", icon: "🧣", items: ["Kelaghayi (Silk Headscarf)", "Hand-woven Carpets", "Embroidered Fabrics"] },
          { name: "Gifts & Crafts", icon: "🏺", items: ["Armudu Glasses", "Copperware from Lahij", "Backgammon Sets"] },
          { name: "Flavors", icon: "🍯", items: ["Saffron", "Pomegranate Syrup", "Black Tea", "Azeri Jam (Rose, Walnut)"] }
        ],
        hubs: [
          { name: "Yashil Bazar", type: "Food & Spices", highlight: "Best for fresh produce and local treats." },
          { name: "Icherisheher", type: "Souvenirs", highlight: "Antiques, carpets, and traditional crafts." },
          { name: "Taza Bazar", type: "Authentic", highlight: "A glimpse into local daily life and exotic spices." }
        ]
      },
      highlights: [
        { icon: Star, title: "Flame Towers Visit", description: "Panoramic views of the Baku bay from the iconic tri-towers", iconColor: "text-yellow-500" },
        { icon: Flame, title: "Yanar Dag Experience", description: "Witness the natural eternal flame that never goes out", iconColor: "text-orange-500" },
        { icon: Landmark, title: "Old City Expedition", description: "Explore Icherisheher's ancient streets and Maiden Tower", iconColor: "text-amber-600" },
        { icon: Plane, title: "Luxury Airport Pickup", description: "VIP arrival with premium chauffeur services to your hotel", iconColor: "text-blue-500" },
        { icon: Building2, title: "Heydar Aliyev Center", description: "Modern architectural masterpiece by Zaha Hadid", iconColor: "text-indigo-500" },
        { icon: ShieldCheck, title: "Golden Hospitality", description: "Hand-picked premium hotels for maximum comfort", iconColor: "text-emerald-500" },
      ],
      attractions: [
        { icon: Flame, title: "Eternal Baku Fire", iconColor: "text-orange-500" },
        { icon: Building2, title: "Futuristic Baku City", iconColor: "text-indigo-500" },
        { icon: Mountain, title: "Scenic Caucasian Alps", iconColor: "text-blue-500" },
        { icon: Landmark, title: "UNESCO Heritage Sites", iconColor: "text-amber-600" },
        { icon: Camera, title: "Photo-ready Baku Bay", iconColor: "text-purple-500" },
        { icon: MapPin, title: "Signature Tea Culture", iconColor: "text-rose-500" },
      ]
    }
  };

  // Icon map for dynamic lookup
  const iconMap = {
    Calendar, Wallet, ThermometerSun, Clock, Globe, FileCheck, Building2, 
    Users, Plane, Lightbulb, Info, Smartphone, CreditCard, Compass, 
    Car, MapPin, ArrowUpRight, CheckCircle2, XCircle, Star, Flame, 
    Landmark, Banknote, ShieldCheck, Mountain, Camera, Heart, Train, Bus
  };

  // Map dynamic data if available
  const dynamicData = factSheetData?.details;

  const currentData = dynamicData ? {
    heroTitle: dynamicData.hero?.title || regionName,
    heroSubtitle: dynamicData.hero?.subtitle || `Essential information and insider tips for your perfect ${regionName} adventure.`,
    heroImage: dynamicData.hero?.image || REGION_DATA[regionSlug?.toLowerCase()]?.heroImage,
    essentials: dynamicData.essentials?.map(item => ({
      ...item,
      icon: iconMap[item.icon] || Info
    })) || REGION_DATA[regionSlug?.toLowerCase()]?.essentials || [],
    fastFacts: dynamicData.fastFacts || REGION_DATA[regionSlug?.toLowerCase()]?.fastFacts,
    history: {
      ...dynamicData.history,
      spotlight: dynamicData.history?.spotlight ? {
        ...dynamicData.history.spotlight,
        icon: iconMap[dynamicData.history.spotlight.icon] || Info
      } : undefined,
      tags: dynamicData.history?.tags || [],
      stats: dynamicData.history?.stats || []
    },
    climate: dynamicData.climate ? {
      ...dynamicData.climate,
      seasons: dynamicData.climate.seasons || []
    } : undefined,
    language: dynamicData.language || undefined,
    culture: dynamicData.culture ? {
      ...dynamicData.culture,
      rules: dynamicData.culture.rules || []
    } : undefined,
    food: dynamicData.food ? {
      ...dynamicData.food,
      items: dynamicData.food.items || [],
      drinks: dynamicData.food.beverages || dynamicData.food.drinks || []
    } : undefined,
    shopping: dynamicData.shopping ? {
      ...dynamicData.shopping,
      categories: dynamicData.shopping.categories || [],
      hubs: dynamicData.shopping.hubs || []
    } : undefined,
    transport: dynamicData.transport ? {
      ...dynamicData.transport,
      stats: dynamicData.transport.stats?.map(s => ({
        ...s,
        icon: iconMap[s.icon] || Car
      })) || []
    } : undefined,
    visa: dynamicData.visa || undefined,
    highlights: dynamicData.highlights?.map(h => ({
      ...h,
      icon: iconMap[h.icon] || Star
    })),
    attractions: dynamicData.attractions?.map(a => ({
      ...a,
      icon: iconMap[a.icon] || MapPin
    }))
  } : REGION_DATA[regionSlug?.toLowerCase()] || {
    heroTitle: regionName,
    heroSubtitle: `Essential information and insider tips for your perfect ${regionName} adventure.`,
    essentials: [
      { icon: Calendar, label: "Best Time", value: "Sep - Apr", color: "amber" },
      { icon: Wallet, label: "Currency", value: "Local", color: "emerald" },
      { icon: ThermometerSun, label: "Climate", value: "Pleasant", color: "orange" },
      { icon: Clock, label: "Time Zone", value: "Local Time", color: "blue" },
      { icon: Globe, label: "Language", value: "Various", color: "indigo" },
      { icon: FileCheck, label: "Visa", value: "Varies", color: "teal" },
      { icon: Building2, label: "Capital", value: "Main City", color: "violet" },
      { icon: Users, label: "Population", value: "Varies", color: "pink" }
    ],
    history: {
      title: "Ancient Heritage",
      description: `${regionName} boasts a rich history stretching back centuries, with a unique cultural blend.`,
      tags: ["Historical", "Cultural", "Ancient"],
      stats: [{ label: "Capital", value: "Main City", desc: "Economic and cultural hub" }]
    }
  };


  const colorMap = {
    amber: "bg-amber-400 text-white",
    emerald: "bg-emerald-400 text-white",
    orange: "bg-orange-400 text-white",
    blue: "bg-blue-400 text-white",
    indigo: "bg-indigo-400 text-white",
    teal: "bg-teal-400 text-white",
    violet: "bg-violet-400 text-white",
    pink: "bg-pink-400 text-white"
  };

  const factsheetSections = [
    { id: "essentials", label: "Essentials", show: true },
    { id: "highlights", label: "Highlights", show: currentData.highlights && currentData.highlights.length > 0 },
    { id: "history", label: "History", show: !!currentData.history?.description },
    { id: "climate", label: "Climate", show: !!currentData.climate?.timeZone },
    { id: "language", label: "Language", show: !!currentData.language?.official },
    { id: "culture", label: "Culture", show: !!currentData.culture?.description },
    { id: "gastronomy", label: "Food", show: !!currentData.food?.items?.length > 0 },
    { id: "shopping", label: "Shopping", show: !!currentData.shopping?.title },
    { id: "transport", label: "Transport", show: !!currentData.transport?.stats?.length > 0 },
    { id: "visa", label: "Visa", show: !!currentData.visa?.title }
  ].filter(section => section.show);

  const [activeSection, setActiveSection] = useState("essentials");
  const [showSectionNav, setShowSectionNav] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Navigation Bar Visibility
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Only show once the hero has completely left the viewport
        setShowSectionNav(rect.bottom <= 0);
      }

      // 2. Track Active Section
      const triggerLine = 240; 
      let currentActive = activeSection;
      
      for (const section of factsheetSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerLine && rect.bottom > triggerLine) {
            currentActive = section.id;
            break;
          }
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, factsheetSections]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-end overflow-hidden">
        {/* Cinematic Background Image */}
        {currentData.heroImage && (
          <div className="absolute inset-0 z-0">
             <Image 
                src={currentData.heroImage} 
                alt={currentData.heroTitle}
                fill
                priority
                className="object-cover scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
          </div>
        )}
        {!currentData.heroImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-blue/20 z-0" />
        )}
        
        <Container className="relative z-20 pb-8 md:pb-16 pt-24 md:pt-32">
          <Link href={`/packages/${regionSlug}`}>
            <Button variant="ghost" className="text-white hover:bg-white/10 gap-2 mb-8 -ml-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to {regionName}
            </Button>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none uppercase text-white">
              {currentData.heroTitle}<br />
              <span className="text-brand-green italic lowercase drop-shadow-sm">Factsheet</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
              {currentData.heroSubtitle}
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Floating Pill Navigation - Positioned after Hero */}
      <div className="sticky top-24 z-50 pointer-events-none mb-6">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl shadow-slate-200/40 rounded-full px-4 py-3 pointer-events-auto max-w-fit mx-auto mt-2"
          >
            <SectionNav 
              sections={factsheetSections} 
              activeSection={activeSection} 
            />
          </motion.div>
        </Container>
      </div>

      <Container className="py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10 md:space-y-14">
            
            {/* 1. Essentials Grid */}
            <section id="essentials" className="scroll-mt-24">
              <SectionHeader title="The Essentials" badge="Quick Access" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                {currentData.essentials.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-inner", colorMap[item.color] || "bg-slate-200")}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                      <p className="text-base md:text-lg font-black text-slate-900 leading-tight">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Fast Facts Block */}
              {currentData.fastFacts && (
                <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-10 text-white flex flex-col md:flex-row items-center gap-8">
                   <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-green rounded-full flex items-center justify-center shrink-0">
                      <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-white" />
                   </div>
                   <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                      {currentData.fastFacts.map((fact, i) => (
                        <div key={i}>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{fact.label}</p>
                           <p className="text-base md:text-lg font-black text-white">{fact.value}</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </section>

            {/* Highlights Section */}
            {currentData.highlights && (
              <section id="highlights" className="scroll-mt-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 bg-white border border-slate-100 rounded-[3rem] p-6 md:p-10 shadow-sm">
                  
                  {/* Left Side: Region Highlights */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
                      Region <span className="text-brand-blue">Highlights</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      {currentData.highlights.map((item, idx) => (
                        <FeatureCard key={idx} {...item} />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Top Attractions */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
                      Top <span className="text-brand-blue">Attractions</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {currentData.attractions?.map((item, idx) => (
                        <AttractionCard key={idx} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 2. History Section */}
            {currentData.history && (
              <section id="history" className="scroll-mt-24">
                <SectionHeader title="History & Heritage" badge="Our Origins" />
                <div className="bg-white border border-slate-100 rounded-[3rem] px-5 py-8 md:p-10 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-6">{currentData.history.title}</h3>
                  <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6 max-w-3xl">
                    {currentData.history.description}
                  </p>
                  
                  {/* Milestones Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {currentData.history.milestones?.map((m, i) => (
                      <div key={i} className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl">
                        <h4 className="font-black text-slate-900 mb-2 uppercase text-[10px] tracking-widest">{m.title}</h4>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{m.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Spotlight Block */}
                  {currentData.history.spotlight && (
                    <div className="bg-brand-green/5 border border-brand-green/10 p-8 rounded-[2.5rem] mb-8 flex flex-col md:flex-row gap-8 items-center">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                          {React.createElement(currentData.history.spotlight.icon, { className: "w-8 h-8 text-brand-green" })}
                       </div>
                       <div>
                          <h4 className="font-black text-brand-green uppercase text-xs tracking-widest mb-2">Spotlight: {currentData.history.spotlight.title}</h4>
                          <p className="text-slate-700 font-medium leading-relaxed italic">{currentData.history.spotlight.content}</p>
                       </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 mb-12">
                    {currentData.history.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentData.history.stats.map((stat, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem]">
                        <p className="text-xs font-black text-brand-green uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                        <h4 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                        <p className="text-slate-500 font-medium">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 3. Climate Section */}
            {currentData.climate && (
              <section id="climate" className="scroll-mt-24">
                <SectionHeader title="Climate & Time" badge="Weather Guide" />
                <div className="bg-white border border-slate-100 rounded-[3rem] px-5 py-8 md:p-10 shadow-sm">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                           <Clock className="w-5 h-5 text-slate-900" />
                           <h4 className="text-xl font-black text-slate-900 uppercase">Time Zone</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard</p>
                              <p className="text-2xl font-black text-slate-900">{currentData.climate.timeZone}</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Difference</p>
                              <p className="text-sm font-bold text-slate-700">{currentData.climate.difference}</p>
                           </div>
                        </div>
                        <div className="pt-4">
                           <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">🎯 Best Months</p>
                           <p className="text-xl font-black text-slate-900">{currentData.climate.bestMonths}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                           <ThermometerSun className="w-5 h-5 text-slate-900" />
                           <h4 className="text-xl font-black text-slate-900 uppercase">Climate</h4>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                           Featuring nine of the world's eleven climate zones, Azerbijan's weather varies from subtropical at the coast to continental in the mountains.
                        </p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {currentData.climate.seasons.map((s, i) => (
                        <div key={i} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl text-center">
                           <span className="text-3xl block mb-2">{s.emoji}</span>
                           <h5 className="font-black text-slate-900 text-sm mb-1">{s.name}</h5>
                           <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{s.months}</p>
                           <p className="text-lg font-black text-brand-green mb-2">{s.temp}</p>
                           <p className="text-[11px] text-slate-500 font-medium leading-tight">{s.highlight}</p>
                        </div>
                      ))}
                   </div>

                   {/* Packing List Block */}
                   {currentData.climate.packing && (
                     <div className="bg-amber-50 rounded-[2rem] p-8 border border-amber-100">
                        <h4 className="text-amber-900 font-black mb-4 uppercase text-xs tracking-widest">Seasonal Packing List</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                           {currentData.climate.packing.map((item, i) => (
                             <div key={i} className="flex gap-3 text-amber-900/70 font-medium text-sm">
                                <span className="text-amber-400">👒</span> {item}
                             </div>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
              </section>
            )}

            {/* 4. Language Section */}
            {currentData.language && (
               <section id="language" className="scroll-mt-24">
                 <SectionHeader title="Language Guide" badge="Communication" />
                 <div className="bg-white border border-slate-100 rounded-[3rem] px-5 py-8 md:p-10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-6">
                          <div>
                             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Official Language</h4>
                             <p className="text-3xl font-black text-slate-900 italic">{currentData.language.official}</p>
                          </div>
                          <p className="text-base text-slate-600 font-medium leading-relaxed italic border-l-4 border-brand-green/30 pl-4">
                             {currentData.language.context}
                          </p>

                          {/* Signage Cheat-sheet */}
                          <div className="bg-slate-50 p-6 rounded-2xl">
                             <h5 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-4">Local Signage</h5>
                             <div className="grid grid-cols-2 gap-4">
                                {currentData.language.signage?.map((s, i) => (
                                  <div key={i} className="flex justify-between border-b border-slate-100 pb-1">
                                     <span className="text-[10px] font-bold text-slate-400">{s.label}</span>
                                     <span className="text-[11px] font-black text-slate-900 uppercase">{s.value}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                       <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Essential Phrases</h4>
                          <div className="grid grid-cols-1 gap-4">
                             {currentData.language.phrases.map((p, i) => (
                               <div key={i} className="bg-slate-50/50 p-4 rounded-xl flex justify-between items-center group hover:bg-white transition-colors border border-transparent hover:border-slate-100">
                                  <p className="text-[10px] font-black text-slate-400 uppercase">{p.label}</p>
                                  <p className="text-lg font-black text-slate-900 group-hover:text-brand-green transition-colors">{p.phrase}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
               </section>
            )}

            {/* 5. Culture Section */}
            {currentData.culture && (
              <section id="culture" className="scroll-mt-24">
                <SectionHeader title="Culture & Vibes" badge="Local Spirit" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-[3rem] px-6 py-10 md:p-10 text-white flex flex-col justify-center">
                    <Users className="w-10 h-10 md:w-12 md:h-12 text-brand-green mb-8" />
                    <h3 className="text-3xl md:text-4xl font-black mb-6">{currentData.culture.vibe}</h3>
                    <p className="text-slate-300 font-medium leading-relaxed italic text-base md:text-lg">
                      "{currentData.culture.description}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    {currentData.culture.rules.map((rule, i) => (
                      <div key={i} className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm flex items-start gap-5 md:gap-6">
                        <span className="text-2xl md:text-3xl shrink-0">{rule.icon}</span>
                        <div>
                          <h4 className="font-black text-slate-900 mb-1 uppercase text-xs tracking-widest">{rule.label}</h4>
                          <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">{rule.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dos and Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                   <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
                      <h4 className="flex items-center gap-2 text-emerald-900 font-black mb-6 text-xl">
                         <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                         Essential Dos
                      </h4>
                      <ul className="space-y-4">
                         {currentData.culture.dos?.map((item, i) => (
                           <li key={i} className="flex gap-3 text-emerald-900/70 font-medium text-sm">
                              <span className="text-emerald-500 font-black">•</span> {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2.5rem]">
                      <h4 className="flex items-center gap-2 text-rose-900 font-black mb-6 text-xl">
                         <XCircle className="w-6 h-6 text-rose-500" />
                         Essential Don'ts
                      </h4>
                      <ul className="space-y-4">
                         {currentData.culture.donts?.map((item, i) => (
                           <li key={i} className="flex gap-3 text-rose-900/70 font-medium text-sm">
                              <span className="text-rose-500 font-black">•</span> {item}
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                {/* Etiquette Block */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                      <h5 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-4">🍽️ Dining Etiquette</h5>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{currentData.culture.etiquette.dining}</p>
                   </div>
                   <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                      <h5 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-4">🎁 Gift Giving</h5>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed italic">{currentData.culture.etiquette.gifting}</p>
                   </div>
                </div>
              </section>
            )}

            {/* 6. Gastronomy */}
            {currentData.food && (
              <section id="gastronomy" className="scroll-mt-24">
                <SectionHeader title={currentData.food.title} badge="Cuisine" />
                
                <div className="bg-white border border-slate-100 rounded-[3rem] px-5 py-8 md:p-10 shadow-sm">
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 max-w-3xl">
                    {currentData.food.description}
                  </p>

                  {/* Food Items Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {currentData.food.items.map((food, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setSelectedGallery({ 
                            title: food.name, 
                            images: [{ url: food.image, caption: food.desc }] 
                          });
                          setGalleryOpen(true);
                        }}
                        className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                      >
                        {/* Food Image */}
                        <Image 
                          src={food.image} 
                          alt={food.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-black text-white text-lg md:text-xl mb-1 drop-shadow-lg">
                            {food.name}
                          </h4>
                          <p className="text-white/80 text-xs md:text-sm font-medium leading-tight">
                            {food.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Signature Drinks Bar */}
                  {currentData.food.drinks && currentData.food.drinks.length > 0 && (
                    <div className="bg-brand-blue rounded-2xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <h4 className="font-black mb-4 uppercase text-xs tracking-widest flex items-center gap-2">
                        <Info className="w-4 h-4" /> Signature Drinks
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {currentData.food.drinks.map((drink, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="text-sm font-black text-white">{drink.name}</span>
                            <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">{drink.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 7. Shopping & Souvenirs */}
            {currentData.shopping && (
              <section id="shopping" className="scroll-mt-24">
                <SectionHeader title="Shop & Bring Home" badge="Treasures" />
                <div className="bg-white border border-slate-100 rounded-[3rem] p-6 md:p-10 shadow-sm">
                   <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">{currentData.shopping.description}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      {currentData.shopping.categories.map((cat, i) => (
                        <div key={i} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                           <span className="text-3xl block mb-4">{cat.icon}</span>
                           <h4 className="font-black text-slate-900 text-sm mb-4 uppercase tracking-widest">{cat.name}</h4>
                           <ul className="space-y-2">
                              {cat.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-brand-green" /> {item}
                                </li>
                              ))}
                           </ul>
                        </div>
                      ))}
                   </div>

                   <div className="bg-slate-900 text-white rounded-[2.5rem] p-8">
                      <h4 className="text-brand-green font-black uppercase text-xs tracking-[0.2em] mb-6">Where to Shop (Local Hubs)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {currentData.shopping.hubs.map((hub, i) => (
                           <div key={i}>
                              <p className="text-lg font-black mb-1">{hub.name}</p>
                              <p className="text-brand-green font-bold text-[10px] uppercase tracking-widest mb-2">{hub.type}</p>
                              <p className="text-slate-400 text-xs font-medium italic">"{hub.highlight}"</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </section>
            )}

            {/* 8. Transport */}
            {currentData.transport && (
              <section id="transport" className="scroll-mt-24">
                <SectionHeader title="On the Move" badge="Transport & Safety" />
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentData.transport.stats.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm text-center">
                          <Icon className="w-8 h-8 mx-auto text-blue-500 mb-4" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                          <h4 className="text-2xl font-black text-slate-900 mb-1">{stat.value}</h4>
                          <p className="text-slate-500 text-xs font-medium">{stat.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                           <Plane className="w-6 h-6 text-slate-900" />
                           <h4 className="text-lg font-black text-slate-900 uppercase">Arrival Info</h4>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{currentData.transport.arrival}</p>
                     </div>
                     <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                           <Smartphone className="w-6 h-6 text-slate-900" />
                           <h4 className="text-lg font-black text-slate-900 uppercase">Recommended Apps</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                           {currentData.transport.apps?.map((app, i) => (
                             <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black text-slate-900">{app}</span>
                           ))}
                        </div>
                     </div>
                  </div>
                  
                  {currentData.transport.bakuCard && (
                    <div className="bg-blue-50/50 border border-blue-100 p-4 md:p-5 rounded-[2rem] flex items-center gap-6 shadow-sm overflow-hidden relative group hover:shadow-md transition-all">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      <div className="w-28 h-16 md:w-32 md:h-18 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-lg flex flex-col p-4 justify-between text-white shrink-0 relative overflow-hidden">
                         <div className="w-8 h-1 bg-white/30 rounded" />
                         <p className="text-[8px] font-black uppercase tracking-widest text-right">BakıKart</p>
                         <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full" />
                      </div>
                      <p className="text-sm md:text-base text-blue-900 font-bold leading-relaxed max-w-2xl">
                        {currentData.transport.bakuCard}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 8. Visa Section */}
            {currentData.visa && (
              <section id="visa" className="scroll-mt-24 mb-10 md:mb-14 bg-rose-50 border border-rose-100 rounded-[3rem] px-5 py-10 md:p-16">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-1/3">
                    <SectionHeader title="Visa Entry" badge="ASAN PORTAL" noMargin />
                    <h3 className="text-4xl font-black text-slate-900 mt-6 mb-4">{currentData.visa.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {currentData.visa.description}
                    </p>
                    <Link href="https://evisa.gov.az" target="_blank" className="inline-block mt-8">
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full px-8 py-6 h-auto">
                        Apply for E-Visa
                      </Button>
                    </Link>
                  </div>
                  <div className="md:w-2/3 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      {currentData.visa.process.map((step, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm flex gap-6 items-center">
                          <span className="w-8 h-8 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center shrink-0">{i+1}</span>
                          <p className="text-slate-700 font-medium leading-tight">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/50 p-8 rounded-[2rem] border border-rose-200">
                      <p className="text-sm text-rose-900 font-bold leading-relaxed italic">
                        <Info className="w-4 h-4 inline-block mr-2 -mt-1 text-rose-500" />
                        "{currentData.visa.requirements}"
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* Sidebar / CTA Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">Plan Your Trip <br/>to <span className="text-brand-green">{regionName}</span></h3>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                  Ready to experience it all? Our local experts have crafted the perfect itineraries just for you.
                </p>
                
                <div className="space-y-4 mb-6">
                  <SidebarBenefit icon={Calendar} text="Curated 2026 Itineraries" />
                  <SidebarBenefit icon={CreditCard} text="Transparent Pricing" />
                  <SidebarBenefit icon={Compass} text="24/7 Ground Support" />
                </div>

                <Link href={`/packages/${regionSlug}`}>
                  <Button className="w-full bg-brand-green hover:bg-green-600 text-white font-black rounded-full py-8 text-lg shadow-xl shadow-brand-green/20 group">
                    View Packages
                    <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="mt-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 text-center shadow-md">
                 <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-6 h-6" />
                 </div>
                 <h4 className="font-black text-slate-900 mb-2">Need Assistance?</h4>
                 <p className="text-slate-500 text-sm font-medium mb-6">Talk to our travel advisor for personalized recommendations.</p>
                 <Link href="/contact">
                   <Button variant="outline" className="rounded-full border-slate-200 font-bold text-slate-600 hover:text-brand-green hover:border-brand-green">Contact Us</Button>
                 </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Gallery Popup */}
      <GalleryCarousel
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        images={selectedGallery.images}
        title={selectedGallery.title}
      />
    </div>
  );
}

// Helper Components
const SectionHeader = ({ title, badge, noMargin }) => (
  <div className={cn("mb-6 md:mb-8", noMargin && "mb-0")}>
    <span className="inline-block px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-3">
      {badge}
    </span>
    <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
      {title}
    </h2>
  </div>
);

const SidebarBenefit = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-4 text-sm font-bold text-slate-300">
    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
      <Icon className="w-4 h-4 text-brand-green" />
    </div>
    {text}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, iconColor }) => (
  <div className="flex gap-4">
    <div className={cn("w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100", iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="space-y-1">
      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
    </div>
  </div>
);

const AttractionCard = ({ icon: Icon, title, iconColor }) => (
  <div className="flex items-center gap-4 bg-[#f8fafc]/50 p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-300">
    <div className={cn("w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white border border-slate-100", iconColor)}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm md:text-base font-bold text-slate-700 tracking-tight">{title}</span>
  </div>
);
