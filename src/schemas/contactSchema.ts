import { z } from "zod";

export const contactSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  mensagem: z.string().min(1, "Mensagem não pode ser vazia"),
});
