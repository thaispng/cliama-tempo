import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "../../types/weather";

const fetchWeather = async (lat?: number, lon?: number, city?: string) => {
  const params = new URLSearchParams();
  if (lat && lon) {
    params.append("lat", lat.toString());
    params.append("lon", lon.toString());
  } else if (city) {
    params.append("city", city);
  }

  const res = await fetch(`/api/weather?${params.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar o clima");

  const data: WeatherData = await res.json();

  if (!data.forecast || !data.forecast.forecastday) {
    throw new Error("Previsão não disponível");
  }

  return data;
};


export function useWeather(city?: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      if (city) return fetchWeather(undefined, undefined, city);

      return new Promise<WeatherData>((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const data = await fetchWeather(
                  position.coords.latitude,
                  position.coords.longitude
                );
                resolve(data);
              } catch (error) {
                reject(error);
              }
            },
            () => reject(new Error("Permissão de localização negada"))
          );
        } else {
          reject(new Error("Geolocalização não suportada pelo navegador"));
        }
      });
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}