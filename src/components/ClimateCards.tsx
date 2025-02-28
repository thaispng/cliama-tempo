"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Eye, Gauge, Info, Thermometer, Umbrella, Wind } from "lucide-react"
import { useWeather } from "../service/useWeather"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export default function ClimateCards({ city = "São Paulo" }: { city?: string }) {
    const { data: weather, isLoading, error } = useWeather(city)

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error || !weather) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[...Array(6)].map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex gap-2 text-base">
                                <Wind size={22} /> Dados indisponíveis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">--</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    const current = weather.current

    const climateData = [
        {
            title: "Umidade",
            value: `${current.humidity}%`,
            icon: <Droplets size={22} />,
        },
        {
            title: "Pressão",
            value: `${current.pressure_mb} mb`,
            icon: <Gauge size={22} />,
            tooltip: "Pressão atmosférica é a força exercida pelo ar sobre a superfície terrestre."
        },
        {
            title: "Sensação térmica",
            value: `${Math.round(current.feelslike_c)}°C`,
            icon: <Thermometer size={22} />,
        },
        {
            title: "Índice UV",
            value: current.uv,
            icon: <Umbrella size={22} />,
        },
        {
            title: "Velocidade do vento",
            value: `${current.wind_kph} km/h`,
            icon: <Wind size={22} />,
        },
        {
            title: "Visibilidade",
            value: "10 km",
            icon: <Eye size={22} />,
            tooltip: "Visibilidade indica a distância máxima em que objetos podem ser claramente vistos."
        },
    ]

    return (
        <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {climateData.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex justify-between text-base font-normal text-muted-foreground">
                                <div className="flex gap-2">
                                    {item.icon} {item.title}
                                </div>
                                {item.tooltip && (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info size={15} className="text-gray-400 cursor-pointer" />
                                        </TooltipTrigger>
                                        <TooltipContent>{item.tooltip}</TooltipContent>
                                    </Tooltip>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="bebas-neue">{item.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TooltipProvider>
    )
}
