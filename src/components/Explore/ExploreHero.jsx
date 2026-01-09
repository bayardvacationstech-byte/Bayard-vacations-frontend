"use client";

import React from "react";
import Image from "next/image";

const ExploreHero = () => {
  return (
    <div className="relative h-[60vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden group">
      {/* Background Image */}
      <Image
        src="/img/explore-hero.png"
        alt="Explore Journeys"
        fill
        priority
        className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl font-nord tracking-tight leading-[1.1]">
          Explore Extraordinary <span className="text-brand-blue">Journeys</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-4 max-w-2xl mx-auto font-medium">
          Discover handpicked collections and tailored experiences designed for your perfect getaway.
        </p>
      </div>

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-15" />
    </div>
  );
};

export default ExploreHero;
