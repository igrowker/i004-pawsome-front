import axios from "axios";
import { Dispatch } from "redux";
import { FormAction } from "../actions/volunteeringFormActions";
import { SUBMIT_FORM_START, SUBMIT_FORM_SUCCESS,SUBMIT_FORM_ERROR } from "../actions/volunteeringFormActions";
import { ThunkAction } from "redux-thunk";




export const submitVolunteerForm = async (formData: Record<string, string>) => {
  try {
    const response = await axios.post(`"http://localhost:3000/volunteer-form`, formData);
    return response.data; 
  } catch (error: any) {
    console.error("Error al enviar el formulario:", error);
    throw new Error(error.response?.data?.message || "Error inesperado");
  }
};

// Otros servicios (si necesitas más funcionalidades)
export const fetchVolunteerOptions = async () => {
  try {
    const response = await axios.get("http://localhost:3000/volunteer-options");
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener opciones:", error);
    throw new Error(error.response?.data?.message || "Error inesperado");
  }
};


export const submitForm = (formData: Record<string, string>): ThunkAction <Promise<void>,any,unknown,FormAction> => {
    return async (dispatch: Dispatch<FormAction>) => {
      dispatch({ type: SUBMIT_FORM_START });
  
      try {
     
        const response = await mockApiSubmit(formData);
        dispatch({ type: SUBMIT_FORM_SUCCESS, payload: response });
      } catch (error: any) {
        dispatch({ type: SUBMIT_FORM_ERROR, payload: error.message });
      }
    };
  };
  
  
  const mockApiSubmit = (formData: Record<string, string>) => {
    return new Promise<Record<string, string>>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(formData); 
        } else {
          reject(new Error("Error al enviar los datos. Intenta nuevamente."));
        }
      }, 1000);
    });
  };
  