export const GET_VOLUNTEERING = "GET_VOLUNTEERING";
export const ADD_VOLUNTEERING = "ADD_VOLUNTEERING";

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