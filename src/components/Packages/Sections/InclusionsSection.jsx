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
  HeartPulse,
  UserCheck
} from "lucide-react";

const InclusionsSection = ({ packageData }) => {
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
      "Standard check-in time is 14:00 hrs and check-out is 12:00 hrs.",
      "Early check-in or late check-out is subject to availability.",
      "Valid photo ID (Voter ID / Aadhaar / Passport) is mandatory for all travelers.",
      "The itinerary can be shuffled depending on local weather conditions."
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
    const points = packageData?.points || [
      "Comfortable walking shoes are highly recommended.",
      "Carry light woolens even in summer for chilly evenings in mountain areas.",
      "Respect local customs and dress codes at religious sites.",
      "Keep digital copies of all travel documents on your phone."
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

  const renderProTip = () => (
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
          Book at least 45 days in advance to secure the best rates and premium room views. Contact our experts for special surprises!
        </p>
      </div>
    </div>
  );

  const renderCancellation = () => (
    <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 group hover:shadow-md transition-all duration-300 shadow-sm shadow-rose-100/30 h-full">
      <div className="flex items-center gap-3 mb-4">
         <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
           <ShieldAlert className="w-5 h-5 text-rose-500" />
         </div>
         <h4 className="text-lg font-black text-slate-900 tracking-tight">Cancellation <span className="text-rose-500">Policy</span></h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex gap-3 p-3 bg-white/60 rounded-2xl border border-rose-50/50">
           <span className="text-rose-500 font-bold text-xs shrink-0 min-w-16">30+ Days</span>
           <p className="text-[12px] text-slate-600 font-medium">Full refund minus minimal transaction fee.</p>
        </div>
        <div className="flex gap-3 p-3 bg-white/60 rounded-2xl border border-rose-50/50">
           <span className="text-rose-500 font-bold text-xs shrink-0 min-w-16">15-30 Days</span>
           <p className="text-[12px] text-slate-600 font-medium">50% refund of the total package cost.</p>
        </div>
        <div className="flex gap-3 p-3 bg-white/60 rounded-2xl border border-rose-50/50">
           <span className="text-rose-500 font-bold text-xs shrink-0 min-w-16">&lt; 15 Days</span>
           <p className="text-[12px] text-slate-600 font-medium">No refund possible due to vendor commitments.</p>
        </div>
        <div className="flex gap-3 p-3 bg-rose-500 rounded-2xl border border-rose-100 shadow-sm shadow-rose-200/50 sm:col-span-2">
           <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
           <p className="text-[11px] text-white font-bold leading-tight italic">Cancellation rules may vary by region. Please read full terms at checkout.</p>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
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
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
              <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> Essentials
              </h5>
              <ul className="space-y-2">
                {['Passport & Visas', 'Travel Insurance', 'Local SIM/E-sim', 'Power Bank'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                    <div className="w-1 h-1 rounded-full bg-brand-blue/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
              <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                <Umbrella className="w-3.5 h-3.5 text-emerald-500" /> Clothing
              </h5>
              <ul className="space-y-2">
                {['Breathable Linens', 'Comfortable Sneakers', 'Modest Temple Wear', 'Swimwear'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                    <div className="w-1 h-1 rounded-full bg-emerald-500/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4">
              <h5 className="text-slate-900 font-bold text-xs mb-3 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-blue-500" /> Extras
              </h5>
              <ul className="space-y-2">
                {['High SPF Sunscreen', 'Insect Repellent', 'Universal Adapter', 'Dry Bag'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-600 text-[11px] font-semibold text-left">
                    <div className="w-1 h-1 rounded-full bg-blue-500/30" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pre-Departure Timeline */}
        <div>
          <h4 className="text-sm font-black text-slate-700 mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-brand-blue" /> Pre-Departure Timeline
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {[
              { time: "2 Weeks Before", task: "Check Passport Validity" },
              { time: "1 Week Before", task: "Notify Bank of Travel" },
              { time: "3 Days Before", task: "Confirm All Bookings" },
              { time: "1 Day Before", task: "Final Luggage Check" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{item.time}</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{item.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogistics = () => (
    <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-orange-500/20 hover:shadow-md transition-all duration-300 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
        </div>
        <h4 className="text-lg font-black text-slate-900 tracking-tight">Logistics & <span className="text-orange-500">Safety</span></h4>
      </div>
      <ul className="space-y-3">
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-orange-500 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Water & Dining:</span> Drink bottled water only. Street food is generally safe in busy areas but choose freshly cooked meals.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-orange-500 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Temple Etiquette:</span> Remove shoes before entry. Dress modestly (knees and shoulders covered). Never touch Buddha images.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-orange-500 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Help Is Close:</span> Tourist Police: 1155. Save your hotel's contact details and keep a digital copy of your passport.</span>
        </li>
      </ul>
    </div>
  );

  const renderMoney = () => (
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
          <span><span className="font-bold text-slate-700">Local Currency:</span> Thai Baht (฿). Exchange rate: 1 USD ≈ 33-36 THB</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Daily Budget:</span> Estimate $50-100 per person per day for meals, activities, and local transport.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-emerald-600 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Tipping:</span> 10% service gratuity is appreciated but not mandatory in most establishments.</span>
        </li>
      </ul>
    </div>
  );



  const renderTerms = () => (
    <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-slate-900/20 hover:shadow-md transition-all duration-300 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-slate-900/10 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-slate-900" />
        </div>
        <h4 className="text-lg font-black text-slate-900 tracking-tight">Terms & <span className="text-slate-500">Conditions</span></h4>
      </div>
      
      <ul className="space-y-3">
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Booking & Payment:</span> Payment in full is required at booking confirmation. Late payments may result in cancellation without notice.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Itinerary Changes:</span> Tour operator reserves the right to modify itinerary due to weather, local conditions, or circumstances beyond control.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Travel Documents:</span> You are responsible for obtaining necessary visas and ensuring passport validity. Tour operator is not responsible for entry denial.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Operator Responsibility:</span> Tour operator is not responsible for personal injury, theft, lost luggage, or flight delays beyond their control.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Conduct & Safety:</span> Guests must respect local laws and customs. Disruptive behavior may result in immediate tour termination without refund.</span>
        </li>
        <li className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note text-left">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-slate-900 transition-colors flex-shrink-0" />
          <span><span className="font-bold text-slate-700">Health & Fitness:</span> By booking, you confirm you are in good health and capable of engaging in the described activities.</span>
        </li>
      </ul>
    </div>
  );

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
      
      {/* Mobile Tabs Navigation - Redesigned for better visibility */}
      <div className="md:hidden mt-4 mb-3">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-brand-blue" /> Travel Details
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm font-black uppercase tracking-wider text-[9px] min-w-[calc(50%-4px)] ${
                  isActive 
                    ? "bg-white text-brand-blue scale-105 border border-brand-blue/5 shadow-md" 
                    : "bg-white/40 text-slate-500 hover:text-slate-700 active:scale-95"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-brand-blue" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditionally Render Sections (Mobile) or Grid (Desktop) */}
      <div className="mt-4">
        {/* Mobile View: Show only active tab */}
        <div className="md:hidden">
          {activeTab === "notes" && renderNotes()}
          {activeTab === "points" && renderPoints()}
          {activeTab === "checklist" && renderChecklist()}
          {activeTab === "logistics" && renderLogistics()}
          {activeTab === "money" && renderMoney()}
          {activeTab === "tip" && renderProTip()}
          {activeTab === "cancellation" && renderCancellation()}
          {activeTab === "terms" && renderTerms()}
        </div>

        {/* Desktop View: Show original grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderNotes()}
            {renderPoints()}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-1">{renderProTip()}</div>
            <div className="lg:col-span-2">{renderCancellation()}</div>
          </div>

          {/* Travel Preparation Guide - Consolidated Section */}
          <div className="mt-6 space-y-6">
            <div className="pt-6 border-t border-slate-100 mb-6">
              <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <Briefcase className="w-3 h-3" /> Smart Packing
              </h4>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Travel Preparation <span className="text-brand-blue">Guide</span></h3>
              <p className="text-slate-500 text-sm max-w-md font-medium">Everything you need before departure</p>
            </div>

              {/* What to Pack Section */}
              <div>
                <h4 className="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-blue" /> What to Pack
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
                    <h5 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-blue" /> Essentials
                    </h5>
                    <ul className="space-y-3">
                      {['Passport & Visas', 'Travel Insurance', 'Local SIM/E-sim', 'Power Bank'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 text-xs font-bold text-left">
                          <div className="w-2 h-2 rounded-full bg-brand-blue/30" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
                    <h5 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                      <Umbrella className="w-4 h-4 text-emerald-500" /> Clothing
                    </h5>
                    <ul className="space-y-3">
                      {['Breathable Linens', 'Comfortable Sneakers', 'Modest Temple Wear', 'Swimwear'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 text-xs font-bold text-left">
                          <div className="w-2 h-2 rounded-full bg-emerald-500/30" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 hover:bg-slate-50 transition-colors">
                    <h5 className="text-slate-900 font-bold text-sm mb-4 flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-500" /> Extras
                    </h5>
                    <ul className="space-y-3">
                      {['High SPF Sunscreen', 'Insect Repellent', 'Universal Adapter', 'Dry Bag'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-600 text-xs font-bold text-left">
                          <div className="w-2 h-2 rounded-full bg-blue-500/30" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pre-Departure Timeline Section */}
              <div>
                <h4 className="text-lg font-black text-slate-700 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-brand-blue" /> Pre-Departure Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { time: "2 Weeks Before", task: "Check Passport Validity" },
                    { time: "1 Week Before", task: "Notify Bank of Travel" },
                    { time: "3 Days Before", task: "Confirm All Bookings" },
                    { time: "1 Day Before", task: "Final Luggage Check" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.time}</span>
                      <p className="text-sm font-bold text-slate-900 mt-2">{item.task}</p>
                    </div>
                  ))}
                </div>
              </div>
              </div>

            {/* Logistics, Money & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
              {renderLogistics()}
              {renderMoney()}
            </div>
            
            <div className="mt-6">
              {renderTerms()}
            </div>
          </div>
      </div>
    </div>
  );
};

export default InclusionsSection;
