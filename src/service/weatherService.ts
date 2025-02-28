import { WeatherData } from "../types/weather";

const API_URL = "https://api.weatherapi.com/v1/forecast.json";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 

export const fetchWeather = async (
  lat?: number,
  lon?: number,
  city?: string
): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error(
      "Chave da API não configurada. Verifique o arquivo .env.local"
    );
  }

  const params = new URLSearchParams();
  params.append("key", API_KEY);
  params.append("days", "7"); 
  params.append("aqi", "yes"); 
  params.append("alerts", "yes"); 
  params.append("lang", "pt");

  if (lat && lon) {
    params.append("q", `${lat},${lon}`);
  } else if (city) {
    params.append("q", city);
  } else {
    throw new Error("Nenhuma localização fornecida");
  }

  const res = await fetch(`${API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar o clima");

  const data: WeatherData = await res.json();

  if (!data.forecast || !data.forecast.forecastday) {
    throw new Error("Previsão não disponível");
  }

  return data;
};
