import { IRefuge } from "@/interfaces/IRefugee";
import {
  FETCH_REFUGEES_REQUEST,
  FETCH_REFUGEES_SUCCESS,
  FETCH_REFUGEES_FAILURE,
} from "../actions/refugeeActions";

export interface RefugeeState {
  loading: boolean;
  data: IRefuge[];
  error: string | null;
}

const initialState: RefugeeState = {
  loading: false,
  data: [],
  error: null,
};

type RefugeeAction =
  | { type: typeof FETCH_REFUGEES_REQUEST }
  | { type: typeof FETCH_REFUGEES_SUCCESS; payload: IRefuge[] }
  | { type: typeof FETCH_REFUGEES_FAILURE; payload: string };

const refugeeReducer = (
  state = initialState,
  action: RefugeeAction
): RefugeeState => {
  switch (action.type) {
    case FETCH_REFUGEES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REFUGEES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_REFUGEES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default refugeeReducer;
