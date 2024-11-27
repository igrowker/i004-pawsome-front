import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/registerActions';

interface UserState {
  isLoading: boolean;
  user: any | null;
  error: string | null;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload, // Aquí se almacena la data combinada de usuario y refugio
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
