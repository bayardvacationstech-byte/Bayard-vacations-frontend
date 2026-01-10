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
  Info
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FactsheetClient({ regionSlug }) {
  const regionName = regionSlug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Dummy factsheet data
  const factsheet = {
    bestTimeToVisit: "September to April",
    currency: "Local Currency",
    climate: "Moderate & Pleasant",
    timeZone: "GMT+5:30",
    language: "English widely spoken",
    visaRequirement: "On Arrival for most countries",
    capital: "Capital City",
    population: "10M+",
    
    travelTips: [
      "Book accommodations in advance during peak season",
      "Carry local currency for small purchases",
      "Respect local customs and traditions",
      "Try local cuisine at authentic restaurants",
      "Learn a few basic phrases in the local language"
    ],
    
    insiderTips: [
      `Explore ${regionName}'s old town early morning for the best experience`,
      "Visit local markets on weekends for authentic cultural immersion",
      "Use public transportation to experience daily life",
      "Try street food at popular local spots"
    ],
    
    essentials: [
      { icon: Calendar, label: "Best Time", value: "Sep - Apr", color: "amber" },
      { icon: Wallet, label: "Currency", value: "Local", color: "emerald" },
      { icon: ThermometerSun, label: "Climate", value: "Pleasant", color: "orange" },
      { icon: Clock, label: "Time Zone", value: "GMT+5:30", color: "blue" },
      { icon: Globe, label: "Language", value: "English", color: "indigo" },
      { icon: FileCheck, label: "Visa", value: "On Arrival", color: "teal" },
      { icon: Building2, label: "Capital", value: "City", color: "violet" },
      { icon: Users, label: "Population", value: "10M+", color: "pink" }
    ]
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <Container>
          {/* Back Button */}
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm gap-2 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {regionName} Packages
            </Button>
          </Link>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 mb-6">
              <Info className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Complete Travel Guide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              {regionName}<br />
              <span className="text-amber-400">Factsheet</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Essential information and insider tips for your perfect {regionName} adventure.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-12 md:py-20">
        {/* Quick Facts Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              Essential Info
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              Quick Facts
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {factsheet.essentials.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center"
                >
                  <div className={cn("w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4", colorMap[item.color])}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              Helpful Advice
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              Travel Tips
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {factsheet.travelTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 items-start bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-700 leading-relaxed flex-1">{tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Insider Tips */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              Local Secrets
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              Insider Tips
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {factsheet.insiderTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 items-start bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200"
              >
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 italic font-medium">
                  "{tip}"
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-brand-blue to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white">
          <MapPin className="w-12 h-12 mx-auto mb-6 text-amber-400" />
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Visit {regionName}?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our handpicked travel packages and create unforgettable memories.
          </p>
          <Link href={`/packages/${regionSlug}`}>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Browse {regionName} Packages
            </Button>
          </Link>
        </section>
      </Container>
    </div>
  );
}
