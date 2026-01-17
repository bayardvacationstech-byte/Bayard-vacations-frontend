import React from "react";
import { 
  Info, 
  CheckCircle2, 
  Lightbulb, 
  ShieldAlert,
  ListChecks,
  AlertCircle,
  FileText
} from "lucide-react";

const InclusionsSection = ({ packageData }) => {
  return (
    <div id="inclusions" className="bg-white rounded-3xl py-4 md:py-6 px-4 md:px-6 scroll-mt-48 mb-4 border border-slate-100 shadow-sm">
      {/* Standard Header */}
      <div className="mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-[9px] md:text-[10px] font-bold text-brand-blue border border-brand-blue/20 mb-3 md:mb-4 uppercase tracking-widest">
          <span className="text-xs">📋</span> Plan Details
        </div>
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">Package <span className="text-brand-green">Inclusions</span></h2>
        <p className="text-sm md:text-lg font-medium text-slate-600">Everything you need to know for a seamless journey</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Includes Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-brand-green/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <div className="relative h-full bg-white border border-slate-200 group-hover:border-brand-green/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
            {/* Header */}
            <div className="relative px-6 py-6 bg-brand-green border-b border-brand-green/10">
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
            <div className="p-4 space-y-2">
              {packageData?.includes?.map((item, index) => (
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
            </div>
            
            <div className="h-1 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />
          </div>
        </div>

        {/* Excludes Card */}
        {packageData?.excludes && packageData.excludes.length > 0 && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            <div className="relative h-full bg-white border border-slate-200 group-hover:border-rose-300/30 rounded-3xl overflow-hidden transition-all duration-500 shadow-sm">
              {/* Header */}
              <div className="relative px-6 py-6 bg-rose-500 border-b border-rose-500/10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-black text-white tracking-tight">Not Included</h5>
                    <p className="text-rose-100 text-xs font-medium">Items you'll need to arrange</p>
                  </div>
                </div>
              </div>
              
              {/* Items List */}
              <div className="p-4 space-y-2">
                {packageData.excludes.map((item, index) => (
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
              </div>
              
              <div className="h-1 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
            </div>
          </div>
        )}
      </div>
      
      {/* 4. Additional Info Grid (Notes & Points) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Important Notes Card */}
        <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-brand-blue" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Important <span className="text-brand-blue">Notes</span></h4>
          </div>
          <ul className="space-y-3">
            {(packageData?.notes || [
              "Standard check-in time is 14:00 hrs and check-out is 12:00 hrs.",
              "Early check-in or late check-out is subject to availability.",
              "Valid photo ID (Voter ID / Aadhaar / Passport) is mandatory for all travelers.",
              "The itinerary can be shuffled depending on local weather conditions."
            ]).map((note, idx) => (
              <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/note">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/note:bg-brand-blue transition-colors flex-shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Points to Remember/Carry Card */}
        <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-100 hover:border-brand-green/20 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-brand-green" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Points to <span className="text-brand-green">Remember</span></h4>
          </div>
          <ul className="space-y-3">
            {[
              "Comfortable walking shoes are highly recommended.",
              "Carry light woolens even in summer for chilly evenings in mountain areas.",
              "Respect local customs and dress codes at religious sites.",
              "Keep digital copies of all travel documents on your phone."
            ].map((point, idx) => (
              <li key={idx} className="flex gap-3 items-start text-sm text-slate-600 font-medium leading-relaxed group/point">
                <CheckCircle2 className="w-4 h-4 text-brand-green/50 mt-0.5 group-hover/point:text-brand-green transition-colors flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. Pro Tip & Cancellation Policy Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Refined Pro Tip Card - Spans 1 column */}
        <div className="lg:col-span-1 bg-gradient-to-br from-brand-blue/5 to-transparent border border-brand-blue/10 rounded-3xl p-6 relative overflow-hidden group">
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
        {/* Cancellation Policy - Spans 2 columns */}
        <div className="lg:col-span-2 bg-rose-50/50 border border-rose-100 rounded-3xl p-6 group hover:shadow-md transition-all duration-300 shadow-sm shadow-rose-100/30">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
               <ShieldAlert className="w-5 h-5 text-rose-500" />
             </div>
             <h4 className="text-lg font-black text-slate-900 tracking-tight">Cancellation <span className="text-rose-500">Policy</span></h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex gap-3 p-3 bg-rose-500 rounded-2xl border border-rose-100 shadow-sm shadow-rose-200/50">
               <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
               <p className="text-[11px] text-white font-bold leading-tight italic">Cancellation rules may vary by region. Please read full terms at checkout.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Terms & Conditions Section */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-xl font-black text-slate-900 tracking-tight">Terms & <span className="text-slate-500">Conditions</span></h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Booking & Payment</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">Payment in full is required at booking confirmation. Late payments may result in cancellation without notice.</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Itinerary Changes</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">Tour operator reserves the right to modify itinerary due to weather, local conditions, or circumstances beyond control.</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Travel Documents</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">You are responsible for obtaining necessary visas and ensuring passport validity. Tour operator is not responsible for entry denial.</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Operator Responsibility</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">Tour operator is not responsible for personal injury, theft, lost luggage, or flight delays beyond their control.</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Conduct & Safety</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">Guests must respect local laws and customs. Disruptive behavior may result in immediate tour termination without refund.</p>
          </div>
          <div className="space-y-1">
            <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Health & Fitness</h5>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">By booking, you confirm you are in good health and capable of engaging in the described activities.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] text-slate-400 font-bold italic">* By booking this package, you acknowledge and agree to the above terms.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-200" />
            <span className="w-2 h-2 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionsSection;
