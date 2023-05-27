import { format } from "path";

export interface CurrentData {
    relativehumidity_2m: number;
    temperature_2m: number;
    windspeed_10m: number;
}

export interface Hourly {
  relativehumidity_2m: number[];
  temperature_2m: number[];
  time: string[];
  windspeed_10m: number[];
}

export const getFormattedTime = (): string => {
  const currentTime: Date = new Date();
  const formattedDate = currentTime
    .toISOString()
    .slice(0, 13) + ":00"
  return formattedDate;
};

const getCurrentData = (
  hourly: Hourly,
  getFormattedTime: () => string
): CurrentData => {
  const currentTime = getFormattedTime() as string;
  const dataIndex = hourly.time.indexOf(currentTime);
  const currentData = {
    relativehumidity_2m: hourly.relativehumidity_2m[dataIndex],
    temperature_2m: hourly.temperature_2m[dataIndex],
    windspeed_10m: hourly.windspeed_10m[dataIndex],
  };
  return currentData;
};

export default getCurrentData;
