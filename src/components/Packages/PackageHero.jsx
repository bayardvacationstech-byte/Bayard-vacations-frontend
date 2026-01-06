"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { H1 } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";

const PackageHero = ({ packageData, isExploring, setIsExploring }) => {
  const sectionRef = React.useRef(null);
  
  const validBannerImages =
    packageData?.bannerImages?.filter((image) => image && image?.url !== null) ||
    [];

  const mainImage = validBannerImages[0]?.url || "/placeholder.jpg";

  // Showcase images (the overlapping cards at the bottom)
  // We'll take up to 5 images for the gallery
  const galleryImages = validBannerImages.slice(0, 5);

  const prevScrollY = React.useRef(0);
  const hasScrolledDown = React.useRef(false);

  // Robust reset logic: Detect manual scroll-to-top
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // If we scroll down significantly, mark that we've left the hero
      if (currentScroll > 300) {
        hasScrolledDown.current = true;
      }
      
      // If we are back at the top AND we previously scrolled down, reset the UI
      if (currentScroll < 50 && isExploring && hasScrolledDown.current) {
        setIsExploring(false);
        hasScrolledDown.current = false;
      }
      
      prevScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExploring, setIsExploring]);

  const scrollToNext = () => {
    // Reset the flag immediately on click to ensure animation isn't cancelled
    hasScrolledDown.current = false; 
    setIsExploring(true);
    
    // Wait for the collapse animation before scrolling
    setTimeout(() => {
      const element = document.getElementById("experiences-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  };

  const title = packageData?.packageTitle || "";
  const titleLength = title.length;
  
  // Dynamic font sizing based on length to prevent layout breakage
  // We use a base of 100px for short titles and scale down
  const getDynamicFontSize = () => {
    if (titleLength > 35) return "clamp(40px, 6vw, 65px)";
    if (titleLength > 25) return "clamp(50px, 8vw, 85px)";
    return "clamp(60px, 10vw, 100px)";
  };

  return (
    <section id="hero-section" ref={sectionRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mainImage}
          alt={title || "Hero Background"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <Container className="relative z-20 flex flex-col items-center text-center -mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isExploring ? 0 : 1, 
            y: isExploring ? -30 : 0 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl flex flex-col items-center"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6 drop-shadow-2xl text-center uppercase"
            style={{ 
              fontFamily: "'Denton Test', 'Klausen', serif",
              fontWeight: 420,
              fontSize: getDynamicFontSize(),
              lineHeight: "100%",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </motion.h1>
          <p 
            className="max-w-xl mx-auto px-4 text-white/90 mb-10"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "2%",
              textAlign: "center",
            }}
          >
            A thoughtfully curated space where every image has purpose, presence,
            and a place. Explore collections that speak in stillness, color, and story.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={scrollToNext}
              className="bg-white text-black hover:bg-white/90 rounded-none transition-all duration-300 shadow-2xl font-semibold tracking-widest uppercase flex items-center justify-center p-0"
              style={{
                width: "177px",
                height: "62px",
              }}
            >
              Explore Now
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Image Gallery at the bottom */}
      <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-full max-w-6xl flex justify-center items-end h-[400px] pointer-events-none z-10">
        <div className="relative w-full h-full flex justify-center items-end">
          {galleryImages.map((img, idx) => {
            const total = galleryImages.length;
            const mid = (total - 1) / 2;
            const diff = idx - mid;
            
            // Fanned out like a poker hand
            const fanRotation = diff * 15; 
            const fanX = diff * 140;
            const fanY = Math.abs(diff) * 35;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 300, rotate: diff * 20 }}
                animate={{ 
                  opacity: 1, 
                  y: isExploring ? 200 : fanY, 
                  rotate: isExploring ? 0 : fanRotation, 
                  x: isExploring ? 0 : fanX,
                  scale: isExploring ? 0.7 : 1,
                }}
                transition={{ 
                  duration: isExploring ? 0.8 : 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isExploring ? (total - idx) * 0.05 : 0.6 + idx * 0.1
                }}
                className="absolute w-36 md:w-48 lg:w-56 h-[240px] md:h-[340px] lg:h-[420px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden bg-white/5 backdrop-blur-sm"
                style={{ 
                  zIndex: isExploring ? 100 + idx : 10 + (idx === 2 ? 50 : idx),
                  transformOrigin: "bottom center"
                }} 
              >
                <Image
                  src={img.url}
                  alt={`Hero Gallery ${idx}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackageHero;
