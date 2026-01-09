"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { InfiniteMovingCardsDemo } from "../InfiniteMovingCardsDemo";
import { Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Testimonials({ reviews }) {


  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const isHovering = useRef(false);

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  useEffect(() => {
    let animationFrameId;
    const startTime = Date.now();

    const animate = () => {
      if (!isHovering.current && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const time = (Date.now() - startTime) / 1000;

        // Figure-8 pattern
        const rx = width * 0.35;
        const ry = height * 0.35;
        const cx = width / 2;
        const cy = height / 2;

        const x = cx + rx * Math.cos(time * 0.5);
        const y = cy + ry * Math.sin(time * 0.8) * Math.cos(time * 0.2);

        setSpotlightPos({ x, y });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#1e3a8a] group py-12 sm:py-16 lg:py-20"
    >
      
      {/* Base Layer - Always Visible (Dim) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/testimonial_bg.webp"
          alt="World Map Background"
          fill
          className="object-cover object-top hidden sm:block"
        />
        <Image
          src="/testimonial_bg_mobile.webp"
          alt="World Map Background"
          fill
          className="object-cover object-top block sm:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-transparent to-[#1e3a8a]" />
      </div>

      {/* Spotlight Layer - Reveals Hybrid Brightness */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          maskImage: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black, transparent 100%)`,
        }}
      >
        <Image
          src="/testimonial_bg.webp"
          alt="World Map Background"
          fill
          className="object-cover object-top hidden sm:block"
        />
        <Image
          src="/testimonial_bg_mobile.webp"
          alt="World Map Background"
          fill
          className="object-cover object-top block sm:hidden"
        />
        {/* Subtle gradient overlay to blend edges even in spotlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0146b3]/30 via-transparent to-[#0146b3]/30" />
      </div>

      {/* Decorative Elements - Subtle Glow (Always Visible) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-[0.05] z-0">
          <Quote className="w-96 h-96 text-white absolute -top-20 -left-20 rotate-12" />
          <Quote className="w-96 h-96 text-white absolute bottom-0 -right-20 -rotate-12" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center gap-6 mb-16">
          
          {/* Badge - Glassmorphism */}
          <div className="section-badge-dark animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest">
              Testimonials
            </span>
          </div>

          {/* Headline - High Contrast White */}
          <h2 className="section-title-dark max-w-4xl animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100 fill-mode-backwards">
            <span className="md:hidden">Testimonials</span>
            <span className="hidden md:inline">Loved by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-cyan-300 to-white">
                Travelers Worldwide
              </span>
            </span>
          </h2>
          
          {/* Subtitle - Light Slate */}
          <p className="section-subtitle-dark max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-backwards hidden md:block">
             Discover why thousands of explorers trust Bayard Vacations to craft their perfect getaways. Real stories, real memories.
          </p>
        </div>

        <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-backwards">
          <InfiniteMovingCardsDemo reviews={reviews} />
        </div>
      </Container>
    </section>
  );
}
