
import axios from "axios"

interface DonationInterface {
    id: number,
    refugeId: number,
    title: string,
    description: string,
    imageUrl: string,
    monetaryDonation: boolean,
    inKindDonation: boolean, 
    cuantityDonatio: number,
    donationNumber: number,
    deadlineDonation: Date
  }

  interface DonationsResponse {
    donations: DonationInterface[];
  }

  const donationsUrl = './db.json'
  
  export const getDonationsData = async (): Promise<DonationsResponse> => {
    try {
      const response = await axios.get(donationsUrl);
      // Asegurarse de que siempre devuelves un objeto que contiene 'donations'
      return { donations: response.data.donations || [] }; // Si no existe 'donations', retornamos un array vacío
    } catch (error) {
      console.error("Error al obtener los datos de donaciones:", error);
      return { donations: [] }; // Si ocurre un error, devolvemos un objeto con 'donations' vacío
    }
  };
