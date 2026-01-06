"use client";
import React from "react";
import { motion } from "framer-motion";

const SliderCard = ({ data }) => {
  return (
    <motion.div
      className="relative h-52 min-w-[250px] overflow-hidden rounded-2xl shadow-md"
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <motion.img
        layoutId={`slide-${data.img}`} // Match with BackgroundImage layoutId
        alt="Transition Image"
        src={data.img}
        fetchPriority="high"
        className="absolute size-full rounded-2xl object-cover"
      />
      <motion.div className="absolute z-10 flex size-full items-end font-nord">
        <motion.div className="w-full bg-gradient-to-b from-black/0 to-black/60 p-4">
          <motion.p className=" text-xs font-medium uppercase text-[#d5d5d6]">
            {data.location}
          </motion.p>
          <motion.h1 className="text-lg font-bold uppercase leading-6 text-white">
            {data.title}
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SliderCard;
