import {
  FETCH_ANIMAL_START,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_ERROR,
  FETCH_AVAILABLE_ANIMALS_START,
  FETCH_AVAILABLE_ANIMALS_SUCCESS,
  FETCH_AVAILABLE_ANIMALS_ERROR,
} from "../actions/animalActions";
import { IAnimal } from "@/interfaces/IAnimal";

export interface AnimalState {
  data: IAnimal | null;
  loading: boolean;
  availableAnimals: IAnimal[] | null;
  error: string | null;
}

const initialState: AnimalState = {
  data: null,
  availableAnimals: null,
  loading: false,
  error: null,
};

const animalReducer = (state: AnimalState = initialState, action: any): AnimalState => {
  switch (action.type) {
    case FETCH_ANIMAL_START:
      return { ...state, loading: true, error: null };
    case FETCH_AVAILABLE_ANIMALS_START:
      return { ...state, loading: true, error: null };
    case FETCH_ANIMAL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_AVAILABLE_ANIMALS_SUCCESS:
      return { ...state, loading: false, availableAnimals: action.payload };
    case FETCH_ANIMAL_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCH_AVAILABLE_ANIMALS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default animalReducer;