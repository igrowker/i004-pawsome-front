import { Dispatch } from "redux";
import { RootState } from "../rootReducer";
import { fetchFavoritesService } from "../services/favoriteService";

export const fetchFavorites = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: "FETCH_FAVORITES_REQUEST" });
    try {
      const favorites = await fetchFavoritesService(userId);
      dispatch({ type: "FETCH_FAVORITES_SUCCESS", payload: favorites });
    } catch (error) {
      dispatch({ type: "FETCH_FAVORITES_ERROR", error: error.message });
    }
  };
};
