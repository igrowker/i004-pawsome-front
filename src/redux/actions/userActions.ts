import apiClient from "../../apiClient";

export const FETCH_USER_PROFILE_START = "FETCH_USER_PROFILE_START";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const FETCH_USER_PROFILE_ERROR = "FETCH_USER_PROFILE_ERROR";

export const UPDATE_USER_PROFILE_START = "UPDATE_USER_PROFILE_START";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";

export const fetchUserProfile = (userId: string) => async (dispatch: any) => {
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

export const updateUserProfile = (userId: string, userData: any) => async (dispatch: any) => {
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
