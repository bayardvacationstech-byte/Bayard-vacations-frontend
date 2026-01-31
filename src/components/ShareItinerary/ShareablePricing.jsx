import React from 'react';

const ShareablePricing = ({ pricing }) => {
  if (!pricing) return null;

  const { basePrice, taxes, totalPrice, currency, perPerson } = pricing;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const symbol = currency === 'INR' ? '₹' : (currency || '₹');

  return (
    <section id="pricing" className="pt-2 pb-6 md:pb-8 bg-slate-50/50 print:bg-white print:py-6 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple & Elegant Summary Bar */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue/10 to-purple-600/10 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-10 rounded-[2rem] border border-blue-100/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 print:shadow-none print:border-slate-200 print:rounded-2xl print:p-6">
            
            {/* Primary Price Info */}
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 block">
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

            {/* Price Breakdown - Minimalist Vertical Lines */}
            <div className="flex flex-wrap gap-8 md:gap-16 items-center border-t md:border-t-0 md:border-l border-blue-50 pt-6 md:pt-0 md:pl-12">
              <div className="transition-all duration-300 hover:translate-x-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  Base Package
                </span>
                <p className="text-xl font-black text-slate-700">
                  {symbol}{formatPrice(basePrice)}
                </p>
              </div>
              
              {taxes && (
                <div className="transition-all duration-300 hover:translate-x-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                    Taxes & GST
                  </span>
                  <p className="text-xl font-black text-slate-700">
                    {symbol}{formatPrice(taxes)}
                  </p>
                </div>
              )}

              {/* Secure Label */}
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-full border border-blue-100/30">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Pricing Subject to Availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareablePricing;
