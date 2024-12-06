import {
    VOLUNTEERING_CREATION_START,
    VOLUNTEERING_CREATION_SUCCESS,
    VOLUNTEERING_CREATION_FAILURE
  } from "../actions/voluntRequestActions";

  import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";

  const initialState = {
    volunteering: null, // Solo relevante para la creación
    loading: false,
    success: false,
    error: null,
  };
  
  type VolunteeringCreationAction =
|{type: typeof VOLUNTEERING_CREATION_START}
|{type: typeof VOLUNTEERING_CREATION_SUCCESS; payload: IVolunteeringByRefugeeId}
|{type: typeof VOLUNTEERING_CREATION_FAILURE; payload: string}

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
  
      default:
        return state;
    }
  };
  
  export default volunteeringCreationReducer;