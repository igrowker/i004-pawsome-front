import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationDetails: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    privacyPolicy: false,
  });

  const handleNext = () => {
    const { firstName, lastName, email, privacyPolicy } = formData;

    if (!firstName || !lastName || !email || !privacyPolicy) {
      alert("Por favor, completa todos los campos y acepta la política de privacidad.");
      return;
    }

    // Guardar los datos en el estado global o localStorage
    localStorage.setItem("donationDetails", JSON.stringify(formData));
    navigate("/donation-payment");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Información personal</h1>
      <form className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label className="text-gray-700 text-sm">
            Acepto la{" "}
            <a href="/privacy" className="text-teal-500 underline">
              Política de privacidad
            </a>
          </label>
        </div>
      </form>
      <button
        onClick={handleNext}
        className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600 mt-6"
      >
        Siguiente
      </button>
    </div>
  );
};

export default DonationDetails;
