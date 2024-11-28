import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../rootReducer";
import { fetchFavoritesService } from "../services/favoriteService";

export const fetchFavorites = (userId: string) => {
  return async (dispatch: ThunkDispatch<RootState, void, any>) => {
    dispatch({ type: "FETCH_FAVORITES_REQUEST" });
    try {
      const favorites = await fetchFavoritesService(userId); 
      dispatch({ type: "FETCH_FAVORITES_SUCCESS", payload: favorites });
    } catch (error: any) {
      dispatch({ type: "FETCH_FAVORITES_ERROR", error: error.message });
    }
  };
};