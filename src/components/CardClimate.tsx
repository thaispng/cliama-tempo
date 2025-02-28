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

    if (conditionLower.includes("céu limpo") || conditionLower.includes("sol")) return "/sun.svg";
    if (conditionLower.includes("parcialmente nublado")) return "/sun-clouds.svg";
    if (conditionLower.includes("nublado") || conditionLower.includes("encoberto")) return "/clouds.svg";
    if (conditionLower.includes("chuva") || conditionLower.includes("garoa")) return "/sun-clouds-rain.svg";
    if (conditionLower.includes("trovoada") || conditionLower.includes("tempestade")) return "/lightning.svg";
    if (conditionLower.includes("neve") || conditionLower.includes("sleet")) return "/clouds-snow.svg";
    if (conditionLower.includes("granizo")) return "/hail.svg";

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

const CardClimate = ({ city, dayIndex = 0 }: { city: string; dayIndex?: number }) => {
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

    const avgTemp = Math.round(forecast.day.avgtemp_c);

    return (
        <Card className="w-[400px] rounded-xl overflow-hidden shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm bebas-neue">{formattedDate}</CardTitle>
                <span className="text-muted-foreground text-sm">{translatedCondition}</span>
            </CardHeader>
            <CardContent className="flex flex-row justify-around items-center gap-2">
                <div>
                    <Image
                        src={weatherIcon}
                        alt={translatedCondition}
                        width={60}
                        height={60}
                    />
                </div>
                <div>
                    <p className="text-xl font-bold bebas-neue">{avgTemp}°C</p>
                    <p className="text-muted-foreground text-xs">Máx: {Math.round(forecast.day.maxtemp_c)}°C</p>
                    <p className="text-muted-foreground text-xs">Min: {Math.round(forecast.day.mintemp_c)}°C</p>
                    <p className="text-muted-foreground text-xs">Umidade: {forecast.day.avghumidity}%</p>
                    <p className="text-muted-foreground text-xs">Vento: {Math.round(forecast.day.maxwind_kph)} km/h</p>
                    <p className="text-muted-foreground text-xs">Índice UV: {forecast.day.uv}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardClimate;


