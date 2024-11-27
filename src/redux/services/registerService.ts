import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Servicio para registrar al usuario
export const registerUser = async (userData: {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message); 
      } else {
        throw new Error('Error al registrar el usuario'); 
      }
    }
  };

// Servicio para registrar el refugio
export const registerRefugee = async (refugeeData: {
  user_id: string;
  name_refugee: string;
  description: string;
  img?: string;
  pets?: string[];
}) => {
  try {
    const response = await axios.post(`${apiUrl}/refugees`, refugeeData);
    return response.data; // Devuelve los datos del refugio
  } catch (error) {
    throw new Error('Error al registrar el refugio');
  }
};
