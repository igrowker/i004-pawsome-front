import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;

// export const getAvailableAnimalsData = async () => {
//     const data = await fetch(`${apiUrl}/available`) //Actualizar la url una vez que esté realizado el endpoint en swagger
//     const availableaAnimalsData = data.json()
//     const results = availableaAnimalsData
//     return results
// }
// ----------> El fetch de get available animals esta en animalActions.ts

export const getSheltersData = async () => {
    const data = await axios.get(`${apiUrl}/refugees`)
    const sheltersData = data
    const results = sheltersData
    return results
}

