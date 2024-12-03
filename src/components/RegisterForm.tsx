import { useForm } from "react-form-ease";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useNavigate } from "react-router-dom";
import Input from "./ui/input";
import { Link } from "react-router-dom";
import { PiArrowLineLeftLight } from "react-icons/pi";
import useRegister from "@/hooks/useRegister";


const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { formData, updateForm, validateForm, errors: formErrors = {} } = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      last_name: "",
      registerUser: "user",
    },

    validations: {
      email: (value) => {
        if (!value) return "Por favor ingresa el email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email no válido.";
      },

      password: (value) => {
        if (!value) return "Por favor ingresa una contraseña.";
        if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
        if (value.length > 50) return "La contraseña no puede tener más de 50 caracteres.";
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/.test(value)) {
          return "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).";
        }
        return undefined;
      },
      confirmPassword: (value, data) => {
        if (!value) return "Por favor confirma tu contraseña.";
        if (value !== data.password) return "Las contraseñas no coinciden.";
      },

      name: (value) => {
        if (!value) return "Por favor ingresa un nombre"
      },

      last_name: (value) => {
        if (!value) return "Por favor ingresa apellidos"
      },

    }
  });

  const { isLoading, error: apiError, isSuccess, registerUser } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const isValid = validateForm();
    if (!isValid) {
      console.log("Errores en el formulario:", formErrors);
      return;
    }


    try {
      const result = await registerUser({
        name: formData.name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });

      if (result)
        setIsSubmitted(true);
      isSuccess === true
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  const closePopup = () => {
    navigate("/login")
    setIsSubmitted(false);
  };



  return (
    <>
      <button className="bg-primaryLight text-light text-2xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 absolute">
        <Link to={"/signin"}><PiArrowLineLeftLight /></Link>
      </button>
      <div className="">
        <img src="/dog.webp" alt="" className="w-full" />
      </div>
      <form
        className="max-w-md md:max-w-2xl lg:max-w-3xl p-8 flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <div className="email text-">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className=""
            value={formData.email}
            onChange={(e) => updateForm({ email: e.target.value })
            }
          />
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>
        <div className="password">
          <Input
            name="password"
            type="password"
            placeholder="Contraseña"
            className=""
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          ></Input>
          {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
        </div>
        <div className="confirmPassword">
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirmar Contraseña"
            className=""
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          ></Input>
          {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
        </div>
        <div className="name">
          <Input
            name="name"
            type="text"
            placeholder="Nombre"
            className=""
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          ></Input>
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>
        <div className="lastName">
          <Input
            name="last_name"
            type="text"
            placeholder="Apellidos"
            className=""
            value={formData.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          ></Input>
          {formErrors.last_name && <p className="text-red-500">{formErrors.last_name}</p>}
        </div>
        <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white mb-[30px] mx-auto mt-4" type="submit">
          Registrar
        </button>
      </form>
      {isLoading && (<Spinner />)}
      {isSubmitted && isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">¡Registro Exitoso!</h2>
            <p className="text-lg mb-6">Tus datos han sido registrados correctamente.</p>
            <button
              className="bg-primaryLight text-white px-4 py-2 rounded-md"
              onClick={closePopup}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {formErrors && <p className="text-red-500">{apiError}</p>}
    </>
  );
};

export default RegisterForm;