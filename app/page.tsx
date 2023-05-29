"use client";

import Image from "next/image";
import "./globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherType from "@/components/WeatherType";
import Meteorological from "@/components/Meteorological";
import Temperature from "@/components/Temperature";
import ChangeLocation from "@/components/ChangeLocation";


const WEATHER_DATA_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

export default function Home() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    axios.get(WEATHER_DATA_URL).then((response: any) => setData(response.data));
  }, []);

  console.log("data", data)

  return (
    <main className="main-wrapper">
      <div className="p-8">
        {data && (
          <div className="flex justify-between">
            <WeatherType hourly={data.hourly} />
            <Meteorological hourly={data.hourly} weatherData={data} />
          </div>
        )}
      </div>
      <div></div>
      <div></div>
    </main>
  );
}
