import React, { Fragment, useState, useEffect } from "react";
import getSelectedData, {
  getFormattedDate,
  Hourly,
} from "@/utils/getCurrentData";
import calculateRainfallChance, {calculateAirPressure} from "@/utils/determineMeterological" 
import { WiHumidity, WiBarometer, WiDayStormShowers, WiStrongWind } from "react-icons/wi";

interface Props {
  hourly: Hourly;
  elevation: number;
  selectedTime: string; 
}

const Meteorological: React.FC<Props> = ({ elevation, hourly, selectedTime }:Props) => {
  const selectedData = getSelectedData(hourly, selectedTime);
  const rainChance = calculateRainfallChance(selectedData);

  const data = [
    {
      label: "Humidity",
      value: selectedData.relativehumidity_2m,
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
      value: selectedData.windspeed_10m,
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
