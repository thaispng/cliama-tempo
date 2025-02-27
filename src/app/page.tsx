"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/ui/header";
import CardClimate from "@/components/CardClimate";
import { Component } from "@/components/BarChart";
import ContactDialog from "@/components/ContactDialog";

export default function Home() {
  const [location, setLocation] = useState<{ city: string; region: string } | null>(null);
  const [greeting, setGreeting] = useState("Bom dia!");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
            const data = await res.json();

            if (data?.location) {
              setLocation({ city: data.location.name, region: data.location.region });

              const localTime = new Date(data.location.localtime);
              const hours = localTime.getHours();

              if (hours >= 5 && hours < 12) {
                setGreeting("Bom dia!");
              } else if (hours >= 12 && hours < 18) {
                setGreeting("Boa tarde!");
              } else {
                setGreeting("Boa noite!");
              }
            }
          } catch (error) {
            console.error("Erro ao obter localização:", error);
          }
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col p-8 gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-start text-start gap-1">
            <h1 className="text-4xl font-bold">{greeting}</h1>
            <p>{location ? `${location.city}, ${location.region}` : "Carregando localização..."}</p>
          </div>
          <ContactDialog />
        </div>
        <div className="flex flex-row gap-4 overflow-x-auto">
          {[...Array(6)].map((_, index) => (
            <CardClimate key={index} dayIndex={index} />
          ))}
        </div>
        <Component />
      </main>
    </>
  );
}
