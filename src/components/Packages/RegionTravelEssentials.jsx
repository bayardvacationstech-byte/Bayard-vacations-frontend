"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  Sun, 
  Globe, 
  Wallet, 
  ShieldCheck, 
  Users, 
  Car, 
  UtensilsCrossed,
  Map,
  Clock,
  Train,
  Bus,
  MapPin,
  Heart,
  Lightbulb,
  CreditCard,
  ArrowRightLeft,
  Smartphone,
  Compass,
  ChevronRight,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const RegionTravelEssentials = ({ regionName = "Azerbaijan", regionData = null }) => {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "History", icon: History },
    { id: "time", label: "Time & Climate", icon: Sun },
    { id: "language", label: "Language", icon: Globe },
    { id: "currency", label: "Currency", icon: Wallet },
    { id: "visa", label: "Visa & Entry", icon: ShieldCheck },
    { id: "culture", label: "Culture", icon: Users },
    { id: "transport", label: "Transport", icon: Car },
    { id: "food", label: "Food", icon: UtensilsCrossed },
  ];

  return (
    <section className="py-6 md:py-10 bg-slate-50 overflow-hidden">
      <Container>
        {/* Header Section - Matched to Reference */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            {/* Left: Title Section */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
                <Compass className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">KNOWLEDGE HUB</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Things to Know in <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl">
                Essential travel information and insider tips for your journey
              </p>
            </div>
            
            {/* Right: Explore Button */}
            <Link href={`/factsheet/${regionName?.toLowerCase()}`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 whitespace-nowrap">
                Explore More
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Floating Pill Tabs - Horizontal Scroll on Mobile */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 md:gap-3 mb-12 pb-2 -mb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300",
                    isActive 
                      ? "bg-yellow-400 text-slate-900 shadow-sm" 
                      : "bg-white text-blue-600 hover:bg-slate-50 border border-slate-200"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-slate-900" : "text-blue-600")} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-sm overflow-hidden border border-slate-100">

          <div className="p-4 sm:p-6 md:p-10">
            <AnimatePresence mode="wait">
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">A Journey Through Time</h3>
                    <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                      Azerbaijan, known as the <strong>"Land of Fire"</strong> for its ancient fire-worshipping sites and natural gas flames, stands proudly at the crossroads of <strong>Europe and Asia</strong>. This land of contrasts has witnessed empires rise and fall, from ancient Persian rule to Soviet dominance, and now thrives as a modern, independent nation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <HistoryCard 
                      title="Ancient & Medieval Eras" 
                      content="Ruled by the Sasanid Empire (3rd century AD) and later the Arabian Caliphate, Azerbaijan embraced Islam in the 7th century. The Safavid dynasty (1501–1736), particularly under Abbas the Great, transformed Azerbaijan into a hub of art, culture, and trade. Baku emerged as a key Silk Road city."
                      color="amber"
                    />
                    <HistoryCard 
                      title="Russian & Soviet Rule" 
                      content="Following the Treaties of Gulistan (1813) and Turkmenchay (1828), Azerbaijan came under Russian control. The region's vast oil reserves powered rapid industrialization. In 1918, Azerbaijan became the first parliamentary republic in the Muslim world and the first Muslim nation to grant women equal voting rights. Soviet rule lasted from 1920 to 1991."
                      color="rose"
                    />
                    <HistoryCard 
                      title="Modern Independence (1991)" 
                      content="On August 30, 1991, Azerbaijan regained independence. Today, Baku is a dazzling blend of medieval Old City charm and futuristic skyscrapers like the iconic Flame Towers."
                      color="blue"
                    />
                    <HistoryCard 
                      title="The Land of Fire" 
                      content="Azerbaijan's nickname stems from ancient Zoroastrian fire temples and natural gas flames that have burned for millennia. The Ateshgah Fire Temple in Surakhani remains a testament to this fiery heritage, attracting visitors from around the world."
                      color="emerald"
                    />
                  </div>
                  <p className="text-center text-[10px] md:text-xs text-slate-400 font-medium mt-8 md:mt-12 uppercase tracking-wider">Information is current as of January 2026</p>
                </motion.div>
              )}

              {activeTab === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Time Zone & Climate</h3>
                  
                  <div className="bg-blue-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-blue-100">
                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600 flex items-center justify-center">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-slate-900">Azerbaijan Standard Time</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h5 className="text-2xl md:text-4xl font-black text-slate-900 mb-2">UTC+4 <span className="text-base md:text-lg text-slate-500 font-bold ml-1">(AZT)</span></h5>
                        <p className="text-sm md:text-base text-slate-600 font-medium italic">No Daylight Saving Time observed (year-round UTC+4)</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm md:text-base text-emerald-700 font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200">⏰ 30 minutes behind IST — When it's 12:00 PM in India, it's 11:30 AM in Azerbaijan</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <div className="flex items-center gap-4 mb-3 md:mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center">
                          <Sun className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-black text-slate-900">Climate</h4>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <p className="font-bold text-slate-800 text-sm md:text-base">Climate Type</p>
                        <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Nine of the world's eleven climate zones are found here, ranging from subtropical to continental.</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                       <p className="font-bold text-slate-800 mb-2 text-sm md:text-base">Best Time to Visit</p>
                       <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                        <span className="font-black text-slate-900 underline decoration-amber-500/30">Spring</span> and <span className="font-black text-slate-900 underline decoration-amber-500/30">Autumn</span> offer the most pleasant sightseeing conditions.
                       </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {[
                      { season: "🌸 Spring", months: "April–June", temp: "15–25°C", highlight: "BEST SEASON! Mild weather, blooming flowers, Novruz Festival (March 21), perfect for sightseeing.", color: "border-emerald-200 bg-emerald-50/50" },
                      { season: "☀️ Summer", months: "July–August", temp: "25–32°C", highlight: "Hot and humid, especially coastal Baku. Great for Caspian Sea beaches, Baku Jazz Festival. Can be crowded.", color: "border-amber-200 bg-amber-50/50" },
                      { season: "🍂 Autumn", months: "Sept–Oct", temp: "15–22°C", highlight: "IDEAL TRAVEL TIME! Pleasant temperatures, golden landscapes, Pomegranate & Apple Festivals, fewer crowds.", color: "border-orange-200 bg-orange-50/50" },
                      { season: "❄️ Winter", months: "Nov–March", temp: "5–10°C", highlight: "Cool, occasional rain. Budget-friendly, quiet streets, cozy cafes. Off-season but still charming.", color: "border-blue-200 bg-blue-50/50" },
                    ].map((s) => (
                      <div key={s.season} className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 ${s.color}`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-2">
                          <h5 className="text-base md:text-lg font-black text-slate-900">{s.season}</h5>
                          <div className="flex items-center gap-2 md:gap-4">
                            <span className="text-xs md:text-sm font-black text-slate-600">{s.months}</span>
                            <span className="text-xs md:text-sm font-bold text-slate-500">{s.temp}</span>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">{s.highlight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl md:rounded-3xl text-white">
                    <h5 className="text-base md:text-lg font-black mb-2">🎯 Best Months to Visit</h5>
                    <p className="text-sm md:text-base font-medium">April, May, June, September, October — Comfortable weather, vibrant festivals, perfect for photography</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "language" && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Language Guide</h3>
                  
                  <div className="bg-purple-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-purple-100">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 md:items-center">
                      <div>
                        <h4 className="text-lg md:text-xl font-black text-purple-900 mb-2">Official Language</h4>
                        <p className="text-base md:text-lg font-black text-slate-900 mb-1 italic">Azerbaijani (Azəri)</p>
                        <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Latin script since 1991. Highly related to Turkish.</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-purple-700 border border-purple-200">Latin script</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-purple-700 border border-purple-200">Since 1991</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-purple-700 border border-purple-200">Similar to Turkish</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 md:p-5 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight">Common Languages</h4>
                      <ul className="space-y-2 md:space-y-3">
                        <LanguageItem label="Russian" desc="Widely understood in cities" />
                        <LanguageItem label="English" desc="Growing in tourism sector" />
                        <LanguageItem label="Turkish" desc="Linguistically very similar" />
                      </ul>
                    </div>
                    <div className="bg-white p-4 md:p-5 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight">Essential Phrases</h4>
                      <div className="grid grid-cols-2 gap-y-3 md:gap-y-4">
                        <PhraseItem label="Hello" phrase="Salam" />
                        <PhraseItem label="Thank you" phrase="Təşəkkür edirəm" />
                        <PhraseItem label="Goodbye" phrase="Sağ olun" />
                        <PhraseItem label="Yes/No" phrase="Hə/Yox" />
                        <PhraseItem label="Please" phrase="Xahiş edirəm" />
                        <PhraseItem label="Excuse me" phrase="Bağışlayın" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-4 md:p-5 rounded-[2.5rem] border border-blue-100">
                    <div className="grid md:grid-cols-[auto_1fr] gap-3 md:gap-4 md:items-center">
                      <h4 className="text-base md:text-lg font-black text-blue-900">💡 Helpful Tip</h4>
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">While many people in Baku speak English, learning a few basic Azerbaijani phrases will be greatly appreciated by locals and can enhance your travel experience, especially outside the capital city.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "currency" && (
                <motion.div
                  key="currency"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Currency & Money</h3>
                  
                  <div className="bg-emerald-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-emerald-100">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Wallet className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-emerald-900">Official Currency</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 md:items-center">
                      <div>
                        <p className="text-xl md:text-2xl font-black text-slate-900">Azerbaijani Manat (AZN)</p>
                        <p className="text-base md:text-lg font-black text-brand-green">₼1 = 100 Qəpik</p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-700 border border-emerald-200">Symbol: ₼</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-700 border border-emerald-200">Code: AZN</span>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-700 border border-emerald-200">Subunit: Qəpik</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Denominations</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notes</p>
                          <p className="text-sm font-black text-slate-900 italic">₼1, 5, 10, 20, 50, 100, 200</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coins</p>
                          <p className="text-sm font-black text-slate-900 italic">1, 3, 5, 10, 20, 50 qəpik</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-2 italic">100 qəpik = ₼1</p>
                    </div>
                    <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Exchange Rates</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <ExchangeItem label="1 USD" value="≈₼1.70" color="blue" />
                        <ExchangeItem label="1 EUR" value="≈₼1.85" color="emerald" />
                        <ExchangeItem label="₼1" value="≈₹50" color="purple" />
                      </div>
                    </div>
                  </div>



                  <div className="bg-slate-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-200">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight">Payment Methods</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">ATM</span>
                            </div>
                            <h5 className="font-black text-blue-900 text-sm">ATMs</h5>
                          </div>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">24/7</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mb-3">Widely available. Most accept Visa/Mastercard.</p>
                        <div className="space-y-1.5 text-[10px]">
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Limit/transaction:</span><span className="font-bold text-slate-700">₼500-1000</span></p>
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Fee:</span><span className="font-bold text-slate-700">Check your bank</span></p>
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Best for:</span><span className="font-bold text-slate-700">Cash needs</span></p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">💳</span>
                            </div>
                            <h5 className="font-black text-purple-900 text-sm">Cards</h5>
                          </div>
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">V/MC</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mb-3">Visa/MC widely accepted in cities.</p>
                        <div className="space-y-1.5 text-[10px]">
                          <p className="flex justify-between border-t border-purple-100 pt-1.5"><span className="text-slate-500">Accepted:</span><span className="font-bold text-slate-700">Hotels, restaurants</span></p>
                          <p className="flex justify-between border-t border-purple-100 pt-1.5"><span className="text-slate-500">Cash needed:</span><span className="font-bold text-slate-700">Markets, taxis</span></p>
                          <p className="flex justify-between border-t border-purple-100 pt-1.5"><span className="text-slate-500">Notify:</span><span className="font-bold text-slate-700">Bank before trip</span></p>
                        </div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">💱</span>
                            </div>
                            <h5 className="font-black text-amber-900 text-sm">Exchange</h5>
                          </div>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">Airport</span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium mb-3">Available at airport and banks.</p>
                        <div className="space-y-1.5 text-[10px]">
                          <p className="flex justify-between border-t border-amber-100 pt-1.5"><span className="text-slate-500">Best rates:</span><span className="font-bold text-slate-700">Banks, offices</span></p>
                          <p className="flex justify-between border-t border-amber-100 pt-1.5"><span className="text-slate-500">Avoid:</span><span className="font-bold text-slate-700">Hotels</span></p>
                          <p className="flex justify-between border-t border-amber-100 pt-1.5"><span className="text-slate-500">Bring:</span><span className="font-bold text-slate-700">USD or EUR</span></p>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="bg-yellow-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-yellow-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-yellow-900">Money Tips</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                      <TipItem text="ATMs widely available in Baku; withdraw manat for better rates" />
                      <TipItem text="Credit cards accepted in hotels, restaurants, malls; carry cash for markets" />
                      <TipItem text="Bargaining common in bazaars (Teze Bazaar, Yasamal) but not restaurants" />
                      <TipItem text="Typical daily budget: ₹3,500–5,000 (budget) / ₹7,000–12,000 (luxury)" />
                      <TipItem text="Notify your bank before traveling to avoid card blocks" />
                      <TipItem text="Tipping 10–15% appreciated at restaurants but not mandatory" />
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-200">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight">Travel Essentials</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-base">🔌</span>
                          </div>
                          <h5 className="font-black text-blue-900 text-sm">Electricity</h5>
                        </div>
                        <div className="space-y-1.5 text-xs md:text-sm">
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Voltage:</span><span className="font-bold text-slate-700">230V, 50Hz</span></p>
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Plug Type:</span><span className="font-bold text-slate-700">European 2-pin (C/F)</span></p>
                          <p className="flex justify-between border-t border-blue-100 pt-1.5"><span className="text-slate-500">Adapter:</span><span className="font-bold text-slate-700">Required from India</span></p>
                        </div>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center">
                            <span className="text-white text-base">🚨</span>
                          </div>
                          <h5 className="font-black text-rose-900 text-sm">Emergency</h5>
                        </div>
                        <div className="space-y-1.5 text-xs md:text-sm">
                          <p className="flex justify-between border-t border-rose-100 pt-1.5"><span className="text-slate-500">Police:</span><span className="font-bold text-slate-700">102</span></p>
                          <p className="flex justify-between border-t border-rose-100 pt-1.5"><span className="text-slate-500">Ambulance:</span><span className="font-bold text-slate-700">103</span></p>
                          <p className="flex justify-between border-t border-rose-100 pt-1.5"><span className="text-slate-500">Fire:</span><span className="font-bold text-slate-700">101</span></p>
                        </div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <span className="text-white text-base">📱</span>
                          </div>
                          <h5 className="font-black text-emerald-900 text-sm">Mobile & SIM</h5>
                        </div>
                        <div className="space-y-1.5 text-xs md:text-sm">
                          <p className="flex justify-between border-t border-emerald-100 pt-1.5"><span className="text-slate-500">Networks:</span><span className="font-bold text-slate-700">Azercell, Bakcell</span></p>
                          <p className="flex justify-between border-t border-emerald-100 pt-1.5"><span className="text-slate-500">SIM Cost:</span><span className="font-bold text-slate-700">₼10-20 (~₹500)</span></p>
                          <p className="flex justify-between border-t border-emerald-100 pt-1.5"><span className="text-slate-500">Coverage:</span><span className="font-bold text-slate-700">Good 4G nationwide</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "transport" && (
                <motion.div
                  key="transport"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Transportation</h3>
                  
                  <div className="bg-blue-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-blue-100">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white border border-blue-100 flex items-center justify-center">
                        <Train className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      </div>
                      <h4 className="text-lg md:text-2xl font-black text-slate-900">Getting Around</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                        Diverse options for getting around, especially in and around Baku. Public transport is affordable and ride-sharing apps are widely available.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-xl border border-blue-100">
                          <span className="text-xs md:text-sm font-bold text-slate-900">✈️ Airport to City</span>
                          <span className="text-xs md:text-sm text-blue-600 font-black">₼1.30 / ₼15-25</span>
                        </div>
                        <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-xl border border-blue-100">
                          <span className="text-xs md:text-sm font-bold text-slate-900">🚇 Metro Ride</span>
                          <span className="text-xs md:text-sm text-blue-600 font-black">₼0.30</span>
                        </div>
                        <div className="flex items-center justify-between bg-white p-2 md:p-3 rounded-xl border border-blue-100">
                          <span className="text-xs md:text-sm font-bold text-slate-900">🚕 Taxi (Short)</span>
                          <span className="text-xs md:text-sm text-blue-600 font-black">₼3-10</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight">Transport Options</h4>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <h5 className="text-sm md:text-base font-black text-slate-700 mb-3 uppercase tracking-wide">Within Baku</h5>
                        <div className="space-y-3">
                          <TransportItem icon={Train} label="Metro" desc="Affordable & fast" extra="₼0.30/ride" color="orange" />
                          <TransportItem icon={Bus} label="Buses" desc="Extensive network" extra="Use BakıKart" color="blue" />
                          <TransportItem icon={Smartphone} label="Apps" desc="Bolt & Uber" extra="Most convenient" color="yellow" />
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm md:text-base font-black text-slate-700 mb-3 uppercase tracking-wide">Inter-City</h5>
                        <div className="space-y-3">
                          <TransportItem icon={Train} label="Trains" desc="To Ganja & Sheki" extra="Modern, fast" color="emerald" />
                          <TransportItem icon={Bus} label="Minibuses" desc="Local Marshrutkas" extra="Budget option" color="amber" />
                          <TransportItem icon={Car} label="Car Rental" desc="Int'l license needed" extra="From ₼50/day" color="purple" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-[2.5rem] border border-blue-100">
                      <h4 className="font-black text-blue-900 tracking-tight mb-2">Heydar Aliyev Airport (GYD)</h4>
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-3">Modern international airport located 20km from Baku city center.</p>
                      <ul className="space-y-2 text-xs md:text-sm">
                        <li className="flex justify-between border-b border-blue-100/50 pb-1.5">
                          <span className="font-black text-slate-900">To City:</span>
                          <span className="text-slate-500">Airport bus (116) - ₼1.30, 1 hour</span>
                        </li>
                        <li className="flex justify-between border-b border-blue-100/50 pb-1.5">
                          <span className="font-black text-slate-900">Taxi:</span>
                          <span className="text-slate-500">Official taxi ~₼20-25, 30 min</span>
                        </li>
                        <li className="flex justify-between border-b border-blue-100/50 pb-1.5">
                          <span className="font-black text-slate-900">Bolt/Uber:</span>
                          <span className="text-slate-500">~₼15-20, 30 min</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50/50 p-4 md:p-6 rounded-[2.5rem] border border-emerald-100">
                      <h4 className="font-black text-emerald-900 tracking-tight mb-2">BakıKart</h4>
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-3">Smart card for public transport (metro and buses).</p>
                      <ul className="space-y-2 text-xs md:text-sm">
                        <li className="flex justify-between border-b border-emerald-100/50 pb-1.5">
                          <span className="font-black text-slate-900">Where to buy:</span>
                          <span className="text-slate-500">Metro stations, kiosks</span>
                        </li>
                        <li className="flex justify-between border-b border-emerald-100/50 pb-1.5">
                          <span className="font-black text-slate-900">Cost:</span>
                          <span className="text-slate-500">₼2 card + credit amount</span>
                        </li>
                        <li className="flex justify-between border-b border-emerald-100/50 pb-1.5">
                          <span className="font-black text-slate-900">Refillable:</span>
                          <span className="text-slate-500">At metro stations and kiosks</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-rose-50/50 p-10 rounded-[2.5rem] border border-rose-100 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="flex items-center gap-4 min-w-max">
                       <Car className="w-8 h-8 text-rose-500" />
                       <h4 className="text-xl font-black text-rose-900 tracking-tight">Driving Tips</h4>
                    </div>
                    <div className="grid md:grid-cols-2 flex-grow gap-x-12 gap-y-2">
                      <p className="text-base text-slate-700 font-medium leading-relaxed flex items-center gap-2">
                        <span className="text-rose-500">•</span> Drive on the right side of the road
                      </p>
                      <p className="text-base text-slate-700 font-medium leading-relaxed flex items-center gap-2">
                        <span className="text-rose-500">•</span> Speed limits: 60 km/h city, 90 km/h highway
                      </p>
                      <p className="text-base text-slate-700 font-medium leading-relaxed flex items-center gap-2">
                        <span className="text-rose-500">•</span> International driving license recommended
                      </p>
                      <p className="text-base text-slate-700 font-medium leading-relaxed flex items-center gap-2">
                        <span className="text-rose-500">•</span> Traffic can be chaotic in Baku
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "visa" && (
                <motion.div
                  key="visa"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Visa & Entry Requirements</h3>
                  
                  <div className="bg-rose-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-rose-100 relative">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-rose-500">
                        <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-rose-900">E-Visa System</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 md:items-center">
                      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Most convenient option for Indian citizens. Apply online, typically approved within 3 business days. Cost: USD 15-20.</p>
                      <div className="flex flex-col gap-2">
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Portal: <span className="p-1 px-2 bg-slate-100 rounded-lg text-slate-700 font-mono">evisa.gov.az</span></p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-rose-700 border border-rose-200">3 days approval</span>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-rose-700 border border-rose-200">30 days valid</span>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-rose-700 border border-rose-200">USD 15-20</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 md:p-5 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight">Visa Types (For Indians)</h4>
                      <div className="space-y-3 md:space-y-4">
                        <VisaItem type="E-Visa (Recommended)" validity="USD 15-20, 30 days, 3 working days" />
                        <VisaItem type="Visa on Arrival" validity="USD 35-40, 30 days, at GYD Airport" />
                      </div>
                    </div>
                    <div className="bg-white p-4 md:p-5 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 tracking-tight">Required Documents</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x-4">
                        {["Valid passport (6 months)", "Passport photo (4x6 cm)", "Completed online form", "Email address", "Return flight ticket", "Hotel booking confirmation"].map(doc => (
                          <li key={doc} className="flex items-center gap-2 text-sm md:text-base text-slate-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" /> {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-200">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight">Visa-Free Entry & Important Notes</h4>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                        <h5 className="font-black text-emerald-900 text-sm mb-2">Visa-Free Countries (90 days)</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {["Turkey", "Russia", "Ukraine", "Belarus", "Georgia", "Kazakhstan", "Kyrgyzstan", "Moldova", "Tajikistan", "Uzbekistan"].map(c => (
                            <span key={c} className="px-2 py-1 bg-white rounded-lg border border-emerald-100 text-[10px] md:text-xs font-bold text-slate-600">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <h5 className="font-black text-blue-900 text-sm mb-2">Important Notes</h5>
                        <ul className="space-y-1.5 text-xs md:text-sm">
                          <NoteItem text="Print your E-Visa for border control" />
                          <NoteItem text="Registration required if staying >15 days" />
                          <NoteItem text="Check current policies before departure" />
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "culture" && (
                <motion.div
                  key="culture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Culture & Customs</h3>

                  <div className="bg-rose-50/50 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-rose-100">
                    <h4 className="text-lg md:text-xl font-black text-rose-900 mb-3 md:mb-4 tracking-tight">Cultural Overview</h4>
                    <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">A blend of Eastern and Western influences, shaped by its position at the crossroads of civilizations. Predominantly Muslim but secular.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 md:p-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Social Etiquette</h4>
                      <div className="space-y-4 md:space-y-6">
                         <CultureEtiquette icon="🤝" label="Greetings" desc="Handshakes are common. Remove shoes when entering homes." />
                         <CultureEtiquette icon="🎁" label="Hospitality" desc="Azerbaijanis are extremely hospitable. Accept tea when offered." />
                         <CultureEtiquette icon="👗" label="Dress Code" desc="Modest in religious sites. Casual elsewhere in Baku." />
                         <CultureEtiquette icon="🍞" label="Bread Respect" desc="Bread (lavash) is sacred—never waste or place upside down." />
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Important Customs</h4>
                      <div className="space-y-4 md:space-y-6">
                        <CultureEtiquette icon="📸" label="Photography" desc="Ask before photographing people, especially women and in conservative areas." />
                        <CultureEtiquette icon="🙏" label="Respect Elders" desc="Show respect to elderly—offer your seat, greet politely." />
                        <CultureEtiquette icon="🚫" label="Avoid Politics" desc="Don't discuss Armenia or Nagorno-Karabakh conflict—extremely sensitive topic." />
                        <CultureEtiquette icon="👣" label="Foot Etiquette" desc="Don't point feet at people while seated—considered disrespectful." />
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Do's and Don'ts Section */}
                  <div className="bg-gradient-to-br from-emerald-50/50 to-rose-50/50 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-slate-200">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight text-center">Essential Do's and Don'ts</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-4 md:p-6">
                      {/* DO'S */}
                      <div className="bg-white p-6 md:p-4 md:p-6 rounded-2xl md:rounded-3xl border border-emerald-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h5 className="text-base md:text-lg font-black text-emerald-900 uppercase tracking-tight">DO's</h5>
                        </div>
                        <ul className="space-y-3 md:space-y-4">
                          <DoItem text="Carry your passport at all times—police may check ID" />
                          <DoItem text="Take off shoes when entering homes and some guesthouses" />
                          <DoItem text="Accept tea and food graciously—hospitality is deeply valued" />
                          <DoItem text="Dress modestly outside Baku, especially in villages" />
                          <DoItem text="Women: cover shoulders, knees; carry scarf for mosques" />
                          <DoItem text="Respect women and elders—offer your seat in transport" />
                          <DoItem text="Ask before photographing people" />
                          <DoItem text="Learn basic Azerbaijani phrases—locals appreciate it" />
                          <DoItem text="Use metered taxis or ride apps (Bolt, Uber)" />
                          <DoItem text="Cross roads carefully—pedestrian crossings not always respected" />
                          <DoItem text="Bring small gifts if invited to homes (sweets, chocolates)" />
                          <DoItem text="Tip 10–15% at restaurants (appreciated but not mandatory)" />
                        </ul>
                      </div>

                      {/* DON'TS */}
                      <div className="bg-white p-6 md:p-4 md:p-6 rounded-2xl md:rounded-3xl border border-rose-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-500 flex items-center justify-center">
                            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h5 className="text-base md:text-lg font-black text-rose-900 uppercase tracking-tight">DON'TS</h5>
                        </div>
                        <ul className="space-y-3 md:space-y-4">
                          <DontItem text="Don't litter—Azerbaijan is clean, locals take pride in it" />
                          <DontItem text="Don't be rude to women—gender respect is cultural norm" />
                          <DontItem text="Don't discuss Armenia or Nagorno-Karabakh conflict" />
                          <DontItem text="Don't wear shoes inside homes/guesthouses" />
                          <DontItem text="Don't photograph military installations or government buildings" />
                          <DontItem text="Don't wear 'I ❤️ Armenia' or display Armenian symbols" />
                          <DontItem text="Don't refuse hospitality aggressively—explain politely if needed" />
                          <DontItem text="Don't take taxis from airport arrivals without negotiating" />
                          <DontItem text="Don't drink excessively in public—culturally frowned upon" />
                          <DontItem text="Don't point your feet at people when seated" />
                          <DontItem text="Don't assume everyone speaks English outside Baku" />
                          <DontItem text="Don't engage in loud political arguments in public" />
                          <DontItem text="Don't waste bread (lavash)—it's sacred in culture" />
                          <DontItem text="Don't enter mosques during prayer times unless Muslim" />
                          <DontItem text="Don't overstay visa—can lead to fines and entry bans" />
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <CultureFeature icon={<Smartphone className="w-5 h-5 md:w-8 md:h-8" />} title="Music & Dance" desc="UNESCO-listed Mugham music." color="purple" />
                    <CultureFeature icon="🎨" title="Carpets" desc="Ancient carpet-weaving tradition." color="blue" />
                    <CultureFeature icon="🕌" title="Religion" desc="Predominantly Muslim, very tolerant." color="emerald" />
                  </div>

                  <div className="bg-yellow-50/50 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border border-yellow-100">
                    <h4 className="text-lg md:text-xl font-black text-yellow-900 mb-3 md:mb-4 tracking-tight">Novruz Bayram</h4>
                    <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed">The most important holiday, celebrated on March 20-21. Experience Azerbaijan's culture at its most vibrant!</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "food" && (
                <motion.div
                  key="food"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Food & Cuisine</h3>

                  <div className="bg-amber-50/50 p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-amber-100">
                     <div className="flex items-center gap-4 mb-3">
                        <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                        <h4 className="text-lg md:text-xl font-black text-amber-900">Local Cuisine</h4>
                     </div>
                     <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">A rich blend of Turkish, Persian, and Russian influences. Lamb, rice, and fresh herbs are staples.</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 border border-amber-200">Grilled Meats</span>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 border border-amber-200">Saffron Rice</span>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 border border-amber-200">Fresh Herbs</span>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-amber-700 border border-amber-200">Pomegranates</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    <FoodItem name="Plov" desc="National saffron rice with lamb." icon="🍲" />
                    <FoodItem name="Dolma" desc="Stuffed grape leaves." icon="🫔" />
                    <FoodItem name="Kebab" desc="Grilled succulent meats." icon="🍢" />
                    <FoodItem name="Piti" desc="Lamb and chickpea stew." icon="🥘" />
                    <FoodItem name="Qutab" desc="Crispy filled flatbread." icon="🥟" />
                    <FoodItem name="Lavangi" desc="Fish stuffed with walnuts." icon="🐟" />
                    <FoodItem name="Dovga" desc="Creamy yogurt herb soup." icon="🍵" />
                    <FoodItem name="Shekerbura" desc="Sweet nut-filled pastry." icon="🥐" />
                    <FoodItem name="Pakhlava" desc="Sweet layered baklava." icon="🍰" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                     <div className="bg-emerald-50/50 p-6 md:p-4 md:p-6 rounded-[2.5rem] border border-emerald-100 space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-2xl text-emerald-500">🍵</span>
                           <h4 className="text-xl font-black text-emerald-900 tracking-tight">Tea Culture</h4>
                        </div>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">Tea (çay) is deeply embedded in Azerbaijani culture and is served in pear-shaped glasses called "armudu." It's traditionally served strong and black, accompanied by jam, sugar cubes, or sweets.</p>
                        <p className="text-[10px] text-emerald-600 font-black italic bg-white/50 p-3 rounded-xl border border-emerald-100">Tea houses (çayxana) are social hubs where locals gather to drink tea, play backgammon, and socialize. A visit to a traditional tea house is essential!</p>
                     </div>
                     <div className="bg-rose-50/50 p-6 md:p-4 md:p-6 rounded-[2.5rem] border border-rose-100 space-y-3">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-2xl text-rose-500">🍽️</span>
                           <h4 className="text-xl font-black text-rose-900 tracking-tight">Dining Etiquette</h4>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Meals are social events; take your time, enjoy conversations",
                            "Bread (lavash) is sacred—never waste or place upside down",
                            "Guests receive the best portions; graciously accept",
                            "Tipping: 10–15% appreciated but not mandatory",
                            "Most restaurants open 12 PM–11 PM; some close between lunch/dinner"
                          ].map(rule => (
                            <li key={rule} className="flex gap-2 text-base text-slate-700 font-medium">
                              <span className="text-rose-500">•</span> {rule}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-white p-6 md:p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 tracking-tight">Popular Beverages</h4>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <BeverageItem name="Black Tea (Çay)" desc="National drink" icon="☕" />
                        <BeverageItem name="Ayran" desc="Yogurt drink" icon="🧃" />
                        <BeverageItem name="Pomegranate Juice" desc="Fresh & tangy" icon="🧃" />
                        <BeverageItem name="Sherbet" desc="Sweet rose drink" icon="🍹" />
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 md:p-4 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                         <span className="text-xl md:text-2xl">🍽️</span>
                         <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Where to Eat</h4>
                      </div>
                      <div className="space-y-3">
                          <div>
                            <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1">Restaurants</h5>
                            <p className="text-xs md:text-sm text-slate-600 font-medium">Modern/Traditional. ₼15-40.</p>
                         </div>
                         <div>
                            <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1">Cafes</h5>
                            <p className="text-xs md:text-sm text-slate-600 font-medium">Perfect for tea. Budget-friendly.</p>
                         </div>
                         <div>
                            <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1">Street Food</h5>
                            <p className="text-xs md:text-sm text-slate-600 font-medium">Qutab & snacks. Safe & local.</p>
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

// Helper Components for Cleaner Tabs
const HistoryCard = ({ title, content, color }) => {
  const colors = {
    amber: "bg-amber-50/50 border-amber-100 text-amber-900 accent-amber-500",
    rose: "bg-rose-50/50 border-rose-100 text-rose-900 accent-rose-500",
    blue: "bg-blue-50/50 border-blue-100 text-blue-900 accent-blue-500",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-900 accent-emerald-500",
  };
  
  const activeColor = colors[color] || colors.blue;
  const accentColor = activeColor.split(" ").pop().replace("accent-", "bg-");

  return (
    <div className={cn("p-5 md:p-4 md:p-6 rounded-2xl md:rounded-3xl border flex flex-col gap-2 md:gap-4 relative overflow-hidden", activeColor.split(" ").slice(0, 2).join(" "))}>
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", accentColor)} />
      <h4 className={cn("text-lg md:text-xl font-black", activeColor.split(" ")[2])}>| {title}</h4>
      <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{content}</p>
    </div>
  );
};

const LanguageItem = ({ label, desc }) => (
  <li className="flex items-start gap-3">
    <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
    <p className="text-sm md:text-base text-slate-600 font-medium">
      <span className="font-black text-slate-900">{label}</span> - {desc}
    </p>
  </li>
);

const PhraseItem = ({ label, phrase }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
    <p className="text-base md:text-lg font-black text-slate-900">{phrase}</p>
  </div>
);

const ExchangeItem = ({ label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
  };
  return (
    <div className={cn("p-3 rounded-2xl border text-center", colors[color])}>
      <p className="text-[10px] font-bold uppercase tracking-tighter mb-1 opacity-70">{label}</p>
      <p className="text-sm font-black">{value}</p>
    </div>
  );
};

const TransportItem = ({ icon: Icon, label, desc, extra, color }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="flex gap-3 md:gap-4 items-center justify-between">
      <div className="flex gap-3 items-center flex-1 min-w-0">
        <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0", colors[color])}>
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="font-black text-slate-900 text-xs md:text-sm">{label}</h5>
          <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-tight truncate">{desc}</p>
        </div>
      </div>
      {extra && (
        <span className="text-[10px] md:text-xs font-black text-slate-600 bg-slate-50 px-2 py-1 rounded-lg shrink-0 border border-slate-100">
          {extra}
        </span>
      )}
    </div>
  );
};

const VisaItem = ({ type, validity }) => (
  <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <p className="font-black text-slate-900 text-xs md:text-sm">{type}</p>
    <p className="text-[11px] md:text-xs text-slate-500 font-medium mt-1 italic">{validity}</p>
  </div>
);

const CultureEtiquette = ({ icon, label, desc }) => (
  <div className="flex gap-3 md:gap-4 items-start">
    <span className="text-xl md:text-2xl shrink-0">{icon}</span>
    <div>
      <h5 className="font-black text-slate-900 text-[11px] md:text-sm">{label}</h5>
      <p className="text-[10px] md:text-sm text-slate-500 font-medium leading-tight md:leading-relaxed">{desc}</p>
    </div>
  </div>
);

const CultureFeature = ({ icon, title, desc, color }) => {
  const colors = {
    purple: "bg-purple-50/50 border-purple-100 text-purple-600",
    blue: "bg-blue-50/50 border-blue-100 text-blue-600",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-600",
  };
  return (
    <div className={cn("p-4 md:p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] border space-y-2 md:space-y-3", colors[color])}>
      <span className="text-xl md:text-2xl">{icon}</span>
      <h5 className="font-black text-slate-900 text-xs md:text-base">{title}</h5>
      <p className="text-[10px] md:text-sm text-slate-600 font-medium leading-tight md:leading-relaxed">{desc}</p>
    </div>
  );
};

const FoodItem = ({ name, desc, icon }) => (
  <div className="p-4 md:p-4 md:p-6 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] shadow-sm text-center group hover:shadow-md transition-all duration-300">
    <span className="text-2xl md:text-4xl block mb-2 md:mb-4 group-hover:scale-110 transition-transform">{icon}</span>
    <h5 className="font-black text-slate-900 text-[10px] md:text-sm mb-1 uppercase tracking-tighter">{name}</h5>
    <p className="text-[9px] md:text-xs text-slate-500 font-medium leading-tight md:leading-relaxed">{desc}</p>
  </div>
);

const TipItem = ({ text }) => (
  <li className="flex gap-2">
    <span className="text-yellow-600 font-bold">•</span>
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight">{text}</p>
  </li>
);

const NoteItem = ({ text }) => (
  <li className="flex gap-2">
    <span className="text-blue-500 font-bold">•</span>
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight">{text}</p>
  </li>
);

const BeverageItem = ({ name, desc, icon }) => (
  <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
    <span className="text-xl md:text-2xl">{icon}</span>
    <h5 className="font-black text-slate-900 text-[10px] md:text-xs uppercase tracking-tighter">{name}</h5>
    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{desc}</p>
  </div>
);

// Do's and Don'ts Helper Components
const DoItem = ({ text }) => (
  <li className="flex gap-2 md:gap-3 items-start">
    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight md:leading-relaxed">{text}</p>
  </li>
);

const DontItem = ({ text }) => (
  <li className="flex gap-2 md:gap-3 items-start">
    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-rose-500 flex-shrink-0 mt-0.5" />
    <p className="text-xs md:text-sm text-slate-700 font-medium leading-tight md:leading-relaxed">{text}</p>
  </li>
);

export default RegionTravelEssentials;
