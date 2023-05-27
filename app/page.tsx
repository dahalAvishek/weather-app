"use client"

import Image from "next/image";
import "./globals.css";
import { useEffect, useState } from "react";
import axios from "axios";

const WEATHER_DATA_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

export default function Home() {
  const [data, setData] = useState(null);

  type RequiredAptResponse = {
    
  }

  useEffect(() => {
    axios.get(WEATHER_DATA_URL).then((response:any) => setData(response));
  }, []);

  
  return <main className="main-wrapper">{JSON.stringify(data)}</main>;
}
