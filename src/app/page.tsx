import { Header } from "@/components/ui/header";
import CardClimate from "@/components/CardClimate";
import { Component } from "@/components/BarChart";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-row gap-4 overflow-x-auto p-4">
        {[...Array(6)].map((_, index) => (
          <CardClimate key={index} dayIndex={index} />
        ))}
      </div>
      <Component />
    </main>
  );
}
