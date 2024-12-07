import { AppDispatch } from '../store';
import { Volunteering } from '@/interfaces/Volunteering';
import apiClient from '@/apiClient';
import { IVolunteeringByRefugeeId } from '@/interfaces/IVolunteeringByRefugee';
import { ISelectedOpportunity } from '@/interfaces/ISelectedOpportunity';



export const GET_VOLUNTEERING_START = "GET_VOLUNTEERING_START";
export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const GET_VOLUNTEERING_BY_REFUGEE_ID = "GET_VOLUNTEERING_BY_REFUGEE_ID";
export const GET_VOLUNTEERING_ERROR = "GET_VOLUNTEERING_ERROR"

export const SUBMIT_EDITED_OPPORTUNITY_START = "SUBMIT_EDITED_OPPORTUNITY_START"
export const SUBMIT_EDITED_OPPORTUNITY_SUCCESS = "SUBMIT_EDITED_OPPORTUNITY_SUCCESS"
export const SUBMIT_EDITED_OPPORTUNITY_ERROR = "SUBMIT_EDITED_OPPORTUNITY_ERROR"
export const UPDATE_VOLUNTEERING = "UPDATE_VOLUNTEERING"

export const getVolunteeringStart = () => ({
  type: GET_VOLUNTEERING_START,
})

export const getVolunteering = (volunteerData: Volunteering[]) => ({
    type: GET_VOLUNTEERING,
    payload: volunteerData
})
export const getVolunteeringByRefugeeId = (data: IVolunteeringByRefugeeId) => ({
  type: typeof GET_VOLUNTEERING_BY_REFUGEE_ID,
  payload: data  
})

export const getVolunteeringerror = (error: string) => ({
    type: GET_VOLUNTEERING_ERROR,
    payload: error
})

export const submitSelectedOpportunityStart = () => ({
  type: SUBMIT_EDITED_OPPORTUNITY_START,
})

export const submitSelectedOpportunitySuccess = (opportunity: ISelectedOpportunity) => ({
  type: SUBMIT_EDITED_OPPORTUNITY_SUCCESS,
  payload: opportunity
})

export const submitSelectedOpportunityError = (error:string) => ({
  type: SUBMIT_EDITED_OPPORTUNITY_ERROR,
  payload: error
})

export const updateVolunteering = (updateVolunteering: IVolunteeringByRefugeeId) => ({
  type: UPDATE_VOLUNTEERING,
  payload: updateVolunteering
})


export const fetchVolunteeringData = () => {
 return async (dispatch: AppDispatch) => {
  dispatch(getVolunteeringStart());

  try {
    const response = await apiClient.get("/volunteer");
    dispatch({
      type: GET_VOLUNTEERING,
      payload: response.data.data
    });
    console.log(response.data.data)
  } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message: "Error desconocido";
    dispatch(getVolunteeringerror(errorMessage))
  }
 }
};

export const fetchVolunteeringByRefugeeId = (id: string|undefined) => {
  return async (dispatch: AppDispatch) => {
    dispatch(getVolunteeringStart());

    try{
      const response = await apiClient.get(`/volunteer/${id}`);
      if (Array.isArray(response.data.data)) {
        console.log("El payload es un arreglo con los siguientes datos:", response.data.data);
    } else {
        console.error("El payload no es un arreglo:", response.data.data);
    }
      dispatch({type: GET_VOLUNTEERING_BY_REFUGEE_ID, payload: response.data.data});
      console.log(response.data.data)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message: "Error desconocido";
      dispatch(getVolunteeringerror(errorMessage))
    }
  }
};

export const submitOpportunitySelected = (id:string|undefined, editedFormData: {
  description: string;
  requirements: string;
  availability: string;
}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(submitSelectedOpportunityStart());

    try{
      const response = await apiClient.put(`/volunteer/${id}`, editedFormData);
      dispatch({
        type: SUBMIT_EDITED_OPPORTUNITY_SUCCESS,
        payload: response.data,
    });
    return response;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message: "Error desconocido";
      dispatch(submitSelectedOpportunityError(errorMessage))
    }
  }
}
// export const submitOpportunitySelected = (id:string|undefined, editedFormData: {
//   description: string;
//   requirements: string;
//   availability: string;
// }) => async (dispatch: AppDispatch) => {
//   try {
//       // Realiza la petición al backend
//       const response = await fetch(`/volunteer/${id}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(editedFormData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//           // Actualiza el estado global en Redux
//           dispatch({
//               type: 'UPDATE_VOLUNTEERING',
//               payload: data, // Aquí regresa la nueva versión del voluntariado
//           });
//       } else {
//           throw new Error(data.message || 'Error al actualizar');
//       }
//   } catch (error) {
//       console.error(error);
//   }
// };
