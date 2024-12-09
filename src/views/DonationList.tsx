import { useDonnationList } from "@/hooks/useDonnationList";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/VolverButton";
import { FaArrowLeft } from "react-icons/fa";


const DonationList: React.FC = () => {
  const {
    donations,
    handleCloseModal,
    handleDonate,
    handleInKindDonation,
    handleLogin,
    handleRegister,
    showModal,
    /*     setDonations, */
  } = useDonnationList();
  const navigate = useNavigate();

  const handleDonationClick = (donation: any) => {
    handleInKindDonation(donation.refugee_id, donation.title, donation._id);
    navigate("/in-kind-donation", {
      state: {
        refugee_id: donation.refugee_id,
        title: donation.title,
        donationId: donation._id,
      },
    });
  };


  /*   const handleDeleteDonation = async (donationId: string) => {
      try {
        const response = await fetch(`http://localhost:3000/donations-requests/${donationId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.ok) {
          // Elimina la donación de la lista
          setDonations((prevDonations) => prevDonations.filter(donation => donation._id !== donationId));
          alert("Donación eliminada correctamente");
        } else {
          alert("Error al eliminar la donación");
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al eliminar la donación.");
      }
    }; */

  return (
    <div className="mt-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="flex flex-col justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between">
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
                  {donation.isMonetaryDonation ? (
                    <div>
                      <p className="text-sm text-neutral-600 mt-2">
                        Monto necesitado:{" "}
                        <span className="font-bold">
                          {donation.targetAmountMoney}€
                        </span>
                      </p>
                      <button
                        className="mt-4 bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
                        onClick={() => handleDonate(donation)}
                      >
                        Donar
                      </button>
                    </div>
                  )
                    : (
                      <div>
                        <p className="text-sm text-neutral-600 mt-2">
                          Cantidad necesitada:{" "}
                          <span className="font-bold">
                            {donation.targetItemsCount}
                          </span>
                        </p>
                        <button
                          className="mt-4 bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
                          onClick={() => handleDonationClick(donation)}
                        >
                          Donar
                        </button>
                      </div>
                    )}
                </div>
              </div>
              {/*               Botón de eliminar
              <button
                className="text-red-600 text-xl"
                onClick={() => handleDeleteDonation(donation._id)}
              >
                ×
              </button> */}
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
      <BackButton className="mt-5 justify-end" icon={<FaArrowLeft />} to={`/home`} />
    </div>
  );
};

export default DonationList;

