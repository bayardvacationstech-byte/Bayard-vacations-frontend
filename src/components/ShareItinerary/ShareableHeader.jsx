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
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-600 to-brand-green print:bg-white">
      {/* Hero Background Image */}
      <div className="absolute inset-0 print:hidden">
        <Image
          src={heroImage || '/img/bali-hero.png'}
          alt={destination}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 print:py-6">
        {/* Logo and Booking Reference */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 md:mb-8 print:mb-4">
          <div className="flex items-center gap-3">
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

          {/* Booking Reference Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 print:bg-white print:border-slate-200">
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1 print:text-slate-500">
              Booking Reference
            </p>
            <p className="text-white text-lg md:text-xl font-black tracking-wider print:text-brand-blue">
              {bookingRef}
            </p>
          </div>
        </div>

        {/* Package Title */}
        <div className="mb-6 md:mb-8 print:mb-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 md:mb-3 tracking-tight leading-tight print:text-brand-blue print:text-4xl">
            {packageName}
          </h2>
          <div className="flex items-center gap-2 text-blue-100 print:text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-base md:text-lg font-semibold">{destination}</span>
          </div>
        </div>

        {/* Travel Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {/* Customer Name */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 print:bg-slate-50 print:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center print:bg-white">
                <svg className="w-5 h-5 text-white print:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-0.5 print:text-slate-500">
                  Guest Name
                </p>
                <p className="text-white text-sm md:text-base font-bold print:text-slate-900">
                  {customerName}
                </p>
              </div>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 print:bg-slate-50 print:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center print:bg-white">
                <svg className="w-5 h-5 text-white print:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-0.5 print:text-slate-500">
                  Travel Dates
                </p>
                <p className="text-white text-sm md:text-base font-bold print:text-slate-900">
                  {travelDates.displayCheckIn}
                </p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 print:bg-slate-50 print:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center print:bg-white">
                <svg className="w-5 h-5 text-white print:text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-0.5 print:text-slate-500">
                  Duration
                </p>
                <p className="text-white text-sm md:text-base font-bold print:text-slate-900">
                  {duration}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableHeader;
