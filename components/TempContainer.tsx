import React from 'react'
import clsx from 'clsx';
import { getFormattedHour, SelectedData } from "@/utils/getCurrentData";
import { calculateFeelsLike } from "@/utils/determineMeterological";

interface Props {
    selectedData: SelectedData;
    selectedTime: string;
    datum: string;
    index: number;
    handleTimeChange: (timeString: string) => void;
    itemRefs: React.MutableRefObject<HTMLDivElement | null> 
}

const TempContainer = ({selectedData, selectedTime, datum, index, handleTimeChange, itemRefs}: Props) => {
    const checkCondition = (time: string) => {
        if (time === selectedTime) return true;
        return false;
      };

      const feelsLike = calculateFeelsLike(selectedData).toFixed(0);

      
  return (
    <div
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
        ref={itemRefs.current[index]}
        onClick={(e) => handleTimeChange(datum)}
    >
      <time>{getFormattedHour(selectedData.time)}</time>
      <section>
        <h2 className="inline">
          {selectedData.temperature_2m.toFixed(0)}
        </h2>
        <h3 className="inline">
          <sup>o</sup>C
        </h3>
      </section>
      <p>Feels like {feelsLike[index]}</p>
    </div>
  )
}

export default TempContainer