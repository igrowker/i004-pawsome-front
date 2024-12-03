import { IRefuge } from "@/interfaces/IRefugee";
import {
  FETCH_REFUGEES_REQUEST,
  FETCH_REFUGEES_SUCCESS,
  FETCH_REFUGEES_FAILURE,
  FETCH_REFUGEE_BY_ID,
  SELECT_REFUGEE_BY_ID
} from "../actions/refugeeActions";

export interface RefugeeState {
  loading: boolean;
  data: IRefuge[];
  data_refugee: IRefuge;
  error: string | null;
  selectedRefuge: IRefuge | null;
}
const refugee: IRefuge = {
  _id: "",
  user_id: "",
  name_refugee: "",
  address: "",
  contact_email: "",
  phone: "",
  img: "",
  description: "",
  pets: [],

}
const initialState: RefugeeState = {
  loading: false,
  data: [],
  data_refugee: refugee,
  error: null,
  selectedRefuge: null
};

type RefugeeAction =
  | { type: typeof FETCH_REFUGEES_REQUEST }
  | { type: typeof FETCH_REFUGEES_SUCCESS; payload: IRefuge[] }
  | { type: typeof FETCH_REFUGEES_FAILURE; payload: string }
  | {type: typeof FETCH_REFUGEE_BY_ID; payload: IRefuge }
  | {type: typeof SELECT_REFUGEE_BY_ID; payload:  IRefuge | null}

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
      case FETCH_REFUGEE_BY_ID:
        return { ...state, data_refugee: action.payload };
      case SELECT_REFUGEE_BY_ID:
        return { 
          ...state,
          selectedRefuge: action.payload
        }
        
    default:
      return state;
  }
};

export default refugeeReducer;
