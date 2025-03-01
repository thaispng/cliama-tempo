import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const isCEP = (query: string) => /^[0-9]{5}-?[0-9]{3}$/.test(query);

const fetchCityFromAddress = async (query: string): Promise<string> => {
  if (!query.trim()) throw new Error("Endereço inválido");


  if (isCEP(query)) {
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${query.replace("-", "")}/json/`
    );
    if (data.erro) throw new Error("CEP não encontrado");
    return data.localidade; 
  }

  const { data } = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 1,
      },
      timeout: 5000,
    }
  );

  if (data.length === 0) {
    throw new Error("Localização não encontrada");
  }

  const city =
    data[0].address.city || data[0].address.town || data[0].address.village;
  if (!city) throw new Error("Cidade não encontrada");

  return city;
};

export function useAddressLookup(address: string) {
  return useQuery({
    queryKey: ["cityLookup", address],
    queryFn: () => fetchCityFromAddress(address),
    enabled: !!address,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
