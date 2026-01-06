import React from "react";
import { motion } from "framer-motion";

const BackgroundImage = ({ transitionData, currentSlideData }) => {
  return (
    <>
      {transitionData && (
        <motion.img
          key={`bg-${transitionData.img}`}
          layoutId={`slide-${transitionData.img}`} // Changed layoutId
          alt="Transition Img"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 size-full object-cover"
          src={transitionData.img}
        />
      )}
      <motion.img
        alt="current image"
        key={`bg-current-${currentSlideData.data.img}`}
        src={currentSlideData.data.img}
        className="absolute left-0 top-0 size-full object-cover"
      />
    </>
  );
};

export default BackgroundImage;
