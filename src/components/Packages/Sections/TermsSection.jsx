import React from "react";
import { FileText } from "lucide-react";

const TermsSection = () => {
  return (
    <div id="terms-section" className="scroll-mt-48 pt-4">
      {/* Standard Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-tight">
          Terms & <span className="text-brand-blue">Conditions</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-xl font-medium">Important guidelines for your booking</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
        <div className="relative z-10">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domestic Column */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-black text-brand-blue mb-4">
                Domestic Packages
              </h4>
              <div className="space-y-4">
                <div className="group">
                  <h5 className="font-black text-slate-900 text-sm md:text-base mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Booking & Payment
                  </h5>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-3.5 border-l border-slate-100 font-medium">
                    Full payment required at booking for peak season packages.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-black text-slate-900 text-sm md:text-base mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Documentation
                  </h5>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-3.5 border-l border-slate-100 font-medium">
                    Valid government-issued photo ID required for all travelers.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Itinerary Changes
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Sequence may change due to weather or local conditions.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Hotel Selection
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Hotels subject to availability; comparable alternatives provided.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Transportation
                  </h5>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-3.5 border-l border-slate-100 font-medium">
                    AC vehicles provided as per group size; delays not covered.
                  </p>
                </div>
              </div>
            </div>

            {/* International Column */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-black text-brand-blue mb-4">
                International Packages
              </h4>
              <div className="space-y-4">
                <div className="group">
                  <h5 className="font-black text-slate-900 text-sm md:text-base mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Booking & Payment
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Full payment required at confirmation for international bookings.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Documentation
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Valid passport (6 months validity) and necessary visas required.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Flight & Delays
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Not liable for airline delays, cancellations, or schedule changes.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Travel Insurance
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    Comprehensive travel insurance highly recommended for coverage.
                  </p>
                </div>
                <div className="group">
                  <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors" />
                    Liability
                  </h5>
                  <p className="text-slate-600 text-sm leading-relaxed pl-3.5 border-l border-slate-100">
                    We act as facilitators between travelers and service providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
