"use client";
import React from "react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CategorySlider = () => {
  return (
    <div className="overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        loop
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="relative h-[500px]">
            <div className="absolute left-0 top-0 z-10 size-full">
              <Image
                alt="Lorem"
                src="/img/landscapes/landscapes-1.jpg"
                height={384}
                width={1400}
                className="size-full object-cover"
              />
            </div>
            <div className="relative z-20 flex h-full max-w-[600px] flex-col justify-end gap-2 p-8 text-white lg:p-16">
              <h5 className="font-bold">Goa</h5>
              <h3 className="mb-2 text-3xl font-bold lg:text-5xl">
                Baga Beach
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[500px]">
            <div className="absolute left-0 top-0 z-10 size-full">
              <Image
                alt="Lorem"
                src="/img/landscapes/landscapes-2.jpg"
                height={384}
                width={1400}
                className="size-full object-cover"
              />
            </div>
            <div className="relative z-20 flex h-full max-w-[600px] flex-col justify-end gap-2 p-8 text-white lg:p-16">
              <h5 className="font-bold">Goa</h5>
              <h3 className="mb-2 text-3xl font-bold lg:text-5xl">
                Baga Beach
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[500px]">
            <div className="absolute left-0 top-0 z-10 size-full">
              <Image
                alt="Lorem"
                src="/img/landscapes/landscapes-3.jpg"
                height={384}
                width={1400}
                className="size-full object-cover"
              />
            </div>
            <div className="relative z-20 flex h-full max-w-[600px] flex-col justify-end gap-2 p-8 text-white lg:p-16">
              <h5 className="font-bold">Goa</h5>
              <h3 className="mb-2 text-3xl font-bold lg:text-5xl">
                Baga Beach
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[500px]">
            <div className="absolute left-0 top-0 z-10 size-full">
              <Image
                alt="Lorem"
                src="/img/landscapes/landscapes-4.jpg"
                height={384}
                width={1400}
                className="size-full object-cover"
              />
            </div>
            <div className="relative z-20 flex h-full max-w-[600px] flex-col justify-end gap-2 p-8 text-white lg:p-16">
              <h5 className="font-bold">Goa</h5>
              <h3 className="mb-2 text-3xl font-bold lg:text-5xl">
                Baga Beach
              </h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategorySlider;
