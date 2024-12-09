import { getDonationsData } from "@/views/helpers/getDonations";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/rootReducer";



interface DonationInterface {
  _id: string,
  refugee_id: string,
  title: string,
  description: string,
  imageUrl: string,
  isMonetaryDonation: boolean,
  targetAmountMoney: number,
  targetItemsCount: number,
}
interface actualDonationInf {
  refugee_id: string,
  title: string,
}

export const useDonnationList = () => {

  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [actualDonation, SetActualDonation] = useState<actualDonationInf>();
  const navigate = useNavigate();
  const { data_refugee } = useSelector((state: RootState) => state.refugee);

  console.log (data_refugee.user_id)

  useEffect(() => {
    if(data_refugee._id){
      fetchDonations();
    }
  

  }, [data_refugee._id]);

  const fetchDonations = async () => {
    try {
      const response = await getDonationsData();

      if (response && Array.isArray(response.donationRequests)) {
        setDonations(response.donationRequests); // Establecer las donaciones filtradas
      } else {
        console.error("La estructura de la respuesta es incorrecta");
      }
    } catch (error) {
      console.error("Error al obtener las donaciones:", error);
    }
  };

  const filteredDonations = useMemo(() => {
    if (data_refugee._id) {
      return donations.filter((donation) => donation.refugee_id === data_refugee.user_id);
    }
    return [];
  }, [donations, data_refugee.user_id]);

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
        refugeeName: data_refugee.name_refugee
      },
    });
  };

  const handleInKindDonation = (elemen1: string, elemen2: string, elemen3: string) => {
    const donationInf = {
      refugee_id: elemen1,
      title: elemen2,
      id: elemen3
    }
    SetActualDonation(donationInf);
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

  return {
    handleCloseModal,
    handleDonate,
    handleInKindDonation,
    handleLogin,
    handleRegister,
    showModal,
    actualDonation,
    setDonations,
    donations: filteredDonations,
  }
}
