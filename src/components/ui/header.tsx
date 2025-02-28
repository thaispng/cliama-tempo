"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MapPin, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ city, setCity }: { city: string; setCity: (city: string) => void }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search.trim()) {
            setCity(search.trim());
            setSearch("");
        }
    };

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-transparent dark:bg-transparent">
            <h1 className="flex flex-row gap-2 text-base items-center font-semibold bebas-neue">
                <MapPin size={16} />
                <span>{city} - {time}</span>
            </h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                    className="shadow-sm"
                    type="text"
                    id="location"
                    placeholder="Digite a cidade e pressione Enter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                />
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
