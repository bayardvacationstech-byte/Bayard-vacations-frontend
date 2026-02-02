import React from 'react';

const ShareablePricing = ({ pricing, travelers }) => {
  if (!pricing) return null;

  const { 
    basePrice, 
    totalPrice, 
    currency, 
    perPerson,
    hotelCategory = "4 STAR",
    adultsRate,
    childrenRate,
    toddlersRate,
    gstRate,
    gstAmount,
    tcsRate,
    tcsAmount
  } = pricing;

  const { adults = 0, children = 0, toddlers = 0 } = travelers || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const symbol = currency === 'INR' ? '₹' : (currency || '₹');

  return (
    <section id="pricing" className="pt-4 pb-8 bg-slate-50/50 print:bg-white print:py-6 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-tight mb-4 md:mb-6">
          Tour Cost
        </h2>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue/10 to-purple-600/10 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative flex flex-col gap-4 md:gap-8 p-6 md:p-10 rounded-[2rem] border border-blue-100/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 print:shadow-none print:border-slate-200 print:rounded-2xl print:p-6">
            
            {/* Top Bar: Grand Total & Hotel Category */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pb-4 md:pb-6 border-b border-blue-50">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1 md:mb-2 block">
                  Total Trip Investment
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                    {symbol}{formatPrice(totalPrice)}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-brand-blue uppercase tracking-widest">
                    {perPerson ? '/ Per Person' : 'Net Total'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 block">
                  Hotel Category
                </span>
                <span className="w-fit px-4 py-1.5 bg-brand-blue text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
                  {hotelCategory}
                </span>
              </div>
            </div>

            {/* Detailed Breakdown Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-y-6 gap-x-4 md:gap-8">
              {/* Adults */}
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Adults ({adults})
                </span>
                <p className="text-lg font-black text-slate-700">
                  {symbol}{formatPrice(adults * (adultsRate || 0))}
                </p>
                <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                  Above 12 years {adultsRate > 0 && `• ${symbol}${formatPrice(adultsRate)} pp`}
                </span>
              </div>

              {/* Children */}
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Children ({children})
                </span>
                <p className="text-lg font-black text-slate-700">
                  {symbol}{formatPrice(children * (childrenRate || 0))}
                </p>
                <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                  5-11 years
                </span>
              </div>

              {/* Toddlers */}
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Toddlers ({toddlers})
                </span>
                <p className="text-lg font-black text-slate-700">
                  {symbol}{formatPrice(toddlers * (toddlersRate || 0))}
                </p>
                <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                  0-4 years
                </span>
              </div>

              {/* Base */}
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Base Total
                </span>
                <p className="text-lg font-black text-slate-700">
                  {symbol}{formatPrice(basePrice)}
                </p>
                <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                  Sub-total
                </span>
              </div>

              {/* GST */}
              {gstAmount > 0 && (
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    GST ({gstRate}%)
                  </span>
                  <p className="text-lg font-black text-slate-700">
                    {symbol}{formatPrice(gstAmount)}
                  </p>
                  <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                    Service Tax
                  </span>
                </div>
              )}

              {/* TCS */}
              {tcsAmount > 0 && (
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    TCS ({tcsRate}%)
                  </span>
                  <p className="text-lg font-black text-slate-700">
                    {symbol}{formatPrice(tcsAmount)}
                  </p>
                  <span className="text-[8px] font-bold text-slate-400 block mt-1 uppercase tracking-tighter">
                    Collection Tax
                  </span>
                </div>
              )}
            </div>

            {/* Availability Footer */}
            <div className="flex items-center justify-between md:justify-end gap-3 pt-4 md:pt-6 border-t border-blue-50/50">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-full border border-blue-100/30">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Pricing Subject to Availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareablePricing;
