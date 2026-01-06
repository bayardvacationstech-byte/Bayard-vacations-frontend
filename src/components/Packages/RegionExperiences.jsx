"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { 
  Utensils, 
  Landmark, 
  Camera, 
  ShoppingBag, 
  Music,
  Sparkles,
  MapPin,
  Users,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const RegionExperiences = ({ regionName = "this destination" }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images with titles and descriptions
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&fit=crop",
      title: "Local Cuisine",
      category: "Food & Dining",
      description: "Authentic street food and traditional restaurants"
    },
    {
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80&fit=crop",
      title: "Ancient Temples",
      category: "Cultural Sites",
      description: "Historical monuments and religious landmarks"
    },
    {
      url: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&q=80&fit=crop",
      title: "Scenic Views",
      category: "Photography",
      description: "Breathtaking landscapes and photo spots"
    },
    {
      url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80&fit=crop",
      title: "Local Markets",
      category: "Shopping",
      description: "Vibrant bazaars and artisan shops"
    },
    {
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80&fit=crop",
      title: "Festivals",
      category: "Events",
      description: "Cultural celebrations and traditional music"
    },
    {
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop",
      title: "Local Life",
      category: "Culture",
      description: "Meet friendly locals and experience hospitality"
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&fit=crop",
      title: "Natural Beauty",
      category: "Nature",
      description: "Stunning natural landscapes and wildlife"
    },
    {
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&fit=crop",
      title: "Beach Life",
      category: "Coastal",
      description: "Pristine beaches and water activities"
    },
    {
      url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80&fit=crop",
      title: "Adventure Sports",
      category: "Activities",
      description: "Thrilling outdoor adventures"
    }
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-8 md:py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
              Culture & Experiences
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Experience{" "}
            <span className="text-brand-green capitalize">{regionName}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore local culture, cuisine, and unforgettable moments
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.slice(0, 5).map((image, index) => {
            // First image is larger - spans 2 columns
            const isHero = index === 0;
            const gridClass = isHero ? "md:col-span-2 md:row-span-2" : "";
            const heightClass = isHero ? "h-[280px] md:h-full" : "h-[200px]";

            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${gridClass} ${heightClass}`}
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                  {/* Category Badge */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                      <span className="text-white text-xs font-semibold uppercase tracking-wide">
                        {image.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                    <h3 className={`${isHero ? 'text-2xl md:text-3xl' : 'text-lg'} font-black text-white leading-tight drop-shadow-lg mb-1`}>
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-md line-clamp-1">
                      {image.description}
                    </p>
                    
                    {/* Camera Icon */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* "More" Card with Blurred Background */}
          {galleryImages.length > 5 && (
            <div
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-[200px]"
              onClick={() => openLightbox(5)}
            >
              {/* Background Image - Blurred */}
              <img
                src={galleryImages[5].url}
                alt="More photos"
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <p className="text-3xl font-black">+{galleryImages.length - 5}</p>
                  <p className="text-sm font-semibold uppercase tracking-wider mt-1">More Photos</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md z-10">
              <p className="text-white font-bold text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all z-10 group"
            >
              <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Main Image */}
            <div 
              className="relative max-w-6xl w-full mx-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container with Overlay */}
              <div className="relative inline-block max-w-full">
                <img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex].url}
                  alt={galleryImages[currentImageIndex].title}
                  className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl animate-fadeIn"
                />
                
                {/* Info Overlay - Positioned within image bounds */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 rounded-b-lg">
                  <div className="animate-slideUp">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider">
                        {galleryImages[currentImageIndex].category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 leading-tight">
                      {galleryImages[currentImageIndex].title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/95 text-sm md:text-base">
                      {galleryImages[currentImageIndex].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4">
              <div className="overflow-x-auto scrollbar-hide max-w-4xl">
                <div className="flex gap-3 justify-center min-w-max px-2">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex 
                          ? "border-white scale-110" 
                          : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out;
              }
              
              .animate-slideUp {
                animation: slideUp 0.5s ease-out;
              }
              
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </Container>
    </section>
  );
};

export default RegionExperiences;
