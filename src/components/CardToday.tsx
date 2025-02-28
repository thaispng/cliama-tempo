import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CardToday = () => {
    return (
        <Card className="w-full shadow-sm">
            <CardHeader>
                <CardTitle>Clima atual</CardTitle>
            </CardHeader>
            <div className="flex flex-row justify-between items-center">
                <CardContent>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/sun.svg" alt="Sol" className="w-20 h-20" />
                        <span className="text-2xl font-bold">28°</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col justify-between items-center gap-2">
                        <span className="text-muted-foreground">Ensolarado</span>
                        <span className="text-muted-foreground">Ventos</span>
                        <span className="text-muted-foreground">Máxima de 30°</span>
                        <span className="text-muted-foreground">Mínima de 20°</span>
                    </div>
                </CardFooter>
            </div>
        </Card>
    )
}
export default CardToday;