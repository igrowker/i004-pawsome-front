import { GET_VOLUNTEERING, ADD_VOLUNTEERING, GET_VOLUNTEERING_BY_REFUGEE } from "../actions/volunteeringActions";

export interface Volunteering {
    id: number;
    refugee_name: string;
    imageUrl: string;
    description: string;
    requirements: string;
    availability: string;
}

export interface VolunteeringState {
volunteering: Volunteering[];
filteredVolunteering: Volunteering[]
}

const initialState: VolunteeringState = {
    volunteering: [],
    filteredVolunteering: [],
};

const volunteeringReducer = (state = initialState, action: any): VolunteeringState => {
    switch (action.type) {
        case GET_VOLUNTEERING:
            return {
                ... state,
                volunteering: action.payload
            }
        
        case ADD_VOLUNTEERING:
            return {
                ... state,
                volunteering: [...state.volunteering, action.payload]
            };
            case GET_VOLUNTEERING_BY_REFUGEE:
            return {
                ...state,
                filteredVolunteering: state.volunteering.filter(
                    (volunteer) => volunteer.refugee_name === action.payload
                ),
            };
        default:
            return state;
    }
};

export default volunteeringReducer;