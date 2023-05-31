import React from "react";
import { Hourly } from "@/utils/getCurrentData";
import getSelectedData from "@/utils/getCurrentData";
import { useRef, useEffect } from "react";
import "../app/globals.css";
import TempContainer from "./TempContainer";

interface Props {
  hourly: Hourly;
  selectedTime: string;
  setSelectedTime: Dispatch<SetStateAction<string>>;
}

const DailyTemperatureCard: React.FC<Props> = ({
  hourly,
  selectedTime,
  setSelectedTime,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef([]);
  let scrollInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    itemRefs.current = Array.from({ length: hourly.time.length }, () => React.createRef());
  }, [hourly.time.length]);

  const handleLeftScroll = () => {
    scrollInterval = setInterval(() => {
      scrollRef.current!.scrollLeft += 5;
    }, 10);
  };

  const handleRightScroll = () => {
    scrollInterval = setInterval(() => {
      scrollRef.current!.scrollLeft -= 5;
    }, 10);
  };

  const handleMouseLeave = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };

  const handleTimeChange = (timeString: string) => {
    setSelectedTime(timeString);
  };

  return (
    <div className="h-fit mt-auto">
      <p>Thursday</p>
      <div className="relative w-full">
        <button
          className="absolute w-10 h-full opacity-50 bg-black z-10"
          onMouseEnter={handleRightScroll}
          onMouseLeave={handleMouseLeave}
        ></button>
        <div className="flex scrollContainer " ref={scrollRef}>
          {hourly.time.map((datum, index) => (
            <TempContainer
              key={datum}
              selectedData={getSelectedData(hourly, datum)}
              selectedTime={selectedTime}
              datum={datum}
              index={index}
              handleTimeChange={handleTimeChange}
              itemRefs={itemRefs}
            />
          ))}
        </div>
        <button
          className="absolute top-0 right-0 w-10 h-full opacity-50 bg-black z-10"
          onMouseEnter={handleLeftScroll}
          onMouseLeave={handleMouseLeave}
        ></button>
      </div>
    </div>
  );
};

export default DailyTemperatureCard;
