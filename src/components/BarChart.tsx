"use client";

import { CloudRain } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useWeather } from "../service/useWeather";

const chartConfig = {
    chance: {
        label: "Chance de Chuva (%)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function Component({ city }: { city?: string }) {
    const { data: weather, isLoading, error } = useWeather(city);

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">Erro ao buscar clima</p>;
    if (!weather || !weather.forecast || !weather.forecast.forecastday) {
        return <p className="text-red-500">Dados indisponíveis.</p>;
    }

    const chartData = weather.forecast.forecastday.map((day) => ({
        day: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(day.date)),
        chance: day.day.daily_chance_of_rain,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chance de Chuva</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="chance" fill="var(--color-chance)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Previsão para os próximos dias <CloudRain className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Representando a chance de chuva diária com base na previsão
                </div>
            </CardFooter>
        </Card>
    );
}
