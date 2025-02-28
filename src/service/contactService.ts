import api from "@/lib/axiosInstance";

export const contactService = {
  async sendContact(data: {
    nome: string;
    email: string;
    phone: string;
    mensagem: string;
    arquivo?: File;
  }) {
    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("mensagem", data.mensagem);

    if (data.arquivo) {
      formData.append("arquivo", data.arquivo);
    }

    const response = await api.post("/contact", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
