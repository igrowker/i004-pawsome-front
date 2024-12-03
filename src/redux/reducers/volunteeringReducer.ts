import { GET_VOLUNTEERING, ADD_VOLUNTEERING, GET_VOLUNTEERING_ERROR } from "../actions/volunteeringActions";
import { Volunteering } from "@/interfaces/Volunteering";

const initialState = {
    volunteeringData: [] as Volunteering[],
  };

const volunteeringReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_VOLUNTEERING:
            return {
                ... state,
                volunteering: action.payload
            }
        
        case ADD_VOLUNTEERING:
            return {
                ... state,
                volunteering: [...state.volunteeringData, action.payload]
            };
            case GET_VOLUNTEERING_ERROR:
                return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default volunteeringReducer;