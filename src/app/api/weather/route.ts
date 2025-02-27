import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  let location = city || "São Paulo";

  if (lat && lon) {
    location = `${lat},${lon}`;
  }

  const API_KEY = process.env.WEATHER_API_KEY;
  const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

  try {
    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=no`
    );
    if (!res.ok) throw new Error("Erro na API externa");

    const data = await res.json();

    if (!data.forecast || !data.forecast.forecastday) {
      return NextResponse.json(
        { error: "Previsão indisponível" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar o clima" },
      { status: 500 }
    );
  }
}
