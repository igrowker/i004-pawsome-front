import axios from "axios";

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
      "http://localhost:3000/payment/create-checkout-session",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Respuesta del backend al crear la sesión:", response.data);

    // Guardar la donación en localStorage
    const storedDonations = JSON.parse(localStorage.getItem("userDonations") || "[]");
    storedDonations.push({
      sessionId: response.data.session.id,
      title: data.title,
      description: data.description,
      moneyAmount: data.moneyAmount,
      refugee_id: data.refugee_id,
      donation_id: data.donation_id,
    });
    localStorage.setItem("userDonations", JSON.stringify(storedDonations));

    return response.data; // Retorna la respuesta de la sesión de Stripe
  } catch (error) {
    console.error("Error creando la sesión de Stripe:", error);
    throw error;
  }
};
