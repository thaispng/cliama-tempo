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

const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("sun") || conditionLower.includes("clear")) return "/sun.svg";
    if (conditionLower.includes("partly cloudy")) return "/sun-clouds.svg";
    if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) return "/clouds.svg";
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) return "/sun-clouds-rain.svg";
    if (conditionLower.includes("thunderstorm") || conditionLower.includes("lightning")) return "/lightning.svg";
    if (conditionLower.includes("snow") || conditionLower.includes("sleet")) return "/clouds-snow.svg";

    return "/sun.svg";
};

const getFormattedDay = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "long",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
};

const CardClimate = ({ city, dayIndex = 0 }: { city?: string; dayIndex?: number }) => {
    const { data: weather, isLoading, error } = useWeather(city);

    if (isLoading) {
        return (
            <Card className="w-fit rounded-xl p-4 overflow-hidden">
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-sm">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                </CardFooter>
            </Card>
        );
    }

    if (error) return <p className="text-red-500">Erro ao buscar clima</p>;

    const forecast = weather?.forecast?.forecastday?.[dayIndex];

    if (!forecast) {
        return <p className="text-red-500">Dados indisponíveis.</p>;
    }

    const formattedDate = getFormattedDay(forecast.date);
    const weatherIcon = getWeatherIcon(forecast.day.condition.text);
    const translatedCondition = translateCondition(forecast.day.condition.text);

    return (
        <Card className="w-fit rounded-xl p-4 overflow-hidden">
            <CardHeader>
                <CardTitle className="text-base">{formattedDate}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
                <p className="text-xl font-bold">{forecast.day.avgtemp_c}°C</p>
                <Image
                    src={weatherIcon}
                    alt={translatedCondition}
                    width={60}
                    height={60}
                />
                <p>{translatedCondition}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-sm">
                <p>💧 <strong>Umidade:</strong> {forecast.day.avghumidity}%</p>
                <p>💨 <strong>Vento:</strong> {forecast.day.maxwind_kph} km/h</p>
            </CardFooter>
        </Card>
    );
};

export default CardClimate;
