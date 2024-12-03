import { useNavigate } from "react-router-dom";

const DonationCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDonations = () => {
    // Redirige a la lista de donaciones
    navigate("/donationlist");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          ¡El pago no se ha completado!
        </h1>
        <p className="text-gray-600 mb-6">
          Lamentamos los inconvenientes. Parece que el proceso de pago no pudo
          completarse.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            onClick={handleGoToDonations}
          >
            Volver a las donaciones
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            onClick={() => navigate("/")}
          >
            Volver a inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCancel;
