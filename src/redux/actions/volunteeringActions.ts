import { AppDispatch } from '../store';
import { Volunteering } from '@/interfaces/Volunteering';
import apiClient from '@/apiClient';
import { IVolunteeringByRefugeeId } from '@/interfaces/IVolunteeringByRefugee';
// import { IVolunteeringByRefugeeId } from "@/interfaces/IVolunteeringByRefugee";
export const GET_VOLUNTEERING_START = "GET_VOLUNTEERING_START";
export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";
export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const GET_VOLUNTEERING_BY_REFUGEE_ID = "GET_VOLUNTEERING_BY_REFUGEE_ID";
export const GET_VOLUNTEERING_ERROR = "GET_VOLUNTEERING_ERROR"


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