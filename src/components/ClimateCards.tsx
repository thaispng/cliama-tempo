import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

const climateData = [
    { title: "Qualidade do ar", value: 156 },
    { title: "Umidade", value: 156 },
    { title: "Pressão", value: 156 },
    { title: "Visibilidade", value: 156 },
    { title: "Índice UV", value: 156 },
    { title: "Velocidade do vento", value: 156 },
];

export default function ClimateCards() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {climateData.map((item, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="flex gap-2 text-base">
                            <Wind size={22} /> {item.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
