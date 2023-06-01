import React, {useState} from "react";
import { Hourly } from "@/utils/getCurrentData";
import getSelectedData, {getDay} from "@/utils/getCurrentData";
import { useRef, useEffect } from "react";
import "../app/globals.css";
import TempContainer from "./TempContainer";
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
  const [displayVisible, setDisplayVisible] = useState<boolean>(false) 
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<RefObject<unknown>[] | null>([]);
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

  const displayScrollButton = () => {
    setDisplayVisible(true)
  }

  const removeScrollButton = () => {
    setDisplayVisible(false)
  }

  const handleTimeChange = (timeString: string) => {
    setSelectedTime(timeString);
  };

  return (
    <div className="h-fit mt-auto">
      <p>{getDay(selectedTime)}</p>
      <div className="relative w-full" onMouseEnter={displayScrollButton} onMouseLeave={removeScrollButton}>
        <button
          className={clsx("absolute w-10 h-full z-10 scrollButton", {
            "hidden": (displayVisible === false),
            "block": (displayVisible === true),
          })}
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
          className={clsx("absolute top-0 right-0 w-10 h-full scrollButton rotate-180", {
            "hidden": (displayVisible === false),
            "block": (displayVisible === true),
          })}
          onMouseEnter={handleLeftScroll}
          onMouseLeave={handleMouseLeave}
        ></button>
      </div>
    </div>
  );
};

export default DailyTemperatureCard;
