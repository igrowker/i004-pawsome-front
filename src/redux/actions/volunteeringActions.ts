export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";
export const GET_VOLUNTEERING_BY_REFUGEE = "GET_VOLUNTEERING_BY_REFUGEE";
import {fetchVolunteersByRefugeeId} from "../services/volunteeringService"
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

export const addVolunteering = (volunteer: Volunteering) => ({
    type: ADD_VOLUNTEERING,
    payload: volunteer
})

export const getVolunteeringByRefugee = (refugeeId: number) => async (dispatch: any) => {
    try {
        const data = await fetchVolunteersByRefugeeId(refugeeId);
        dispatch({
            type: GET_VOLUNTEERING_BY_REFUGEE,
            payload: data,
        });
    } catch (error) {
        console.error("Error fetching volunteering by refugee:", error);
    }
};