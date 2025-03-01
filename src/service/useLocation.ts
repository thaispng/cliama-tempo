import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchLocation = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocalização não é suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const { data } = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
              },
              timeout: 5000, 
            }
          );

          if (data.address && data.address.city) {
            resolve(data.address.city);
          } else {
            reject("Cidade não encontrada.");
          }
        } catch {
          reject("Erro ao obter cidade.");
        }
      },
      (error) => {
        reject("Erro ao acessar localização: " + error.message);
      }
    );
  });
};

export function useLocation() {
  return useQuery({
    queryKey: ["userLocation"],
    queryFn: fetchLocation,
    staleTime: 1000 * 60 * 10, 
    retry: 1, 
  });
}
