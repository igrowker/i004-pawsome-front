import {
  FETCH_ANIMAL_START,
  FETCH_ANIMAL_SUCCESS,
  FETCH_ANIMAL_ERROR,
  FETCH_ALL_ANIMALS_START,
  FETCH_ALL_ANIMALS_SUCCESS,
  FETCH_ALL_ANIMALS_ERROR,
} from "../actions/animalActions";

export interface AnimalState {
  data: any | null;
  loading: boolean;
  error: string | null;
  allAnimals: any[];
}

const initialState: AnimalState = {
  data: null,
  loading: false,
  error: null,
  allAnimals: [],
};

const animalReducer = (state = initialState, action: any): AnimalState => {
  switch (action.type) {
    case FETCH_ANIMAL_START:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_ANIMALS_START:
    case FETCH_ANIMAL_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_ALL_ANIMALS_SUCCESS:
      return { ...state, loading: false, allAnimals: action.payload };

    case FETCH_ANIMAL_ERROR:
    case FETCH_ALL_ANIMALS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default animalReducer;
