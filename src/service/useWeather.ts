import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./weatherService";
import type { WeatherData } from "../types/weather";

export function useWeather(city?: string) {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", city],
    queryFn: async () => {
      try {
        if (city) {
          return await fetchWeather(undefined, undefined, city);
        }

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
                  console.error(
                    "Erro ao buscar dados com geolocalização:",
                    error
                  );
                  try {
                    const data = await fetchWeather(
                      undefined,
                      undefined,
                      "São Paulo"
                    );
                    resolve(data);
                  } catch (fallbackError) {
                    reject(fallbackError);
                  }
                }
              },
              async (error) => {
                console.error("Erro de geolocalização:", error);
                try {
                  const data = await fetchWeather(
                    undefined,
                    undefined,
                    "São Paulo"
                  );
                  resolve(data);
                } catch (fallbackError) {
                  reject(fallbackError);
                }
              }
            );
          } else {
            fetchWeather(undefined, undefined, "São Paulo")
              .then(resolve)
              .catch(reject);
          }
        });
      } catch (error) {
        console.error("Erro no useWeather:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, 
    retry: 2,
  });
}
