import {
  FETCH_USER_PROFILE_START,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_ERROR,
  UPDATE_USER_PHOTO_REQUEST,
  UPDATE_USER_PHOTO_SUCCESS,
  UPDATE_USER_PHOTO_FAILURE,
} from "../actions/userActions";

export interface UserProfileState {
  data: any | null;
  loading: boolean;
  error: string | null;
  user: string | null;
}

const initialState: UserProfileState = {
  data: null,
  loading: false,
  error: null,
  user: null,
};

const userReducer = (state = initialState, action: any): UserProfileState => {
  switch (action.type) {
    case FETCH_USER_PROFILE_START:
      return { ...state, loading: true, error: null };
    case FETCH_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USER_PROFILE_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_PHOTO_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_PHOTO_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          photo: action.payload.photo,
        },
      };
    case UPDATE_USER_PHOTO_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
