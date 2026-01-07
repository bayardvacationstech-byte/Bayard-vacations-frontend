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
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
            Customer{" "}
            <span className="text-brand-green">Reviews</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Hear what our travelers have to say about their experiences
          </p>
        </div>

        {/* Two Column Layout - 40% Image, 60% Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8 items-start">
          {/* Left Side - Large Decorative Image - Hidden on mobile/tablet */}
          <div className="hidden lg:block sticky top-8">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000"
                alt="Travel Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              {/* Overlay gradient for better text visibility if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
          </div>

          {/* Right Side - Scrollable Reviews */}
          <div className="space-y-4 md:space-y-6 max-h-[600px] md:max-h-[500px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-3 md:gap-6 group">
                  {/* Review Text - Left Side */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed italic mb-3 md:mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {review.text}
                    </p>
                    
                    <div>
                      <p className="font-semibold text-sm md:text-base text-slate-900 truncate">
                        {review.author_name}
                      </p>
                      <p className="text-xs md:text-sm text-slate-500">
                        {review.relative_time_description}
                      </p>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Avatar - Right Side */}
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0">
                    {review.profile_photo_url ? (
                      <Image
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-blue to-brand-green flex items-center justify-center text-white font-bold text-lg md:text-xl">
                        {review.author_name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
