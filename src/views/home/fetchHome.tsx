import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;


export const getAnimalsAvailableData = async () => { //Todos los animales disponibles para la adopción
    try {
        const response = await axios.get(`${apiUrl}/animals/available`); 
        return {animals: response|| [] }
    } catch (error){
        console.error("Error al obtener los datos de animales:", error);
        return {animals : []};
    }

};

export const getSheltersData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/refugees`);
        return {refugees: response|| [] }
    } catch (error){
        console.error("Error al obtener los datos de refugios:", error);
        return {refugees : []};
    }

};

