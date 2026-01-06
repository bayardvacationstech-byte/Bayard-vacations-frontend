"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BackgroundImage from "@/components/TimedCardSlider/BackgroundImage";
import Slides from "@/components/TimedCardSlider/Slides";
import SlideInfo from "@/components/TimedCardSlider/SlideInfo";
import Controls from "@/components/TimedCardSlider/Controls";
import { v4 as uuidv4 } from "uuid";

const CARD_DATA = [
  {
    id: uuidv4(),
    img: "/img/timed-card-slider/wat-rong-khun.jpg",
    location: "thailand",
    description:
      "Explore the stunning, intricate beauty of Thailand’s iconic White Temple, crafted by artist Chalermchai Kositpipat.",
    title: "wat rong khun",
  },

  {
    id: uuidv4(),
    img: "/img/timed-card-slider/ha-long-bay.jpg",
    title: "ha long bay",
    description:
      "Cruise through Vietnam’s stunning emerald waters and towering limestone islands in the breathtaking Ha Long Bay.",
    location: "vietnam",
  },

  {
    id: uuidv4(),
    img: "/img/timed-card-slider/mount-bromo.jpg",
    title: "mount bromo",
    description:
      "Witness the awe-inspiring sunrise and surreal landscapes of Mount Bromo, Bali’s iconic volcanic wonder.",
    location: "indonesia",
  },

  {
    id: uuidv4(),
    img: "/img/timed-card-slider/cameron-highlands.jpg",
    title: "cameron highlands",
    description:
      "Escape to the cool, scenic hills of Cameron Highlands, where lush tea plantations and serene landscapes await.",
    location: "malaysia",
  },

  {
    id: uuidv4(),
    img: "/img/timed-card-slider/gurez-valley.jpg",
    title: "Gurez valley",
    description:
      "Discover the untouched beauty of Gurez Valley, where rugged mountains, pristine rivers, and rich cultural heritage create a breathtaking escape.",
    location: "kashmir",
  },
];

const initData = CARD_DATA[0];

const TimedCardSlider = () => {
  const [data, setData] = useState(CARD_DATA.slice(1));
  const [transitionData, setTransitionData] = useState(CARD_DATA[0]);
  const [currentSlideData, setCurrentSlideData] = useState({
    data: initData,
    index: 0,
  });

  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (autoplay) {
      const id = setInterval(() => {
        setData((prev) => prev.slice(1));
        setCurrentSlideData({
          data: transitionData || initData,
          index: CARD_DATA.findIndex((ele) => ele.img === data[0].img),
        });
        setTransitionData(data[0]);
        setTimeout(() => {
          setData((newData) => [...newData, transitionData || initData]);
        }, 500);
      }, 5000); // Slide changes every 3 seconds

      return () => clearInterval(id);
    }
  }, [autoplay, data, transitionData, initData]);

  return (
    <main className="relative h-[80dvh] select-none overflow-hidden text-white antialiased">
      <AnimatePresence mode="wait">
        <BackgroundImage
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />

        <div key="content" className="hero-gradient absolute z-30 size-full">
          <div className="flex size-full grid-cols-10 flex-col md:grid">
            <div className="col-span-4 flex h-full flex-1 flex-col justify-end  px-5 pb-5 md:mb-0  md:justify-center c-xl:justify-end c-xl:pb-[6vw] c-xl:pl-[7vw]">
              <SlideInfo
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />
            </div>

            <div className="col-span-6 flex h-full flex-1 flex-col justify-end p-5 md:justify-center md:p-10 c-xl:justify-end c-xl:pb-0">
              <Slides data={data} />
              <Controls
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={CARD_DATA}
                setAutoplay={setAutoplay}
              ></Controls>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  );
};

export default TimedCardSlider;
