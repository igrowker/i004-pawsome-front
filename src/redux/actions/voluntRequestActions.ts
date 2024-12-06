import { AppDispatch } from "../store";
import apiClient from "@/apiClient";

export const VOLUNTEERING_CREATION_START = "VOLUNTEERING_CREATION_START";
export const VOLUNTEERING_CREATION_SUCCESS = "VOLUNTEERING_CREATION_SUCCESS";
export const VOLUNTEERING_CREATION_FAILURE = "VOLUNTEERING_CREATION_FAILURE";


export const submitVolunteeringCreation = (creationVolunteeringData: {
    refugee_id: string,
    description: string;
    requirements: string;
    availability: string;
}) => async (dispatch: AppDispatch) => {
    // Activamos la action
    dispatch({ type: VOLUNTEERING_CREATION_START });
    const refugee_id = creationVolunteeringData.refugee_id
    try {
        const response = await apiClient.post(`/volunteer/${refugee_id}`, creationVolunteeringData);

        // Si la solicitud es correcta, nos aparecerá la actions de success
        dispatch({
            type: VOLUNTEERING_CREATION_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve();

    } catch (error: any) {
        let errorMessage = "Error al procesar la solicitud";

        // Verificar si el error es por falta de autenticación
        if (error.response && error.response.status === 401) {
            errorMessage = "No estás autenticado. Por favor inicia sesión.";
        } else if (error.response && error.response.status === 403) {
            errorMessage = "No tienes permisos para realizar esta acción.";
        } else if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        } else {
            errorMessage = error.message || errorMessage;
        }

        dispatch({
            type: VOLUNTEERING_CREATION_FAILURE,
            payload: errorMessage,
        });
        return Promise.reject(errorMessage);
    }
}