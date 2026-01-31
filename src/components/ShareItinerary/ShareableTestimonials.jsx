'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play, X, Maximize2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const ShareableTestimonials = ({ testimonials = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (!testimonials || testimonials.length === 0) return null;

  // Add dummy media to first few testimonials for demonstration if no attachments exist
  const enrichedTestimonials = testimonials.map((t, i) => {
    if (t.attachments && t.attachments.length > 0) return t;
    if (i === 0) {
      return {
        ...t,
        attachments: [
          { url: '/img/demo/bali-1.png', type: 'image' },
          { url: '/img/demo/bali-2.png', type: 'video', thumbnail: '/img/demo/bali-1.png' },
          { url: '/img/demo/bali-3.png', type: 'image' },
        ]
      };
    }
    if (i === 1) {
      return {
        ...t,
        attachments: [
          { url: '/img/demo/bali-3.png', type: 'image' },
          { url: '/img/demo/bali-1.png', type: 'image' },
        ]
      };
    }
    return t;
  });

  // Consolidate all media from all testimonials for the gallery
  const allMedia = enrichedTestimonials.reduce((acc, t) => {
    if (t.attachments && t.attachments.length > 0) {
      return [...acc, ...t.attachments];
    }
    return acc;
  }, []);

  return (
    <section className="py-6 md:py-10 bg-slate-50/50 relative overflow-hidden print:bg-white print:text-slate-900 print:py-8">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with Side Navigation - Blogs Carousel Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter leading-none">
              What Our <span className="text-brand-blue">Travelers</span> Say
            </h2>
            <p className="text-slate-500 text-sm md:text-lg font-medium">
              Real experiences from travelers who have explored the world with Bayard.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-3">
             <button className="testimonial-prev w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm active:scale-95">
                <ChevronLeft className="size-6" />
             </button>
             <button className="testimonial-next w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm active:scale-95">
                <ChevronRight className="size-6" />
             </button>
          </div>
        </div>

        {/* Clean Testimonials Carousel */}
        <div className="relative print:hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.testimonial-prev',
              nextEl: '.testimonial-next',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-6"
          >
            {enrichedTestimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-xl shadow-slate-200/50 border border-white h-full flex flex-col hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500">
                  {/* Classic Quote Icon - Smaller */}
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-brand-blue/20 mb-2 md:mb-4" />

                  {/* Rating: Classic Gold Stars - Tighter */}
                  <div className="flex items-center gap-1 mb-2 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text: Classic & Readable - Reduced Padding */}
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3 md:mb-6 flex-1 font-medium italic">
                    "{testimonial.review}"
                  </p>

                  {/* Author Info: Enhanced with Image */}
                  <div className="flex items-center gap-4 pt-3 md:pt-6 border-t border-slate-50">
                    <div className="relative w-12 h-12 rounded-full bg-brand-blue/10 border-2 border-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      {testimonial.image ? (
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-brand-blue font-black text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 leading-tight text-sm">
                        {testimonial.name}
                      </p>
                      {testimonial.location && (
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Consolidated Traveler Media Gallery - Premium Grid */}
        {allMedia.length > 0 && (
          <div className="mt-8 md:mt-10 pt-8 print:hidden text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-8 uppercase tracking-[0.2em]">
              Traveler's <span className="text-brand-blue">Moments</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allMedia.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedIdx(idx)}
                  className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group/media cursor-pointer"
                >
                  <Image 
                    src={item.thumbnail || item.url} 
                    alt="Traveler review media" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Premium Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/20 flex items-center justify-center transition-all opacity-0 group-hover/media:opacity-100 duration-500 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-white/40 backdrop-blur-xl flex items-center justify-center border border-white/40 scale-75 group-hover/media:scale-100 transition-transform duration-500">
                      {item.type === 'video' ? <Play className="size-6 text-white fill-white ml-0.5" /> : <Maximize2 className="size-6 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center select-none"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedIdx(null)}
                className="absolute top-8 right-8 z-[110] w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all text-white group"
              >
                <X className="size-8 group-hover:rotate-90 transition-transform duration-500" />
              </button>

              {/* Main Carousel */}
              <div className="w-full h-full max-w-6xl mx-auto flex items-center justify-center px-4">
                <Swiper
                  modules={[Navigation]}
                  initialSlide={selectedIdx}
                  onSlideChange={(swiper) => setSelectedIdx(swiper.activeIndex)}
                  navigation={{
                    prevEl: '.lightbox-prev',
                    nextEl: '.lightbox-next',
                  }}
                  className="w-full h-[80vh]"
                >
                  {allMedia.map((media, idx) => (
                    <SwiperSlide key={idx} className="flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {media.type === 'video' ? (
                          <video 
                            src={media.url} 
                            controls 
                            autoPlay 
                            className="max-h-full max-w-full rounded-2xl shadow-2xl"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <Image 
                              src={media.url || media.thumbnail} 
                              alt="Review Gallery" 
                              fill 
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Custom Navigation */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-8 pointer-events-none">
                <button className="lightbox-prev pointer-events-auto w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all text-white active:scale-95">
                  <ChevronLeft className="size-10" />
                </button>
                <button className="lightbox-next pointer-events-auto w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10 transition-all text-white active:scale-95">
                  <ChevronRight className="size-10" />
                </button>
              </div>

              {/* Counter Indicator */}
              <div className="absolute bottom-8 text-white/40 font-black tracking-[0.5em] text-sm uppercase">
                {selectedIdx + 1} / {allMedia.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Print View */}
        <div className="hidden print:grid grid-cols-2 gap-8 mt-12">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
               <p className="text-slate-800 text-sm mb-4 italic">"{testimonial.review}"</p>
               <p className="text-slate-900 font-bold text-xs">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShareableTestimonials;
