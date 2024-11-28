import axios from "axios";
import { apiUrls } from "../../config";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(apiUrls.authLogin(), {
        email,
        password,
      });

      const user = response.data;
      const userData = user.user;
      const token = user.token;

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      dispatch({ type: LOGIN_SUCCESS, payload: userData });

      return Promise.resolve();
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || "Error al iniciar sesión",
      });
      return Promise.reject();
    }
  };

  export const logout = () => async (dispatch: any) => {
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
  };
  
