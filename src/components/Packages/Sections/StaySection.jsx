import React from "react";
import { Wifi, Utensils, Wind, Car, BedDouble, Waves, Star, Building2, MapPin } from "lucide-react";

const StaySection = ({ packageData }) => {
  return (
    <div id="stay" className="bg-white rounded-3xl py-6 md:py-6 md:px-6 scroll-mt-48 mb-6 border border-slate-100 shadow-sm">
      {/* Standard Header with Enhanced Badge */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div className="flex-1 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full text-[10px] font-bold text-yellow-700 border border-yellow-200 mb-5 uppercase tracking-widest">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Premium Stay Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Premium <span className="text-yellow-600">Accommodations</span></h2>
          <p className="text-lg font-medium text-slate-600 leading-relaxed">Handpicked retreats & boutiques for ultimate comfort</p>
        </div>

        {/* Luxury Category Badge */}
        <div className="lg:flex-shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] px-8 py-6 shadow-2xl flex flex-col items-center gap-2 min-w-[200px]">
              <div className="flex gap-1.5 text-2xl">
                {[...Array(packageData?.hotelCategory === "Premium" ? 4 : packageData?.hotelCategory === "Luxury" ? 5 : 3)].map((_, i) => (
                  <span key={i} className="drop-shadow-sm pointer-events-none">⭐</span>
                ))}
              </div>
              <div className="h-px w-12 bg-slate-100 my-1" />
              <span className="font-black text-slate-900 uppercase tracking-[0.15em] text-[10px]">
                {packageData?.hotelCategory || "Premium"} Selection
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Refined Amenities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: <Wifi className="w-8 h-8" />, label: "Fast WiFi", sub: "Included", color: "text-slate-900" },
          { icon: <Utensils className="w-8 h-8" />, label: "Breakfast", sub: "Daily", color: "text-slate-900" },
          { icon: <Wind className="w-8 h-8" />, label: "AC Rooms", sub: "Comfort", color: "text-slate-900" },
          { icon: <Car className="w-8 h-8" />, label: "Transfers", sub: "Private", color: "text-slate-900" },
        ].map((amenity, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-default"
          >
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-2 text-yellow-500 group-hover:scale-110 transition-transform">
              {amenity.icon}
            </div>
            <h6 className="font-bold text-slate-900 text-sm">{amenity.label}</h6>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{amenity.sub}</span>
          </div>
        ))}
      </div>

      {/* Hotel Details Presentation */}
      {packageData?.hotelDetails && typeof packageData.hotelDetails === 'object' && !Array.isArray(packageData.hotelDetails) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {Object.entries(packageData.hotelDetails).map(([city, hotelInfo], index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-green/20 to-transparent rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
              
              <div className="relative bg-white border border-slate-100 group-hover:border-brand-green/20 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                {/* Floating City Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg group-hover:bg-yellow-600 transition-colors duration-500">
                    <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-[10px]">
                      {index + 1}
                    </span>
                    <span className="font-black text-[11px] uppercase tracking-widest">{city}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="pt-12 p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:rotate-3 transition-transform duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-transparent opacity-50" />
                          <span className="text-4xl relative z-10">🏨</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h5 className="font-black text-slate-900 text-2xl leading-tight group-hover:text-yellow-700 transition-colors duration-500">
                        {typeof hotelInfo === 'string' ? hotelInfo : hotelInfo?.name || hotelInfo?.hotelName || 'Premium Resort'}
                      </h5>
                      
                      {typeof hotelInfo === 'object' && hotelInfo?.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(parseInt(hotelInfo.rating) || 4)].map((_, i) => (
                              <span key={i} className="text-brand-green text-sm">⭐</span>
                            ))}
                          </div>
                          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg">
                            {hotelInfo.rating} Star Class
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {[
                          { text: "Breakfast Included", icon: <Utensils className="w-3 h-3" /> },
                          { text: "AC Rooms", icon: <Wind className="w-3 h-3" /> },
                          { text: "Free WiFi", icon: <Wifi className="w-3 h-3" /> }
                        ].map((tag, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 px-3 py-1.5 rounded-xl group-hover:border-brand-green/30 transition-colors">
                            {tag.icon}
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Base */}
                <div className="px-8 pb-6 flex justify-between items-center bg-slate-50/50">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Verified Property Partner</span>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback Luxury Splash Card - Clean, Balanced Redesign */
        <div className="relative mt-8 bg-slate-900 rounded-[2rem] overflow-hidden p-6 md:p-8 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Left Visual Badge */}
              <div className="flex-shrink-0 relative">
                <div className="w-40 h-40 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl relative">
                  <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                  <Building2 className="w-10 h-10 text-brand-green mb-2" />
                  <div className="text-xl font-black tracking-tighter">PREMIUM</div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-white/60 mt-1">Hospitality</div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-brand-green text-white px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  4-5 Star
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">
                  Curated for Comfort
                </h3>
                <p className="text-white/70 text-base leading-relaxed mb-6 max-w-xl">
                  We partner with an elite selection of top-tier properties, ensuring your nights are as extraordinary as your days. Expect prime locations and exceptional service.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                    {[
                      { icon: <BedDouble className="w-4 h-4" />, text: "Premium Linen" },
                      { icon: <Utensils className="w-4 h-4" />, text: "Gourmet Dining" },
                      { icon: <Waves className="w-4 h-4" />, text: "Luxury Assets" },
                      { icon: <MapPin className="w-4 h-4" />, text: "Prime Location" }
                    ].map((tag, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3.5 py-2 bg-white/10 rounded-full border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                        <span className="text-brand-green">{tag.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{tag.text}</span>
                      </div>
                    ))}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaySection;
