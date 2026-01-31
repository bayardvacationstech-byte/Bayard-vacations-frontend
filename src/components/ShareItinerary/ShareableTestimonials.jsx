'use client';

import React, { useState } from 'react';
import { Star, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

const ShareableTestimonials = ({ testimonials = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (!testimonials || testimonials.length === 0) return null;

  // Extract all media for the gallery
  const allMedia = testimonials.reduce((acc, t) => {
    if (t.attachments && t.attachments.length > 0) {
      return [...acc, ...t.attachments];
    }
    return acc;
  }, []);

  // Demo media if none exists in data
  const galleryMedia = allMedia.length > 0 ? allMedia : [
    { url: '/images/packages/bali/hero.jpg', type: 'image' },
    { url: '/images/packages/bali/water-sports.jpg', type: 'image' },
    { url: '/images/packages/bali/bali-gate.jpg', type: 'image' },
    { url: '/images/hotels/seminyak/pool-view.jpg', type: 'image' },
    { url: '/images/packages/bali/temple.jpg', type: 'image' },
    { url: '/images/packages/bali/beach.jpg', type: 'image' },
    { url: '/img/demo/bali-1.png', type: 'image' },
    { url: '/img/demo/bali-2.png', type: 'image' },
    { url: '/img/demo/bali-3.png', type: 'image' },
  ];

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Simple & Clear Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Traveler <span className="text-brand-blue">Stories</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg font-medium">Real photos and reviews from our guests.</p>
        </div>

        {/* 1. Photo Gallery - Simple Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              Guest Moments
            </h3>
            
            {/* Gallery Navigation */}
            <div className="flex gap-2">
              <button className="gal-prev w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="gal-next w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.gal-prev',
              nextEl: '.gal-next',
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {galleryMedia.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  onClick={() => setSelectedIdx(idx)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <Image 
                    src={item.thumbnail || item.url} 
                    alt="Guest moment" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 2. Written Reviews - Simple Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-200"></span>
              Detailed Feedback
            </h3>
            
            {/* Carousel Navigation - Placed right above the carousel */}
            <div className="flex gap-2">
              <button className="test-prev w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="test-next w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue transition-all shadow-sm z-10">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.test-prev',
              nextEl: '.test-next',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-4"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col h-full shadow-sm hover:border-brand-blue/20 transition-all group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < (testimonial.rating || 5) ? 'fill-brand-blue text-brand-blue' : 'text-slate-100'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-8 flex-1 font-medium italic text-sm">
                    "{testimonial.review}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue font-black text-xs border border-slate-100 shadow-sm shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {testimonial.location || 'Verified Guest'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Ultra Simple Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12"
            onClick={() => setSelectedIdx(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X className="w-10 h-10" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              {galleryMedia[selectedIdx].type === 'video' ? (
                <video src={galleryMedia[selectedIdx].url} controls autoPlay className="max-h-full rounded-2xl" />
              ) : (
                <div className="relative w-full h-full">
                  <Image src={galleryMedia[selectedIdx].url} alt="Gallery" fill className="object-contain" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShareableTestimonials;
