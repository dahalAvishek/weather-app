"use client";

import "./globals.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import WeatherType from "@/components/WeatherType";
import Meteorological from "@/components/Meteorological";
import DailyTemperatureCard from "@/components/DailyTemperatureCard";
import { getFormattedDate } from "@/utils/getCurrentData";
import clsx from "clsx";

interface CurrentWeather {
  current_weather: {
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  elevation: number;
  generationtime_ms: number;
  hourly: {
    relativehumidity_2m: number[];
    temperature_2m: number[];
    time: string[];
    windspeed_10m: number[];
  };
  hourly_units: {
    relativehumidity_2m: string;
    temperature_2m: string;
    time: string;
    windspeed_10m: string;
  };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

const WEATHER_DATA_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

export default function Home() {
  const [data, setData] = useState<CurrentWeather | null>();
  const [selectedTime, setSelectedTime] = useState<string>(
    getFormattedDate(new Date())
  );

  useEffect(() => {
    axios.get(WEATHER_DATA_URL).then((response: any) => {
      setData(response.data);
    });
  }, []);
  console.log(data);

  return (
    <main
      className={clsx("main-wrapper", {
        backgroundDay: data?.current_weather.is_day === 1,
        backgroundNight: data?.current_weather.is_day === 0,
      })}
    >
      {data && (
        <div className="h-full flex justify-between flex-wrap ">
          <WeatherType hourly={data.hourly} setSelectedTime={setSelectedTime} />
          <Meteorological
            hourly={data.hourly}
            elevation={data.elevation}
            selectedTime={selectedTime}
          />
          <DailyTemperatureCard
            hourly={data.hourly}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      )}
    </main>
  );
}
