"use client"
import { useState } from "react"
import { Header } from "@/components/ui/header"
import CardClimate from "@/components/CardClimate"
import ContactDialog from "@/components/ContactDialog"
import CardToday from "@/components/CardToday"
import ClimateCards from "@/components/ClimateCards"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [city, setCity] = useState("São Paulo")

  return (
    <>
      <Header city={city} setCity={setCity} />
      <main className="flex flex-col p-8 gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start text-start gap-1">
            <h1 className="text-4xl font-bold">Previsão do Tempo</h1>
            <p className="text-muted-foreground">Temperatura para os próximos dias</p>
          </div>
          <ContactDialog />
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-4 p-2 items-start rounded-md">
          <div className="flex flex-col w-full gap-4">
            <p className="text-base font-semibold">Clima atual</p>
            <CardToday city={city} />
            <ClimateCards city={city} />
            <div className="h-">
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold">Previsão para os próximos dias
            </p>
            <div className="relative">
              <ScrollArea className="h-[565px] w-full">
                <div className="flex flex-col gap-4 pr-2">
                  {[...Array(7)].map((_, index) => (
                    <CardClimate key={index} city={city} dayIndex={index} />
                  ))}
                </div>
              </ScrollArea>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </main >
    </>
  )
}

