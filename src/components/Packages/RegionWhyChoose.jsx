"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

const RegionWhyChoose = ({ regionName = "this destination", data }) => {
  // Use data from API or fallback to curated set of 8 items for a complete mosaic
  const displayItems = useMemo(() => {
    const apiItems = data?.reasons || [];
    const fallbacks = [
      { title: "Ancient Wonders", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80" },
      { title: "Mountain Peaks", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" },
      { title: "Cultural Heritage", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
      { title: "Scenic Beauty", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" },
      { title: "Paradise Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
      { title: "Adventure Awaits", image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80" },
      { title: "Local Traditions", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80" },
      { title: "Hidden Gems", image: "https://images.unsplash.com/photo-1533619239233-628ce623a728?w=800&q=80" },
    ];

    // Combine and limit to 8
    const combined = [...apiItems, ...fallbacks.slice(0, 8 - apiItems.length)];
    return combined.slice(0, 8);
  }, [data]);

  // Specific grid span configurations for a perfectly balanced 8-image mosaic
  const gridConfigs = [
    "col-span-2 md:col-span-6 md:row-span-2", // 1. Large Feature (Left)
    "col-span-1 md:col-span-3 md:row-span-1", // 2. Top Square 1
    "col-span-1 md:col-span-3 md:row-span-1", // 3. Top Square 2
    "col-span-1 md:col-span-3 md:row-span-1", // 4. Bottom Square 1 (under 2)
    "col-span-1 md:col-span-3 md:row-span-1", // 5. Bottom Square 2 (under 3)
    "col-span-2 md:col-span-6 md:row-span-1", // 6. Wide Base
    "col-span-1 md:col-span-3 md:row-span-1", // 7. Small Base 1
    "col-span-1 md:col-span-3 md:row-span-1", // 8. Small Base 2
  ];

  return (
    <section className="py-12 md:py-14 bg-white overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left: Title Section */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-black text-brand-green uppercase tracking-[0.2em]">Why Visit?</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter"
              >
                Why Choose <span className="text-brand-green capitalize">{regionName}</span>?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-500 max-w-2xl font-medium"
              >
                Explore the beauty, culture, and unforgettable signature experiences that await you
              </motion.p>
            </div>
            
            {/* Right: Button */}
            <Link href={`/why-choose/${regionName?.toLowerCase()}`}>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green hover:bg-green-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                Explore More
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Sophisticated Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative rounded-[2rem] overflow-hidden group shadow-lg ${gridConfigs[index] || "md:col-span-3"}`}
            >
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Premium Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Feature {index + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {item.description}
                  </p>
                )}
              </div>
              
              {/* Aesthetic Border Glow on Hover */}
              <div className="absolute inset-0 border-2 border-brand-green/0 group-hover:border-brand-green/20 transition-colors duration-500 rounded-[2rem]" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RegionWhyChoose;
