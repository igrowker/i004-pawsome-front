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
    availableDays: string;
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
  const refugee_id = id;
  const token = localStorage.getItem("authToken");

  const registerVolunteer = async (data: VolunteerRegisterData) => {

    
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(`${apiUrl}/volunteer/${refugee_id}/oportunidades`, {
        personalData: data.personalData,
        availability: data.availability,
        experienceAndSkills: data.experienceAndSkills,
        motivation: data.motivation,
        rolePreferences: data.rolePreferences,
        healthConditions: data.healthConditions,
        selectedVolunteering: data.selectedVolunteering,
        additionalObservations: data.additionalObservations,
        additionalMessage: data.additionalMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      if (response.status === 201) {
        setIsSuccess(true);
        return response.data;
      } else {
        throw new Error("Hubo un problema con el registro");
      }
    } catch (error: any) {
            if (error.response) {
              if (error.response.status === 401) {
                setError("Debes estar registrado para inscribirte a un voluntariado");
              } else {
                setError(error.response.data.message || "Hubo un problema al enviar el formulario");
              }
            } else if (error.request) {
              setError("Error de red, verifica tu conexión.");
            } else {
              setError("Ocurrió un error desconocido");
            }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, registerVolunteer };
};

export default useVolunteerRegister;
