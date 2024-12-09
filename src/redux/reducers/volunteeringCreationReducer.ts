import {
  VOLUNTEERING_CREATION_START,
  VOLUNTEERING_CREATION_SUCCESS,
  VOLUNTEERING_CREATION_FAILURE, VOLUNTEERING_DELETE_START, VOLUNTEERING_DELETE_SUCCESS, VOLUNTEERING_DELETE_FAILURE
} from "../actions/voluntRequestActions";

import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";
export interface VolunteeringState {
  volunteering: IVolunteeringByRefugeeId[]; // Es un array de objetos con este tipo
  loading: boolean;
  success: boolean,
  error: string | null;
}
const initialState: VolunteeringState = {
  volunteering: [], // Solo relevante para la creación
  loading: false,
  success: false,
  error: null,
};

type VolunteeringCreationAction =
  | { type: typeof VOLUNTEERING_CREATION_START }
  | { type: typeof VOLUNTEERING_CREATION_SUCCESS; payload: IVolunteeringByRefugeeId }
  | { type: typeof VOLUNTEERING_CREATION_FAILURE; payload: string }
  | { type: typeof VOLUNTEERING_DELETE_START }
  | { type: typeof VOLUNTEERING_DELETE_SUCCESS; payload: string }
  | { type: typeof VOLUNTEERING_DELETE_FAILURE; payload: string }

const volunteeringCreationReducer = (state = initialState, action: VolunteeringCreationAction) => {
  switch (action.type) {
    case VOLUNTEERING_CREATION_START:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,  // Reiniciar cualquier error previo
      };

    case VOLUNTEERING_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        volunteering: action.payload,  // Voluntariado recién creado
        error: null,
      };

    case VOLUNTEERING_CREATION_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,  // Error que ocurrió al crear el voluntariado
      };
    case VOLUNTEERING_DELETE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VOLUNTEERING_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        volunteering: state.volunteering.filter(
          (volunteering) => volunteering._id !== action.payload // Eliminamos el voluntariado con el ID proporcionado
        ),
      };

    case VOLUNTEERING_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Guardamos el mensaje de error
      };
    default:
      return state;
  }
};

export default volunteeringCreationReducer;