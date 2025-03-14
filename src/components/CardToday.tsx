"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useWeather } from "../service/useWeather";

const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("céu limpo") || conditionLower.includes("sol")) return "/sun.svg";
    if (conditionLower.includes("parcialmente nublado")) return "/sun-clouds.svg";
    if (conditionLower.includes("nublado") || conditionLower.includes("encoberto")) return "/clouds.svg";
    if (conditionLower.includes("chuva") || conditionLower.includes("garoa")) return "/sun-clouds-rain.svg";
    if (conditionLower.includes("trovoada") || conditionLower.includes("tempestade")) return "/lightning.svg";
    if (conditionLower.includes("neve") || conditionLower.includes("sleet")) return "/clouds-snow.svg";
    if (conditionLower.includes("granizo")) return "/hail.svg";

    return "/sun.svg";
};

const translateCondition = (condition: string) => {
    const translations: Record<string, string> = {
        "Clear": "Céu limpo",
        "Sunny": "Ensolarado",
        "Partly cloudy": "Parcialmente nublado",
        "Cloudy": "Nublado",
        "Overcast": "Encoberto",
        "Light rain": "Chuva leve",
        "Moderate rain": "Chuva moderada",
        "Heavy rain": "Chuva forte",
        "Drizzle": "Garoa",
        "Thunderstorm": "Tempestade",
        "Snow": "Neve",
        "Sleet": "Chuva congelante",
        "Mist": "Névoa",
        "Fog": "Nevoeiro",
        "Hail": "Granizo",
    };

    return translations[condition] || condition;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long" }).format(date);
};

const CardToday = ({ city }: { city: string }) => {
    const { data: weather, isLoading, error } = useWeather(city);

    if (isLoading) {
        return (
            <Card className="w-full shadow-sm">
                <CardHeader>
                    <CardTitle>Carregando...</CardTitle>
                </CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <CardContent>
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <Skeleton className="w-16 h-8" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col justify-between items-center gap-2">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-24 h-4" />
                        </div>
                    </CardFooter>
                </div>
            </Card>
        );
    }

    if (error || !weather) {
        return (
            <Card className="w-full shadow-sm">
                <CardHeader>
                    <CardTitle>Erro</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-500">Erro ao carregar dados do clima</p>
                </CardContent>
            </Card>
        );
    }

    const current = weather.current;
    const forecast = weather.forecast.forecastday[0];
    const weatherIcon = getWeatherIcon(current.condition.text);
    const translatedCondition = translateCondition(current.condition.text);
    const formattedDate = formatDate(forecast.date);

    return (
        <Card className="flex flex-col shadow-sm">
            <CardHeader className="w-full">
                <div>
                    <CardTitle className="text-lg bebas-neue">{formattedDate}
                    </CardTitle>
                    <span className="text-muted-foreground text-sm">{translatedCondition}</span>
                </div>
            </CardHeader>
            <div className="flex flex-row w-full justify-around items-center">
                <CardContent className="w-1/2">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={weatherIcon || "/placeholder.svg"}
                            alt={translatedCondition}
                            width={80}
                            height={80}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col w-1/2 gap-2">
                    <span className="text-4xl font-bold bebas-neue">{Math.round(current.temp_c)}°</span>
                    <div className="flex flex-col justify-between items-end">
                        <span className="text-muted-foreground  text-sm">Máxima de {Math.round(forecast.day.maxtemp_c)}°</span>
                        <span className="text-muted-foreground text-sm">Mínima de {Math.round(forecast.day.mintemp_c)}°</span>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
};

export default CardToday;
