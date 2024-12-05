import { useState } from "react";
import axios from "axios";


const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface RegisterData {
    email: string;
    password: string;
    name: string;
    last_name: string;
    role: string;
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

        if (data.role !== 'user') {
            setError("Valor de 'registerUser' inválido");
            setIsLoading(false);
            return;
        }
        
        const role =  'user';

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, {
                name: data.name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                role: role
            });

            if(response.status === 201) {
                setIsSuccess(true);
                return response.data;
            } else {
                throw new Error ("Hubo un problema con el registro");
            } 
        } catch (error: any) {
            console.log(error.response.data.message === "")
            if (error.response) {
              if (error.response.data.message === "Error al registrar el usuario") {
                setError("El correo electrónico ya está registrado");
              } else {
                setError(
                  error.response.data.message || "Hubo un problema al registrar"
                );
              }
            } else if (error.request) {
              setError(`Error: ${error.message}`);
            } else {
              setError("Ocurrió un error desconocido");
            }
          } finally {
            setIsLoading(false);
          }
        };
  
    return { isLoading, error, isSuccess, registerUser};

}

export default useRegister