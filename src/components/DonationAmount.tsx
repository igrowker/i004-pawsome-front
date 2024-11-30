import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createStripeSession } from "@/redux/services/donationService";

const DonationAmount: React.FC = () => {
  const [amount, setAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const refugeeId = searchParams.get("refugeeId");
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const session = await createStripeSession({
        title: "Donación a refugio",
        description: "Gracias por tu generosidad.",
        moneyAmount: (customAmount || amount) * 100, // Stripe espera montos en centavos
      });

      window.location.href = session.url; // Redirige a Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("Hubo un problema al procesar tu donación.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Selecciona un importe</h1>
      <div className="flex gap-4">
        {[5, 10, 20, 50].map((value) => (
          <button
            key={value}
            className={`px-4 py-2 ${
              amount === value ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setAmount(value)}
          >
            {value}€
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Otra cantidad"
        className="mt-4 p-2 border rounded"
        min={1}
        onChange={(e) => setCustomAmount(Number(e.target.value))}
      />
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Proceder al pago
      </button>
    </div>
  );
};

export default DonationAmount;
