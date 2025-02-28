"use client"
import { useState } from "react"
import { Header } from "@/components/ui/header"
import CardClimate from "@/components/CardClimate"
import ContactDialog from "@/components/ContactDialog"
import CardToday from "@/components/CardToday"
import ClimateCards from "@/components/ClimateCards"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useWeather } from "../service/useWeather"
import MoonCard from "@/components/MoonCard"

export default function Home() {
  const [city, setCity] = useState("São Paulo")
  const { data: weather, isLoading, error } = useWeather(city);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error || !weather) {
    return <p className="text-red-500">Erro ao carregar dados do clima</p>;
  }

  const moonPhase = weather.forecast.forecastday[0].astro.moon_phase;
  const moonrise = weather.forecast.forecastday[0].astro.moonrise;
  const moonset = weather.forecast.forecastday[0].astro.moonset;

  return (
    <>
      <Header city={city} setCity={setCity} />
      <main className="flex flex-col p-8 gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col text-start gap-1">
            <h1 className="text-4xl font-bold">Previsão do Tempo</h1>
            <p className="text-muted-foreground">Temperatura para os próximos dias</p>
          </div>
          <ContactDialog />
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-5 p-2 items-start rounded-md">
          <div className="flex flex-col w-full lg:flex-[2] gap-4">
            <p className="text-base font-semibold">Clima atual</p>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2">
                <CardToday city={city} />
              </div>
              <div className="w-full md:w-1/2">
                <MoonCard phase={moonPhase} moonrise={moonrise} moonset={moonset} />
              </div>
            </div>
            <ClimateCards city={city} />
          </div>
          <div className="flex flex-col w-full lg:flex-[1] gap-4">
            <p className="text-base font-semibold">Previsão para os próximos dias</p>
            <div className="block md:hidden flex flex-col gap-5">
              {[...Array(7)].map((_, index) => (
                <CardClimate key={index} city={city} dayIndex={index} />
              ))}
            </div>
            <div className="relative hidden md:block ">
              <ScrollArea className="h-[520px] ">
                <div className="flex flex-col gap-5 pr-2">
                  {[...Array(7)].map((_, index) => (
                    <CardClimate key={index} city={city} dayIndex={index} />
                  ))}
                </div>
              </ScrollArea>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
