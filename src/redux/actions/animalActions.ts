import apiClient from "@/apiClient";
import { AppDispatch } from "../store";
import { IAnimal } from "@/interfaces/IAnimal";
import axios from "axios";
import { Dispatch } from "redux";
import { apiUrls } from "@/config";
import { addNotification } from "@/redux/notificationSlice";
import { updateUserPets } from "./authActions";

export const FETCH_ANIMAL_START = "FETCH_ANIMAL_START";
export const FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS";
export const FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR";

export const FETCH_ALL_ANIMALS_START = "FETCH_ALL_ANIMALS_START";
export const FETCH_ALL_ANIMALS_SUCCESS = "FETCH_ALL_ANIMALS_SUCCESS";
export const FETCH_ALL_ANIMALS_ERROR = "FETCH_ALL_ANIMALS_ERROR";

export const FETCH_AVAILABLE_ANIMALS_START = "FETCH_AVAILABLE_ANIMALS_START";
export const FETCH_AVAILABLE_ANIMALS_SUCCESS =
  "FETCH_AVAILABLE_ANIMALS_SUCCESS";
export const FETCH_AVAILABLE_ANIMALS_ERROR = "FETCH_AVAILABLE_ANIMALS_ERROR";

export const CREATE_ANIMAL_START = "CREATE_ANIMAL_START";
export const CREATE_ANIMAL_SUCCESS = "CREATE_ANIMAL_SUCCESS";
export const CREATE_ANIMAL_ERROR = "CREATE_ANIMAL_ERROR";

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
        error?.response?.data?.message ||
        "Error al obtener los animales disponibles.";
      dispatch(fetchAvailableAnimalsError(errorMessage));
    }
  };
};

export const createAnimal =
  (formData: any, images: FileList | null) => async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_ANIMAL_START });

    try {
      const user = localStorage.getItem("user");
      if (!user) throw new Error("Usuario no encontrado en localStorage.");

      const refugeeId = JSON.parse(user)?.refugee?._id;
      if (!refugeeId) throw new Error("ID del refugio no encontrado.");

      const photoUrls: string[] = [];
      const formDataForFiles = new FormData();

      if (images) {
        for (const image of Array.from(images)) {
          formDataForFiles.append("file", image);
        }
      }

      const uploadResponse = await axios.post(
        apiUrls.filesUpload(),
        formDataForFiles,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadResponse.data.url) {
        photoUrls.push(uploadResponse.data.url);
      } else {
        throw new Error("La respuesta del backend no contiene una URL.");
      }

      const payload = { ...formData, photos: photoUrls, refugee_id: refugeeId };
      const token = localStorage.getItem("token");

      const response = await axios.post(apiUrls.postAnimal(), payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: CREATE_ANIMAL_SUCCESS, payload: response.data });
      dispatch(updateUserPets(response.data._id));

      dispatch(
        addNotification({
          type: "success",
          message: "Animal creado exitosamente.",
        })
      );
    } catch (error: unknown) {
      let errorMessage = "Error desconocido.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "Error del servidor.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch({ type: CREATE_ANIMAL_ERROR, error: errorMessage });
      dispatch(
        addNotification({ type: "error", message: `Error: ${errorMessage}` })
      );
    }
  };
