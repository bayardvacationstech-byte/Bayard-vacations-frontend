"use client";
import React, { useState, useRef } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import EnquiryFormFields from "@/components/Forms/EnquiryForm/EnquiryFormFields";

const DESTINATION_CARDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    title: "Paris",
    subtitle: "City of Lights",
    tag: "Romantic",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    title: "Bali",
    subtitle: "Island Paradise",
    tag: "Beach",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
    title: "Italy",
    subtitle: "La Dolce Vita",
    tag: "Culture",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    title: "Japan",
    subtitle: "Land of Rising Sun",
    tag: "Adventure",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
    title: "Maldives",
    subtitle: "Tropical Bliss",
    tag: "Luxury",
  },
];

function SwipeCard({ card, onSwipe, isTop, index, exitDirection }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    const threshold = 80;
    const { offset } = info;
    
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (Math.abs(offset.x) > threshold) {
        onSwipe(offset.x > 0 ? "right" : "left");
      }
    } else {
      // Vertical swipe
      if (Math.abs(offset.y) > threshold) {
        onSwipe(offset.y > 0 ? "down" : "up");
      }
    }
  };

  // Calculate stacking offset and rotation for back cards - more crossed/fanned
  const stackOffset = index * 12; // Vertical offset
  const stackOffsetX = index * 15; // Horizontal offset for crossed look
  const stackScale = 1 - index * 0.04; // Scale down back cards
  const stackRotate = index * -8; // More tilt for crossed effect

  // Exit animation based on direction
  const getExitAnimation = () => {
    const base = { opacity: 0, transition: { duration: 0.4 } };
    switch (exitDirection) {
      case "left": return { ...base, x: -500, y: 0, rotate: -45 };
      case "right": return { ...base, x: 500, y: 0, rotate: 45 };
      case "up": return { ...base, x: 0, y: -500, rotate: -10, scale: 0.8 };
      case "down": return { ...base, x: 0, y: 500, rotate: 10, scale: 0.8 };
      default: return { ...base, x: -500 };
    }
  };

  return (
    <motion.div
      className={`absolute w-full h-full ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={isTop ? { x, y, rotate, opacity } : {}}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={{ 
        scale: stackScale, 
        x: isTop ? 0 : stackOffsetX,
        y: isTop ? 0 : stackOffset, 
        rotate: isTop ? 0 : stackRotate,
        zIndex: 10 - index 
      }}
      animate={{ 
        scale: stackScale, 
        x: isTop ? 0 : stackOffsetX,
        y: isTop ? 0 : stackOffset, 
        rotate: isTop ? 0 : stackRotate,
        zIndex: 10 - index 
      }}
      exit={getExitAnimation()}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Like/Nope Indicators */}
        {isTop && (
          <>
            <motion.div 
              className="absolute top-6 right-6 px-4 py-2 border-4 border-green-500 text-green-500 font-black text-2xl rounded-lg rotate-12"
              style={{ opacity: likeOpacity }}
            >
              LIKE
            </motion.div>
            <motion.div 
              className="absolute top-6 left-6 px-4 py-2 border-4 border-red-500 text-red-500 font-black text-2xl rounded-lg -rotate-12"
              style={{ opacity: nopeOpacity }}
            >
              NOPE
            </motion.div>
          </>
        )}
        
        {/* Tag Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold">
            {card.tag}
          </span>
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{card.title}</h3>
              <p className="text-white/80 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {card.subtitle}
              </p>
            </div>
            <button className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2 hover:bg-white/30 transition-all text-white text-sm font-semibold group">
              <span>View Deal</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-brand-blue transition-colors">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Newsletter() {
  const [cards, setCards] = useState(DESTINATION_CARDS);
  const [exitDirection, setExitDirection] = useState("left");

  const handleSwipe = (direction) => {
    setExitDirection(direction);
    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const swipedCard = newCards.shift();
        // Add the swiped card back to the end for infinite loop
        newCards.push(swipedCard);
        return newCards;
      });
    }, 50);
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-blue/5 via-slate-50 to-white overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left - Swipable Cards */}
          <div className="order-1 lg:order-1 flex flex-col items-center">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[450px]">
              <AnimatePresence mode="popLayout">
                {cards.slice(0, 3).map((card, index) => (
                  <SwipeCard
                    key={card.id}
                    card={card}
                    index={index}
                    onSwipe={handleSwipe}
                    isTop={index === 0}
                    exitDirection={exitDirection}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* Desktop Control Buttons */}
            <div className="hidden sm:flex items-center gap-8 mt-8">
              {/* Skip Button */}
              <button 
                onClick={() => handleSwipe("left")}
                className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
                title="Skip"
              >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              
              {/* Like Button */}
              <button 
                onClick={() => handleSwipe("right")}
                className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                title="Like"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="sm:hidden mt-8 text-sm text-slate-500 flex items-center gap-2">
              <span>← Swipe to explore →</span>
            </div>
          </div>

          {/* Right - Newsletter Form */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Badge */}
            <div className="section-badge-light mb-6">
              <Mail className="size-4" />
              <span>Get in Touch</span>
            </div>

            {/* Heading */}
            <h2 className="section-title-light mb-4">
              <span className="text-brand-blue">Let Us Inspire You</span>
            </h2>

            {/* Description */}
            <p className="section-subtitle-light mb-8 max-w-md mx-auto lg:mx-0 hidden md:block">
              Share your contact details and our travel experts will help you plan your dream vacation.
            </p>

            {/* Form */}
            <div className="max-w-md mx-auto lg:mx-0 mb-4">
              <EnquiryFormFields 
                formType="potential"
                variant="newsletter"
                hideFields={["destination"]}
                onSuccess={() => {}}
              />
            </div>

            {/* Trust Text */}
            <p className="text-sm text-slate-500 flex items-center gap-1.5 justify-center lg:justify-start">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
