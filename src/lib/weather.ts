import axios from "axios";
import { WeatherData } from "../../types/weather";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (city: string): Promise<WeatherData | null> => {
  try {
    const { data } = await axios.get<WeatherData>(`${BASE_URL}/current.json`, {
      params: { key: API_KEY, q: city, aqi: "yes" },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
    return null;
  }
};
