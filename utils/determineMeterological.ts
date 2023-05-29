import { CurrentData } from "./getCurrentData";

const P0 = 1013.25; // Sea-level pressure in hPa
const L = 0.0065; // Temperature lapse rate in K/m
// const h = elevation; // Elevation in meters
const T0 = 288.15; // Standard temperature at sea level in K
const g = 9.80665; // Acceleration due to gravity in m/s^2
const M = 0.0289644; // Molar mass of Earth's air in kg/mol
const R = 8.314462618; // Universal gas constant in J/(mol·K)

  // Constants for the heat index calculation
  const c1 = -8.78469475556;
  const c2 = 1.61139411;
  const c3 = 2.33854883889;
  const c4 = -0.14611605;
  const c5 = -0.012308094;
  const c6 = -0.0164248277778;
  const c7 = 0.002211732;
  const c8 = 0.00072546;
  const c9 = -0.000003582;

export const calculateAirPressure = (elevation: number): number => {
    const airPressure = P0 * Math.pow(1 - (L * elevation) / T0, (g * M) / (R * L))
    return airPressure;
};

export const calculateFeelsLike = (currentData: CurrentData): number => {
  const feelsLike = c1 +
    c2 * currentData.temperature_2m +
    c3 * currentData.relativehumidity_2m +
    c4 * currentData.temperature_2m * currentData.relativehumidity_2m +
    c5 * currentData.temperature_2m * currentData.temperature_2m +
    c6 * currentData.relativehumidity_2m * currentData.relativehumidity_2m +
    c7 * currentData.temperature_2m * currentData.temperature_2m * currentData.relativehumidity_2m +
    c8 * currentData.temperature_2m * currentData.relativehumidity_2m * currentData.relativehumidity_2m +
    c9 * currentData.temperature_2m * currentData.temperature_2m * currentData.relativehumidity_2m * currentData.relativehumidity_2m +
    (0.5 * currentData.windspeed_10m/3.6 - 10.0);
  return feelsLike
}

const calculateRainfallChances = (currentData: CurrentData): number => {
  const rainfallChances = 
    1 *
    (1 - currentData.relativehumidity_2m / 100) *
    ((1 - currentData.temperature_2m / 100) ^ 0.5) *
    ((1 - currentData.windspeed_10m / 100) ^ 0.85);
  return rainfallChances;
};

export default calculateRainfallChances;
