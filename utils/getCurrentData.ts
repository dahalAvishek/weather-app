import { format } from "path";

export interface SelectedData {
  time: string;
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

export const getFormattedDate = (date: Date): string => {
  const formattedDate = date.toISOString().slice(0, 13) + ":00";
  return formattedDate;
};

export const getFormattedHour = (timeString: string) => {
  const date = new Date(timeString);

  // Apply the time zone offset
  const timeZoneOffset = 5 * 60 + 45; // Time zone offset in minutes
  date.setMinutes(date.getMinutes() + timeZoneOffset);

  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  return formattedTime;
};

const getSelectedData = (
  hourly: Hourly,
  selectedTime: string
): SelectedData => {
  const dataIndex = hourly.time.indexOf(selectedTime);
  const selectedData = {
    time: hourly.time[dataIndex],
    relativehumidity_2m: hourly.relativehumidity_2m[dataIndex],
    temperature_2m: hourly.temperature_2m[dataIndex],
    windspeed_10m: hourly.windspeed_10m[dataIndex],
  };
  return selectedData;
};

export default getSelectedData;
