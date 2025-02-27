"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MapPin, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [location, setLocation] = useState({ city: "Localização", region: "" });

    useEffect(() => {
        setMounted(true);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    const res = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();

                    if (data?.location) {
                        setLocation({ city: data.location.name, region: data.location.region });
                    }
                },
                () => {
                    setLocation({ city: "Localização não permitida", region: "" });
                }
            );
        }
    }, []);

    if (!mounted) return null;

    return (
        <header className="flex justify-between items-center p-4 bg-transparent dark:bg-transparent">
            <h1 className="flex flex-row gap-2 text-base items-center font-semibold">
                <MapPin size={16} />
                <span>{location.city},</span> {location.region}
            </h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input type="text" id="location" placeholder="Pesquise por CEP, cidade, rua..." />
            </div>
            <div className="relative flex items-center">
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center transition-all"
                >
                    <span
                        className={`absolute top-1 left-1 w-4 h-4 flex items-center justify-center bg-white dark:bg-black rounded-full transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-0"
                            }`}
                    >
                        {theme === "dark" ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-black" />}
                    </span>
                </Switch>
            </div>
        </header>
    );
}
