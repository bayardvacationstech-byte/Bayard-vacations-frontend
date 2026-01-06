"use client";

import { useState } from "react";
import packageData from "../../data/packageData";
import Card from "./Card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MoveRight, MoveLeft } from "lucide-react";

const TimedCardsSlider = () => {
  // const [packages, setPackages] = useState(packageData);
  const [isActive, setIsActive] = useState(0);

  const handleNext = () => {
    if (isActive === packageData.length - 1) {
      setIsActive(0);
    } else {
      setIsActive((prevState) => prevState + 1);
    }
  };

  const handlePrev = () => {
    if (isActive === 0) {
      setIsActive(packageData.length - 1);
    } else {
      setIsActive((prevState) => prevState - 1);
    }
  };

  return (
    <ul className="relative h-screen w-full overflow-hidden">
      {packageData.map((packageItem, i) => (
        <li
          key={packageItem.id}
          className={cn(
            "absolute h-[320px] w-[210px] top-[45%] left-1/2 transition-all duration-1000 z-20 rounded-xl overflow-hidden after:content-[''] after:block after:bg-gradient-to-r after:from-[rgba(0,0,0,.5)] after:to-transparent after:size-full after:absolute after:top-0 after:left-0 after:opacity-0 shadow-hero-card-shadow",
            {
              "top-0 left-0 z-10 size-full rounded-none after:opacity-100 shadow-none":
                i === isActive,
              "translate-x-[0px]": i === isActive + 1 || i === isActive - 4,
              "translate-x-[226px]": i === isActive + 2 || i === isActive - 3,
              "translate-x-[452px]": i === isActive + 3 || i === isActive - 2,
              "translate-x-[678px]": i === isActive + 4 || i === isActive - 1,
            }
          )}
        >
          <Card packageItem={packageItem} active={i === isActive} />
        </li>
      ))}

      <div className="absolute bottom-[32px] left-1/2 right-0 z-30 flex gap-4 px-2">
        <Button
          className="rounded-full bg-transparent text-white backdrop-blur-md transition-all duration-500 hover:bg-white/30 hover:text-white"
          variant="outline"
          size="icon"
          onClick={handlePrev}
        >
          <MoveLeft />
        </Button>
        <Button
          className="rounded-full bg-transparent text-white backdrop-blur-md transition-all duration-500 hover:bg-white/30 hover:text-white"
          variant="outline"
          size="icon"
          onClick={handleNext}
        >
          <MoveRight />
        </Button>
      </div>
    </ul>
  );
};

export default TimedCardsSlider;
