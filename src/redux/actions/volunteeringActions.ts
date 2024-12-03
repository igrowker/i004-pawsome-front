import { AppDispatch } from '../store';
import axios from 'axios';
import { Volunteering } from '@/interfaces/Volunteering';
export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";
export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const GET_VOLUNTEERING_ERROR = "GET_VOLUNTEERING_ERROR"
export const SET_VOLUNTEERING_DATA = "SET_VOLUNTEERING_DATA"


export const getVolunteering = (volunteerData: Volunteering[]) => ({
    type: GET_VOLUNTEERING,
    payload: volunteerData
})

export const getVolunteeringerror = (error: string) => ({
    type: GET_VOLUNTEERING_ERROR,
    payload: error
})
export const addVolunteering = (volunteer: Volunteering) => ({
    type: ADD_VOLUNTEERING,
    payload: volunteer
})


// export const fetchVolunteeringOportunities = () => {
//   return async (dispatch: AppDispatch) => {
//       try {
//           const response = await axios.get("/volunteer");
//           dispatch(getVolunteering(response.data));
//       } catch (error: any) {
//           const errorMessage = error.response?.data?.message || "Error al obtener los datos";
//           dispatch(getVolunteeringerror(errorMessage));
//       }
//   };
// };

export const fetchVolunteeringData = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get('/volunteer');
    const volunteerData = response.data.data;
    dispatch(getVolunteering(volunteerData));
  } catch (error) {
    console.error(error);
  }
};