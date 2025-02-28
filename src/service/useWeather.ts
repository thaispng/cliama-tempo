import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./weatherService";
import { WeatherData } from "../types/weather";

export function useWeather(city?: string) {
  return useQuery<WeatherData>({
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
