import apiClient from "@/apiClient";
import { AppDispatch } from "../store";
import { IAnimal } from "@/interfaces/IAnimal";

export const FETCH_ANIMAL_START = "FETCH_ANIMAL_START";
export const FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS";
export const FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR";

export const FETCH_ALL_ANIMALS_START = "FETCH_ALL_ANIMALS_START";
export const FETCH_ALL_ANIMALS_SUCCESS = "FETCH_ALL_ANIMALS_SUCCESS";
export const FETCH_ALL_ANIMALS_ERROR = "FETCH_ALL_ANIMALS_ERROR";

export const FETCH_AVAILABLE_ANIMALS_START = "FETCH_AVAILABLE_ANIMALS_START";
export const FETCH_AVAILABLE_ANIMALS_SUCCESS = "FETCH_AVAILABLE_ANIMALS_SUCCESS";
export const FETCH_AVAILABLE_ANIMALS_ERROR = "FETCH_AVAILABLE_ANIMALS_ERROR";

// Mostrar todos los animales
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

// Mostras TODOS los animales
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

// Mostrar SOLO animales disponibles para adoptar
export const fetchAvailableAnimalsStart = () => ({
  type: FETCH_AVAILABLE_ANIMALS_START,
});

export const fetchAvailableAnimalsSuccess = (animals: IAnimal[]) => ({
  type: FETCH_AVAILABLE_ANIMALS_SUCCESS,
  payload: animals,
});

export const fetchAvailableAnimalsError = (error: string) => ({
  type: FETCH_AVAILABLE_ANIMALS_ERROR,
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

// Accion para obtener TODOS los animales
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

//   // Animales disponibles para adopción GET
export const fetchAvailableAnimals = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchAvailableAnimalsStart());

    try {
      const response = await apiClient.get(`/animals/available`);
      dispatch(fetchAvailableAnimalsSuccess(response.data));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error al obtener los animales disponibles.";
      dispatch(fetchAvailableAnimalsError(errorMessage));
    }
  };
};
