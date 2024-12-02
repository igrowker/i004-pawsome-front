
import axios from "axios"

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
  
  interface DonationsResponse {
    donationRequests: DonationInterface[];
  }

  const donationsUrl = 'http://localhost:3000/donations/donation-requests'
  
  export const getDonationsData = async (): Promise<DonationsResponse> => {
    
    try {
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
   
      const response = await axios.get(donationsUrl, config);
      console.log(response)
      // Asegurarse de que siempre devuelves un objeto que contiene 'donations'
      return { donationRequests: response.data.donationRequests || [] }; // Si no existe 'donations', retornamos un array vacío
    } catch (error) {
      console.error("Error al obtener los datos de donaciones:", error);
      return { donationRequests: [] }; // Si ocurre un error, devolvemos un objeto con 'donations' vacío
    }
  };
