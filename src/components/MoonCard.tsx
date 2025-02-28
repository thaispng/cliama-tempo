"use client"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getMoonImage = (phase: string) => {
    const moonImages: Record<string, string> = {
        "First Quarter": "/FirstQuarter.svg",
        "Full Moon": "/FullMoon.svg",
        "Last Quarter": "/LastQuarter.svg",
        "New Moon": "/NewMoon.svg",
        "Waning Crescent": "/WaningCrescent.svg",
        "Waning Gibbous": "/WaningGibbous.svg",
        "Waxing Crescent": "/WaxingCrescent.svg",
        "Waxing Gibbous": "/WaxingGibbous.svg",
    };

    return moonImages[phase] || "/NewMoon.svg";
};

interface MoonCardProps {
    phase: string;
    moonrise: string;
    moonset: string;
}

export default function MoonCard({ phase, moonrise, moonset }: MoonCardProps) {
    const moonImage = getMoonImage(phase);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fase da lua</CardTitle>
                <p className="font-base text-sm text-muted-foreground">{phase}</p>
            </CardHeader>
            <CardContent className="flex flex-row justify-around items-center gap-2 py-8">
                <div>
                    <Image src={moonImage} alt={phase} width={60} height={60} />
                </div>
                <div>
                    <p className="text-muted-foreground text-sm">Fase da Lua</p>
                    <p className="text-muted-foreground text-sm">Nascer: {moonrise}</p>
                    <p className="text-muted-foreground text-sm">Pôr: {moonset}</p>
                </div>
            </CardContent>
        </Card>
    );
}
