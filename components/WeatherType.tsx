import React from "react";
import getCurrentData, {
  getFormattedTime,
  Hourly,
} from "@/utils/getCurrentData";
import determineWeather, { WEATHER_CONDITIONS } from "@/utils/determineWeather";
import { WiFog, WiSnowWind, WiRain, WiDaySunny } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";

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
  console.log(currentData);
  return (
    <div>
      <div className="text-9xl">
        {weatherObject[currentWeather].weatherIcon}
      </div>
      <h4>{weatherObject[currentWeather].name}</h4>
      <p> Kathmandu </p>
      <h2>
        {currentData.temperature_2m}
        <sup>o</sup>C
      </h2>
      <button>
        <MdLocationPin />
        Change Location
      </button>
    </div>
  );
};

export default WeatherType;
