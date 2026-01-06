"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { getHotelsByIds } from "@/utils/firebase";

const PackageHotels = ({ packageData }) => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      console.log("PackageHotels: Processing data for:", packageData?.id);
      try {
        const details = packageData?.hotelDetails;
        
        // Collect all unique hotel IDs from all categories
        let allHotelIds = [];
        if (details && typeof details === 'object') {
          allHotelIds = Object.entries(details)
            .filter(
              ([key, value]) =>
                key !== "baseCategory" &&
                value.hotelIds &&
                value.hotelIds.length > 0
            )
            .reduce((ids, [_, value]) => {
              return [...ids, ...value.hotelIds];
            }, []);
        }

        if (allHotelIds.length > 0) {
          const hotelDetails = await getHotelsByIds(allHotelIds);
          const validHotels = hotelDetails.filter(h => h);
          if (validHotels.length > 0) {
            setHotels(validHotels);
          } else {
            useDummyFallback();
          }
        } else {
          useDummyFallback();
        }
        setIsLoading(false);
      } catch (error) {
        console.error("PackageHotels: Error:", error);
        useDummyFallback();
        setIsLoading(false);
      }
    };

    const useDummyFallback = () => {
      setHotels([
        {
          id: "dummy-1",
          name: "Anathera Resort Kuta",
          description: "Anathera Resort Kuta is one of our most distinctive Balinese hotel hideaways where you can be sure of a heartfelt welcome and a truly unique backdrop in which to relax and unwind with family and friends.",
          images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-2",
          name: "Ayodya Resort Bali",
          description: "An authentic Balinese beachfront resort, offering the best swimmable beach in Bali with a close proximity to Golf Course, Bali Collection and places of interest. Savor Indonesian, Balinese, Japanese, Indian and International cuisine at the resort.",
          images: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-3",
          name: "Bali Dynasty Resort Hotel",
          description: "Bali Dynasty Resort is a premier beach side resort in South Kuta, renowned for its warm Balinese hospitality. The property offers seven restaurants, eight bars, four swimming pools, a comprehensive spa, gym",
          images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-4",
          name: "Amnaya Resort Kuta",
          description: "Amnaya Resort Kuta, rooted in family values, embodies genuine hospitality on the captivating island of Bali. Nestled along a tranquil laneway just off Jalan Kartika Plaza, our resort boasts 116 spacious guest rooms, each meticulously designed for sublime comfort.",
          images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-5",
          name: "Dwaraka The Royal Villas",
          description: "Nestled in the middle of Traditional Ubud village, Dwaraka The Royal Villas offer a Balinese Royal concept of accommodation combined with modern facilities.",
          images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        },
        {
          id: "dummy-6",
          name: "Legian Beach Hotel",
          description: "Located absolute beachfront, with a wide range of facilities and leisure options, Legian Beach Hotel embraces families, honeymooners and business travelers.",
          images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"],
          googleUrl: "#"
        }
      ]);
    };

    fetchHotelDetails();
  }, [packageData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return null;

  return (
    <section id="hotels-section" className="bg-gradient-to-br from-orange-50 via-blue-50 to-white text-slate-900 py-24 sm:py-32">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 relative">
          <div className="max-w-3xl">
            <h2 
              className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight text-slate-900"
              style={{ fontFamily: "'Denton Test', serif" }}
            >
              Hotel names and <span className="text-brand-green">location</span> <br className="hidden sm:block" /> details
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-light">
              Stay at handpicked hotels listed in the itinerary, offering comfortable rooms, 
              modern amenities, and convenient locations close to key attractions for a 
              seamless travel experience.
            </p>
          </div>
          
          <Button
            onClick={scrollToTop}
            className="md:absolute top-0 right-0 gradient-btn text-white rounded-xl px-10 py-7 text-lg font-medium tracking-wider uppercase mt-8 md:mt-0 shadow-lg"
          >
            Go to top
          </Button>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          {hotels.map((hotel, idx) => (
            <motion.div 
              key={hotel.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-8 group"
            >
              {/* Image */}
              <div className="relative w-full md:w-[260px] h-[190px] overflow-hidden flex-shrink-0 rounded-2xl shadow-lg">
                <Image
                  src={hotel.images?.[0] || "/placeholder.jpg"}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 
                    className="text-2xl font-medium mb-3 text-slate-900 group-hover:text-brand-green transition-colors"
                    style={{ fontFamily: "'Denton Test', serif" }}
                  >
                    {hotel.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                    {hotel.description || "Premium accommodation with exceptional service and world-class amenities."}
                  </p>
                </div>
                
                <Button
                  asChild
                  className="gradient-btn text-white rounded-xl w-fit px-8 py-5 h-auto text-xs font-semibold tracking-widest uppercase shadow-lg"
                >
                  <a href={hotel.googleUrl || "#"} target="_blank" rel="noopener noreferrer">
                    View in Map
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>


      </Container>
    </section>
  );
};

export default PackageHotels;
