import { login } from "@/redux/actions/authActions";
import { RootState } from "@/redux/rootReducer";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotification } from "@/redux/notificationSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)

  const { error, loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      dispatch(
        addNotification({
          type: "error",
          message: "Por favor completa todos los campos.",
        })
      );
      return;
    }

    try {
      await dispatch<any>(login(email, password));
      dispatch(
        addNotification({
          type: "success",
          message: "¡Inicio de sesión exitoso!",
        })
      );

      setTimeout(() => {
        navigate("/home");
      }, 100);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const handleSetIsVisible = () => {
    setIsVisible(!isVisible)
  }

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const eyeStyles = "absolute top-3 right-3"

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
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={handleSetPassword}
            />
            <button onClick={handleSetIsVisible}>
              {isVisible ? <FaEye className={eyeStyles} /> : <FaEyeSlash className={eyeStyles} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-full transtion bg-[#6AB4A8] hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Login"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
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
            <a href="/signin" className="text-green-500 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
