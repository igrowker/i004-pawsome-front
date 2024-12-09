import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export interface VolunteerRegisterData {
   personalData: {
    fullName: string;
    birth: string;
    gender: string;
    address: string;
    contactTel: string;
    email: string;
  };
  availability: {
    availableDays: string,
    availableHours: string;
    frecuency: string;
  };
  experienceAndSkills: {
    experience: string;
    preferenceArea: string;
    knowledge: string;
  };
  motivation: {
    volunteer: string;
    learn: string;
  };
  rolePreferences: {
    role: string;
    individualTeam: string;
  };
  healthConditions: {
    medicalConditions: string;
    alergics: string;
  };
  selectedVolunteering: {
    volunteeringId: string;
    volunteeringName: string;
    volunteeringDescription: string;
  };
  additionalObservations: {
    additionalInfo: string;
  };
  additionalMessage: {
    additionalMsg: string;
  };
}
  

interface VolunteerRegisterReturn {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  registerVolunteer: (data: VolunteerRegisterData) => Promise<any>;
}

export const useVolunteerRegister = (): VolunteerRegisterReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {id} = useParams<{ id: string }>();
  const refugioId = id;
  const token = localStorage.getItem("token");

  const registerVolunteer = async (data: VolunteerRegisterData) => {

    
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
       await axios.post(`${apiUrl}/volunteer/${refugioId}/oportunidades`, {
        
        formData: {personalData: data.personalData,
          availability: data.availability,
          experienceAndSkills: data.experienceAndSkills,
          motivation: data.motivation,
          rolePreferences: data.rolePreferences,
          healthConditions: data.healthConditions,
          additionalObservations: data.additionalObservations,
          selectedVolunteering: data.selectedVolunteering,
          additionalMessage: data.additionalMessage}, 
          oportunidadId: data.selectedVolunteering.volunteeringId,
          refugioId: `${refugioId}`
        
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      // if (response.status === 201) {
      //   setIsSuccess(true);
      //   return response.data;
      // } else {
      //   throw new Error("Hubo un problema con el registro");
      // }
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, registerVolunteer };
};

export default useVolunteerRegister;
