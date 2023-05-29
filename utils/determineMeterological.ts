import { CurrentData } from "./getCurrentData";

const P0 = 1013.25; // Sea-level pressure in hPa
const L = 0.0065; // Temperature lapse rate in K/m
// const h = elevation; // Elevation in meters
const T0 = 288.15; // Standard temperature at sea level in K
const g = 9.80665; // Acceleration due to gravity in m/s^2
const M = 0.0289644; // Molar mass of Earth's air in kg/mol
const R = 8.314462618; // Universal gas constant in J/(mol·K)

export const calculateAirPressure = (elevation: number): number => {
    const airPressure = P0 * Math.pow(1 - (L * elevation) / T0, (g * M) / (R * L))
    return airPressure;
};

const calculateRainfallChances = (currentData: CurrentData): number => {
  const rainfallChances = 
    1 *
    (1 - currentData.relativehumidity_2m / 100) *
    ((1 - currentData.temperature_2m / 100) ^ 0.5) *
    ((1 - currentData.windspeed_10m / 100) ^ 0.85);
  return rainfallChances;
};

export default calculateRainfallChances;
