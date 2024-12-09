import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { createStripeSession } from "@/redux/services/donationService";

const DonationAmount: React.FC = () => {
  const [amount, setAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [refugeeId, setRefugeeId] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [donationTitle, setDonationTitle] = useState<string>("Donación");
  const [refugeeName, setRefugeeName] = useState<string>("");

  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as {
      refugeeId?: string;
      donationId?: string;
      title?: string;
      refugeeName?: string;
    };

    // Extraer IDs de la navegación o URL
    const idFromState = state?.refugeeId;
    const donationIdFromState = state?.donationId;

    const refugeeIdFromUrl = searchParams.get("refugeeId");
    const donationIdFromUrl = searchParams.get("donationId");

    // Priorizar el estado; si no existe, usar parámetros de URL
    setRefugeeId(idFromState || refugeeIdFromUrl);
    setDonationId(donationIdFromState || donationIdFromUrl);

    // Establecer otros valores contextuales
    setDonationTitle(state?.title || searchParams.get("donationTitle") || "Donación");
    setRefugeeName(state?.refugeeName || searchParams.get("refugeeName") || "N/A");
  }, [location.state, searchParams]);

  const handlePayment = async () => {
    if (!refugeeId || !donationId) {
      alert("No se encontraron los IDs requeridos.");
      console.log("Refugee ID:", refugeeId);
      console.log("Donation ID:", donationId);
      return;
    }

    try {
      const response = await createStripeSession({
        title: donationTitle,
        description: `Donación para ${refugeeName}`,
        moneyAmount: (customAmount || amount) * 100,
        refugee_id: refugeeId,
        donation_id: donationId,
      });

      if (response.session?.url) {
        window.location.href = response.session.url;
      } else {
        throw new Error("URL de la sesión no encontrada.");
      }
    } catch (error) {
      console.error("Error creando la sesión de Stripe:", error);
      alert("Hubo un problema al procesar tu donación.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">{donationTitle}</h1>
        <h2 className="text-lg text-gray-600 text-center mb-6">
          Refugio: <span className="font-semibold">{refugeeName}</span>
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Selecciona una cantidad para tu donación:</p>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 20, 50].map((value) => (
              <button
                key={value}
                className={`py-2 rounded-lg font-medium ${
                  amount === value
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => {
                  setAmount(value);
                  setCustomAmount(null);
                }}
              >
                {value}€
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">O ingresa un importe personalizado:</p>
            <input
              type="number"
              placeholder="Otra cantidad (€)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              min={1}
              onChange={(e) => {
                const value = Number(e.target.value);
                setCustomAmount(value > 0 ? value : null);
              }}
            />
          </div>
        </div>

        <button
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          onClick={handlePayment}
          disabled={!refugeeId || !donationId}
        >
          Proceder al pago
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Tu donación hace una gran diferencia. ¡Gracias por tu generosidad!
        </p>
      </div>
    </div>
  );
};

export default DonationAmount;
