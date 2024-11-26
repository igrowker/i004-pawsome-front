import {
    FETCH_ANIMAL_START,
    FETCH_ANIMAL_SUCCESS,
    FETCH_ANIMAL_ERROR,
  } from "../actions/animalActions";
  
  export interface AnimalState {
    data: any | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: AnimalState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const animalReducer = (state = initialState, action: any): AnimalState => {
    switch (action.type) {
      case FETCH_ANIMAL_START:
        return { ...state, loading: true, error: null };
      case FETCH_ANIMAL_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_ANIMAL_ERROR:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default animalReducer;