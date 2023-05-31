import React from "react";
import { Hourly } from "@/utils/getCurrentData";
import { calculateFeelsLike } from "@/utils/determineMeterological";
import getSelectedData, { getFormattedHour } from "@/utils/getCurrentData";
import { useRef } from "react";
import "../app/globals.css";
import clsx from "clsx";

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
  let scrollInterval: NodeJS.Timeout | null = null;

  const feelsLike = hourly.time.map((datum) => {
    const selectedData = getSelectedData(hourly, datum);
    const feelsLikeTemp = calculateFeelsLike(selectedData).toFixed(0);
    return feelsLikeTemp;
  });

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
    console.log(selectedTime);
  };

  const checkCondition = (time: string) => {
    if (time === selectedTime) return true;
    return false;
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
            <div
              key={datum}
              className={clsx(
                "basis-40",
                "grow",
                "flex-shrink-0",
                "flex",
                "gap-2",
                "flex-col",
                "cursor-pointer",
                {
                  "scale-105 , ": checkCondition(datum),
                  "scale-75": !checkCondition(datum),
                }
              )}
              onClick={(e) => handleTimeChange(datum)}
            >
              <time>{getFormattedHour(hourly.time[index])}</time>
              <section>
                <h2 className="inline">
                  {hourly.temperature_2m[index].toFixed(0)}
                </h2>
                <h3 className="inline">
                  <sup>o</sup>C
                </h3>
              </section>
              <p>Feels like {feelsLike[index]}</p>
            </div>
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
