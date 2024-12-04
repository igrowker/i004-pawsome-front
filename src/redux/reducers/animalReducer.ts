import {
  FETCH_ANIMAL_START,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_ERROR,
  FETCH_ALL_ANIMALS_START,
  FETCH_ALL_ANIMALS_SUCCESS,
  FETCH_ALL_ANIMALS_ERROR,
  FETCH_AVAILABLE_ANIMALS_START,
  FETCH_AVAILABLE_ANIMALS_SUCCESS,
  FETCH_AVAILABLE_ANIMALS_ERROR,
  CREATE_ANIMAL_SUCCESS,
  CREATE_ANIMAL_START,
  CREATE_ANIMAL_ERROR,
} from "../actions/animalActions";

import { IAnimal } from "@/interfaces/IAnimal";

export interface AnimalState {
  data: IAnimal | null;
  loading: boolean;
  availableAnimals: IAnimal[] | null;
  error: string | null;
  allAnimals: any[];
  animals: string[];
}

const initialState: AnimalState = {
  data: null,
  availableAnimals: null,
  loading: false,
  error: null,
  allAnimals: [],
  animals: [],
};

const animalReducer = (state = initialState, action: any): AnimalState => {
  switch (action.type) {
    // START
    case FETCH_ANIMAL_START:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_ANIMALS_START:
    case FETCH_AVAILABLE_ANIMALS_START:
      return { ...state, loading: true, error: null };
    case CREATE_ANIMAL_START:
      return { ...state, loading: true, error: null };

    // SUCCESS
    case FETCH_ANIMAL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ALL_ANIMALS_SUCCESS:
      return { ...state, loading: false, allAnimals: action.payload };
    case FETCH_AVAILABLE_ANIMALS_SUCCESS:
      return { ...state, loading: false, availableAnimals: action.payload };
    case CREATE_ANIMAL_SUCCESS: {
      const updatedAnimals = [...state.animals, action.payload];
      const updatedAllAnimals = [...state.allAnimals, action.payload];
      return {
        ...state,
        loading: false,
        animals: updatedAnimals,
        allAnimals: updatedAllAnimals,
      };
    }

    // ERROR
    case FETCH_ANIMAL_ERROR:
    case FETCH_ALL_ANIMALS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCH_AVAILABLE_ANIMALS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CREATE_ANIMAL_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default animalReducer;
