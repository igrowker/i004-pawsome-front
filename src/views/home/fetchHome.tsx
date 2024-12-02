import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

// ----------> El fetch de get available animals esta en animalActions.ts

export const getSheltersData = async () => {
    const data = await axios.get(`${apiUrl}/refugees`)
    const sheltersData = data
    const results = sheltersData
    return results
}

