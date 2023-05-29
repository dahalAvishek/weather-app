import React, { Fragment } from "react";
import getCurrentData, {
  getFormattedTime,
  Hourly,
} from "@/utils/getCurrentData";
import determineWeather, {
  calculateRainChance,
  WEATHER_CONDITIONS,
} from "@/utils/determineWeather";
import { WiFog, WiSnowWind, WiRain, WiDaySunny } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";

interface Props {
  hourly: Hourly;
  weatherData: String;
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

const Meteorological: React.FC<Props> = ({ weatherData, hourly }:Props) => {
  const currentData = getCurrentData(hourly, getFormattedTime);
  const currentWeather = determineWeather(currentData);

  const data = [
    {
      label: "Humidity",
      value: currentData.relativehumidity_2m,
      icon: <WiRain />,
      unit: "%",
    },
    {
      label: "Air Pressure",
      value: "N?A",
      icon: <WiRain />,
    },
    {
      label: "Chance of Rain",
      value: "N?A",
      icon: <WiRain />,
    },
    {
      label: "Wind Speed",
      value: currentData.windspeed_10m,
      icon: <WiRain />,
      unit: "km/h",
    },
  ];
  console.log(">>>", currentData);
  
  return (
    <div className="flex flex-col gap-7">
      {data.map((datum) => (
        <div key={datum.label} className="flex gap-2">
          <div className="text-5xl">{datum.icon}</div>
          <div className="">
            <p>{datum.label}</p>
            <h3>
              {datum.value}
              {datum.unit}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meteorological;
