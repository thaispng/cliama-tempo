"use client";
import { useState } from "react";
import { Header } from "@/components/ui/header";
import CardClimate from "@/components/CardClimate";
import ContactDialog from "@/components/ContactDialog";
import CardToday from "@/components/CardToday";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wind } from "lucide-react";
export default function Home() {
  const [city, setCity] = useState("São Paulo");


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
        <div className="flex flex-row w-full gap-4 p-2 items-start rounded-md">
          <div className="flex flex-col w-full gap-4">
            <CardToday />
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Qualidade do ar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Umidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Pressão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Visibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Índice UV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 text-base"> <Wind size={22} />Velocidade do vento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    156
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold">
              Previsão para os próximos dias
            </p>
            {[...Array(7)].map((_, index) => (
              <CardClimate key={index} city={city} dayIndex={index} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
