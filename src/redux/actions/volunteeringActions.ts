import { AppDispatch } from '../store';
import { Volunteering } from '@/interfaces/Volunteering';
import apiClient from '@/apiClient';
export const GET_VOLUNTEERING_START = "GET_VOLUNTEERING_START";
export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";
export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const GET_VOLUNTEERING_ERROR = "GET_VOLUNTEERING_ERROR"
export const SET_VOLUNTEERING_DATA = "SET_VOLUNTEERING_DATA"

export const getVolunteeringStart = () => ({
  type: GET_VOLUNTEERING_START,
})

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
