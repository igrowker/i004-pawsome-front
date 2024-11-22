import React, { useState } from "react";

interface ForgotPasswordProps {
  apiEndpoint: string; // URL del endpoint para enviar la solicitud
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ apiEndpoint }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Se ha enviado un enlace de recuperación a tu correo.");
        setEmail("");
      } else if (response.status === 404) {
        setError("El correo no está registrado.");
      } else {
        setError("Ocurrió un problema. Intenta de nuevo más tarde.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Recuperar Contraseña
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-500">{message}</p>}
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Enlace"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
