import { IRefuge } from "@/interfaces/IRefugee";
import axios from "axios";

export const getVolunteeringByRefugeeId = async(id: IRefuge) => {
    try {
        const response = await axios.get(`/volunteer/${id}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("Error fetching volunteering data", error);
        return [];
    }
}

