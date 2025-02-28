import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const arquivo = formData.get("arquivo") as File | null;
    let arquivoBuffer = null;
    let arquivoNome = null;

    if (arquivo) {
      const arrayBuffer = await arquivo.arrayBuffer();
      arquivoBuffer = Buffer.from(arrayBuffer); 
      arquivoNome = arquivo.name; 
    }

    const parsedData = {
      nome: formData.get("nome") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      mensagem: formData.get("mensagem") as string,
      arquivo: arquivoBuffer ? new Uint8Array(arquivoBuffer) : null,
      arquivoNome,
    };
    const contact = await prisma.contact.create({
      data: parsedData,
    });

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { error: "Erro ao enviar os dados" },
      { status: 400 }
    );
  }
}
