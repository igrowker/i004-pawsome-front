import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

export const getAnimalsData = async () => {
    const data = await fetch(`${apiUrl}`) //Actualizar la url una vez que esté realizado el endpoint en swagger
    const animalsData = data.json()
    const results = animalsData
    return results
}

export const getSheltersData = async () => {
    const data = await axios.get(`${apiUrl}/refugees`)
    const sheltersData = data
    const results = sheltersData
    return results
}

