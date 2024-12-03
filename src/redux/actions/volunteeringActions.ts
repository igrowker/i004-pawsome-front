import { AppDispatch } from '../store';
import axios from 'axios';

export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";
export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const GET_VOLUNTEERING_ERROR = "GET_VOLUNTEERING_ERROR"

interface Volunteering {
    id: number;
    refugee_name: string,
    imageUrl: string,
    description: string,
    requirements: string,
    availability: string
  }
  
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

export const fetchVolunteeringOportunities = () => {
    return async (dispatch: AppDispatch) => {
      try {
        const response = await axios.get('/volunteer');
        dispatch(getVolunteering(response.data));
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Error al obtener el animal.";
        dispatch(getVolunteeringerror(errorMessage));
      }
    };
  };
  