"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const RegionWhyChoose = ({ regionName = "this destination", data }) => {
  // Use provided data or fallback to defaults
  const displayItems = data?.overview || [
    {
      title: "Pristine Beaches",
      image: "https://images.unsplash.com/photo-1528181304800-2f140819ad9c?w=800&q=80",
    },
    {
      title: "Vibrant Nightlife",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    },
    {
      title: "Ancient Temples",
      image: "https://images.unsplash.com/photo-1528641473634-9721d017a421?w=800&q=80",
    },
    {
      title: "Delicious Street Food",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    },
    {
      title: "Luxury Resorts",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    },
    {
      title: "Lush Jungles",
      image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&q=80",
    },
    {
      title: "Island Hopping",
      image: "https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?w=800&q=80",
    },
    {
      title: "Wellness & Spas",
      image: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=800&q=80",
    },
  ];

  // Fill to 8 items if fewer provided (for visual consistency)
  const paddedItems = [...displayItems];
  while (paddedItems.length < 8) {
    paddedItems.push({
      title: "Breathtaking Views",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
    });
  }
  const finalItems = paddedItems.slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-bold text-brand-green uppercase tracking-wider">Why Visit?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none"
          >
            Why Choose <span className="text-brand-green capitalize">{regionName}</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-600 text-xl max-w-2xl mx-auto"
          >
            From hidden gems to iconic landmarks, explore the unique experiences that make {regionName} an unforgettable destination.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {finalItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-brand-blue/90 transition-colors duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-6">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  className="flex items-center gap-2"
                >
                  <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default RegionWhyChoose;
