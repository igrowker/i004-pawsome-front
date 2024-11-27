import { GET_VOLUNTEERING, ADD_VOLUNTEERING } from "../actions/volunteeringActions";

const initialState = {
    volunteering: []
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
                volunteering: [...state.volunteering, action.payload]
            };
        default:
            return state;
    }
};

export default volunteeringReducer;