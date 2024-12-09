import React from "react";
import { useNavigate } from "react-router-dom";

const DonationSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h1 className="text-3xl font-bold text-teal-600 mb-4">
          ¡Gracias por tu donación! 🎉
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Tu contribución marcará una gran diferencia para el refugio y los animales.
        </p>
        <button
          className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
          onClick={() => navigate("/home")}
        >
          Volver al inicio
        </button>
        <button
          className="mt-4 bg-gray-200 text-teal-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/home")}
        >
          Ver más oportunidades de donación
        </button>
      </div>
    </div>
  );
};

export default DonationSuccess;
