import axios from "axios";
import { apiUrls } from "../../config";


// Definimos las acciones para ver en que proceso está
export const ADOPTION_REQUEST_START = "ADOPTION_REQUEST_START";
export const ADOPTION_REQUEST_SUCCESS = "ADOPTION_REQUEST_SUCCESS";
export const ADOPTION_REQUEST_FAILURE = "ADOPTION_REQUEST_FAILURE";

// El action para procesar la solicitud 
export const submitAdoptionRequest = (adoptionRequestData: {
    animal_id: string,
    adopter_id: string,
    name: string,
    details: string,
    compatibility: string,
    location: string,
    housingSituation: string,
    experience: boolean,
    request_date: string,
    status: string,
}) => async (dispatch: any, getState: any) => {
    // Activamos la action
    dispatch({ type: ADOPTION_REQUEST_START });

    try {
        // const token = localStorage.getItem('token');
        // const userRole = localStorage.getItem('user.role');

        // if (userRole !== 'user') {
        //     throw new Error("No tienes permisos suficientes para realizar esta solicitud");
        // }

        const token = getState().auth.token;
        const userRole = getState().auth.user.role;

        if (!token || userRole !== "user") {
            throw new Error("No tienes permisos para realizar esta solicitud");
        }

        console.log("token:", token)

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,  // Aquí añadimos el Bearer token
            },
        };

        const response = await axios.post(apiUrls.postAdoption(), adoptionRequestData, config);
        console.log("Respuesta de la API:", response);
        // Si la solicitud es correcta, nos aparecerá la actions de success
        dispatch({
            type: ADOPTION_REQUEST_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve();

    } catch (error: any) {
        // Si ocurre un error, disparamos la acción de fallo
        dispatch({
            type: ADOPTION_REQUEST_FAILURE,
            payload: error.response?.data?.message || "Error al procesar la solicitud",
        });
        return Promise.reject();
    }
}