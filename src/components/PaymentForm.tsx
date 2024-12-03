import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";


const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Pago realizado:", paymentMethod);
      alert("Donación completada.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <CardElement className="border px-4 py-2 rounded-lg" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600"
      >
        Realizar pago
      </button>
    </form>
  );
};

export default PaymentForm;