import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DonationPostInterface {
  refugee_id: string,
  title: string,
  description: string,
  imageUrl: string,
  monetaryDonation: boolean | undefined,
  cuantityDonation: number,
  donationNumber: number,
  status: string
}

const URL = 'http://localhost:3000/donations/donation-requests'

export const useDonationForm = () => {


  const [monetary, setMonetary] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const [donation, setDonation] = useState<DonationPostInterface>({
    title: '',
    description: '',
    monetaryDonation: monetary,
    cuantityDonation: 0,
    imageUrl: '',
    refugee_id: "674afd90d93aca13ac428584",
    status: 'active',
    donationNumber: 0
  })

  useEffect(() => {
    setDonation(prevDonation => ({
      ...prevDonation,
      monetaryDonation: monetary
    }));
  }, [monetary]);

  const handleMoneyChange = () => {
    setMonetary(true)
  }
  const handleInKindChange = () => {
    setMonetary(false)
  }

  // console.log(donation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Configura los headers con el token
    const config = token
      ? {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      : { headers: { 'Content-Type': 'application/json' } };

    try {
      // Validar los datos antes de enviarlos
      if (!donation.title || !donation.description) {
        alert('Por favor complete todos los campos correctamente.');
        return;
      }

      // Enviar solicitud POST
      await axios.post(URL, {
        refugee_id: donation.refugee_id,
        title: donation.title,
        description: donation.description,
        imageUrl: donation.imageUrl,
        monetaryDonation: donation.monetaryDonation,
        cuantityDonation: donation.cuantityDonation,
        donationNumber: donation.donationNumber,
        status: donation.status
      },
        config
      );
      // console.log('Donación guardada:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Manejo de errores de la solicitud
        console.error('Error al hacer el POST:', error.response?.data || error.message);
        alert('Hubo un error al enviar la solicitud. Intenta de nuevo.');
      } else {
        console.error('Error desconocido:', error);
        alert('Ha ocurrido un error inesperado.');
      }
    }
    navigate("/donationList")
  };

  return {
    monetary,
    donation,
    setDonation,
    handleInKindChange,
    handleMoneyChange,
    handleSubmit
  }
}
