import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const createStripeSession = async (data: {
  title: string;
  description: string;
  moneyAmount: number;
  refugee_id: string;
  donation_id: string;
}) => {
  try {
    const token = localStorage.getItem("token"); // Recuperar el token
    console.log("Token enviado:", token); // Verificar el token
    const response = await axios.post(
      `${baseURL}/payment/create-checkout-session`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token
        },
      }
    );
    console.log("Respuesta del backend:", response.data); // Verificar respuesta
    return response.data; // Devolver la sesión de Stripe desde el backend
  } catch (error) {
    console.error("Error creando la sesión de Stripe:", error);
    throw error;
  }
};
