import React, { useState } from "react";
import { 
  Info, 
  CheckCircle2, 
  Lightbulb, 
  ShieldAlert,
  ListChecks,
  AlertCircle,
  FileText,
  ShieldCheck,
  Umbrella,
  Camera,
  AlertTriangle,
  Waves,
  MapPin,
  PhoneCall,
  Wallet,
  Briefcase,
  Building,
  Car,
  FileCheck,
  AlertOctagon,
  Map as MapIcon
} from "lucide-react";

const InclusionsSection = ({ packageData }) => {
  // Full Static Data from User Request
  const TRAVEL_GUIDE_DATA = {
    importantNotes: [
      {
        title: "Hotel Policies",
        icon: "Building",
        items: [
          "Check-in Time: 3:00 PM (Early check-in subject to availability)",
          "Check-out Time: 11:00 AM (Late check-out charges apply)",
          "Room Cancellation: Cancel 48 hours prior to check-in",
          "Damage Policy: Guests responsible for property damage",
          "Key Policy: Return keys at checkout; fees for lost keys"
        ]
      },
      {
        title: "Transfer & Transportation",
        icon: "Car",
        items: [
          "Airport Transfer: Complimentary pickup. Extra charges if missed",
          "Vehicle: Air-conditioned private vehicle; no shared transfers",
          "Driver & Route: Fixed routes; deviations incur extra charges",
          "Vehicle Capacity: Limited space; larger groups need multiple vehicles",
          "Luggage: Reasonable limit; excess baggage surcharged"
        ]
      },
      {
        title: "Tour & Activity Operations",
        icon: "Map",
        items: [
          "Guide: English-speaking guide for scheduled tours",
          "Timing: Fixed schedules; delays may modify tour",
          "Weather: Subject to change due to severe weather",
          "Museum Hours: Dependent on operations; some close specific days",
          "Photography: Restricted at certain historical sites",
          "Group Size: Min 2 guests; singles may join groups"
        ]
      },
      {
        title: "Travel Requirements",
        icon: "FileCheck",
        items: [
          "Visa: E-visa required for Indian passports (separate process)",
          "Passport: Min 6 months validity required",
          "Vaccination: As per current government rules",
          "Currency: AZN official; USD accepted widely",
          "Insurance: Strongly recommended",
          "Show Money: Min USD 250-500 cash/card recommended"
        ]
      },
      {
        title: "Cancellation Policy",
        icon: "AlertOctagon",
        items: [
          "Package: Subject to standard company policy",
          "Refunds: Processed within 15-21 business days",
          "Force Majeure: No refunds for natural disasters/pandemic",
          "Changes: Itinerary subject to change for unavoidable reasons",
          "Price: Valid at booking; currency fluctuations apply"
        ]
      }
    ],
    pointsToRemember: [
      "Dress Code: Comfortable shoes; modest wear for religious sites",
      "Weather: Light clothes (summer); warm layers (mountains/winter)",
      "Sun Protection: High UV - carry sunscreen, hat, sunglasses",
      "Hydration: Drink water; one bottle daily provided",
      "Cash & Cards: Carry cash (AZN/USD) for small buys",
      "Language: English in tourist areas; learn basic local phrases",
      "Photography: Ask permission before clicking locals",
      "Punctuality: Be ready 15 mins before pickups",
      "Fitness: Uneven terrain requires reasonable fitness",
      "Diet: Inform special meal needs in advance",
      "Network: Local SIMs available; roaming expensive",
      "Emergency: Keep hotel/guide contacts handy",
      "Valuables: Use hotel safe for passports/money",
      "Bargaining: Accepted at bazaars but be respectful",
      "Tipping: 5-10% appreciated for good service"
    ],
    travelPrep: {
      beforeDeparture: {
        title: "Before Departure",
        sections: [
          { subtitle: "Documentation", items: ["Check passport validity (6mo+)", "Apply for E-visa (5-7 days)", "Print copies of docs", "Check visa confirmation"] },
          { subtitle: "Health", items: ["Consult doctor 4-6 weeks prior", "Pack meds in original containers", "Buy travel insurance", "Pack medical kit"] },
          { subtitle: "Packing", items: ["Walking shoes", "Breathable clothes", "Warm jacket", "Sunscreen/Hat", "Universal adapter (Type C/F)", "Power bank"] },
          { subtitle: "Financial", items: ["Notify bank", "Exchange some AZN", "Budget ~$300-500", "Keep backups"] }
        ]
      },
      uponArrival: {
        title: "Upon Arrival",
        sections: [
          { subtitle: "Airport to Hotel", items: ["Collect luggage", "Find rep with signboard", "Share contact", "Transfer 30-45 mins"] },
          { subtitle: "Hotel Check-In", items: ["Register with passport", "Collect keys/info", "Locate emergency exits", "Confirm breakfast/pickup times"] },
          { subtitle: "First Evening", items: ["Rest & acclimatize", "Dinner nearby", "Set alarm for next day"] }
        ]
      },
      duringTravel: {
        title: "During Travel",
        sections: [
          { subtitle: "Daily Routine", items: ["Breakfast by 7:30 AM", "Carry daypack (water/meds)", "Sunscreen", "Follow safety rules"] },
          { subtitle: "Sightseeing", items: ["Arrive 10m early", "Keep tickets safe", "Remove shoes at temples", "Respect photography rules"] },
          { subtitle: "Local Interaction", items: ["Greet 'Salam'", "Use right hand", "Ask photo permission", "Bargain fairly"] },
          { subtitle: "Health & Safety", items: ["Bottled water only", "Eat at recommended spots", "Keep hotel card", "Stay in lit areas"] }
        ]
      },
      usefulInfo: {
        title: "Useful Information",
        sections: [
          { subtitle: "Currency", items: ["1 USD ≈ 1.7 AZN", "ATMs available", "Credit cards in major spots"] },
          { subtitle: "Communication", items: ["Local SIMs (Azercell/Bakcell)", "Free Hotel Wi-Fi", "Code: +994"] },
          { subtitle: "Time & Climate", items: ["UTC+4", "Best: Apr-May, Sep-Oct", "Summers hot, Winters cold"] },
          { subtitle: "Etiquette", items: ["Dress respectfully", "No PDA", "Respect Ramadan", "Polite refusal"] },
          { subtitle: "Emergency", items: ["Police: 102", "Ambulance: 103", "Tourist Police: +994 12 490 20 26"] }
        ]
      }
    }
  };

  const [activeTab, setActiveTab] = useState("notes");
  const [isIncludesExpanded, setIsIncludesExpanded] = useState(false);
  const [isExcludesExpanded, setIsExcludesExpanded] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isPointsExpanded, setIsPointsExpanded] = useState(false);

  const tabs = [
    { id: "notes", label: "Notes", icon: Info },
    { id: "points", label: "Points", icon: ListChecks },
    { id: "checklist", label: "Checklist", icon: Briefcase },
    { id: "logistics", label: "Safety", icon: AlertTriangle },
    { id: "money", label: "Money", icon: Wallet },
    { id: "tip", label: "Pro Tip", icon: Lightbulb },
    { id: "cancellation", label: "Policy", icon: ShieldAlert },
    { id: "terms", label: "Terms", icon: FileText },
  ];

  const renderNotes = () => {
    const notes = packageData?.notes || [
      "Standard check-in time is usually 14:00 hrs and check-out is 12:00 hrs.",
      "Early check-in or late check-out is subject to hotel availability.",
      "Valid government photo ID is mandatory for all travelers.",
      "Itinerary sequence may be adjusted based on local conditions or weather."
    ];
    const displayNotes = isNotesExpanded ? notes : notes.slice(0, 6);

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
            <Info className="w-5 h-5 text-brand-blue" />
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">Important <span className="text-brand-blue">Notes</span></h4>
        </div>
        <ul className="space-y-3">
          {displayNotes.map((note, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-brand-blue transition-colors flex-shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
        {notes.length > 6 && (
          <button
            onClick={() => setIsNotesExpanded(!isNotesExpanded)}
            className="w-full mt-4 py-2 text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors flex items-center justify-center gap-1 group/btn"
          >
            {isNotesExpanded ? 'Show Less' : `Read More (${notes.length - 6} more)`}
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isNotesExpanded ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  const renderPoints = () => {
    const points = packageData?.points_to_remember || packageData?.points || [
      "Comfortable walking shoes are highly recommended for sightseeing.",
      "Carry appropriate clothing for the season and specific region requirements.",
      "Respect local customs, traditions, and dress codes at religious sites.",
      "Maintain digital and physical copies of all your travel documents."
    ];
    const displayPoints = isPointsExpanded ? points : points.slice(0, 6);

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-brand-green" />
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">Points to <span className="text-brand-green">Remember</span></h4>
        </div>
        <ul className="space-y-3">
          {displayPoints.map((point, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/point text-left">
              <CheckCircle2 className="w-4 h-4 text-brand-green/50 mt-0.5 group-hover/point:text-brand-green transition-colors flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        {points.length > 6 && (
          <button
            onClick={() => setIsPointsExpanded(!isPointsExpanded)}
            className="w-full mt-4 py-2 text-xs font-bold text-brand-green hover:text-emerald-700 transition-colors flex items-center justify-center gap-1 group/btn"
          >
            {isPointsExpanded ? 'Show Less' : `Read More (${points.length - 6} more)`}
            <svg 
              className={`w-3 h-3 transition-transform duration-300 ${isPointsExpanded ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    );
  };

  const renderProTip = () => {
    const tips = packageData?.proTips || [
      "Book at least 45 days in advance to secure the best rates and premium room views. Contact our experts for special surprises!"
    ];
    // Show one random tip or the first one
    const tip = tips[Math.floor(Math.random() * tips.length)];

    return (
      <div className="bg-gradient-to-br from-brand-blue/5 to-transparent border border-brand-blue/10 rounded-3xl p-6 relative overflow-hidden group h-full">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-all duration-500" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white shadow-sm border border-brand-blue/10 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-brand-blue" />
            </div>
            <h6 className="text-brand-blue font-bold tracking-tight">Pro Tip</h6>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            {tip}
          </p>
        </div>
      </div>
    );
  };

  const renderCancellation = () => {
    const policy = packageData?.cancellationPolicy || {
      note: "Cancellation rules may vary by region. Please read full terms at checkout.",
      tiers: [
        { period: "30+ Days Before Departure", refund: "Full refund minus minimal transaction fee." },
        { period: "15-30 Days Before Departure", refund: "50% refund of the total package cost." },
        { period: "Less than 15 Days Before Departure", refund: "No refund possible due to vendor commitments." }
      ]
    };

    return (
      <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 group hover:shadow-md transition-all duration-300 shadow-sm shadow-rose-100/30 h-full">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
             <ShieldAlert className="w-5 h-5 text-rose-500" />
           </div>
           <h4 className="text-lg font-black text-slate-900 tracking-tight">Cancellation <span className="text-rose-500">Policy</span></h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {policy.tiers?.map((tier, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-white/60 rounded-2xl border border-rose-50/50">
               <span className="text-rose-500 font-bold text-xs shrink-0 min-w-16">{tier.period}</span>
               <p className="text-[12px] text-slate-600 font-medium">{tier.refund}</p>
            </div>
          ))}
          <div className="flex gap-3 p-3 bg-rose-500 rounded-2xl border border-rose-100 shadow-sm shadow-rose-200/50 sm:col-span-2">
             <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
             <p className="text-[11px] text-white font-bold leading-tight italic">{policy.note}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderChecklist = () => {
    const packing = packageData?.travelPreparationGuide?.whatToPack || {
      essentials: ['Passport & Visas', 'Travel Insurance', 'Local SIM/E-sim', 'Power Bank'],
      clothing: ['Breathable Linens', 'Comfortable Sneakers', 'Modest Temple Wear', 'Swimwear'],
      extras: ['High SPF Sunscreen', 'Insect Repellent', 'Universal Adapter', 'Dry Bag']
    };

    const timeline = packageData?.travelPreparationGuide?.preDepartureTimeline || [
      { timeframe: "2 Weeks Before", task: "Check Passport Validity" },
      { timeframe: "1 Week Before", task: "Notify Bank of Travel" },
      { timeframe: "3 Days Before", task: "Confirm All Bookings" },
      { timeframe: "1 Day Before", task: "Final Luggage Check" }
    ];

    return (
      <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex flex-col gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200 w-fit uppercase tracking-widest">
              <Briefcase className="w-3 h-3" /> Smart Packing
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Travel Preparation <span className="text-brand-blue">Guide</span></h3>
            <p className="text-slate-500 text-xs font-medium">Everything you need before departure</p>
          </div>

          {/* Packing Checklist */}
          <div className="mb-6">
            <h4 className="text-sm font-black text-slate-700 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-blue" /> What to Pack
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {packing.essentials?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Essentials
                  </h5>
                  <ul className="space-y-2">
                    {packing.essentials.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-brand-blue/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {packing.clothing?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <Umbrella className="w-3.5 h-3.5 text-emerald-500" /> Clothing
                  </h5>
                  <ul className="space-y-2">
                    {packing.clothing.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-emerald-500/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {packing.extras?.length > 0 && (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
                  <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-500" /> Extras
                  </h5>
                  <ul className="space-y-2">
                    {packing.extras.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                        <div className="w-1 h-1 rounded-full bg-blue-500/30" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Pre-Departure Timeline */}
          <div>
            <h4 className="text-sm font-black text-slate-700 mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-blue" /> Pre-Departure Timeline
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {timeline.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{item.timeframe || item.time}</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{item.task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLogistics = () => {
    const logistics = packageData?.logisticsAndSafety || [
      {
        category: "Safety & Ethics",
        description: "Always follow local laws and respect community guidelines. Keep emergency contact numbers and hotel addresses handy at all times."
      }
    ];

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-orange-500/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">Logistics & <span className="text-orange-500">Safety</span></h4>
        </div>
        <ul className="space-y-3">
          {logistics.map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-orange-500 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{item.category}:</span> {item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getCurrencyInfo = (region) => {
    const currencies = {
        'thailand': { name: 'Thai Baht', symbol: '฿', rate: '1 USD ≈ 33-36 THB' },
        'vietnam': { name: 'Vietnamese Dong', symbol: '₫', rate: '1 USD ≈ 24,000-25,000 VND' },
        'bali': { name: 'Indonesian Rupiah', symbol: 'Rp', rate: '1 USD ≈ 15,000-16,000 IDR' },
        'dubai': { name: 'UAE Dirham', symbol: 'AED', rate: '1 USD ≈ 3.67 AED' },
        'singapore': { name: 'Singapore Dollar', symbol: 'S$', rate: '1 USD ≈ 1.34 SGD' },
        'malaysia': { name: 'Malaysian Ringgit', symbol: 'RM', rate: '1 USD ≈ 4.70 MYR' }
    };
    return currencies[region?.toLowerCase()] || { name: 'Local Currency', symbol: '', rate: 'Check current exchange rates before travel' };
  };

  const renderMoney = () => {
    const moneyData = packageData?.moneyAndExpenses || {
      localCurrency: { name: 'Local Currency', symbol: '', exchangeRate: 'Check current rates' },
      tips: [
        { label: "Daily Budget", description: "Suggest budgeting for additional meals and personal expenses." },
        { label: "Tipping", description: "Tipping is appreciated for good service." }
      ]
    };

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-emerald-600/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-600/10 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600" />
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">Money & <span className="text-emerald-600">Expenses</span></h4>
        </div>
        <ul className="space-y-3">
          <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
            <span><span className="font-bold text-slate-700">Local Currency:</span> {moneyData.localCurrency?.name} ({moneyData.localCurrency?.symbol}). {moneyData.localCurrency?.exchangeRate}</span>
          </li>
          {moneyData.tips?.map((tip, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{tip.label}:</span> {tip.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };



  const renderTerms = () => {
    const terms = packageData?.termsAndConditions || [
      { category: "Booking & Payment", description: "Payment in full is required at booking confirmation." },
      { category: "Itinerary Changes", description: "Tour operator reserves the right to modify itinerary due to weather." }
    ];

    return (
      <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-slate-900/20 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-900/10 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-slate-900" />
          </div>
          <h4 className="text-lg font-black text-slate-900 tracking-tight">Terms & <span className="text-slate-500">Conditions</span></h4>
        </div>
        
        <ul className="space-y-3">
          {terms.map((term, idx) => (
            <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
              <span><span className="font-bold text-slate-700">{term.category}:</span> {term.description}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div id="inclusions" className="bg-white rounded-3xl py-1.5 md:py-4 px-3 md:px-6 scroll-mt-48 border border-slate-100 shadow-sm">
      {/* Standard Header */}
      <div className="mb-2 md:mb-5 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-[9px] md:text-[10px] font-bold text-brand-blue border border-brand-blue/20 mb-2 md:mb-4 uppercase tracking-widest">
          <span className="text-xs">📋</span> Plan Details
        </div>
        <h2 className="text-[22px] md:text-5xl font-black text-slate-900 mb-1 md:mb-4 tracking-tight leading-tight">Package <span className="text-brand-green">Inclusions</span></h2>
        <p className="text-xs md:text-lg font-medium text-slate-600">Everything you need for a seamless journey</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Includes Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-brand-green/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="relative h-full bg-white border border-slate-200 group-hover:border-brand-green/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
            {/* Header */}
            <div className="relative px-4 md:px-6 py-4 md:py-6 bg-brand-green border-b border-brand-green/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 className="text-xl font-black text-white tracking-tight">What's Included</h5>
                  <p className="text-emerald-100 text-xs font-medium">{packageData?.includes?.length || 0} benefits included</p>
                </div>
              </div>
            </div>
            
            {/* Items List */}
            <div className="p-3 md:p-4 space-y-2 text-left">
              {(isIncludesExpanded ? packageData?.includes : packageData?.includes?.slice(0, 6))?.map((item, index) => (
                <div 
                  key={index}
                  className="group/item flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-emerald-50 hover:border-emerald-100 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 text-sm font-medium leading-relaxed group-hover/item:text-slate-900 transition-colors">
                    {typeof item === "string" ? item : item.title}
                  </span>
                </div>
              ))}

              {packageData?.includes?.length > 6 && (
                <div className="pt-2 px-1">
                  <button
                    onClick={() => setIsIncludesExpanded(!isIncludesExpanded)}
                    className="w-full py-2.5 text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-xl transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                  >
                    {isIncludesExpanded ? 'Show Less' : `View All (${packageData.includes.length})`}
                    <svg 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isIncludesExpanded ? 'rotate-180' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="h-1 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
          </div>
        </div>

        {/* Exclusions Card */}
        {packageData?.excludes && packageData.excludes.length > 0 && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <div className="relative h-full bg-white border border-slate-200 group-hover:border-rose-300/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
              {/* Header */}
              <div className="relative px-4 md:px-6 py-4 md:py-6 bg-rose-500 border-b border-rose-500/10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-black text-white tracking-tight">Exclusions</h5>
                    <p className="text-rose-100 text-xs font-medium">Items you'll need to arrange</p>
                  </div>
                </div>
              </div>
                            {/* Items List */}
                <div className="p-3 md:p-4 space-y-2 text-left">
                  {(isExcludesExpanded ? packageData.excludes : packageData.excludes.slice(0, 6)).map((item, index) => (
                    <div 
                      key={index}
                      className="group/item flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50 hover:bg-rose-50 hover:border-rose-100 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-rose-100 flex items-center justify-center group-hover/item:bg-rose-500 transition-all">
                        <svg className="w-3 h-3 text-rose-500 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-slate-600 text-sm font-medium leading-relaxed group-hover/item:text-slate-900 transition-colors">
                        {typeof item === "string" ? item : item.title}
                      </span>
                    </div>
                  ))}

                  {packageData.excludes.length > 6 && (
                    <div className="pt-2 px-1">
                      <button
                        onClick={() => setIsExcludesExpanded(!isExcludesExpanded)}
                        className="w-full py-2.5 text-[11px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/50 rounded-xl transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                      >
                        {isExcludesExpanded ? 'Show Less' : `View All (${packageData.excludes.length})`}
                        <svg 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${isExcludesExpanded ? 'rotate-180' : ''}`} 
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              
              <div className="h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Tabs Navigation (REMOVED - Using unified vertical layout) */}
      {/* 
      <div className="md:hidden mt-4 mb-3">
        ...
      </div>
      */}

      <div className="mt-8 space-y-8">
        {/* 1. IMPORTANT NOTES GRID */}
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
               <Info className="w-5 h-5 text-brand-blue" />
             </span>
             Important <span className="text-brand-blue">Notes & Policies</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRAVEL_GUIDE_DATA.importantNotes.map((note, idx) => {
              const Icon = { Building, Car, Map: MapIcon, FileCheck, AlertOctagon }[note.icon] || Info;
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-500 group-hover:text-brand-blue group-hover:border-brand-blue/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">{note.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {note.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. POINTS TO REMEMBER */}
        <div className="bg-brand-green/5 rounded-[32px] p-6 md:p-8 border border-brand-green/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] -mr-20 -mt-20" />
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                 <ListChecks className="w-5 h-5 text-emerald-600" />
               </span>
               Points to <span className="text-emerald-600">Remember</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {TRAVEL_GUIDE_DATA.pointsToRemember.map((point, idx) => {
                 const [title, desc] = point.split(": ");
                 return (
                   <div key={idx} className="flex gap-3 items-start p-3 bg-white/60 rounded-xl border border-emerald-100/50 hover:bg-white transition-colors">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                     <div className="text-sm text-slate-700 leading-snug">
                       {desc ? (
                         <>
                           <span className="font-bold text-emerald-800">{title}:</span> {desc}
                         </>
                       ) : (
                         <span className="font-medium">{point}</span>
                       )}
                     </div>
                   </div>
                 );
              })}
            </div>
          </div>
        </div>

        {/* 3. COMPREHENSIVE TRAVEL PREP GUIDE */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="relative bg-slate-900 py-8 px-6 md:px-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] -ml-12 -mb-12 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] font-bold text-orange-300 uppercase tracking-widest mb-3">
                  <Briefcase className="w-3 h-3" /> Essential Guide
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Travel Preparation <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Guide</span>
                </h3>
                <p className="text-slate-400 text-sm font-medium mt-1 max-w-lg">
                  Everything you need to know before you go, organized by timeline.
                </p>
              </div>
              
              {/* Decorative Icon */}
              <div className="hidden md:flex flex-shrink-0 w-16 h-16 bg-white/5 rounded-2xl border border-white/10 items-center justify-center backdrop-blur-sm">
                <FileCheck className="w-8 h-8 text-orange-400" />
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            {/* Phase 1: Before Departure */}
            <div className="relative pl-8 md:pl-0">
               <div className="md:hidden absolute left-3 top-2 bottom-0 w-0.5 bg-slate-200" />
               <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                 <div className="md:col-span-3">
                   <div className="sticky top-24">
                     <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phase 1</span>
                     <h4 className="text-lg font-black text-slate-800">{TRAVEL_GUIDE_DATA.travelPrep.beforeDeparture.title}</h4>
                   </div>
                 </div>
                 <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {TRAVEL_GUIDE_DATA.travelPrep.beforeDeparture.sections.map((sec, idx) => (
                     <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                       <h5 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                         <div className="w-1.5 h-4 rounded-full bg-brand-blue"></div> {sec.subtitle}
                       </h5>
                       <ul className="space-y-2">
                         {sec.items.map((item, i) => (
                           <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                             <span className="text-slate-300">•</span> {item}
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Phase 2: Upon Arrival */}
            <div className="relative pl-8 md:pl-0">
               <div className="md:hidden absolute left-3 top-2 bottom-0 w-0.5 bg-slate-200" />
               <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                 <div className="md:col-span-3">
                   <div className="sticky top-24">
                     <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phase 2</span>
                     <h4 className="text-lg font-black text-slate-800">{TRAVEL_GUIDE_DATA.travelPrep.uponArrival.title}</h4>
                   </div>
                 </div>
                 <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {TRAVEL_GUIDE_DATA.travelPrep.uponArrival.sections.map((sec, idx) => (
                     <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                       <h5 className="font-bold text-slate-900 text-sm mb-3 text-brand-green">{sec.subtitle}</h5>
                       <ul className="space-y-2">
                         {sec.items.map((item, i) => (
                           <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                             <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /> {item}
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Phase 3: During Travel */}
            <div className="relative pl-8 md:pl-0">
               <div className="md:hidden absolute left-3 top-2 bottom-0 w-0.5 bg-slate-200" />
               <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                 <div className="md:col-span-3">
                   <div className="sticky top-24">
                     <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phase 3</span>
                     <h4 className="text-lg font-black text-slate-800">{TRAVEL_GUIDE_DATA.travelPrep.duringTravel.title}</h4>
                   </div>
                 </div>
                 <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {TRAVEL_GUIDE_DATA.travelPrep.duringTravel.sections.map((sec, idx) => (
                     <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm border-l-4 border-l-amber-400">
                       <h5 className="font-bold text-slate-900 text-sm mb-3">{sec.subtitle}</h5>
                       <ul className="space-y-2">
                         {sec.items.map((item, i) => (
                           <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                             <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5" /> {item}
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Useful Info */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 pt-8 border-t border-slate-100">
                 <div className="md:col-span-3">
                     <h4 className="text-lg font-black text-slate-800">{TRAVEL_GUIDE_DATA.travelPrep.usefulInfo.title}</h4>
                 </div>
                 <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                   {TRAVEL_GUIDE_DATA.travelPrep.usefulInfo.sections.map((sec, idx) => (
                     <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                       <h6 className="font-bold text-slate-900 text-xs mb-2">{sec.subtitle}</h6>
                       <ul className="space-y-1">
                         {sec.items.map((item, i) => (
                           <li key={i} className="text-[10px] text-slate-600 leading-tight">
                             {item}
                           </li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InclusionsSection;
