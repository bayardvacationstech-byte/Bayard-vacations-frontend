import React from 'react';
import Image from 'next/image';

const ShareableHotelInfo = ({ hotelDetails }) => {
  const { 
    name, 
    category, 
    location, 
    rating, 
    roomType, 
    amenities, 
    checkIn, 
    checkOut,
    images 
  } = hotelDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 print:py-6">
      {/* Section Header */}
      <div className="mb-6 md:mb-8 print:mb-4">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Your <span className="text-brand-green">Accommodation</span>
        </h2>
        <p className="text-slate-600 text-sm md:text-lg font-medium">
          Luxury and comfort throughout your stay
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden print:rounded-2xl print:shadow-none print:break-inside-avoid">
        {/* Hotel Images */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-3 gap-0 print:hidden">
            {images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={image}
                  alt={`${name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="p-6 md:p-8 print:p-4">
          {/* Hotel Name and Rating */}
          <div className="mb-6 print:mb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 print:text-xl">
                  {name}
                </h3>
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium print:text-xs">{location}</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex flex-col items-start sm:items-end">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current print:w-4 print:h-4" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-500 print:text-[10px]">{category}</span>
              </div>
            </div>

            {/* Room Type */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg print:px-2 print:py-1">
              <svg className="w-4 h-4 text-blue-600 print:w-3 print:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-bold text-blue-900 print:text-xs">{roomType}</span>
            </div>
          </div>

          {/* Check-in/Check-out */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 print:mb-4 print:gap-3">
            <div className="bg-slate-50 rounded-2xl p-4 print:rounded-xl print:p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm print:w-8 print:h-8 print:shadow-none">
                  <svg className="w-5 h-5 text-brand-blue print:w-4 print:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Check-in</p>
                  <p className="text-sm md:text-base font-bold text-slate-900 print:text-xs">{checkIn}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 print:rounded-xl print:p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm print:w-8 print:h-8 print:shadow-none">
                  <svg className="w-5 h-5 text-brand-blue print:w-4 print:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Check-out</p>
                  <p className="text-sm md:text-base font-bold text-slate-900 print:text-xs">{checkOut}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-sm md:text-base font-black text-slate-900 mb-3 uppercase tracking-wider print:text-xs print:mb-2">
              Hotel Amenities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 print:grid-cols-3 print:gap-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 print:gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium print:text-[10px]">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableHotelInfo;
