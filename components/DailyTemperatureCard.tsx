import React from "react";
import { Hourly } from "@/utils/getCurrentData";
import { calculateFeelsLike } from "@/utils/determineMeterological";
import getCurrentData, { getFormattedTime } from "@/utils/getCurrentData";
import "../app/globals.css";

interface Props {
  hourly: Hourly;
}

const DailyTemperatureCard: React.FC<Props> = ({ hourly }: Props) => {
  console.log(hourly);
  const currentData = getCurrentData(hourly, getFormattedTime);
  const feelsLike = calculateFeelsLike(currentData).toFixed(1);
  console.log(feelsLike);
  return (
    <div className="h-fit mt-auto">
      <p>Thursday</p>
      <div className="relative w-full">
        <div className="absolute w-10 h-full opacity-50 bg-black"></div>
        <div className="flex gap-5 scrollContainer">
          {hourly.time.map((datum, index) => (
            <div key={datum} className="flex gap-2 flex-col">
              <time></time>
              <h2>{hourly.temperature_2m[index]}</h2>
              <p>Feels like {feelsLike}</p>
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-10 h-full opacity-50 bg-black"></div>
      </div>
    </div>
  );
};

export default DailyTemperatureCard;
