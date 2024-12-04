import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

// ----------> El fetch de get available animals esta en animalActions.ts

export const getSheltersData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/refugees`);
        return {refugees: response|| [] }
    } catch (error){
        console.error("Error al obtener los datos de refugios:", error);
        return {refugees : []};
    }

};

