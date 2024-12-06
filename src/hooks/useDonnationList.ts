import { getDonationsData } from "@/views/helpers/getDonations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
interface actualDonationInf{
  refugee_id : string,
  title :string,
}

export const useDonnationList = () => {

  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [actualDonation, SetActualDonation] = useState<actualDonationInf>();

  const navigate = useNavigate();
  // const dispatch = useDispatch();



  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonationsData();;
        // console.log(response)
    
        if (response && Array.isArray(response.donationRequests)) {
          const shelterFilter = response.donationRequests.filter(
            (element: DonationInterface) => element.refugee_id === '6752c3b9c017430654bec1e2' // no tocar el filter, porque lo necesitamos para los refugios. De momento es estatico, remplazar por el refugio ID con el que esté trabajando. 
          );
          // console.log(shelterFilter)
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
        refugeeName: 'refugio huellitas'
      },
    });
  };

  const handleInKindDonation = (elemen1:string, elemen2:string, elemen3:string) =>{
    const donationInf = {
      refugee_id : elemen1,
      title : elemen2,
      id : elemen3
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
    donations,
    showModal,
    actualDonation,
    setDonations
  }
}
