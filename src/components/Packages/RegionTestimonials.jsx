"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart, Share2, MapPin } from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";
import Link from "next/link";

export default function RegionTestimonials() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Curated video reviews for the Vlogger Spotlight - Using authentic vlogger-style clips
  const videoReviews = [
    {
      author_name: "@TravelWithSarah",
      location: "Maiden Tower, Baku",
      video: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-herself-while-walking-in-the-city-43285-large.mp4",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      quote: "Baku is a hidden gem! The history here at Maiden Tower is just incredible. Definitely add this to your bucket list! 🇦🇿✨",
      likes: "4.8k",
      type: "Vlogger Review",
      rating: 5
    },
    {
      author_name: "@MarcusExplores",
      location: "Sheki Khan's Palace",
      video: "https://assets.mixkit.co/videos/preview/mixkit-travel-to-the-mountain-range-4074-large.mp4",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      quote: "Checking out the Palace in Sheki. The stained glass (Shebeke) here is mind-blowing. No nails used at all! 🏰🙌",
      likes: "2.1k",
      type: "Tourist Spot Review",
      rating: 5
    },
    {
      author_name: "@ElenaTravels",
      location: "Gabala Cable Car",
      video: "https://assets.mixkit.co/videos/preview/mixkit-girl-looking-at-landscape-from-a-balcony-4029-large.mp4",
      avatar: "https://i.pravatar.cc/150?u=elena",
      quote: "Look at this view from the Tufandag peaks! Gabala is definitely the 'Switzerland of Azerbaijan'. So peaceful. 🏔️🚠",
      likes: "3.5k",
      type: "Spot Highlights",
      rating: 5
    }
  ];

  const fallbackReviews = [
    {
      author_name: "Sarah Mitchell",
      text: "Our trip to Azerbaijan was absolutely flawless. The itinerary was perfectly balanced between culture and adventure.",
      relative_time_description: "2m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1523438097204-5447bcad5ce7?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565024108848-6a3628e83348?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "James Wilson",
      text: "Bayard Vacations truly understands luxury travel. Every detail was handled with precision and care.",
      relative_time_description: "5m ago",
      rating: 5
    },
    {
      author_name: "Elena Rodriguez",
      text: "The 'Land of Fire' took our breath away. Walking through the Old City of Baku felt like stepping back in time!",
      relative_time_description: "12m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518134454641-523c6c19208a?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527018601619-a508a2fe0261?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "David Chen",
      text: "Professional service from start to finish. The booking process was simple, and the support teammate was always available.",
      relative_time_description: "18m ago",
      rating: 5
    },
    {
      author_name: "Aisha Khan",
      text: "A truly immersive cultural experience. The culinary tour in Sheki was a highlight—the Piti and Halva were unforgettable.",
      relative_time_description: "25m ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      author_name: "Robert Taylor",
      text: "Best family vacation ever! Our kids loved the interactive museums in Baku and the cable cars in the mountains.",
      relative_time_description: "40m ago",
      rating: 5
    },
    {
      author_name: "Michael Scott",
      text: "The organization was top-notch. I didn't have to worry about a single thing during the whole 10-day tour.",
      relative_time_description: "1h ago",
      rating: 5
    },
    {
      author_name: "Linda Thompson",
      text: "Incredible views in Shusha. The history is so rich and the locals are the most hospitable people I've met.",
      relative_time_description: "2h ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop"
      ]
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Auto-advance only if playing or if we want to advance anyway
      // For a better UX, we'll advance every 12s even if muted/starting
      nextVideo();
    }, 12000);
    return () => clearInterval(timer);
  }, [activeVideoIndex]); // Advance whenever index exists, regardless of isPlaying to keep flow

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.reviews?.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
        console.warn("Using live-feed curated testimonials");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;
  const scrollingReviews = [...displayReviews, ...displayReviews, ...displayReviews];

  const nextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videoReviews.length);
  };

  const prevVideo = () => {
    setActiveVideoIndex((prev) => (prev - 1 + videoReviews.length) % videoReviews.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#012a6b] via-[#001b4d] to-[#012a6b] pt-8 pb-8 md:pt-16 md:pb-24 lg:min-h-[750px] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-light-cyan/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container className="relative z-10 h-full flex flex-col lg:justify-center">
        {/* Section Header */}
        <div className="mb-4 md:mb-12 text-center lg:text-left">
          <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Guest <span className="text-blue-400">Stories</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-medium mt-2 truncate md:whitespace-normal">Real experiences shared by our globetrotters</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
          
          {/* Left Side: Vlogger Spot Review Spotlight (25%) */}
          <div className="lg:w-[25%] w-full relative shrink-0">
            <div 
              className="relative h-[65vh] lg:h-[60vh] max-h-[650px] aspect-[9/16] mx-auto rounded-[2rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] bg-slate-900 border-none group cursor-pointer"
              onClick={togglePlay}
            >
              
              {/* Story Progress Bars */}
              <div className="absolute top-3 inset-x-4 z-50 flex gap-1">
                {videoReviews.map((_, i) => (
                  <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      initial={{ width: "0%" }}
                      animate={{ width: i === activeVideoIndex ? "100%" : i < activeVideoIndex ? "100%" : "0%" }}
                      transition={{ duration: i === activeVideoIndex ? 12 : 0, ease: "linear" }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVideoIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadedData={(e) => {
                      const playPromise = e.target.play();
                      if (playPromise !== undefined) {
                        playPromise.catch(() => setIsPlaying(false));
                      }
                    }}
                  >
                    <source src={videoReviews[activeVideoIndex].video} type="video/mp4" />
                  </video>
                  
                  {/* Play/Pause Indicator Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-20">
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center"
                      >
                        <svg className="w-8 h-8 text-white fill-white translate-x-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  )}

                  {/* Social Vlogger Overlay UI - Compacted for 30% width */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 p-4 md:p-6 flex flex-col justify-between z-30 pointer-events-none">
                    <div className="flex justify-between items-start pt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/80 p-0.5 overflow-hidden">
                          <Image
                            src={videoReviews[activeVideoIndex].avatar}
                            alt={videoReviews[activeVideoIndex].author_name}
                            width={40}
                            height={40}
                            className="w-full h-full rounded-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-white font-bold text-xs tracking-tight">{videoReviews[activeVideoIndex].author_name}</h4>
                            <button className="bg-blue-600 hover:bg-blue-700 text-[8px] font-black uppercase text-white px-1.5 py-0.5 rounded transition-colors pointer-events-auto">Follow</button>
                          </div>
                          <div className="flex items-center gap-1 text-white/60 text-[8px] uppercase tracking-wider font-bold">
                             <MapPin className="w-2 h-2 text-blue-500" />
                             {videoReviews[activeVideoIndex].location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-md">
                           <span className="text-blue-400 text-[8px] font-black uppercase tracking-widest leading-none">{videoReviews[activeVideoIndex].type}</span>
                        </div>
                        <div className="flex gap-0.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-2.5 h-2.5 ${i < videoReviews[activeVideoIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`} />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-sm md:text-lg font-bold text-white leading-[1.3] drop-shadow-lg">
                        {videoReviews[activeVideoIndex].quote}
                      </h3>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                         <div className="flex items-center gap-3 text-white/40 text-[8px] font-bold tracking-[0.2em] uppercase">
                            <span>#Azerbaijan</span>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="flex flex-col items-center gap-0.5 pointer-events-auto cursor-pointer">
                              <Heart className="w-4 h-4 text-white/80 hover:text-red-500 transition-colors" />
                              <span className="text-[8px] text-white/60 font-black">{videoReviews[activeVideoIndex].likes}</span>
                           </div>
                           <Share2 className="w-4 h-4 text-white/80 pointer-events-auto cursor-pointer hover:text-blue-500 transition-colors" />
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Zones */}
              <div className="absolute inset-y-0 left-0 w-16 z-40 cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); prevVideo(); }}></div>
              <div className="absolute inset-y-0 right-0 w-16 z-40 cursor-pointer pointer-events-auto" onClick={(e) => { e.stopPropagation(); nextVideo(); }}></div>
            </div>
          </div>

          {/* Right Side: Floating Live comment stream (75%) */}
          <div className="lg:flex-1 w-full relative">
            <div className="w-full h-[350px] lg:h-[60vh] relative overflow-hidden mt-6 lg:mt-0">
            <div className="absolute inset-0 z-20 pointer-events-none pb-2 bg-gradient-to-b from-transparent via-transparent to-transparent"></div>
            
            <div className="absolute top-0 left-0 right-0 z-30 pt-4 px-4 bg-gradient-to-b from-[#012a6b] to-transparent">
               <h2 className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Real-time Feedback</h2>
            </div>

            <motion.div
              className="flex flex-col gap-6 pt-32"
              animate={{ y: [0, -1500] }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
              whileHover={{ transition: { duration: 120 } }}
            >
              {scrollingReviews.map((review, index) => (
                <div 
                  key={index}
                  className="group flex gap-3 md:gap-4 items-start bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 p-4 md:p-5 rounded-[2rem] transition-all duration-300 mx-0 md:mx-4 max-w-full md:max-w-[90%] self-start even:self-end even:flex-row-reverse even:text-right shadow-xl"
                >
                  <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 border border-white/30 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                       {review.author_name.charAt(0)}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 group-even:flex-row-reverse">
                      <h4 className="text-white text-[11px] font-black tracking-wider uppercase">{review.author_name}</h4>
                      <span className="text-[9px] font-bold text-white/40 uppercase">{review.relative_time_description}</span>
                    </div>
                    
                    <p className="text-white text-sm md:text-base leading-relaxed font-semibold">
                       {review.text}
                    </p>
                    
                    <div className="flex gap-0.5 group-even:justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Optional Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1 no-scrollbar group-even:flex-row-reverse group-even:justify-start">
                        {review.images.map((img, i) => (
                          <div key={i} className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-sm">
                            <Image
                              src={img}
                              alt={`Review image ${i + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            </div>
            
            {/* Participation Banner */}
            <div className="w-full mt-6 md:mt-10 lg:mt-12 relative z-30">
              {/* Desktop Banner with Text */}
              <div className="hidden md:flex bg-blue-600/90 backdrop-blur-md rounded-full px-8 py-4 items-center justify-between gap-4 shadow-2xl shadow-blue-900/40 border border-white/10 max-w-4xl mx-auto">
                <div className="text-center md:text-left">
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.35em] block mb-0.5">Authentic Experiences</span>
                  <p className="text-white/80 text-sm font-medium leading-snug">Join 5,000+ happy travelers who explored Azerbaijan with us.</p>
                </div>
                <Link 
                  href="/reviews"
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Read All Reviews
                </Link>
              </div>

              {/* Mobile Button Only */}
              <div className="md:hidden px-4">
                <Link 
                  href="/reviews"
                  className="w-full block bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-lg text-center"
                >
                  Read All Reviews
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
