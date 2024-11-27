import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
         const token = localStorage.getItem("token");

        if (token) {
          await axios.post(
            `${process.env.VITE_BACKEND_URL}/api/logout`, 
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        }

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("authToken");

        navigate("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Redirigiendo a la página de inicio de sesión...</p>
    </div>
  );
};

export default Logout;

