import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";
import { GET_VOLUNTEERING, ADD_VOLUNTEERING, GET_VOLUNTEERING_ERROR, GET_VOLUNTEERING_BY_REFUGEE_ID } from "../actions/volunteeringActions";
import { Volunteering } from "@/interfaces/Volunteering";


export interface VolunteeringState {
    loading: boolean;
    success: boolean;
    error: string | null;
    volunteering: Volunteering[];
    volunteering_id: IVolunteeringByRefugeeId[]
}
// const volunteering_id: IVolunteeringByRefugeeId = {
//     _id: "",
//     refugee_id: {},
//     user_id: "",
//     description: "",
//     requirements: "",
//     availability: "",
//   }
const initialState: VolunteeringState = {
    loading: false,
    success: false,
    error: null,
    volunteering: [],
    volunteering_id: []
};

type VolunteeringAction =
  | { type: typeof GET_VOLUNTEERING; payload: IVolunteeringByRefugeeId[] }
  | { type: typeof ADD_VOLUNTEERING; payload: string }
  | { type: typeof GET_VOLUNTEERING_BY_REFUGEE_ID; payload: IVolunteeringByRefugeeId}
  | {type: typeof GET_VOLUNTEERING_ERROR; payload: string }


  const volunteeringReducer = (state = initialState, action: VolunteeringAction) => {
    console.log("Action received in reducer:", action); 
    switch (action.type) {
        case GET_VOLUNTEERING:
            return {
                ... state,
                // volunteering: action.payload,
                loading: false,
                success: true,
            }
        case GET_VOLUNTEERING_BY_REFUGEE_ID:
            console.log("Action received in reducer:", action.payload); 
            return {
                ...state,
                volunteering_id: action.payload,
                loading: false,
                success: true
            }
        case ADD_VOLUNTEERING:
            return {
                ... state,
                volunteering: [...state.volunteering, action.payload]
            };
            case GET_VOLUNTEERING_ERROR:
                return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default volunteeringReducer;