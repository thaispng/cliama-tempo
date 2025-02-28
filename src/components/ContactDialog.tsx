"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactService } from "@/service/contactService";
import { contactSchema } from "@/schemas/contactSchema";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const mutation = useMutation({
        mutationFn: async (data: ContactFormData) => {
            console.log("Enviando dados:", data);
            return contactService.sendContact(data);
        },
        onSuccess: () => {
            toast.success("Contato enviado com sucesso!");
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Erro ao enviar contato. Tente novamente.");
            console.error("Erro ao enviar:", error);
        }
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error("Erro ao enviar:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="shadow-sm">Entre em Contato</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Fale Conosco</DialogTitle>
                    <DialogDescription>Preencha o formulário abaixo e entraremos em contato.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input type="text" id="nome" placeholder="Digite seu nome" {...register("nome")} />
                        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Digite seu email" {...register("email")} />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input type="tel" id="phone" placeholder="Digite seu telefone" {...register("phone")} />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" placeholder="Digite sua mensagem" {...register("mensagem")} />
                        {errors.mensagem && <span className="text-red-500 text-sm">{errors.mensagem.message}</span>}
                    </div>
                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Enviando..." : "Enviar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
