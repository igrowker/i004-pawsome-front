import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/authActions";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })(),
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
};

export interface AuthAction {
  type: string;
  payload?: any;
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
