import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface RefugeeRegisterData {
    email: string;
    password: string;
    name: string;
    last_name: string;
    name_refugee: string; 
    description: string;
    img?: string; 
    role:string
}

interface RefugeeRegisterReturn {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    registerRefugee: (data: RefugeeRegisterData) => Promise<any>;
}

const useRefugeeRegister = (): RefugeeRegisterReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const registerRefugee = async (data: RefugeeRegisterData) => {
        setIsLoading(true);
        setError(null);

        const role = "refugee";

        try {

            const formData = {

            }
          console.log(formData);
          
            const userResponse = await axios.post(`${apiUrl}/auth/register`, {
                name: data.name,
                last_name: data.last_name,
                password: data.password,
                email: data.email,
                role: role,
                name_refugee: data.name_refugee,
                description: data.description,
                img: data.img || undefined, 

            });

            if (userResponse.status !== 201) {
                throw new Error("Hubo un problema al registrar al usuario");
            }

    
        } catch (error: any) {
            if (error.response) {
                // Capturamos el mensaje del backend
                if (error.response.data.message === "Error al registrar el usuario") {
                    setError("El correo electrónico ya está registrado");
                } else {
                    setError(
                        error.response.data.message ||
                        "Hubo un problema al registrar el refugio"
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

    return { isLoading, error, isSuccess, registerRefugee };
};

export default useRefugeeRegister;
