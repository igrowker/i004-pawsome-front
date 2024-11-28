import axios from "axios";

export const getVolunteeringData = async() => {
    try {
        const response = await axios.get('/volunteers');
        return response.data;
    } catch (error) {
        console.log("Error fetching volunteering data", error);
        return [];
    }
}