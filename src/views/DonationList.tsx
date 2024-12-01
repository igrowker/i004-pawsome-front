import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DonationInterface {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  monetaryDonation: boolean;
  targetAmountMoney: number;
  refugee_id: {
    _id: string;
    name: string;
    email: string;
  };
  status: string;
}

const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:3000/donations/donation-requests");
        const data = await response.json();

        if (data && Array.isArray(data.donationRequests)) {
          setDonations(data.donationRequests);
        } else {
          console.error("La estructura de la respuesta es incorrecta");
        }
      } catch (error) {
        console.error("Error al obtener las donaciones:", error);
      }
    };

    fetchDonations();
  }, []);

  const handleDonate = (donation: DonationInterface) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true); // Muestra el modal si no hay token
      return;
    }

    navigate(`/donation-amount?refugeeId=${donation.refugee_id._id}&donationId=${donation._id}`, {
      state: {
        title: donation.title,
        description: donation.description,
        refugee_id: donation.refugee_id._id,
        refugeeName: donation.refugee_id.name,
      },
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleLogin = () => {
    navigate("/login");
    setShowModal(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setShowModal(false);
  };

  return (
    <div className="mt-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="flex flex-col justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={donation.imageUrl}
                alt={`Imagen de ${donation.title}`}
              />
              <div className="flex flex-col justify-between">
                <span className="font-semibold text-lg text-neutral-800 italic">
                  {donation.title}
                </span>
                <p className="text-sm text-neutral-600 line-clamp-3">
                  {donation.description}
                </p>
                <p className="text-sm text-neutral-600 mt-2">
                  Refugio:{" "}
                  <span className="font-bold">{donation.refugee_id.name}</span>
                </p>
                <p className="text-sm text-neutral-600 mt-2">
                  Monto objetivo:{" "}
                  <span className="font-bold">{donation.targetAmountMoney}€</span>
                </p>
                <button
                  className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
                  onClick={() => handleDonate(donation)}
                >
                  Donar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">¡Debes estar logado para donar!</h2>
            <p className="text-gray-600 mb-6">
              Por favor, inicia sesión o regístrate para continuar.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                onClick={handleLogin}
              >
                Iniciar sesión
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                onClick={handleRegister}
              >
                Registrarse
              </button>
            </div>
            <button
              className="mt-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationList;
