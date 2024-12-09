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
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    console.log("Datos enviados al backend para crear sesión:", data);

    const response = await axios.post(
      `${baseURL}/payment/create-checkout-session`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Respuesta del backend al crear la sesión:", response.data);

    return response.data; // Retorna la respuesta de la sesión de Stripe
  } catch (error) {
    console.error("Error creando la sesión de Stripe:", error);
    throw error;
  }
};
