import Image from "next/image";
import { useEffect, useState } from "react";

const imageMap: { [key: string]: string } = {
    "céu limpo": "/sun.svg",
    "sol": "/sun.svg",
    "parcialmente nublado": "/sun-clouds.svg",
    "nublado": "/clouds.svg",
    "encoberto": "/clouds.svg",
    "chuva": "/sun-clouds-rain.svg",
    "garoa": "/sun-clouds-rain.svg",
    "trovoada": "/lightning.svg",
    "tempestade": "/lightning.svg",
    "neve": "/clouds-snow.svg",
    "sleet": "/clouds-snow.svg",
    "granizo": "/hail.svg",
};

export const LoadingSpinner = ({ condition }: { condition: string }) => {
    const [imageSrc, setImageSrc] = useState("/sun.svg");

    useEffect(() => {
        const conditionLower = condition.toLowerCase();
        const matchedImage = Object.keys(imageMap).find((key) => conditionLower.includes(key));

        const timeout = setTimeout(() => {
            if (matchedImage) {
                setImageSrc(imageMap[matchedImage]);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [condition]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-white shadow-xl shadow-black/10 dark:shadow-white/10">
                <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-transparent border-t-primary dark:border-t-white"></div>
                <Image src={imageSrc} alt="Carregando" width={48} height={48} className="z-10" />
            </div>
        </div>
    );
};
