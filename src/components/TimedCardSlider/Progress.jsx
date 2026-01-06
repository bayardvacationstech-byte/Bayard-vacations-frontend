"use client";
import React from "react";
import { motion } from "framer-motion";

const Progress = ({ curIndex, length }) => {
  return (
    <>
      <span
        key={`progress-span-${curIndex}`}
        style={{
          overflow: "hidden",
          display: "inline-block",
        }}
        className="inline-block w-9 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`progress-number-${curIndex}`}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center text-2xl font-medium"
        >
          0{curIndex + 1}
        </motion.div>
      </span>
      <div className="flex h-[3px] flex-1 rounded-full bg-white/50 c-xl:max-w-[300px]">
        <div
          style={{ width: (((curIndex + 1) / length) * 100).toString() + "%" }}
          className={`h-[3-px] rounded-full bg-brand-green`}
        ></div>
      </div>
    </>
  );
};

export default Progress;
