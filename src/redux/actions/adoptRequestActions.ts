import apiClient from "@/apiClient";


// Definimos las acciones para ver en que proceso está
export const ADOPTION_REQUEST_START = "ADOPTION_REQUEST_START";
export const ADOPTION_REQUEST_SUCCESS = "ADOPTION_REQUEST_SUCCESS";
export const ADOPTION_REQUEST_FAILURE = "ADOPTION_REQUEST_FAILURE";

// El action para procesar la solicitud 
export const submitAdoptionRequest = (adoptionRequestData: {
    animal_id: string,
    name: string,
    details: string,
    compatibility: string,
    location: string,
    housingSituation: string,
    experience: boolean,
}) => async (dispatch: any) => {
    // Activamos la action
    dispatch({ type: ADOPTION_REQUEST_START });
    const animal_id = adoptionRequestData.animal_id
    try {
        const response = await apiClient.post(`/adoption-request/${animal_id}`, adoptionRequestData);

        // Si la solicitud es correcta, nos aparecerá la actions de success
        dispatch({
            type: ADOPTION_REQUEST_SUCCESS,
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
            type: ADOPTION_REQUEST_FAILURE,
            payload: errorMessage,
        });
        return Promise.reject(errorMessage);
    }
}