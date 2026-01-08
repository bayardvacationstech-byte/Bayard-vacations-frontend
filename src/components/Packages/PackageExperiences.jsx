import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PackageExperiences = ({ packageData }) => {
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

  const scrollToItinerary = () => {
    const element = document.getElementById("itinerary-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Take some images from packageData to populate the experiences
  // In a real scenario, these might come from specific fields
  const displayImages = packageData?.bannerImages?.slice(0, 3) || [];

  return (
    <section ref={sectionRef} id="experiences-section" className="relative w-full bg-white text-slate-900 overflow-hidden py-12 rounded-3xl border border-slate-100 shadow-sm mb-6">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full text-[10px] font-bold text-purple-600 border border-purple-200 mb-4 uppercase tracking-widest">
            <span className="text-xs">🎨</span> Visual Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight leading-tight">Experiences & <span className="text-brand-green">Activities</span></h2>
          <p className="text-lg font-medium text-slate-600">Discover the highlights of your adventure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Categories (Vertical) */}
          <div className="flex flex-col space-y-0 relative">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className="group relative transition-all duration-500 text-left py-1 outline-none"
              >
                <span 
                  className={`transition-all duration-500 block ${
                    activeTab === exp.id ? "text-brand-green opacity-100 scale-105 origin-left" : "text-slate-300 hover:text-slate-400"
                  }`}
                  style={{ 
                    fontFamily: "Satoshi, sans-serif",
                    fontSize: "clamp(40px, 6vw, 80px)",
                    lineHeight: "1.1",
                    fontWeight: activeTab === exp.id ? 900 : 400
                  }}
                >
                  {exp.label}
                </span>
                {activeTab === exp.id && (
                  <motion.div 
                    layoutId="active-underline"
                    className="h-1.5 bg-brand-blue w-full absolute bottom-2 left-0 rounded-full shadow-sm"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Side: Image Card Stack */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {displayImages.map((_, i) => {
                  // Pick different images based on category index to make it feel dynamic
                  const catIdx = experiences.findIndex(e => e.id === activeTab);
                  const imgIdx = (catIdx + i) % (packageData?.bannerImages?.length || 1);
                  const image = packageData?.bannerImages?.[imgIdx] || displayImages[i];

                  const rotations = [-15, 0, 15];
                  const xOffsets = isMobile ? [-40, 0, 40] : [-220, 0, 220];
                  const zIndices = [10, 30, 20];
                  const scales = [0.9, 1, 0.9];
                  const yOffsets = isMobile ? [20, 0, 30] : [40, 0, 60];

                  return (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: -800, rotate: rotations[i], x: xOffsets[i], scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        rotate: rotations[i], 
                        x: xOffsets[i], 
                        scale: scales[i], 
                        y: yOffsets[i] 
                      }}
                      exit={{ opacity: 0, y: 500, scale: 0.5, transition: { duration: 0.3 } }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 80, 
                        damping: 15,
                        delay: i * 0.1 
                      }}
                      className="absolute w-[220px] md:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white group"
                      style={{ zIndex: zIndices[i] }}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || activeTab}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white font-bold text-lg">{image.alt || activeTab}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PackageExperiences;

