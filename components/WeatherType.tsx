import React, { Dispatch, SetStateAction } from "react";
import getSelectedData, {
  getFormattedDate,
  Hourly,
} from "@/utils/getCurrentData";
import determineWeather, { WEATHER_CONDITIONS } from "@/utils/determineWeather";
import { WiFog, WiSnowWind, WiRain, WiDaySunny } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";

interface Props {
  hourly: Hourly;
  setSelectedTime: Dispatch<SetStateAction<string>>;
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

const WeatherType: React.FC<Props> = ({ hourly, setSelectedTime }: Props) => {
  const formattedTimeCurrent = getFormattedDate(new Date());
  const currentData = getSelectedData(hourly, formattedTimeCurrent);
  const currentWeather = determineWeather(currentData);

  const handleClick = () => {
    setSelectedTime(formattedTimeCurrent);
    console.log("i am here");
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="text-9xl">
        {weatherObject[currentWeather].weatherIcon}
      </div>
      <h4>{weatherObject[currentWeather].name}</h4>
      <p className="text-xl"> Kathmandu </p>
      <h2>
        {currentData.temperature_2m}
        <sup>o</sup>C
      </h2>
      <button className="flex gap-1">
        <MdLocationPin className="inline my-auto" />
        <p className="inline text-xl">Change Location</p>
      </button>
    </div>
  );
};

export default WeatherType;
