import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Progress from "./Progress";

const SliderButton = ({ children, handleClick }) => {
  return (
    <button
      className="flex size-8 items-center justify-center rounded-full border border-[#fdfdfd5f] transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const Controls = ({
  sliderData,
  data,
  transitionData,
  currentSlideData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
  initData,
  setAutoplay,
}) => {
  const handlePrev = () => {
    setAutoplay(false);
    handleData((prevData) => [
      transitionData || initData,
      ...prevData.slice(0, prevData.length - 1),
    ]);
    handleCurrentSlideData({
      data: transitionData || sliderData[0],
      index: sliderData.findIndex(
        (ele) => ele.img === data[data.length - 1].img
      ),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    setAutoplay(false);
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData || initData,
      index: sliderData.findIndex((ele) => ele.img === data[0].img),
    });
    handleTransitionData(data[0]);
    setTimeout(() => {
      handleData((newData) => [...newData, transitionData || initData]);
    }, 500);
  };

  return (
    <div className="mt-5 flex items-center gap-3 md:pt-5 c-xl:pb-10">
      <Progress curIndex={currentSlideData.index} length={sliderData.length} />
      <SliderButton handleClick={handlePrev}>
        <ArrowLeft className="text-base c-md:text-xl" />
      </SliderButton>
      <SliderButton handleClick={handleNext}>
        <ArrowRight className="text-base c-md:text-xl" />
      </SliderButton>
    </div>
  );
};

export default Controls;
