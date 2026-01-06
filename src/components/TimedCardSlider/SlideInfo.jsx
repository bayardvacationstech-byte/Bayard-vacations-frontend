"use client";
import React from "react";
import { motion } from "framer-motion";
import OtherInfo from "./OtherInfo";
import { Button } from "../ui/button";
import Link from "next/link";

const SlideInfo = ({ transitionData, currentSlideData }) => {
  return (
    <>
      <OtherInfo data={transitionData || currentSlideData.data} />
      <motion.div layout className="mt-5 flex items-center gap-3">
        <Button
          className="rounded-full p-6 c-lg:px-8 c-lg:text-lg"
          variant="success"
          asChild
        >
          <Link href={`/packages/${transitionData.location}`}>Explore All</Link>
        </Button>
      </motion.div>
    </>
  );
};

export default SlideInfo;
