"use client";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";

export default function RegionTestimonials() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        
        // Check if response is OK before parsing
        if (!response.ok) {
          console.warn("Reviews API not available");
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading || !reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-6 md:py-10">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-green/10 border border-brand-green/20 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-brand-green fill-brand-green" />
            <span className="text-brand-green text-[10px] font-black uppercase tracking-widest">Traveler Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Real Experiences,{" "}
            <span className="text-brand-green">Real Memories</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of travelers choose us for their dream vacations
          </p>
        </div>

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col h-full -translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-green/5 to-transparent rounded-bl-[5rem]"></div>
              
              {/* Rating & Profile */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      fill
                      className="object-cover scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white font-bold text-xl">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 relative z-10">
                <p className="text-slate-600 font-medium leading-relaxed italic mb-8">
                  "{review.text}"
                </p>
              </div>

              {/* Author Info Footer */}
              <div className="pt-6 border-t border-slate-100 relative z-10">
                <p className="font-black text-slate-900 text-lg leading-tight mb-1">
                  {review.author_name}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Verified Traveler • {review.relative_time_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}
