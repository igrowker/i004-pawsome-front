import { apiUrls } from "@/config";
import axios from "axios";
import { Dispatch } from "redux";
import { AuthAction, User } from "../reducers/authReducer";
import { ThunkAction } from "redux-thunk";
import { RootState, AppDispatch } from "../store";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export interface LoginAction {
  type: string;
  payload?: User;
}

export const login =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, undefined, AuthAction> =>
    async (dispatch: AppDispatch) => {
      dispatch({ type: LOGIN_REQUEST });

      try {
        const response = await axios.post(apiUrls.authLogin(), {
          email,
          password,
        });

        const user = response.data;
        const userData = user.user;
        const token = user.token;

        if (userData && token) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);

          dispatch({ type: LOGIN_SUCCESS, payload: userData, token: token });
        } else {
          throw new Error("Invalid login response data");
        }
        return Promise.resolve();
      } catch (error: unknown) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Error al iniciar sesión";
        dispatch({
          type: LOGIN_FAILURE,
          payload: errorMessage,
        });
        return Promise.reject();
      }
    };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        `${process.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      console.warn("No se encontró un token para cerrar sesión.");
    }
  } catch (error) {
    console.error("Error al cerrar sesión en el backend:", error);
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT });
  return Promise.resolve();
};
