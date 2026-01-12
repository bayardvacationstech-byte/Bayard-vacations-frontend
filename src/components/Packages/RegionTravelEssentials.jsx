"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  XCircle,
  Languages,
  FileText,
  MessageCircle,
  Banknote,
  Plane
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
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                <span className="hidden sm:inline">Things to Know in </span>
                <span className="inline sm:hidden">Tips for </span>
                <span className="text-brand-green capitalize">{regionName}</span>
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl truncate md:whitespace-normal">
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
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-2 mb-12 pb-2 -mb-2">
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
                  
                  <div className="space-y-12 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                      {/* Time Zone Left Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Clock className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Time Zone</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Standard Time</p>
                            <p className="text-3xl font-black text-slate-900">UTC+4 <span className="text-base text-slate-400 font-bold ml-1">(AZT)</span></p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Time Difference</p>
                            <p className="text-lg font-black text-slate-700">30 minutes behind IST</p>
                            <p className="text-sm text-slate-500 font-medium italic">India 12:00 PM → Azerbaijan 11:30 AM</p>
                          </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-900/5">
                          <p className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">🎯 Best Months to Visit</p>
                          <p className="text-3xl font-black text-slate-900 leading-tight">
                            April, May, June, September & October
                          </p>
                          <p className="text-base text-slate-500 font-medium mt-2 leading-relaxed">Comfortable temperatures and vibrant scenery across all 9 climate zones.</p>
                        </div>
                      </div>

                      {/* Climate Right Column */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Sun className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Climate & Seasons</h4>
                        </div>
                        <div className="space-y-6">
                          <p className="text-base text-slate-700 font-medium leading-relaxed">
                            Azerbaijan features nine of the world's eleven climate zones, ranging from <span className="text-slate-900 font-black underline decoration-brand-green/30">subtropical</span> at the coast to <span className="text-slate-900 font-black underline decoration-brand-green/30">continental</span> in the Caucasus mountains.
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mt-4">
                            {[
                              { season: "Spring", emoji: "🌸", months: "Apr – Jun", temp: "15–25°C", highlight: "BEST SEASON for sightseeing. Mild weather and blooming landscape." },
                              { season: "Summer", emoji: "☀️", months: "Jul – Aug", temp: "25–32°C", highlight: "Warm sea breezes. Ideal for Caspian beaches and outdoor festivals." },
                              { season: "Autumn", emoji: "🍂", months: "Sep – Oct", temp: "15–22°C", highlight: "IDEAL TRAVEL TIME. Golden landscapes and pleasant harvest festivals." },
                              { season: "Winter", emoji: "❄️", months: "Nov – Mar", temp: "5–10°C", highlight: "Cool and calm. Budget-friendly streets and cozy off-season charm." },
                            ].map((s) => (
                              <div key={s.season} className="space-y-2">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                  <h5 className="text-base font-black text-slate-900 flex items-center gap-2">
                                    <span className="text-lg">{s.emoji}</span> {s.season}
                                  </h5>
                                  <span className="text-sm font-black text-slate-900">{s.temp}</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{s.months}</p>
                                  <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{s.highlight}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "language" && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Language Guide</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Context */}
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Languages className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Official Language</h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-2xl font-black text-slate-900 italic">Azerbaijani (Azəri)</p>
                          <p className="text-base text-slate-600 font-medium leading-relaxed max-w-md">
                            Official state language written in Latin script since 1991. It is a Turkic language, making it highly related to Turkish.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {['Latin Script', 'Since 1991', 'Turkic Root'].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Globe className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Common Languages</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                           <LanguageItem label="Russian" desc="Widely understood in Baku and by older generations." />
                           <LanguageItem label="English" desc="Growing fast in tourism, hotels, and among the youth." />
                           <LanguageItem label="Turkish" desc="Linguistically very similar; Turkish media is popular." />
                        </div>
                      </div>

                      <div className="mt-8 p-6 bg-slate-50 border-l-4 border-brand-green/30 italic">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          <span className="font-black text-slate-900 not-italic mr-2">💡 Pro Tip:</span>
                          While many in Baku speak English, learning "Salam" (Hello) and "Sağ olun" (Thank you) is greatly appreciated by locals.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Phrases */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                        <MessageCircle className="w-5 h-5 text-slate-900" />
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Essential Phrases</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                        <PhraseItem label="Hello" phrase="Salam" />
                        <PhraseItem label="Thank you" phrase="Təşəkkür edirəm" />
                        <PhraseItem label="Goodbye" phrase="Sağ olun" />
                        <PhraseItem label="Yes / No" phrase="Hə / Yox" />
                        <PhraseItem label="Please" phrase="Xahiş edirəm" />
                        <PhraseItem label="Excuse me" phrase="Bağışlayın" />
                        <PhraseItem label="How much?" phrase="Nə qədərdir?" />
                        <PhraseItem label="Where is...?" phrase="...haradadır?" />
                      </div>
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
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Currency & Money</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Currency Info */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Wallet className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Official Currency</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Currency Name</p>
                            <p className="text-2xl font-black text-slate-900">Azerbaijani Manat <span className="text-base text-slate-400 font-bold ml-1">(AZN)</span></p>
                            <p className="text-xl font-black text-brand-green">₼1 = 100 Qəpik</p>
                          </div>
                          <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Exchange Rates</p>
                            <div className="space-y-3">
                              <ExchangeItem label="1 USD" value="≈₼1.70" color="slate" />
                              <ExchangeItem label="1 EUR" value="≈₼1.85" color="slate" />
                              <ExchangeItem label="₼1" value="≈₹50.00" color="emerald" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CreditCard className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Denominations</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banknotes (₼)</p>
                            <p className="text-sm font-black text-slate-700 leading-relaxed italic">1, 5, 10, 20, 50, 100, 200</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coins (qəpik)</p>
                            <p className="text-sm font-black text-slate-700 leading-relaxed italic">1, 3, 5, 10, 20, 50</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Payment Methods */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                        <Banknote className="w-5 h-5 text-slate-900" />
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Payment Methods</h4>
                      </div>
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6">
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">ATMs & Withdrawal</h5>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                               Widely available in Baku. Most ATMs accept international cards (Visa/Mastercard). Local banks charge minimal fees.
                             </p>
                           </div>
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Credit & Debit Cards</h5>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                               Accepted in almost all hotels, restaurants, and malls. However, <span className="text-slate-900 font-bold">cash is essential</span> for local bazaars, taxis, and smaller shops.
                             </p>
                           </div>
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tipping Culture</h5>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                               A 10% service charge is usually included. Additional small tips (₼2-5) for exceptional service or guides are appreciated.
                             </p>
                           </div>
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
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Transportation</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Airport & Local */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Plane className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Arrival: GYD Airport</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            Heydar Aliyev Int'l Airport (GYD) is your main gateway, located 20km from Baku city center.
                          </p>
                          <div className="grid grid-cols-1 gap-3">
                             <div className="flex justify-between items-center py-2 border-b border-slate-100">
                               <span className="text-sm font-black text-slate-900">Official Taxi</span>
                               <span className="text-sm font-black text-brand-green">₼20–25 (~30 min)</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-slate-100">
                               <span className="text-sm font-black text-slate-900">Bolt / Uber App</span>
                               <span className="text-sm font-black text-brand-green">₼15–20 (~30 min)</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-slate-100">
                               <span className="text-sm font-black text-slate-900">Airport Bus (H1)</span>
                               <span className="text-sm font-black text-brand-green">₼1.30 (60–80 min)</span>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Train className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Public Transport</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex items-center justify-between">
                              <h5 className="text-lg font-black text-slate-900">BakıKart</h5>
                              <span className="px-2 py-0.5 bg-brand-green text-white text-[10px] font-black rounded uppercase">Essential</span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                              One card for all Metro and Red Bus lines. Top-up at any metro station or kiosk.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Cost</p>
                                 <p className="text-sm font-black text-slate-900">₼2.00</p>
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Single Ride</p>
                                 <p className="text-sm font-black text-slate-900">₼0.30–0.40</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Apps & Intercity */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Smartphone className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Ride-Sharing Apps</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            Bolt and Uber (Azerbaijan version) are the most reliable and affordable ways to move around Baku.
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <span className="text-sm font-black text-slate-900 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">Low-cost city rides (₼3–10)</span>
                            <span className="text-sm font-black text-slate-900 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">English app interface</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Car className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Intercity Travel</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900">Fast Trains</h5>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Modern Stadler trains to Ganja, Sheki, and Qabala.</p>
                           </div>
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900">Minibusses (Marshrutka)</h5>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Affordable regional travel from Baku Int'l Bus Station.</p>
                           </div>
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900">Private Drivers</h5>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Best for customized tours and reaching remote villages.</p>
                           </div>
                           <div className="space-y-1">
                             <h5 className="text-sm font-black text-slate-900">Car Rental</h5>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">International license required. Driving is on the right.</p>
                           </div>
                        </div>
                      </div>
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
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Visa & Entry Requirements</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: E-Visa */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <ShieldCheck className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">ASAN E-Visa System</h4>
                        </div>
                        <div className="space-y-4">
                          <p className="text-base text-slate-700 font-medium leading-relaxed">
                            The official way for Indian citizens to obtain a visa. Apply through the official <span className="text-slate-900 font-black">ASAN VISA</span> portal.
                          </p>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Time</p>
                                 <p className="text-sm font-black text-slate-900">3 Business Days</p>
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visa Fee</p>
                                 <p className="text-sm font-black text-slate-900">USD $26.00</p>
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validity</p>
                                 <p className="text-sm font-black text-slate-900">30 Days (Single Entry)</p>
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passport Requirement</p>
                                 <p className="text-sm font-black text-slate-900">Valid for 6+ Months</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Entry & Registration */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CheckCircle2 className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Mandatory Registration</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                             <div className="min-w-max">
                               <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">!</span>
                             </div>
                             <div className="space-y-2">
                               <h5 className="text-lg font-black text-slate-900 italic leading-tight">Registration is mandatory for stays over 15 days.</h5>
                               <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                 Your hotel usually handles this automatically. For private stays, register with Migration Service within 15 days.
                               </p>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 pt-10 border-t border-slate-900/5">
                        <div className="flex items-center gap-2 mb-4">
                           <FileText className="w-4 h-4 text-slate-900" />
                           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival Checklist</h5>
                        </div>
                        <ul className="space-y-2">
                           {[
                             "E-Visa copy (digital/printed)",
                             "Passport (6+ months validity)",
                             "Hotel booking confirmation",
                             "Return flight ticket"
                           ].map(item => (
                             <li key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                               <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                               {item}
                             </li>
                           ))}
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
                  className="space-y-12 w-full"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Culture & Customs</h3>

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Overview & Etiquette */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Compass className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Social Etiquette</h4>
                        </div>
                        <div className="space-y-8">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            Azerbaijan is a blend of Eastern and Western influences. While progressive in Baku, traditional values remain strong in rural areas.
                          </p>
                          <div className="grid grid-cols-1 gap-6">
                             <CultureEtiquette label="Greetings" desc="Handshakes are common. In rural areas, men should wait for women to offer their hand first." />
                             <CultureEtiquette label="Hospitality" desc="Tea is the cornerstone of social life. Refusing it may be seen as impolite—at least take a few sips." />
                             <CultureEtiquette label="Dress Code" desc="Baku is modern. However, when visiting mosques or rural areas, modest clothing (covering shoulders and knees) is essential." />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <Heart className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Local Traditions</h4>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-8">
                           <div className="space-y-2">
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tea Culture</h5>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic">Served in pear-shaped "Armudu" glasses with jam.</p>
                           </div>
                           <div className="space-y-2">
                             <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Bread Respect</h5>
                             <p className="text-[13px] text-slate-600 font-medium leading-relaxed italic">Bread is sacred. Never place it upside down or throw it away.</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Do's and Don'ts */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <CheckCircle2 className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Essential Dos</h4>
                        </div>
                        <ul className="space-y-4">
                           <DoItem text="Remove shoes when entering a local home" />
                           <DoItem text="Ask for permission before photographing people" />
                           <DoItem text="Offer your seat to elders or women in public transport" />
                           <DoItem text="Negotiate prices at bazaars and with taxi drivers (non-app)" />
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-900/10 pb-2">
                          <XCircle className="w-5 h-5 text-slate-900" />
                          <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">Essential Don'ts</h4>
                        </div>
                        <ul className="space-y-4">
                           <DontItem text="Don't discuss politics or sensitive regional conflicts" />
                           <DontItem text="Don't be overly loud or affectionate in public" />
                           <DontItem text="Don't visit religious sites during prayer in shorts/skirts" />
                           <DontItem text="Don't point your feet at people while sitting" />
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-8 bg-yellow-50 border border-yellow-100 rounded-2xl">
                    <h4 className="text-lg font-black text-yellow-900 mb-2">💡 Cultural Note on Baku</h4>
                    <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                      Baku is one of the most secular and progressive capitals in the Turkic world. You will see a mix of high-fashion and traditional influences, reflecting its unique position at the "Paris of the East."
                    </p>
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
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Local Food Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                        <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Local Delicacies</h4>
                      </div>
                      <div className="grid grid-cols-2 c-md:grid-cols-3 gap-3 md:gap-4">
                        <FoodItem name="Plov" desc="National saffron rice." image="/img/food/plov.png" />
                        <FoodItem name="Dolma" desc="Stuffed grape leaves." image="/img/food/dolma.png" />
                        <FoodItem name="Kebab" desc="Grilled succulent meats." image="/img/food/kebab.png" />
                        <FoodItem name="Qutab" desc="Crispy filled flatbread." image="/img/food/qutab.png" />
                        <FoodItem name="Lavangi" desc="Fish stuffed with walnuts." image="/img/food/lavangi.png" />
                        <FoodItem name="Pakhlava" desc="Sweet layered baklava." image="/img/food/pakhlava.png" />
                      </div>
                    </div>

                    {/* Popular Beverages Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-xl md:text-2xl">☕</span>
                        <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Popular Beverages</h4>
                      </div>
                      <div className="grid grid-cols-2 c-md:grid-cols-3 gap-3 md:gap-4">
                        <FoodItem name="Black Tea (Çay)" desc="National drink" image="/img/food/tea.png" />
                        <FoodItem name="Ayran" desc="Yogurt drink" image="/img/food/ayran.png" />
                        <FoodItem name="Pomegranate Juice" desc="Fresh & tangy" image="/img/food/pomegranate_juice.png" />
                        <FoodItem name="Sherbet" desc="Sweet rose drink" image="/img/food/sherbet.png" />
                        <FoodItem name="Feijoa Compote" desc="Seasonal fruit drink" image="/img/food/feijoa.png" />
                        <FoodItem name="Mineral Water" desc="Badamli & Sirab" image="/img/food/mineral_water.png" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                     {/* Tea Culture */}
                     <div className="bg-emerald-50/50 p-6 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-emerald-100 space-y-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                             <span className="text-2xl text-emerald-500">🍵</span>
                             <h4 className="text-xl font-black text-emerald-900 tracking-tight">Tea Culture</h4>
                          </div>
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">Tea (çay) is deeply embedded in Azerbaijani culture. It's traditionally served strong and black in "armudu" glasses, accompanied by jam or sweets.</p>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-black italic bg-white/50 p-3 rounded-xl border border-emerald-100">Tea houses (çayxana) are social hubs where locals gather to socialize and play backgammon.</p>
                     </div>

                     {/* Dining Etiquette */}
                     <div className="bg-rose-50/50 p-6 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-rose-100 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="text-2xl text-rose-500">🍽️</span>
                           <h4 className="text-xl font-black text-rose-900 tracking-tight">Dining Etiquette</h4>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Meals are social events; take your time",
                            "Bread (lavash) is sacred—never waste it",
                            "Guests receive the best portions",
                            "Tipping: 10–15% is appreciated",
                            "Most restaurants open 12 PM–11 PM"
                          ].map(rule => (
                            <li key={rule} className="flex gap-2 text-sm text-slate-700 font-medium">
                              <span className="text-rose-500">•</span> {rule}
                            </li>
                          ))}
                        </ul>
                     </div>

                     {/* Where to Eat */}
                     <div className="bg-white p-6 md:p-6 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-6">
                             <span className="text-xl md:text-2xl">🍽️</span>
                             <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Where to Eat</h4>
                          </div>
                          <div className="space-y-4">
                              <div>
                                <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1 uppercase tracking-tighter">Restaurants</h5>
                                <p className="text-xs text-slate-600 font-medium">Modern/Traditional. ₼15-40.</p>
                              </div>
                              <div>
                                <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1 uppercase tracking-tighter">Cafes</h5>
                                <p className="text-xs text-slate-600 font-medium">Perfect for tea. Budget-friendly.</p>
                              </div>
                              <div>
                                <h5 className="font-black text-slate-900 text-xs md:text-sm mb-1 uppercase tracking-tighter">Street Food</h5>
                                <p className="text-xs text-slate-600 font-medium">Qutab & snacks. Safe & local.</p>
                              </div>
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

const FoodItem = ({ name, desc, image }) => (
  <div className="relative aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10">
    <Image 
      src={image} 
      alt={name} 
      fill 
      sizes="(max-width: 768px) 33vw, 20vw"
      className="object-cover group-hover:scale-110 transition-transform duration-700" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 transform transition-transform duration-300 group-hover:-translate-y-1">
      <h5 className="font-black text-white text-[11px] md:text-xs mb-0.5 uppercase tracking-tight leading-tight drop-shadow-md">
        {name}
      </h5>
      <p className="text-[10px] md:text-[11px] text-white/90 font-medium leading-tight line-clamp-2 drop-shadow-sm">
        {desc}
      </p>
    </div>
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
