"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  MapPin,
  Lightbulb,
  Info,
  Smartphone,
  Car,
  ArrowUpRight,
  CreditCard,
  Compass
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FactsheetClient({ regionSlug }) {
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Static region data lookup
  const REGION_DATA = {
    azerbaijan: {
      heroTitle: "Azerbaijan",
      heroSubtitle: "Where East meets West in a blaze of fire, ancient history, and cutting-edge modernity.",
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
      history: {
        title: "Land of Fire",
        description: "A tapestry of ancient civilizations, from prehistoric petroglyphs to the medieval Silk Road, bridging the East and West for millennia.",
        tags: ["Stone Age Roots", "Silk Road Hub", "Zoroastrian Heritage"],
        stats: [
          { label: "Independence", value: "1991", desc: "Modern sovereignty regained" },
          { label: "Capital", value: "Baku", desc: "The City of Winds" }
        ]
      },
      culture: {
        vibe: "Elite Hospitality",
        description: "A modern secular society with deep roots in religious tolerance and 'Novruz' traditions. Guests are treated as sacred.",
        rules: [
          { icon: "🤝", label: "Greetings", desc: "Handshake is standard." },
          { icon: "🕌", label: "Religious Sites", desc: "Dress modestly; cover shoulders." },
          { icon: "☕", label: "The Golden Rule", desc: "Never refuse Tea; it's a sign of ultimate respect." }
        ]
      },
      food: {
        title: "The Saffron Flavors",
        description: "Azerbaijani cuisine is a ritual of fresh herbs, succulent meats, and the legendary Saffron Plov.",
        items: [
          { name: "Plov", desc: "National rice dish with dozens of varieties", icon: "🍚" },
          { name: "Dolma", desc: "Stuffed grape leaves or vegetables", icon: "🍲" },
          { name: "Qutab", desc: "Thin crispy flatbreads with savory fillings", icon: "🥟" },
          { name: "Tea Culture", desc: "Served in Armudu glasses with jam", icon: "🍵" }
        ]
      },
      transport: {
        title: "Move with Ease",
        bakuCard: "BakıKart: Your universal pass for Metro and Modern Buses. Refill at any station.",
        stats: [
          { icon: Plane, label: "Airport", value: "GYD", desc: "20 mins from center" },
          { icon: Smartphone, label: "Taxi", value: "Bolt/Uber", desc: "Safe and affordable" },
          { icon: Car, label: "Inter-city", value: "Fast Trains", desc: "Baku to Ganja/Sheki" }
        ]
      },
      visa: {
        title: "ASAN VISA",
        description: "Azerbaijan offers a seamless E-Visa process for over 90 countries.",
        process: [
          "Apply online at the official ASAN portal.",
          "Pay the processing fee (~$26 USD).",
          "Receive your E-Visa via email within 3 business days.",
          "Standard validity is 30 days for a single entry."
        ],
        requirements: "Passport must be valid for at least 6 months beyond your stay. If staying over 15 days, registration with the State Migration Service is mandatory."
      }
    }
  };

  const currentData = REGION_DATA[regionSlug?.toLowerCase()] || {
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

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-blue/20" />
        <Container className="relative z-10">
          <Link href={`/packages/${regionSlug}`}>
            <Button variant="ghost" className="text-white hover:bg-white/10 gap-2 mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName}
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none uppercase">
              {currentData.heroTitle}<br />
              <span className="text-brand-green italic lowercase">Factsheet</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-medium leading-relaxed">
              {currentData.heroSubtitle}
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            {/* 1. Essentials Grid */}
            <section>
              <SectionHeader title="The Essentials" badge="Quick Access" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {currentData.essentials.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-inner", colorMap[item.color] || "bg-slate-200")}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                      <p className="text-lg font-black text-slate-900 leading-tight">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. History Section */}
            {currentData.history && (
              <section>
                <SectionHeader title="History & Heritage" badge="Our Origins" />
                <div className="bg-white border border-slate-100 rounded-[3rem] p-6 md:p-10 shadow-sm">
                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{currentData.history.title}</h3>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10 max-w-3xl">
                    {currentData.history.description}
                  </p>
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

            {/* 3. Culture Section */}
            {currentData.culture && (
              <section>
                <SectionHeader title="Culture & Vibes" badge="Local Spirit" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white flex flex-col justify-center">
                    <Users className="w-12 h-12 text-brand-green mb-8" />
                    <h3 className="text-4xl font-black mb-6">{currentData.culture.vibe}</h3>
                    <p className="text-slate-300 font-medium leading-relaxed italic text-lg">
                      "{currentData.culture.description}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    {currentData.culture.rules.map((rule, i) => (
                      <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm flex items-start gap-6">
                        <span className="text-3xl shrink-0">{rule.icon}</span>
                        <div>
                          <h4 className="font-black text-slate-900 mb-1 uppercase text-xs tracking-widest">{rule.label}</h4>
                          <p className="text-slate-500 font-medium text-sm leading-relaxed">{rule.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. Gastronomy */}
            {currentData.food && (
              <section>
                <SectionHeader title="Gastronomy" badge="The Flavor Palette" />
                <div className="bg-amber-50/50 border border-amber-100 rounded-[3rem] p-8 md:p-10">
                  <div className="max-w-2xl mb-12">
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{currentData.food.title}</h3>
                    <p className="text-lg text-slate-600 font-medium">{currentData.food.description}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentData.food.items.map((food, i) => (
                      <div key={i} className="bg-white p-8 rounded-[2rem] border border-amber-100 shadow-sm flex items-center gap-6 group hover:border-brand-green transition-colors">
                        <span className="text-4xl group-hover:scale-110 transition-transform">{food.icon}</span>
                        <div>
                          <h4 className="font-black text-slate-900 uppercase text-xs tracking-tighter mb-1">{food.name}</h4>
                          <p className="text-slate-500 text-xs font-medium">{food.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. Transport */}
            {currentData.transport && (
              <section>
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
                  
                  {currentData.transport.bakuCard && (
                    <div className="bg-blue-50 border border-blue-100 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-sm">
                      <div className="w-48 h-28 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl shadow-xl flex flex-col p-6 justify-between text-white shrink-0">
                         <div className="w-10 h-1.5 bg-white/30 rounded" />
                         <p className="text-xs font-black uppercase tracking-widest text-right">BakıKart</p>
                      </div>
                      <p className="text-lg text-blue-900 font-bold leading-relaxed">
                        {currentData.transport.bakuCard}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6. Visa Section */}
            {currentData.visa && (
              <section className="mb-10 md:mb-14 bg-rose-50 border border-rose-100 rounded-[3rem] p-10 md:p-16">
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
                
                <div className="space-y-4 mb-10">
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
    </div>
  );
}

// Helper Components
const SectionHeader = ({ title, badge, noMargin }) => (
  <div className={cn("mb-4 md:mb-6", noMargin && "mb-0")}>
    <span className="inline-block px-4 py-2 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
      {badge}
    </span>
    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
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
