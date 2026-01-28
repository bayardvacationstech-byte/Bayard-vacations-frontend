'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ShareableHotelInfo = ({ hotelDetails }) => {
  const hotels = Array.isArray(hotelDetails) ? hotelDetails : [hotelDetails];
  const bookRef = useRef(null);
  const state = useRef({});
  const zIndex = useRef(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.pageWrapper', { perspective: 1200 });
      gsap.set('.page', { transformStyle: 'preserve-3d' });
      gsap.set('.back', { rotationY: -180 });
      gsap.set(['.front', '.back'], { backfaceVisibility: 'hidden' });
    }, bookRef);

    return () => ctx.revert();
  }, []);

  const flip = (el) => {
    const id = el.dataset.id;

    if (!state.current[id] || state.current[id] === 'right') {
      zIndex.current++;
      gsap.to(el, {
        rotationY: -180,
        duration: 1.1,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        force3D: true,
        zIndex: zIndex.current,
        boxShadow: '0px 20px 40px rgba(0,0,0,.35)'
      });
      state.current[id] = 'left';
    } else {
      zIndex.current++;
      gsap.to(el, {
        rotationY: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
        force3D: true,
        zIndex: zIndex.current,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
      });
      state.current[id] = 'right';
    }
  };

  const HotelContent = ({ hotel, side = 'front' }) => {
    const { 
      name, category, location, rating, roomType, amenities, checkIn, checkOut, images 
    } = hotel;

    return (
      <div className="h-full flex flex-col bg-white overflow-hidden">
        {/* Images */}
        {images?.length > 0 && (
          <div className="relative h-32 flex-shrink-0 overflow-hidden">
            <div className="flex h-full">
              {images.slice(0, 2).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${name} photo ${i+1}`}
                  className="flex-1 object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-lg font-black text-slate-900 mb-2 line-clamp-2">{name}</h3>
          
          <div className="flex items-center gap-2 text-slate-600 mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-semibold">{location}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg border border-blue-100 mb-3">
            <span className="text-xs font-bold text-blue-900">{roomType}</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(rating || 0)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Check-in / Check-out */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <p className="text-[9px] font-bold text-slate-500 uppercase">Check-in</p>
              <p className="text-xs font-black text-slate-900">{checkIn}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <p className="text-[9px] font-bold text-slate-500 uppercase">Check-out</p>
              <p className="text-xs font-black text-slate-900">{checkOut}</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-900">Amenities</h4>
            <ul className="grid grid-cols-1 gap-1">
              {amenities?.slice(0, 4).map((a, i) => (
                <li key={i} className="flex items-center gap-1.5 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                  <span className="text-xs line-clamp-1">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Page fold corner */}
        <div className={`absolute top-0 ${side === 'front' ? 'right-0 pageFoldRight' : 'left-0 pageFoldLeft'}`} />
      </div>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-slate-50 print:bg-white print:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 print:mb-6">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Your <span className="text-blue-600">Accommodation</span>
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            Click pages to flip through your hotels
          </p>
        </div>

        {/* Book Container */}
        <div className="flex justify-center">
          <div
            ref={bookRef}
            className="relative w-full max-w-4xl bg-slate-800 rounded-xl shadow-2xl p-4 md:p-6"
            style={{ minHeight: '600px' }}
          >
            <div className="absolute inset-0 flex justify-center items-center p-4 md:p-6">
              <div className="bg-white w-full h-full relative rounded-lg shadow-inner">
                {/* Spine shadow */}
                <div className="absolute left-1/2 top-0 w-[3px] h-full bg-gradient-to-b from-black/30 via-black/10 to-black/30 z-50" />
                
                <div className="pageWrapper absolute left-1/2 top-0 w-1/2 h-full">
                  {hotels.map((hotel, i) => (
                    <div
                      key={i}
                      data-id={i}
                      className="page absolute w-full h-full cursor-pointer"
                      onClick={(e) => flip(e.currentTarget)}
                    >
                      {/* FRONT */}
                      <div className="pageFace front absolute inset-0 bg-gradient-to-r from-gray-100 to-white border-r border-slate-200">
                        <HotelContent hotel={hotel} side="front" />
                      </div>

                      {/* BACK */}
                      <div className="pageFace back absolute inset-0 bg-gradient-to-l from-gray-100 to-white border-l border-slate-200">
                        {hotels[i + 1] ? (
                          <HotelContent hotel={hotels[i + 1]} side="back" />
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-400">
                            <div className="text-center p-8">
                              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <p className="text-sm font-medium">End of accommodations</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 print:hidden">
          <p className="text-slate-600 text-sm">
            💡 <span className="font-semibold">Tip:</span> Click on any page to flip it and reveal the next hotel
          </p>
        </div>

        <style jsx>{`
          .pageFoldRight,
          .pageFoldLeft {
            width: 0;
            height: 0;
            border-bottom: 20px solid transparent;
            box-shadow: 0 5px 10px rgba(0,0,0,.2);
          }

          .pageFoldRight {
            border-left: 20px solid #ddd;
          }

          .pageFoldLeft {
            border-right: 20px solid #ddd;
          }
        `}</style>
      </div>
    </section>
  );
};

export default ShareableHotelInfo;
