"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard from "@/components/ui/PackageCard";
import Container from "@/components/ui/Container";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ItineraryFooter = ({ relatedPackages }) => {
  if (!relatedPackages || relatedPackages.length === 0) return null;

  return (
    <section className="bg-white py-8 md:py-10 border border-slate-100 shadow-sm rounded-3xl mb-4 md:mb-4 relative overflow-hidden" id="related-packages">
      {/* Decorative Blur similar to WhyBayardVacations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>
      <Container>
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            More <span className="text-brand-green">Adventures</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Explore other handpicked signatures and top-rated escapes in this region.
          </p>
        </div>

        <div className="relative group/nav">
          {/* Overlay Navigation Buttons */}
          <button className="swiper-button-prev-pkg absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
          </button>
          <button className="swiper-button-next-pkg absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 md:w-12 h-10 md:h-12 rounded-full bg-white/90 md:bg-white/95 shadow-lg md:shadow-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 md:opacity-0 group-hover/nav:opacity-100">
            <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={true}
            navigation={{
              prevEl: ".swiper-button-prev-pkg",
              nextEl: ".swiper-button-next-pkg",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
              1440: { slidesPerView: 4, spaceBetween: 24, centeredSlides: false },
            }}
            className="pb-6 md:pb-12"
          >
            {relatedPackages.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <PackageCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default ItineraryFooter;
