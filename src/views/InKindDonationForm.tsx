import BackButton from "@/components/VolverButton";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const InKindDonationForm = () => {
  const location = useLocation();
  const { title, donationId } = location.state || {}; // Datos recibidos desde DonationList

  const [quantity, setQuantity] = useState(0); // Cantidad de material
  const [description, setDescription] = useState(""); // Descripción del material
  const [materialStatus, setMaterialStatus] = useState<"new" | "used">("new"); // Estado del material
  const [errorMessage, setErrorMessage] = useState(""); // Mensajes de error
  const [loading, setLoading] = useState(false); // Estado de carga
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado del modal de éxito
  const navigate = useNavigate();

  // Esto representaría el ID del usuario, puedes obtenerlo de la sesión o de un contexto global.
  const user_id = localStorage.getItem("user_id"); // Esto se ajustaría dependiendo de cómo manejas la sesión.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!title || !quantity || !description) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    // Datos de la donación a enviar
    const donationData = {
      title,
      quantity,
      description,
      materialStatus,
      user_id, // Suponiendo que el ID de usuario se obtiene de alguna forma
      donation_request_id: donationId, // Se pasa el ID de la solicitud de donación
    };

    // Enviar la solicitud POST al backend
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/new-material-donation`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(donationData), // Enviar los datos como JSON
      });

      if (!response.ok) {
        throw new Error("Error al enviar la donación.");
      }

      if (response.status === 200) {
        setShowSuccessModal(true); // Mostrar modal de éxito
      }

      const responseData = await response.json();
      console.log("Donación enviada correctamente:", responseData);

    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Redirigir a DonationList después de cerrar el modal
    navigate("/donationlist");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 pt-5">Donación en Especie</h1>
      <div className="bg-white rounded-3xl shadow-lg p-5 max-h-full w-full max-w-lg">
        <form noValidate className="space-y-4 mb-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre del material</label>
            <input
              type="text"
              id="name"
              value={title}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">Descripción del material</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-teal-500 resize-none"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">Cantidad de material</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="materialStatus" className="block text-sm font-medium text-gray-600">Estado del material</label>
            <select
              id="materialStatus"
              value={materialStatus}
              onChange={(e) => setMaterialStatus(e.target.value as "new" | "used")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-teal-500"
            >
              <option value="new">Nuevo</option>
              <option value="used">Usado</option>
            </select>
          </div>

          {/* Mostrar mensaje de error si hay alguno */}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-2xl hover:bg-primaryLight transition-colors"
            disabled={loading} // Deshabilitar el botón mientras se está procesando la solicitud
          >
            {loading ? "Enviando..." : "Enviar Donación"}
          </button>
        </form>
        <BackButton className="mt-5 justify-end" icon={<FaArrowLeft />} to={`/donationlist`} />
      </div>

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">¡Donación realizada exitosamente!</h2>
            <p className="text-gray-600 mb-6">Gracias por tu generosidad.</p>
            <button
              className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
              onClick={handleCloseModal}
            >
              Volver a la lista de donaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InKindDonationForm;
