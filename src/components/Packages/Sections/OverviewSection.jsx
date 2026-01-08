import React from "react";
import Image from "next/image";
import { splitCityStr } from "@/lib/utils";

const OverviewSection = ({ packageData }) => {
  const cities = splitCityStr(packageData?.citiesList);
  const heroImage = packageData?.bannerImages?.[0]?.url;

  return (
    <div id="overview" className="bg-white rounded-3xl py-6 md:py-6 md:px-6 scroll-mt-48 mb-6 border border-slate-100 shadow-sm">
      {/* Header Section */}
      <div className="mb-12 relative">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 rounded-full text-[10px] font-bold text-brand-green border border-brand-green/20 w-fit uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
            Premium Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Discover the <span className="text-brand-green">Heart</span> of Your Journey
          </h2>
        </div>
      </div>

      {/* Main Layout - Standardized Two Column */}
      <div className="flex flex-col lg:flex-row gap-6 lg:h-[500px]">
        
        {/* Left: Hero Card - Duration & Overview */}
        <div className="w-full lg:w-2/3 relative group rounded-[2.5rem] overflow-hidden h-full min-h-[400px]">
          {/* Background Image */}
          <div className="absolute inset-0 bg-slate-900">
            {heroImage && (
              <Image
                src={heroImage}
                alt="Destination"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20">
                <span className="text-amber-400">✨</span> Premium Package
              </div>
              <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9]">
                {packageData?.nights || "4"}N / {(packageData?.nights || 4) + 1}D
                <span className="block text-2xl md:text-3xl font-light text-white/80 mt-4 tracking-wide">
                  Adventure Awaits
                </span>
              </h3>
            </div>
            
            <div className="space-y-8">
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl font-light">
                {packageData?.description || 
                  `Embark on an unforgettable ${packageData?.nights || 'multi'}-night journey through ${cities[0] || 'amazing destinations'}. This carefully curated package offers the perfect blend of adventure, relaxation, and cultural immersion.`}
              </p>
              
              {/* Glass Stats Row */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "🏙️", label: "Cities", value: cities.length },
                  { icon: "⭐", label: "Hotels", value: packageData?.hotelCategory || "Premium" },
                  { icon: "🍽️", label: "Meals", value: "Included" }
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <div className="text-lg font-bold text-white leading-none">{stat.value}</div>
                      <div className="text-[10px] text-white/60 uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Quick Stats Column */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {/* Nights Card */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-[2rem] p-6 border border-blue-100 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all min-h-[200px]">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
            <div className="relative">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2">
                {packageData?.nights || "4"}
              </div>
              <div className="text-slate-900 font-bold text-lg">Nights of Magic</div>
              <div className="text-slate-500 text-sm mt-1">+ {(packageData?.nights || 4) + 1} Days of Adventure</div>
            </div>
          </div>
          
          {/* Experiences Card */}
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-white rounded-[2rem] p-6 border border-purple-100 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all min-h-[200px]">
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-purple-500/20 transition-colors" />
            <div className="relative">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2">
                {packageData?.itineraries?.length || "5"}+
              </div>
              <div className="text-slate-900 font-bold text-lg">Experiences</div>
              <div className="text-slate-500 text-sm mt-1">Curated Just For You</div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Strip */}
      <div className="mt-8">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Your <span className="text-brand-green">Destinations</span></h2>
        <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="min-w-[200px] flex flex-col justify-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest w-fit">
                  <span className="text-xs">📍</span> Route Map
               </div>
               <p className="text-lg font-medium text-slate-600 mt-2">{cities.length} stops included</p>
            </div>
          
            <div className="flex-1 overflow-x-auto pb-4 md:pb-0">
              <div className="flex items-center gap-4 min-w-max">
                {cities.map((city, index) => (
                  <React.Fragment key={index}>
                    <div className="group relative">
                      <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-800 rounded-2xl transition-all duration-300 cursor-default">
                        <span className="text-xl group-hover:scale-110 transition-transform">📍</span>
                        <div>
                          <div className="font-bold text-sm uppercase tracking-wide">{city}</div>
                          <div className="text-[10px] opacity-60 font-medium">Stop {index + 1}</div>
                        </div>
                      </div>
                    </div>
                    {index < cities.length - 1 && (
                       <div className="w-12 h-[2px] bg-slate-100 relative">
                         <div className="absolute inset-0 bg-slate-200 w-1/2 animate-[shimmer_2s_infinite]" />
                       </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
