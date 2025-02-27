"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(Object.fromEntries(formData.entries()));
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Entre em Contato</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Fale Conosco</DialogTitle>
                    <DialogDescription>Preencha o formulário abaixo e entraremos em contato.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input type="text" id="nome" name="nome" placeholder="Digite seu nome" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="Digite seu email" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input type="phone" id="phone" name="phone" placeholder="Digite seu telefone" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" name="mensagem" placeholder="Digite sua mensagem" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="arquivo">Anexar arquivo (PDF)</Label>
                        <Input type="file" id="arquivo" name="arquivo" accept="application/pdf" required />
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
