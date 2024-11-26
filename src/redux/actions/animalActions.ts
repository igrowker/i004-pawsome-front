import apiClient from "@/apiClient";


export const FETCH_ANIMAL_START = "FETCH_ANIMAL_START";
export const FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS";
export const FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR";

export const fetchAnimalStart = () => ({
  type: FETCH_ANIMAL_START,
});

export const fetchAnimalSuccess = (animal: any) => ({
  type: FETCH_ANIMAL_SUCCESS,
  payload: animal,
});

export const fetchAnimalError = (error: string) => ({
  type: FETCH_ANIMAL_ERROR,
  payload: error,
});

// Acción asincrónica para obtener un animal
export const fetchAnimal = (id: string) => {
  return async (dispatch: any) => {
    dispatch(fetchAnimalStart());

    try {
      const response = await apiClient.get(`/animals/${id}`);
      dispatch(fetchAnimalSuccess(response.data));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error al obtener el animal.";
      dispatch(fetchAnimalError(errorMessage));
    }
  };
};
