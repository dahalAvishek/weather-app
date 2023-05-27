import React from "react";
import getCurrentData, { getFormattedTime, Hourly } from "@/utils/getCurrentData";
import determineWeather, {WEATHER_CONDITIONS} from "@/utils/determineWeather";

interface Props {
  hourly: Hourly;
}



const WeatherType: React.FC<Props> = ({ hourly }) => {;
  const currentData = getCurrentData(hourly, getFormattedTime);
  const currentWeather = determineWeather(currentData)
  console.log(currentWeather)
  return <div>

  </div>;
};

export default WeatherType;
