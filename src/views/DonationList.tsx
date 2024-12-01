import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDonationsData } from "./helpers/getDonations";
import { useDispatch } from "react-redux";
import { setDonationInfo } from "@/redux/actions/DonationIndexType";


interface DonationInterface {
  _id: string,
  refugee_id: string,
  title: string,
  description: string,
  imageUrl: string,
  monetaryDonation: boolean,
  targetAmountMoney: number,
  targetItemsCount: number,
}
interface actualDonationInf{
  refugee_id : string,
  title :string,
}


const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [actualDonation, SetActualDonation] = useState<actualDonationInf>();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonationsData();;
        console.log(response)
    
        if (response && Array.isArray(response.donationRequests)) {
          const shelterFilter = response.donationRequests.filter(
            (element: DonationInterface) => element.refugee_id === '674afd90d93aca13ac428584' // Corregido
          );
          console.log(shelterFilter)
          setDonations(shelterFilter);
        } else {
          console.error("La estructura de la respuesta es incorrecta");
        }
      } catch (error) {
        console.error("Error al obtener las donaciones:", error);
      }
    };

   /*  dispatch(setDonationInfo(actualDonation.refugee_id, actualDonation.title)); */

    fetchDonations();
  }, []);

  const handleDonate = (donation: DonationInterface) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowModal(true); // Muestra el modal si no hay token
      return;
    }

    navigate(`/donation-amount?refugeeId=${donation.refugee_id}&donationId=${donation._id}`, {
      state: {
        title: donation.title,
        description: donation.description,
        refugee_id: donation.refugee_id,
/*         refugeeName: donation.refugee_id.name, */
      },
    });
  };

  const form = () =>{
    navigate('/in-kind-donation'); 
  }

  const handleInKindDonation = (elemen1:string, elemen2:string, elemen3:string) =>{
    const donationInf = {
      refugee_id : elemen1,
      title : elemen2,
      id : elemen3
    }
    SetActualDonation(donationInf);
    if (actualDonation){
      form();
    }
  }

  const handleCloseModal = () => setShowModal(false);

  const handleLogin = () => {
    navigate("/login");
    setShowModal(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setShowModal(false);
  };
  
  console.log(donations)
  console.log(actualDonation)

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
                {
                  donation.monetaryDonation? 
                  <div>

                <p className="text-sm text-neutral-600 mt-2">
                  Monto necesitado:{" "}
                  <span className="font-bold">{donation.targetAmountMoney}€</span>
                </p>
                <button
                  className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
                  onClick={() => handleDonate(donation)}
                >
                  Donar
                </button>
                  </div>
                :
                <div>
                <p className="text-sm text-neutral-600 mt-2">
                Cantidad necesitada:{" "}
                <span className="font-bold">{donation.targetItemsCount}</span>
              </p>                <button
                  className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors"
                  onClick={() => handleInKindDonation( donation.refugee_id, donation.title, donation._id)}
                >
                  Donar
                </button>

                </div>

                }
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
