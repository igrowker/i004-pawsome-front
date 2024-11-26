const initialState = {
    favorites: [],
    loading: false,
    error: null,
  };
  
  export const favoritesReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "FETCH_FAVORITES_REQUEST":
        return { ...state, loading: true, error: null };
      case "FETCH_FAVORITES_SUCCESS":
        return { ...state, loading: false, favorites: action.payload };
      case "FETCH_FAVORITES_ERROR":
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
  