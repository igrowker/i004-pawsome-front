import { useState } from "react";
import axios from "axios";


const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface RegisterData {
    email: string;
    password: string;
    name: string;
    lastName: string;
    registerUser: string
}

interface useRegisterReturn {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    registerUser: (data: RegisterData) => Promise <any>;
}

const useRegister = () : useRegisterReturn => {
    const [isLoading, setIsLoading] = useState <boolean>(false);
    const [error, setError] = useState <string | null>(null);
    const [isSuccess, setIsSuccess] = useState <boolean>(false);

    const registerUser = async (data: RegisterData) => {
        setIsLoading(true);
        setError(null);

        const role = data.registerUser === 'voluntario' ? 'user' : 'refugee';

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                name: data.name,
                password: data.password,
                email: data.email,
                role: role
            });

            if(response.status === 200) {
                setIsSuccess(true);
                return response.data;
            } else {
                throw new Error ("Hubo un problema con el registro");
            } 
        } catch (error: any) {
            if (error.response) {
                setError(`Error: ${error.response.data.message || "Hubo un problema al registrar"}`)
            } else if (error.request) {
                setError(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, error, isSuccess, registerUser};

}

export default useRegister