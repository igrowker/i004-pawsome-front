
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // Eliminar datos de sesión
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');

            // Redirigir a la página de login
            navigate('/login');
        } catch (error) {
            console.error("Error al eliminar los datos de sesión:", error);
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg">Redirigiendo a la página de inicio de sesión...</p>
        </div>
    );
};



export default Logout;