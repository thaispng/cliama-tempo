import { NextResponse } from "next/server";
import { contactSchema } from "@/schemas/contactSchema";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos na API:", body);

    const parsedData = contactSchema.parse(body);
    console.log("Dados validados:", parsedData);

    const contact = await prisma.contact.create({
      data: parsedData,
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json({ error: "Erro ao enviar os dados" }, { status: 400 });
  }
}

