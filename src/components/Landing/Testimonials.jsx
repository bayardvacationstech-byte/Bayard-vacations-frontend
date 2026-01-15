"use client";

import Image from "next/image";
import Container from "../ui/Container";
import { InfiniteMovingCardsDemo } from "../InfiniteMovingCardsDemo";
import { Sparkles, MapPin } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials({ reviews }) {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isHovering = useRef(false);

  // Stunning background image
  const bgImage = "/img/package-img/swiss-alps.jpg";

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

        // Smooth floating movement for idle state
        const rx = width * 0.25;
        const ry = height * 0.2;
        const cx = width / 2;
        const cy = height / 2;

        const x = cx + rx * Math.sin(time * 0.5);
        const y = cy + ry * Math.cos(time * 0.7);

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
      className="relative overflow-hidden bg-[#020617] py-24 lg:py-40"
    >
      {/* 1. Base Background: Deeply Blurred & Darkened */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImage}
          alt="Background Muted"
          fill
          className="object-cover scale-110 blur-[40px] opacity-40 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      {/* 2. Reveal Background: Sharp & Vibrant (Masked by Spotlight) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
        style={{
          maskImage: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, black, transparent 100%)`,
        }}
      >
        <Image
          src={bgImage}
          alt="Background Focus"
          fill
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-brand-blue/10 backdrop-brightness-110" />
      </div>

      {/* 3. Ambient Light Glow following mouse */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(34, 211, 238, 0.08), transparent 80%)`
        }}
      />

      {/* CONTENT LAYER */}
      <Container className="relative z-30">
        <div className="flex flex-col items-center justify-center text-center gap-10 mb-24">
          
          {/* Elegant Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-50/80">
              Global Explorer Stories
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.9] flex flex-col items-center"
            >
              <span className="opacity-50 text-3xl md:text-4xl lg:text-5xl font-medium tracking-normal mb-2">Trusted and</span>
              <span className="relative">
                Loved Worldwide
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light font-outfit"
            >
              Discover why thousands of adventurers trust us to craft their perfect journey.
            </motion.p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
           {/* Decorative corner accents */}
           <div className="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
           <div className="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl pointer-events-none" />
           
           <InfiniteMovingCardsDemo reviews={reviews} />
        </div>
      </Container>

      {/* Floating Background Sparkles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1 bg-cyan-400/30 rounded-full blur-[1px]"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.4, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  );
}
