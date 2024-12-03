import apiClient from "@/apiClient";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../rootReducer";

export const FETCH_USER_PROFILE_START = "FETCH_USER_PROFILE_START";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_ERROR = "FETCH_USER_PROFILE_ERROR";

export const UPDATE_USER_PROFILE_START = "UPDATE_USER_PROFILE_START";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";

interface FetchUseProfileStart {
  type: typeof FETCH_USER_PROFILE_START
}

interface FetchUserProfileSuccess {
  type: typeof FETCH_USER_PROFILE_SUCCESS
}

interface FetchUserProfileError{
  type: typeof FETCH_USER_PROFILE_ERROR
}

interface UpdateUserProfileStart{
  type: typeof UPDATE_USER_PROFILE_START
}

interface UpdateUserProfileSuccess{
  type: typeof UPDATE_USER_PROFILE_SUCCESS
}

interface UpdateUserProfileFailure{
  type: typeof UPDATE_USER_PROFILE_FAILURE
}

export type UserProfileActionTypes = 
  FetchUseProfileStart 
| FetchUserProfileSuccess
| FetchUserProfileError;

export type UpdateProfileActionTypes =
  UpdateUserProfileStart
| UpdateUserProfileSuccess
| UpdateUserProfileFailure

export const fetchUserProfile = (userId: string) => async (dispatch: ThunkDispatch<RootState, void, UserProfileActionTypes>) => {
  dispatch({ type: FETCH_USER_PROFILE_START });

  try {
    const response = await apiClient.get(`/api/user-profile/${userId}`);
    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({
      type: FETCH_USER_PROFILE_ERROR,
      payload: error.response?.data?.message || "Error al cargar el perfil",
    });
  }
};

export const updateUserProfile = (userId: string, userData: any) => async (dispatch: ThunkDispatch<RootState, void, UpdateProfileActionTypes>) => {
  dispatch({ type: UPDATE_USER_PROFILE_START });

  try {
    const response = await apiClient.put(`/api/user-profile/${userId}`, userData);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error: any) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAILURE,
      payload: error.response?.data?.message || "Error al actualizar el perfil",
    });
  }
};
