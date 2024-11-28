
import apiClient from "@/apiClient";


export const getVolunteeringData = async() => {
    try {
        const response = await apiClient.get('/volunteers');
        return response.data;
    } catch (error) {
        console.log("Error fetching volunteering data", error);
        return [];
    }
}

export const fetchVolunteersByRefugeeId = async (id:number) => {
    try {
        const response = await apiClient.get(`/volunteers/${id}`);
        return response.data;
    } catch ( error) {
        console.log("Error fetching volunteers by ID", error);
        throw error;
    }
}