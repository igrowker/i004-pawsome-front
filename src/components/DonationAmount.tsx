import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createStripeSession } from "@/redux/services/donationService";

const DonationAmount: React.FC = () => {
  const [amount, setAmount] = useState<number>(5); // Monto preseleccionado
  const [customAmount, setCustomAmount] = useState<number | null>(null); // Monto personalizado
  const [searchParams] = useSearchParams();
  const refugeeId = searchParams.get("refugeeId");
  const donationId = searchParams.get("donationId");
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!refugeeId || !donationId) {
      alert("No se encontró el ID del refugio.");
      return;
    }

    try {
      const response = await createStripeSession({
        title: "Donación a refugio",
        description: "Gracias por tu generosidad.",
        moneyAmount: (customAmount || amount) * 100, // Convertir a centavos
        refugee_id: refugeeId,
        donation_id: donationId,
      });

      console.log("Respuesta del backend:", response); // Debugging

      // Verifica si 'response.url' existe
      if (response.session && response.session.url) {
        window.location.href = response.session.url; // Redirigir a Stripe Checkout
      } else {
        console.error("URL de la sesión no encontrada en la respuesta:", response);
        throw new Error("URL de la sesión no encontrada");
      }
    } catch (error) {
      console.error("Error creando la sesión de Stripe:", error);
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
            onClick={() => {
              setAmount(value);
              setCustomAmount(null); // Reiniciar monto personalizado si se selecciona un monto predefinido
            }}
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
        onChange={(e) => {
          const value = Number(e.target.value);
          setCustomAmount(value > 0 ? value : null); // Validar que el monto sea mayor a 0
        }}
      />
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        onClick={handlePayment}
        disabled={!refugeeId} // Deshabilitar si no hay un refugio asociado
      >
        Proceder al pago
      </button>
    </div>
  );
};

export default DonationAmount;
