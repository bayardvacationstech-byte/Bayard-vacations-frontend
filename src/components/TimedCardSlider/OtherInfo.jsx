import React from "react";
import { motion } from "framer-motion";

const item = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

const AnimatedText = ({ data, className, index }) => {
  return (
    <span
      key={`animated-text-${index}`}
      style={{ overflow: "hidden", display: "inline-block" }}
    >
      <motion.p
        className={`${className}`}
        variants={item}
        key={`motion-text-${index}-${data}`}
      >
        {data}
      </motion.p>
    </span>
  );
};

const OtherInfo = ({ data }) => {
  return (
    <motion.div initial="hidden" animate={"visible"} className="flex flex-col">
      <AnimatedText
        className="overflow-hidden font-nord text-xs font-medium uppercase text-[#d5d5d6] md:text-base"
        data={data?.location}
        index="location"
      />
      <AnimatedText
        className="my-1 font-nord text-2xl font-semibold uppercase tracking-tighter md:my-3 md:leading-[56px] c-lg:text-5xl"
        data={data?.title}
        index="title"
      />
      <AnimatedText
        className="text-xs text-white c-xl:text-base"
        data={data?.description}
        index="description"
      />
    </motion.div>
  );
};

export default OtherInfo;
