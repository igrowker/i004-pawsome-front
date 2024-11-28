import {
    FETCH_USER_PROFILE_START,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_ERROR,
  } from "../actions/userActions";
  
  export interface UserProfileState {
    data: any | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserProfileState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action: any): UserProfileState => {
    switch (action.type) {
      case FETCH_USER_PROFILE_START:
        return { ...state, loading: true, error: null };
      case FETCH_USER_PROFILE_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_USER_PROFILE_ERROR:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
  