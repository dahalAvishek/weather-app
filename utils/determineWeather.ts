import { CurrentData } from "./getCurrentData";

export const WEATHER_CONDITIONS = {
  rain: "Rain",
  snow: "Snow",
  fogg: "Fogg",
  wind: "Wind",
  sunny: "Sunny",
};

const determineWeather = (currentData: CurrentData): string => {
  const { relativehumidity_2m, temperature_2m, windspeed_10m } = currentData;

  if (relativehumidity_2m >= 80 && temperature_2m <= 0) {
    return "snow";
  } else if (relativehumidity_2m >= 80 && temperature_2m > 0) {
    return "fogg";
  } else if (relativehumidity_2m >= 60 && relativehumidity_2m < 80 && temperature_2m >= 0 && temperature_2m <= 30) {
    if (windspeed_10m >= 15) {
      return "wind";
    } else {
      return "rain";
    }
  } else {
    return "sunny";
  }
};

export default determineWeather;

