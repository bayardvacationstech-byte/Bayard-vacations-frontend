import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";

const PackageExperiences = ({ packageData, setIsExploring }) => {
  const experiences = [
    { id: "beaches", label: "Beaches" },
    { id: "activities", label: "Activities" },
    { id: "temples", label: "Temples" },
    { id: "village", label: "Village" },
    { id: "meals", label: "Meals" },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState("beaches");

  const scrollToHero = () => {
    setIsExploring(false);
    const element = document.getElementById("hero-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToItinerary = () => {
    const element = document.getElementById("itinerary-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Trigger animation when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Take some images from packageData to populate the experiences
  // In a real scenario, these might come from specific fields
  const displayImages = packageData?.bannerImages?.slice(0, 3) || [];

  return (
    <section ref={sectionRef} id="experiences-section" className="relative min-h-screen w-full bg-gradient-to-br from-orange-50 via-blue-50 to-white text-slate-900 flex items-center overflow-hidden py-12">
      {/* Blurred Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        {/* Left Side: Categories */}
        <div className="flex flex-col space-y-0 relative">
          {/* Back Button */}
          <motion.button
            onClick={scrollToHero}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-slate-400 hover:text-brand-green transition-colors duration-300 font-medium tracking-widest uppercase text-xs mb-8 group w-fit"
          >
            <span className="inline-block transform transition-transform group-hover:-translate-x-1">←</span>
            <span>Back</span>
          </motion.button>

          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(exp.id)}
              className="group relative transition-all duration-500 text-left py-1"
            >
              <span 
                className={`transition-colors duration-500 block ${
                  activeTab === exp.id ? "text-brand-green opacity-100" : "text-slate-300 hover:text-slate-400"
                }`}
                style={{ 
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: "clamp(50px, 5vw, 80px)",
                  lineHeight: "1",
                  fontWeight: 400
                }}
              >
                {exp.label}
              </span>
              {activeTab === exp.id && (
                <motion.div 
                  layoutId="active-underline"
                  className="h-1 bg-brand-blue w-full absolute bottom-2 left-0 rounded-full shadow-sm"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Image Cards */}
        <div className="relative h-[70vh] flex items-center justify-center">
          <AnimatePresence>
            {hasAnimated && (
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
              {/* Stack of cards */}
              {displayImages.map((img, idx) => {
                // Pulled positions inward to prevent clipping in 100vh
                const positions = [
                  { x: 30, y: -150, r: -6 },     // Top
                  { x: 220, y: 10, r: 8 },       // Middle Right
                  { x: -50, y: 180, r: -4 }      // Bottom
                ];
                const pos = positions[idx] || { x: 0, y: 0, r: 0 };

                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        y: -1000, 
                        rotate: pos.r - 45,
                        scale: 0.9
                      },
                      visible: { 
                        opacity: 1, 
                        x: pos.x,
                        y: pos.y, 
                        rotate: pos.r,
                        scale: 1
                      },
                      exit: { 
                        opacity: 0, 
                        y: 1000, 
                        rotate: pos.r + 45,
                        scale: 1.05
                      }
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: idx * 0.15
                    }}
                    className="absolute w-[210px] h-[280px] lg:w-[235px] lg:h-[315px] overflow-hidden rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10"
                    style={{
                      zIndex: idx === 1 ? 30 : 10 + idx,
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Experience ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                      <p className="text-xl lg:text-2xl font-medium tracking-tight text-white/95">
                        {idx === 0 ? "Benoa Beach" : idx === 1 ? "Broken Beach" : "Kelingking Cliff"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            )}
          </AnimatePresence>

          {/* View Itinerary Button */}
          <div className="absolute bottom-[-20px] right-0 z-20">
            <Button
              onClick={scrollToItinerary}
              className="gradient-btn text-white px-10 py-6 text-sm rounded-xl transition-all duration-300 shadow-xl font-semibold tracking-widest uppercase"
            >
              View itinerary
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PackageExperiences;

