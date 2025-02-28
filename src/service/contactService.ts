import api from "@/lib/axiosInstance";

export const contactService = {
  async sendContact(data: {
    nome: string;
    email: string;
    phone: string;
    mensagem: string;
  }) {
    const response = await api.post("/contact", data);
    return response.data;
  },
};
