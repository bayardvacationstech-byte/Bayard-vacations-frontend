import React, { useState } from "react";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PackageCard from "../ui/PackageCard";

const ItineraryFooter = ({ relatedPackages }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-brand-green/5 via-brand-blue/5 to-white pt-16 pb-12">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        </div>
        
        <Container className="relative z-10">
          <div className="mb-8 flex flex-col justify-between gap-4 c-lg:flex-row c-lg:items-center">
            <div>
              <h4 className="text-4xl md:text-5xl font-black text-slate-900 mb-1">Related <span className="text-brand-green">Packages</span></h4>
              <p className="text-slate-500 text-sm">More adventures you might love</p>
            </div>
            <div className="flex gap-3">
              <Button
                className="aspect-square h-10 w-10 rounded-full border border-slate-200 bg-white p-0 hover:bg-brand-green/10 hover:border-brand-green/50 transition-all shadow-sm"
                onClick={() => swiperInstance?.slidePrev()}
              >
                <MoveLeft className="w-4 h-4 text-slate-700" />
              </Button>
              <Button
                className="aspect-square h-10 w-10 rounded-full border border-slate-200 bg-white p-0 hover:bg-brand-green/10 hover:border-brand-green/50 transition-all shadow-sm"
                onClick={() => swiperInstance?.slideNext()}
              >
                <MoveRight className="w-4 h-4 text-slate-700" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              slidesPerView={1}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              className="section-slider"
            >
              {relatedPackages.map((item) => (
                <SwiperSlide key={item.id}>
                  <PackageCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </Container>
      </div>
    </section>
  );
};

export default ItineraryFooter;
