import SliderCard from "./SliderCard";

const Slides = ({ data }) => {
  return (
    <div className="flex w-full gap-6">
      {data.map((data) => (
        <SliderCard
          key={`card-${data.img}`} // Changed key format
          data={data}
        />
      ))}
    </div>
  );
};

export default Slides;
