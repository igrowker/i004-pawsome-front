import { GET_VOLUNTEERING, ADD_VOLUNTEERING, GET_VOLUNTEERING_ERROR } from "../actions/volunteeringActions";
import { Volunteering } from "@/interfaces/Volunteering";

export interface VolunteeringState {
    loading: boolean;
    success: boolean;
    error: string | null;
    volunteering: Volunteering[];
}

const initialState: VolunteeringState = {
    loading: false,
    success: false,
    error: null,
    volunteering: [],
};
const volunteeringReducer = (state = initialState, action: any) => {
    console.log("Action received in reducer:", action); 
    switch (action.type) {
        case GET_VOLUNTEERING:
            return {
                ... state,
                volunteering: action.payload,
                loading: false,
                success: true,
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