import {
  FETCH_FAVORITES_REQUEST,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_ERROR,
  FavoriteActionTypes,
} from "../actions/favoriteActions";

export interface FavoritePet {
  id: string;
  name: string;
  species: string;
  sex?: string;
  age?: number;
  size?: string;
  image?: string;
  characteristics?: string[];
  history?: string;
  availability?: string;
}

export interface FavoritesState {
  favorites: FavoritePet[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesReducer = (
  state = initialState,
  action: FavoriteActionTypes 
): FavoritesState => {
  switch (action.type) {
    case FETCH_FAVORITES_REQUEST:
      return { ...state, loading: true };

    case FETCH_FAVORITES_SUCCESS:
      return { ...state, loading: false, favorites: action.payload };

    case FETCH_FAVORITES_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default favoritesReducer;
