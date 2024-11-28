import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../rootReducer";
import { fetchFavoritesService } from "../services/favoriteService";

export const FETCH_FAVORITES_REQUEST = "FETCH_FAVORITES_REQUEST";
export const FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS";
export const FETCH_FAVORITES_ERROR = "FETCH_FAVORITES_ERROR";

interface FetchFavoritesRequestAction {
  type: typeof FETCH_FAVORITES_REQUEST;
}

interface FetchFavoritesSuccessAction {
  type: typeof FETCH_FAVORITES_SUCCESS;
  payload: any;
}

interface FetchFavoritesErrorAction {
  type: typeof FETCH_FAVORITES_ERROR;
  error: string;
}

export type FavoriteActionTypes =
  | FetchFavoritesRequestAction
  | FetchFavoritesSuccessAction
  | FetchFavoritesErrorAction;

export const fetchFavorites = (userId: string) => {
  return async (dispatch: ThunkDispatch<RootState, void, FavoriteActionTypes>) => {
    dispatch({ type: FETCH_FAVORITES_REQUEST });

    try {
      const favorites = await fetchFavoritesService(userId);
      dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: favorites });
    } catch (error: any) {
      dispatch({ type: FETCH_FAVORITES_ERROR, error: error.message || 'Error fetching favorites' });
    }
  };
};
