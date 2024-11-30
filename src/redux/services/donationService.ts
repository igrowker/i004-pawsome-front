import axios from "axios";

interface CreateStripeSessionParams {
  title: string;
  description: string;
  moneyAmount: number; // Monto en centavos
}

export const createStripeSession = async (params: CreateStripeSessionParams) => {
  try {
    // Asegúrate de que esta URL sea la de tu backend
    const response = await axios.post("/api/stripe/create-session", {
      title: params.title,
      description: params.description,
      moneyAmount: params.moneyAmount,
    });

    return response.data; // Se espera que el backend devuelva la URL de la sesión
  } catch (error: any) {
    console.error("Error creating Stripe session:", error);
    throw new Error(
      error?.response?.data?.message || "Error al crear la sesión de Stripe."
    );
  }
};
