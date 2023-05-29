import React from "react";
import getCurrentData, {
  getFormattedTime,
  Hourly,
} from "@/utils/getCurrentData";
import determineWeather, { WEATHER_CONDITIONS } from "@/utils/determineWeather";
import { WiFog, WiSnowWind, WiRain, WiDaySunny } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";

interface Props {
  hourly: Hourly;
}

interface CurrentWeather {
  name: string;
  weatherIcon: Element;
}

const WEATHER_CONDITIONS_FONTS = [
  <WiRain key={3} />,
  <WiSnowWind key={2} />,
  <WiFog key={1} />,
  <GiWhirlwind key={4} />,
  <WiDaySunny key={5} />,
];

const weatherObject = Object.fromEntries(
  Object.entries(WEATHER_CONDITIONS).map(([key, value], index) => [
    key,
    { name: value, weatherIcon: WEATHER_CONDITIONS_FONTS[index] },
  ])
);

const WeatherType: React.FC<Props> = ({ hourly }) => {
  const currentData = getCurrentData(hourly, getFormattedTime);
  const currentWeather = determineWeather(currentData);
  return <div>
      <div className="text-9xl">{weatherObject[currentWeather].weatherIcon}</div>
      <p className="text-5xl">{weatherObject[currentWeather].name}</p>
    </div>;
};

export default WeatherType;
