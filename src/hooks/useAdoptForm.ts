import { submitAdoptionRequest } from "@/redux/actions/adoptRequestActions";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useForm } from "react-form-ease";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const useAdoptForm = () => {

  // Traemos el animal id de animal profile a través de la URL y los params
  const { animal_id } = useParams()
  const navigate = useNavigate();

  const { formData, updateForm } = useForm({
    data: {
      fullName: "",
      phone: "",
      location: "",
      compatibility: "",
      housingSituation: "",
      experienceWithPets: false,
      termsAccepted: false,
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorTerms, setErrorTerms] = useState<{ termsAccepted?: string }>({});
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si no acepta los terminos no puede procesarse la solicitud
    if (!formData.termsAccepted) {
      setErrorTerms({ termsAccepted: "Debes aceptar los términos y condiciones." });
      return;
    }
    setErrorTerms({});
    try {
      await dispatch<any>(submitAdoptionRequest(
        {
          animal_id: animal_id!,
          name: formData.fullName,
          details: formData.phone,
          compatibility: formData.compatibility,
          location: formData.location,
          housingSituation: formData.housingSituation,
          experience: formData.experienceWithPets,
        })
      );
      setIsSubmitted(true)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error al procesar la solicitud", error);
      setIsSuccess(false);
    }
  };

  const handleCloseUp = () => {
    navigate("/home")
  };

  return {
    isSubmitted,
    isSuccess,
    handleCloseUp,
    handleSubmit,
    errorTerms,
    formData,
    updateForm
  }
}
