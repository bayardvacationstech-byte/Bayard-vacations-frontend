import React from 'react';
import Image from 'next/image';

const ShareableHeader = ({ itineraryData }) => {
  const { 
    packageName, 
    destination, 
    bookingRef, 
    customerName, 
    travelDates, 
    duration,
    heroImage 
  } = itineraryData;

  return (
    <>
      {/* Hero Section - Full Height on Mobile */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-600 to-brand-green min-h-screen flex items-center justify-center print:min-h-0 print:bg-white">
        {/* Hero Background Image */}
        <div className="absolute inset-0 print:hidden">
          <img
            src={heroImage || '/img/bali-hero.png'}
            alt={destination}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 text-center px-4 py-8 print:hidden">
          {/* Logo - Top Left on Desktop, Centered on Mobile */}
          <div className="absolute top-6 left-4 md:left-8">
            <div className="relative h-8 w-auto md:h-10 aspect-[130/27]">
              <Image
                src="/img/logo.svg"
                alt="Bayard Vacations"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>

          {/* Artistic Title */}
          <div className="mt-12 md:mt-0">
            <p className="font-great-vibes text-3xl md:text-4xl lg:text-5xl text-yellow-400 mb-2">
              Experience
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-wider leading-tight uppercase">
              {packageName}
            </h1>
            
            {/* Duration Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-6 py-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm md:text-base font-bold tracking-wider">
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Print Version - Simplified */}
        <div className="hidden print:block relative py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative h-8 w-auto aspect-[130/27]">
              <Image
                src="/img/logo.svg"
                alt="Bayard Vacations"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Booking Ref</p>
              <p className="text-brand-blue text-lg font-black">{bookingRef}</p>
            </div>
          </div>
          <h1 className="text-3xl font-black text-brand-blue mb-2">{packageName}</h1>
          <p className="text-slate-600 text-sm">{destination} • {duration}</p>
        </div>

        {/* Trip Details Card - On Hero for Desktop (Right Side, Vertical) */}
        <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-20 print:hidden">
          <div className="flex flex-col gap-3 w-64">
            {/* Booking Reference */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-3xl p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1.5 letterspacing-wider">
                    Booking Reference
                  </p>
                  <p className="text-white text-base font-black tracking-wide">
                    {bookingRef}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Name */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-3xl p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                    Guest Name
                  </p>
                  <p className="text-white text-base font-black tracking-wide">
                    {customerName}
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-3xl p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                    Travel Dates
                  </p>
                  <p className="text-white text-base font-black tracking-wide">
                    {travelDates.displayCheckIn}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="group bg-white/25 backdrop-blur-lg border border-white/30 rounded-3xl p-5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                    Destination
                  </p>
                  <p className="text-white text-base font-black tracking-wide">
                    {destination}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details Card - Below Hero on Mobile Only */}
      <div className="md:hidden bg-white print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Booking Reference */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Booking Reference
                  </p>
                  <p className="text-slate-900 text-sm md:text-base font-bold">
                    {bookingRef}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Name */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Guest Name
                  </p>
                  <p className="text-slate-900 text-sm md:text-base font-bold">
                    {customerName}
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Travel Dates
                  </p>
                  <p className="text-slate-900 text-sm md:text-base font-bold">
                    {travelDates.displayCheckIn}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Destination
                  </p>
                  <p className="text-slate-900 text-sm md:text-base font-bold">
                    {destination}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareableHeader;
