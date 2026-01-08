import React from "react";

const InclusionsSection = ({ packageData }) => {
  return (
    <div id="inclusions" className="bg-white rounded-3xl py-6 md:py-6 md:px-6 scroll-mt-48 mb-6 border border-slate-100 shadow-sm">
      {/* Standard Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full text-[10px] font-bold text-brand-blue border border-brand-blue/20 mb-4 uppercase tracking-widest">
          <span className="text-xs">📋</span> Plan Details
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Package <span className="text-brand-green">Inclusions</span></h2>
        <p className="text-lg font-medium text-slate-600">Everything you need to know for a seamless journey</p>
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
      
      {/* Pro Tip Card */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl blur-xl" />
        <div className="relative bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <div className="flex-shrink-0 w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h6 className="text-brand-blue font-semibold mb-1">Pro Tip</h6>
            <p className="text-slate-600 text-sm leading-relaxed">
              Book early to secure the best rates and availability. Contact our travel experts for any customization requests or special requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InclusionsSection;
