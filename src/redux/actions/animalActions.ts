import apiClient from "@/apiClient";
import { AppDispatch } from "../store";

export const FETCH_ANIMAL_START = "FETCH_ANIMAL_START";
export const FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS";
export const FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR";
export const FETCH_ALL_ANIMALS_START = "FETCH_ALL_ANIMALS_START";
export const FETCH_ALL_ANIMALS_SUCCESS = "FETCH_ALL_ANIMALS_SUCCESS";
export const FETCH_ALL_ANIMALS_ERROR = "FETCH_ALL_ANIMALS_ERROR";

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

export const fetchAllAnimalsStart = () => ({
  type: FETCH_ALL_ANIMALS_START,
});

export const fetchAllAnimalsSuccess = (animals: any[]) => ({
  type: FETCH_ALL_ANIMALS_SUCCESS,
  payload: animals,
});

export const fetchAllAnimalsError = (error: string) => ({
  type: FETCH_ALL_ANIMALS_ERROR,
  payload: error,
});

// Acción asincrónica para obtener un animal
export const fetchAnimal = (id: string) => {
  return async (dispatch: AppDispatch) => {
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

export const fetchAllAnimals = () => {
  return async (dispatch: any) => {
    dispatch(fetchAllAnimalsStart());

    try {
      const response = await apiClient.get("/animals");
      dispatch(fetchAllAnimalsSuccess(response.data));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      dispatch(fetchAllAnimalsError(errorMessage));
    }
  };
};
