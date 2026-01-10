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
  ChevronRight
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
    <section className="py-12 md:py-16 bg-slate-50 overflow-hidden">
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
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap">
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
                      ? "bg-brand-green text-white shadow-md" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-600")} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl md:shadow-2xl overflow-hidden border border-slate-100">

          <div className="p-4 sm:p-6 md:p-12 min-h-[400px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Historical Overview</h3>
                    <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                      Azerbaijan, known as the "Land of Fire," has a rich history spanning thousands of years. The region has been inhabited since the Stone Age and has been influenced by various empires including the Persian, Roman, Byzantine, Arab, and Ottoman empires.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <HistoryCard 
                      title="Ancient Times" 
                      content="Archaeological evidence suggests human settlement dating back to the Paleolithic era. The region was part of the ancient Albanian kingdom and later became a crossroads of the Silk Road."
                      color="amber"
                    />
                    <HistoryCard 
                      title="Soviet Era (1920-1991)" 
                      content="Azerbaijan became part of the Soviet Union in 1920. During this period, it underwent significant industrialization, particularly in oil production, making Baku a major industrial center."
                      color="rose"
                    />
                    <HistoryCard 
                      title="Independence (1991)" 
                      content="Azerbaijan regained independence following the dissolution of the Soviet Union on October 18, 1991. The country has since developed into a modern nation with a growing economy."
                      color="blue"
                    />
                    <HistoryCard 
                      title="Modern Era" 
                      content="Today, Azerbaijan is known for its oil and gas industry, modern architecture in Baku, and its unique position bridging Europe and Asia. The country hosted major events like Eurovision 2012 and the 2015 European Games."
                      color="emerald"
                    />
                  </div>
                  <p className="text-center text-[10px] md:text-xs text-slate-400 font-medium mt-8 md:mt-12 uppercase tracking-wider">Information is current as of 2024</p>
                </motion.div>
              )}

              {activeTab === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Time Zone & Climate</h3>
                  
                  <div className="bg-blue-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-blue-100">
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600 flex items-center justify-center">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-slate-900">Current Time Zone</h4>
                    </div>
                    <h5 className="text-2xl md:text-4xl font-black text-slate-900 mb-2">UTC+4 <span className="text-base md:text-lg text-slate-500 font-bold ml-1">(AZT)</span></h5>
                    <p className="text-sm md:text-base text-slate-600 font-medium italic">Azerbaijan does not observe Daylight Saving Time.</p>
                  </div>

                  <div className="bg-amber-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center">
                          <Sun className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-black text-slate-900">Climate</h4>
                      </div>
                      <div className="space-y-4">
                        <p className="font-bold text-slate-800 text-sm md:text-base">Climate Type</p>
                        <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Nine of the world's eleven climate zones are found here, ranging from subtropical to continental.</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                       <p className="font-bold text-slate-800 mb-2 md:mb-4 text-sm md:text-base">Best Time to Visit</p>
                       <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                        <span className="font-black text-slate-900 underline decoration-amber-500/30">Spring</span> and <span className="font-black text-slate-900 underline decoration-amber-500/30">Autumn</span> offer the most pleasant sightseeing conditions.
                       </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { season: "Spring", temp: "15-25°C", months: "March - May", icon: "🌸", color: "rose" },
                      { season: "Summer", temp: "25-35°C", months: "June - August", icon: "☀️", color: "amber" },
                      { season: "Autumn", temp: "15-25°C", months: "September - November", icon: "🍂", color: "orange" },
                      { season: "Winter", temp: "0-10°C", months: "December - February", icon: "❄️", color: "blue" },
                    ].map((s) => (
                      <div key={s.season} className="p-8 bg-white rounded-3xl border border-slate-100 text-center shadow-sm">
                        <span className="text-3xl block mb-4">{s.icon}</span>
                        <h5 className="font-black text-slate-900 mb-1">{s.season}</h5>
                        <p className="text-sm font-bold text-slate-400 mb-1">{s.temp}</p>
                        <p className="text-xs uppercase font-black text-slate-300">{s.months}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "language" && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Language Guide</h3>
                  
                  <div className="bg-purple-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-purple-100">
                    <h4 className="text-lg md:text-xl font-black text-purple-900 mb-2 md:mb-4">Official Language</h4>
                    <p className="text-base md:text-lg font-black text-slate-900 mb-1 md:mb-2 italic">Azerbaijani (Azari)</p>
                    <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Latin script since 1991. Highly related to Turkish.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Common Languages</h4>
                      <ul className="space-y-3 md:space-y-4">
                        <LanguageItem label="Russian" desc="Widely understood in cities" />
                        <LanguageItem label="English" desc="Growing in tourism sector" />
                        <LanguageItem label="Turkish" desc="Linguistically very similar" />
                      </ul>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Essential Phrases</h4>
                      <div className="grid grid-cols-2 gap-y-4 md:gap-y-6">
                        <PhraseItem label="Hello" phrase="Salam" />
                        <PhraseItem label="Thank you" phrase="Təşəkkür" />
                        <PhraseItem label="Goodbye" phrase="Sağ olun" />
                        <PhraseItem label="Yes/No" phrase="Bəli/Xeyr" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-10 rounded-[2.5rem] border border-blue-100">
                    <h4 className="text-lg font-black text-blue-900 mb-2">Helpful Tip</h4>
                    <p className="text-base text-slate-600 font-medium leading-relaxed">While many people in Baku speak English, learning a few basic Azerbaijani phrases will be greatly appreciated by locals and can enhance your travel experience, especially outside the capital city.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "currency" && (
                <motion.div
                  key="currency"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Currency & Money</h3>
                  
                  <div className="bg-emerald-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-emerald-100">
                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Wallet className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-emerald-900">Official Currency</h4>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
                      <p className="text-xl md:text-2xl font-black text-slate-900">Azerbaijani Manat (AZN)</p>
                      <p className="text-base md:text-lg font-black text-brand-green">₼1 = 100 Qəpik</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Denominations</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-2xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Notes</p>
                          <p className="text-sm font-black text-slate-900 italic">₼1 to ₼200</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-2xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Coins</p>
                          <p className="text-sm font-black text-slate-900 italic">1 to 50 qəpik</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Exchange Rates</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <ExchangeItem label="1 USD" value="≈1.70" color="blue" />
                        <ExchangeItem label="1 EUR" value="≈1.85" color="emerald" />
                        <ExchangeItem label="1 GBP" value="≈2.15" color="purple" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100">
                      <h5 className="font-black text-blue-900 mb-3 uppercase tracking-tighter">ATMs</h5>
                      <p className="text-base text-slate-600 font-medium leading-relaxed">Widely available in cities. Most accept international cards. Check with your bank about fees.</p>
                    </div>
                    <div className="bg-purple-50/50 p-8 rounded-[2rem] border border-purple-100">
                      <h5 className="font-black text-purple-900 mb-3 uppercase tracking-tighter">Credit Cards</h5>
                      <p className="text-base text-slate-600 font-medium leading-relaxed">Visa and Mastercard accepted in hotels, restaurants, and shops in major cities.</p>
                    </div>
                    <div className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-100">
                      <h5 className="font-black text-amber-900 mb-3 uppercase tracking-tighter">Exchange</h5>
                      <p className="text-base text-slate-600 font-medium leading-relaxed">Exchange offices available at airport and throughout cities. Banks offer competitive rates.</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-yellow-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-yellow-900">Money Tips</h4>
                    </div>
                    <ul className="space-y-2">
                      <TipItem text="Carry cash for rural areas & small vendors" />
                      <TipItem text="Notify your bank before traveling" />
                      <TipItem text="Tipping is appreciated (approx. 10%)" />
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "transport" && (
                <motion.div
                  key="transport"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Transportation</h3>
                  
                  <div className="bg-blue-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-blue-100 relative overflow-hidden group">
                    <Map className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 text-blue-600/10 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white border border-blue-100 flex items-center justify-center">
                          <Train className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg md:text-2xl font-black text-slate-900">Getting Around</h4>
                      </div>
                      <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                        Diverse options for getting around, especially in and around Baku.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Within Baku</h4>
                      <div className="space-y-4 md:space-y-6">
                        <TransportItem icon={Train} label="Metro" desc="Affordable & fast. 0.30 AZN per ride." color="orange" />
                        <TransportItem icon={Bus} label="Buses" desc="Extensive network. Use BakıKart." color="blue" />
                        <TransportItem icon={Smartphone} label="Apps" desc="Bolt & Uber are widely used." color="yellow" />
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Inter-City</h4>
                      <div className="space-y-4 md:space-y-6">
                        <TransportItem icon={Train} label="Trains" desc="Modern links to Ganja & Sheki." color="emerald" />
                        <TransportItem icon={Bus} label="Minibuses" desc="Affordable local Marshrutkas." color="amber" />
                        <TransportItem icon={Car} label="Car Rental" desc="International license required." color="purple" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-blue-50/50 p-10 rounded-[2.5rem] border border-blue-100 space-y-4">
                      <h4 className="font-black text-blue-900 tracking-tight">Heydar Aliyev Airport (GYD)</h4>
                      <p className="text-base text-slate-600 font-medium leading-relaxed italic">Modern international airport located 20km from Baku city center.</p>
                      <ul className="space-y-2 mt-4 text-sm">
                        <li className="flex justify-between border-b border-blue-100/50 pb-2">
                          <span className="font-black text-slate-900">To City:</span>
                          <span className="text-slate-500">Airport bus (116) - 1.30 AZN, 1 hour</span>
                        </li>
                        <li className="flex justify-between border-b border-blue-100/50 pb-2">
                          <span className="font-black text-slate-900">Taxi:</span>
                          <span className="text-slate-500">Official taxi ~20-25 AZN, 30 minutes</span>
                        </li>
                        <li className="flex justify-between border-b border-blue-100/50 pb-2">
                          <span className="font-black text-slate-900">Bolt/Uber:</span>
                          <span className="text-slate-500">~15-20 AZN, 30 minutes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100 space-y-4">
                      <h4 className="font-black text-emerald-900 tracking-tight">BakıKart</h4>
                      <p className="text-base text-slate-600 font-medium leading-relaxed italic">Smart card for public transport (metro and buses).</p>
                      <ul className="space-y-4 mt-4 text-sm">
                        <li className="flex justify-between border-b border-emerald-100/50 pb-2">
                          <span className="font-black text-slate-900">Where to buy:</span>
                          <span className="text-slate-500">Metro stations, kiosks</span>
                        </li>
                        <li className="flex justify-between border-b border-emerald-100/50 pb-2">
                          <span className="font-black text-slate-900">Cost:</span>
                          <span className="text-slate-500">2 AZN card + credit amount</span>
                        </li>
                        <li className="flex justify-between border-b border-emerald-100/50 pb-2">
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
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Visa & Entry Requirements</h3>
                  
                  <div className="bg-rose-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-rose-100 relative">
                    <div className="flex items-center gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-rose-100 flex items-center justify-center text-rose-500">
                        <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-rose-900">E-Visa System</h4>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed mb-4"> Citizens of most countries can apply online. Typically takes 3 business days.</p>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">Portal: <span className="p-1 px-2 bg-slate-100 rounded-lg text-slate-700 font-mono">evisa.gov.az</span></p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Visa Types</h4>
                      <div className="space-y-4 md:space-y-6">
                        <VisaItem type="Tourist" validity="30 days, single entry" />
                        <VisaItem type="Business" validity="Invitation letter required" />
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight">Required Documents</h4>
                      <ul className="grid grid-cols-1 gap-2 md:gap-3">
                        {["Valid passport (6mo)", "Passport photo", "Stay details", "Email address"].map(doc => (
                          <li key={doc} className="flex items-center gap-2 text-sm md:text-base text-slate-600 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" /> {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100">
                    <h4 className="text-xl font-black text-emerald-900 mb-4 tracking-tight">Visa-Free Countries</h4>
                    <p className="mb-6 text-sm text-slate-600 font-medium">Citizens of the following countries can enter Azerbaijan without a visa for up to 90 days:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Turkey", "Russia", "Ukraine", "Belarus", "Georgia", "Kazakhstan", "Kyrgyzstan", "Moldova", "Tajikistan", "Uzbekistan"].map(c => (
                        <span key={c} className="px-4 py-2 bg-white rounded-full border border-emerald-100 text-xs font-bold text-slate-600 shadow-sm">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-blue-100">
                    <h4 className="text-lg md:text-xl font-black text-blue-900 mb-4 tracking-tight">Important Notes</h4>
                    <ul className="space-y-2 md:space-y-3">
                      <NoteItem text="Print your E-Visa for border control" />
                      <NoteItem text="Registration required if staying >15 days" />
                      <NoteItem text="Check current policies before departure" />
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "culture" && (
                <motion.div
                  key="culture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Culture & Customs</h3>

                  <div className="bg-rose-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-rose-100">
                    <h4 className="text-lg md:text-xl font-black text-rose-900 mb-3 md:mb-4 tracking-tight">Cultural Overview</h4>
                    <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">A blend of Eastern and Western influences, shaped by its position at the crossroads of civilizations. Predominantly Muslim but secular.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Social Etiquette</h4>
                      <div className="space-y-4 md:space-y-6">
                         <CultureEtiquette icon="🤝" label="Greetings" desc="Handshakes are common. Remove shoes when entering homes." />
                         <CultureEtiquette icon="🎁" label="Hospitality" desc="Azerbaijanis are extremely hospitable. Accept tea when offered." />
                         <CultureEtiquette icon="👗" label="Dress Code" desc="Modest in religious sites. Casual elsewhere." />
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                      <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Do's and Don'ts</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <p className="text-emerald-500 text-[10px] md:text-sm font-black uppercase tracking-widest flex items-center gap-1"><span className="text-sm">✓</span> Do's</p>
                          <ul className="space-y-1.5 text-[9px] md:text-xs text-slate-600 font-bold uppercase tracking-tighter">
                            <li>• Respect local customs</li>
                            <li>• Try local tea</li>
                            <li>• Ask before photos</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="text-rose-500 text-[10px] md:text-sm font-black uppercase tracking-widest flex items-center gap-1"><span className="text-lg">×</span> Don'ts</p>
                          <ul className="space-y-1.5 text-[9px] md:text-xs text-slate-600 font-bold uppercase tracking-tighter">
                            <li>• discuss politics</li>
                            <li>• refuse hospitality</li>
                            <li>• point with finger</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
                    <CultureFeature icon={<Smartphone className="w-5 h-5 md:w-8 md:h-8" />} title="Music & Dance" desc="UNESCO-listed Mugham music." color="purple" />
                    <CultureFeature icon="🎨" title="Carpets" desc="Ancient carpet-weaving tradition." color="blue" />
                    <CultureFeature icon="🕌" title="Religion" desc="Predominantly Muslim, very tolerant." color="emerald" />
                  </div>

                  <div className="bg-yellow-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-yellow-100">
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

                  <div className="bg-amber-50/50 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-amber-100">
                     <div className="flex items-center gap-4 mb-3 md:mb-4">
                        <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                        <h4 className="text-lg md:text-xl font-black text-amber-900">Local Cuisine</h4>
                     </div>
                     <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">A rich blend of Turkish, Persian, and Russian influences. Lamb, rice, and fresh herbs are staples.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                    <FoodItem name="Plov" desc="National saffron rice dish." icon="🍲" />
                    <FoodItem name="Dolma" desc="Stuffed grape leaves." icon="🍲" />
                    <FoodItem name="Kebab" desc="Grilled succulent meats." icon="🍢" />
                    <FoodItem name="Piti" desc="Traditional lamb soup." icon="🥘" />
                    <FoodItem name="Qutab" desc="Crispy filled flatbread." icon="🥟" />
                    <FoodItem name="Baklava" desc="Sweet nut-filled pastry." icon="🍰" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="bg-emerald-50/50 p-10 rounded-[2.5rem] border border-emerald-100 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-2xl text-emerald-500">🍵</span>
                           <h4 className="text-xl font-black text-emerald-900 tracking-tight">Tea Culture</h4>
                        </div>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">Tea (çay) is deeply embedded in Azerbaijani culture and is served in pear-shaped glasses called "armudu." It's traditionally served strong and black, accompanied by jam, sugar cubes, or sweets.</p>
                        <p className="text-[10px] text-emerald-600 font-black italic bg-white/50 p-3 rounded-xl border border-emerald-100">Tea houses (çayxana) are social hubs where locals gather to drink tea, play backgammon, and socialize. A visit to a traditional tea house is essential!</p>
                     </div>
                     <div className="bg-rose-50/50 p-10 rounded-[2.5rem] border border-rose-100 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-2xl text-rose-500">🍽️</span>
                           <h4 className="text-xl font-black text-rose-900 tracking-tight">Dining Etiquette</h4>
                        </div>
                        <ul className="space-y-3">
                          {[
                            "Wait for the host to start eating",
                            "It's polite to accept second helpings",
                            "Leaving a small amount shows you're satisfied",
                            "Tea is served before and after meals",
                            "Bread is sacred - never waste it"
                          ].map(rule => (
                            <li key={rule} className="flex gap-2 text-base text-slate-700 font-medium">
                              <span className="text-rose-500">•</span> {rule}
                            </li>
                          ))}
                        </ul>
                     </div>
                  </div>
                  <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 md:space-y-6">
                    <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Popular Beverages</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      <BeverageItem name="Black Tea" desc="Served everywhere" icon="☕" />
                      <BeverageItem name="Ayran" desc="Yogurt drink" icon="🧃" />
                      <BeverageItem name="Local Wine" desc="Fine varieties" icon="🍷" />
                      <BeverageItem name="Coffee" desc="Strong & sweet" icon="☕" />
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                    <div className="flex items-center gap-4">
                       <span className="text-xl md:text-2xl">🍽️</span>
                       <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Where to Eat</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="space-y-2 md:space-y-4 md:border-r border-slate-100 md:pr-4">
                          <h5 className="font-black text-slate-900 text-xs md:text-sm">Restaurants</h5>
                          <p className="text-sm text-slate-600 font-medium">Modern/Traditional. 15-40 AZN.</p>
                       </div>
                       <div className="space-y-2 md:space-y-4 md:border-r border-slate-100 md:pr-4">
                          <h5 className="font-black text-slate-900 text-xs md:text-sm">Cafes</h5>
                          <p className="text-sm text-slate-600 font-medium">Perfect for tea. Budget-friendly.</p>
                       </div>
                       <div className="space-y-2 md:space-y-4">
                          <h5 className="font-black text-slate-900 text-xs md:text-sm">Street Food</h5>
                          <p className="text-sm text-slate-600 font-medium">Qutab & snacks. Safe & local.</p>
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
    <div className={cn("p-5 md:p-8 rounded-2xl md:rounded-3xl border flex flex-col gap-2 md:gap-4 relative overflow-hidden", activeColor.split(" ").slice(0, 2).join(" "))}>
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

const TransportItem = ({ icon: Icon, label, desc, color }) => {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="flex gap-3 md:gap-4 items-start">
      <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0", colors[color])}>
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div>
        <h5 className="font-black text-slate-900 text-xs md:text-sm">{label}</h5>
        <p className="text-[11px] md:text-sm text-slate-500 font-medium leading-tight md:leading-relaxed mt-0.5">{desc}</p>
      </div>
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
    <div className={cn("p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border space-y-2 md:space-y-3", colors[color])}>
      <span className="text-xl md:text-2xl">{icon}</span>
      <h5 className="font-black text-slate-900 text-xs md:text-base">{title}</h5>
      <p className="text-[10px] md:text-sm text-slate-600 font-medium leading-tight md:leading-relaxed">{desc}</p>
    </div>
  );
};

const FoodItem = ({ name, desc, icon }) => (
  <div className="p-4 md:p-8 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] shadow-sm text-center group hover:shadow-md transition-all duration-300">
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

export default RegionTravelEssentials;
