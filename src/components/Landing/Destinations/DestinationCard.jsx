

"use client";

import { CarouselItem } from "../../ui/carousel";
import { useDestinationImage } from "@/hooks/useDestinationImage";
import { useRegion } from "@/hooks/regions";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DestinationCard({
  regionSlug,
  inCarousel = false,
  index = 0,
}) {
  const { image: queryImage, isLoading: imageLoading, error: imageError } = useDestinationImage(regionSlug);
  const { regionData, isLoading: regionLoading, error: regionError } = useRegion(regionSlug);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Use region's featuredImage first, then fall back to query image
  const image = regionData?.featuredImage || queryImage;
  const isLoading = regionLoading || imageLoading;
  const error = regionError || imageError;

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const SliderItem = inCarousel ? CarouselItem : "div";

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <SliderItem
        className={`relative bg-gray-100 p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl aspect-[5/6] 
        w-[80%] sm:w-full
        basis-[80%] sm:basis-1/2 lg:basis-1/4 
        cursor-pointer transition-all duration-500 ease-out shadow-lg flex-shrink-0
        ${shouldAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${isHovered ? "scale-[1.03] shadow-2xl" : "scale-100 shadow-lg"}
        `}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/packages/${regionSlug}`} className="block h-full">
          {!isMounted || isLoading ? (
            <div className="absolute inset-0 z-10 h-full w-full overflow-hidden rounded-xl md:rounded-2xl isolation-isolate">
              <div
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                style={{
                  animation: "shimmer 2s infinite linear",
                  backgroundSize: "200% 100%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-50" />
            </div>
          ) : image && image.url ? (
            <>
              <div 
                className="absolute inset-0 z-10 overflow-hidden rounded-xl md:rounded-2xl isolation-isolate transform-gpu backface-hidden"
                style={{ 
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  transform: "translate3d(0,0,0)",
                  perspective: "1px",
                  WebkitPerspective: "1px" 
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
                >
                  <Image
                    src={image.url}
                    alt={image.title || regionSlug}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    priority={index < 4}
                    onLoadingComplete={() => setIsLoaded(true)}
                  />
                  <div
                    className="absolute inset-0 bg-white transition-opacity duration-500"
                    style={{ opacity: isLoaded ? 0 : 1 }}
                  />
                </div>
              </div>

              <div className="absolute inset-0 z-20 overflow-hidden rounded-xl md:rounded-2xl">
                {/* Enhanced Gradient for better text pop */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500"
                  style={{ opacity: isHovered ? 0.95 : 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div
                  className="absolute -inset-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-1000"
                  style={{
                    transform: isHovered
                      ? "translateX(300%)"
                      : "translateX(-100%)",
                    left: isHovered ? "100%" : "-50%",
                  }}
                />
              </div>

              {regionData?.name && (
                <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-5 md:p-6 pb-6 sm:pb-8">
                  <div className="relative flex flex-col items-center">
                    <div
                      className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-500"
                      style={{
                        filter: "blur(8px)",
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />

                    <h3
                      className="relative text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-center font-sans transition-all duration-300 drop-shadow-lg uppercase"
                      style={{
                        transform: isHovered
                          ? "translateY(-4px)"
                          : "translateY(0)",
                      }}
                    >
                      {regionData.name}
                      <span className="block h-0.5 w-0 bg-brand-blue/80 mx-auto mt-2 transition-all duration-500 ease-out overflow-hidden shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                        <span
                          className="block h-full bg-white transition-all duration-500 ease-out"
                          style={{ width: isHovered ? "100%" : "0px" }}
                        />
                      </span>
                    </h3>
                    
                    {/* Marketing Subtitle */}
                     <p 
                      className="text-white/80 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase mt-2 transition-all duration-500 transform"
                      style={{
                        opacity: isHovered ? 1 : 0.7,
                        transform: isHovered ? "translateY(-2px)" : "translateY(0)"
                      }}
                    >
                      Explore Packages
                    </p>

                    <div
                      className="mt-4 transition-all duration-500"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateY(0) scale(1)"
                          : "translateY(10px) scale(0.95)",
                      }}
                    >
                        {/* Glassmorphism Button */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full group transition-all hover:bg-white/20 hover:border-white/50">
                          <span className="text-white text-xs font-bold tracking-wider uppercase">
                            View Details
                          </span>
                          <div className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform">
                             <svg
                              className="w-full h-full"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="absolute inset-0 z-25 rounded-xl md:rounded-2xl border-2 border-white/0 transition-all duration-500"
                style={{
                  borderColor: isHovered
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0)",
                }}
              />
            </>
          ) : error ? (
            <>
              <div 
                className="absolute inset-0 z-10 overflow-hidden rounded-xl md:rounded-2xl isolation-isolate transform-gpu backface-hidden"
                style={{ 
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  transform: "translate3d(0,0,0)",
                  perspective: "1px",
                  WebkitPerspective: "1px" 
                }}
              >
                <video
                  src="https://cdn.bayardvacations.com/videos/hero_section.webm"
                  alt="Hero"
                  placeholder="blur"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full transition-transform duration-700 ease-out"
                  style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                />
              </div>

              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-xl md:rounded-2xl" />

              {regionData?.name && (
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-0 right-0 z-30 px-3 sm:px-4">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight tracking-tighter text-center font-sans">
                    {regionData.name}
                  </h3>
                  <div className="flex justify-center mt-2 sm:mt-3">
                    <div className="h-0.5 sm:h-1 w-8 sm:w-12 bg-white/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{
                          width: isHovered ? "100%" : "50%",
                          animation: "pulse 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className="absolute inset-0 z-10 h-full w-full flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300"
              style={{
                background: isHovered
                  ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
              }}
            >
              <div
                className="text-center p-3 sm:p-4 transition-all duration-300"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              >
                <h3 className="text-brand-blue text-sm sm:text-base md:text-lg lg:text-xl font-semibold capitalize leading-relaxed tracking-wide">
                  {regionSlug.replace(/-/g, " ")}
                </h3>
                <div
                  className="mt-1 sm:mt-2 text-brand-blue/70 text-xs sm:text-sm transition-all duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  Click to explore
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-blue/20 rounded-full transition-all duration-1000"
                    style={{
                      top: `${20 + i * 30}%`,
                      left: `${20 + i * 20}%`,
                      opacity: isHovered ? 1 : 0,
                      animation: isHovered
                        ? `float 3s ease-in-out ${i * 0.5}s infinite`
                        : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </Link>
      </SliderItem>
    </>
  );
}
