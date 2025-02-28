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

const CardToday = ({ city }: { city: string }) => {
    const { data: weather, isLoading, error } = useWeather(city);

    if (isLoading) {
        return (
            <Card className="w-full shadow-sm">
                <CardHeader>
                    <CardTitle>Clima atual</CardTitle>
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
                    <CardTitle>Clima atual</CardTitle>
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

    console.log("Condição atual:", weather?.current?.condition?.text);
    console.log("Ícone selecionado:", getWeatherIcon(weather?.current?.condition?.text));


    return (
        <Card className="w-full shadow-sm">
            <CardHeader>
                <CardTitle>Clima atual</CardTitle>
            </CardHeader>
            <div className="flex flex-row justify-between items-center">
                <CardContent>
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src={weatherIcon || "/placeholder.svg"}
                            alt={translatedCondition}
                            width={80}
                            height={80}
                        />
                        <span className="text-2xl font-bold">{Math.round(current.temp_c)}°</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col justify-between items-center gap-2">
                        <span className="text-muted-foreground">{translatedCondition}</span>
                        <span className="text-muted-foreground">Ventos: {current.wind_kph} km/h</span>
                        <span className="text-muted-foreground">Máxima de {Math.round(forecast.day.maxtemp_c)}°</span>
                        <span className="text-muted-foreground">Mínima de {Math.round(forecast.day.mintemp_c)}°</span>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
};

export default CardToday;