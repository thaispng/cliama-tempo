"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useWeather } from "../service/useWeather";

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

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">Erro ao buscar clima</p>;

    if (!weather || !weather.forecast || !weather.forecast.forecastday || !weather.forecast.forecastday[dayIndex]) {
        return <p className="text-red-500">Dados indisponíveis.</p>;
    }

    const forecast = weather.forecast.forecastday[dayIndex];
    const formattedDate = getFormattedDay(forecast.date);
    const weatherIcon = getWeatherIcon(forecast.day.condition.text);

    return (
        <Card className="w-fit rounded-xl p-4">
            <CardHeader>
                <CardTitle>{formattedDate}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
                <p className="text-2xl font-bold">{forecast.day.avgtemp_c}°C</p>
                <Image
                    src={weatherIcon}
                    alt={forecast.day.condition.text}
                    width={75}
                    height={75}
                />
                <p>{forecast.day.condition.text}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-sm">
                <p>💧 <strong>Umidade:</strong> {forecast.day.avghumidity}%</p>
                <p>💨 <strong>Vento:</strong> {forecast.day.maxwind_kph} km/h</p>
            </CardFooter>
        </Card>
    );
};

export default CardClimate;
