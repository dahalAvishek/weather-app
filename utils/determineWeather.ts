import { CurrentData } from "./getCurrentData";

export const WEATHER_CONDITIONS = {
  rain: "Rain",
  snow: "Snow",
  fogg: "Fogg",
  wind: "Wind",
  overcast: "Overcast",
  gloomy: "Gloomy",
  hazy: "Hazy",
};

const determineWeather = (currentData: CurrentData): string => {
  const { relativehumidity_2m, temperature_2m, windspeed_10m } = currentData;

  if (relativehumidity_2m > 90) {
    return WEATHER_CONDITIONS.rain;
  }
  if (temperature_2m < 0) {
    return WEATHER_CONDITIONS.snow;
  }
  if (windspeed_10m > 8) {
    return WEATHER_CONDITIONS.wind;
  }
  if (relativehumidity_2m > 80 && relativehumidity_2m <= 90) {
    return WEATHER_CONDITIONS.fogg;
  }
  if (
    temperature_2m >= 20 &&
    temperature_2m <= 25 &&
    relativehumidity_2m > 70 &&
    relativehumidity_2m <= 80
  ) {
    return WEATHER_CONDITIONS.overcast;
  }
  if (
    temperature_2m >= 20 &&
    temperature_2m <= 25 &&
    relativehumidity_2m > 60 &&
    relativehumidity_2m <= 70
  ) {
    return WEATHER_CONDITIONS.gloomy;
  }
  if (relativehumidity_2m > 50 && relativehumidity_2m <= 60) {
    return WEATHER_CONDITIONS.hazy;
  }

  return "Unknown";
};

export default determineWeather;
