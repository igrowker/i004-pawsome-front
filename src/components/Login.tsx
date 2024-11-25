import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/adoptform")
    throw new Error("Function not implemented.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

      <div className="text-center mb-10">
        <img src="./public/login.png" alt="logo" />
        <h1 className="text-4xl font-extrabold text-black">Pawsome</h1>
        <p className="text-black-500">Un lugar, todos los refugios</p>
      </div>


      <div className="bg-white shadow-lg rounded-xl p-8 w-80">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <button
            type="submit" 
            className="w-full text-white py-2 rounded-full transtion bg-[#6AB4A8] hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgotpassword"
            className="text-sm text-green-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            ¿Aún no tienes cuenta?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>


    </div>
  );
};

export default Login;