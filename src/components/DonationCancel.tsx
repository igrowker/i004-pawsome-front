import { useNavigate } from "react-router-dom";

const DonationCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Redirige a la página donde se selecciona la cantidad para intentar de nuevo
    navigate("/donation-amount");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        ¡El pago no se ha completado!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Lamentamos los inconvenientes. Parece que el proceso de pago no pudo completarse.
      </p>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          onClick={handleRetry}
        >
          Intentar de nuevo
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
          onClick={() => navigate("/")}
        >
          Volver a la página principal
        </button>
      </div>
    </div>
  );
};

export default DonationCancel;
