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
  } else if (relativehumidity_2m < 60 && temperature_2m >= 0 && temperature_2m <= 30) {
    return "sunny";
  } else {
    return "unknown condition";
  }
};

export default determineWeather;

export function calculateRainChance(data) {
  const hourlyData = data.hourly;
  const rainChance = hourlyData.rain_chance;

  // Calculate the average rain chance
  const totalRainChance = rainChance.reduce((acc, value) => acc + value, 0);
  const averageRainChance = totalRainChance / rainChance.length;

  return averageRainChance;
}