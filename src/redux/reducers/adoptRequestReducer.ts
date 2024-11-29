import { ADOPTION_REQUEST_START, ADOPTION_REQUEST_SUCCESS, ADOPTION_REQUEST_FAILURE } from "../actions/adoptRequestActions";

export interface AdoptionState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: AdoptionState = {
    loading: false,
    success: false,
    error: null,
};
interface AdoptRequestAction {
    type: string;
    payload?: any;
}

const adoptionRequestReducer = (state = initialState, action: AdoptRequestAction): AdoptionState => {
    switch (action.type) {
        case ADOPTION_REQUEST_START:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            };
        case ADOPTION_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case ADOPTION_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default adoptionRequestReducer;
