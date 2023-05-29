import React, { Fragment } from "react";
import getCurrentData, {
  getFormattedTime,
  Hourly,
} from "@/utils/getCurrentData";
import calculateRainfallChance, {calculateAirPressure} from "@/utils/determineMeterological" 
import { WiHumidity, WiBarometer, WiDayStormShowers, WiStrongWind } from "react-icons/wi";

interface Props {
  hourly: Hourly;
  elevation: number;
}

const Meteorological: React.FC<Props> = ({ elevation, hourly }:Props) => {
  const currentData = getCurrentData(hourly, getFormattedTime);
  const rainChance = calculateRainfallChance(currentData);

  const data = [
    {
      label: "Humidity",
      value: currentData.relativehumidity_2m,
      icon: <WiHumidity />,
      unit: " %",
    },
    {
      label: "Air Pressure",
      value: calculateAirPressure(elevation).toFixed(2),
      icon: <WiBarometer />,
      unit: " PS",
    },
    {
      label: "Chance of Rain",
      value: rainChance,
      icon: <WiDayStormShowers />,
      unit: " %",
    },
    {
      label: "Wind Speed",
      value: currentData.windspeed_10m,
      icon: <WiStrongWind />,
      unit: " km/h",
    },
  ];
  
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
