import { useForm } from "react-form-ease";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useNavigate } from "react-router-dom";
import Input from "./ui/input";
import { Link } from "react-router-dom";
import { PiArrowLineLeftLight } from "react-icons/pi";
import useRefugeeRegister from "@/hooks/refugeeRegister";

const RegisterRefugeeForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { formData, updateForm, validateForm, errors: formErrors = {}} = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      last_name: "",
      name_refugee: "",
      description: "",
      image: "",
      registerUser: "refugio",
    },
    validations: {
      email: (value) => {
        if (!value) return "Por favor ingresa el email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email no válido.";
      },
      password: (value) => {
        if (!value) return "Por favor ingresa una contraseña.";
        if (value.length < 8)
          return "La contraseña debe tener al menos 8 caracteres.";
        if (value.length > 50)
          return "La contraseña no puede tener más de 50 caracteres.";
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/.test(value)
        ) {
          return "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).";
        }
      },
      confirmPassword: (value, data) => {
        if (!value) return "Por favor confirma tu contraseña.";
        if (value !== data.password) return "Las contraseñas no coinciden.";
      },
      name: (value) => {
        if (!value) return "Por favor ingresa un nombre";
      },
      last_name: (value) => {
        if (!value) return "Por favor ingresa apellidos";
      },
      name_refugee: (value) => {
        if (!value) return "Por favor ingresa un nombre del refugio";
      },
      description: (value) => {
        if (!value) return "Por favor ingresa una descripción";
      },
    },
  });

  const {
    isLoading,
    error: apiError,
    isSuccess,
    registerRefugee,
  } = useRefugeeRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      console.log("Errores en el formulario:", formErrors);
      return;
    }

    try {
      const result = await registerRefugee({
        name: formData.name,
        last_name: formData.last_name,
        password: formData.password,
        email: formData.email,
        role: "refugee",
        name_refugee: formData.name_refugee,
        description: formData.description,
        img: formData.image || undefined,
        
      });

      if (result) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
    navigate("/login")

  };

  return (
    <>
    <button className="bg-primaryLight text-light text-2xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 absolute">
      <Link to={"/signin"}>
        <PiArrowLineLeftLight />
      </Link>
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
            onChange={(e) => updateForm({ email: e.target.value })}
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email}</p>
          )}
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>

        <div className="password">
          <Input
          name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}
        </div>

        <div className="confirmPassword">
          <Input
          name="confirmPassword"
            type="password"
            placeholder="Confirmar Contraseña"
            className=""
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500">{formErrors.confirmPassword}</p>
          )}
        </div>

        <div className="name">
          <Input
          name="name"
            type="text"
            placeholder="Nombre"
            className=""
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
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
          />
          {formErrors.last_name && (
            <p className="text-red-500">{formErrors.last_name}</p>
          )}
        </div>

        <div className="refugeeName">
          <Input
          name="name_refugee"
            type="text"
            placeholder="Nombre del Refugio"
            className=""
            value={formData.name_refugee}
            onChange={(e) => updateForm({ name_refugee: e.target.value })}
          />
          {formErrors.name_refugee && (
            <p className="text-red-500">{formErrors.name_refugee}</p>
          )}
        </div>

        <div className="description">
          <Input
          name="description"
            placeholder="Descripción del Refugio"
            className=""
            value={formData.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
          {formErrors.description && (
            <p className="text-red-500">{formErrors.description}</p>
          )}
        </div>

        <div className="image mb-4">
          <label
            htmlFor="file"
            className="border-2 rounded h-12 w-full flex items-center justify-between px-4 bg-white cursor-pointer"
          >
            {formData.image ? (
              <span className="text-grey truncate">{formData.image}</span>
            ) : (
              <span className="placeholder-text-base text-gray-700">
                Imagen (opcional)
              </span>
            )}
            <span className="text-primaryLight font-semibold">Examinar</span>
          </label>
          <input
            type="file"
            className="hidden"
            placeholder=""
            onChange={(e) =>
              updateForm({
                image: e.target.files ? e.target.files[0].name : "",
              })
            }
          />
        </div>
        {/* <div className="pets">
          <Input
          name="animals_list"
            type="text"
            placeholder="Animales en el refugio (opcional)"
            className=""
            value={formData.pets}
            onChange={(e) => updateForm({ pets: e.target.value })}
          />
        </div> */}
        <button
          type="submit"
          className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white mb-[30px] mx-auto"
        > Registrar
        </button>
      </form>
      {isLoading && (<Spinner/>)}
      {isSubmitted && isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">¡Registro Exitoso!</h2>
            <p className="text-lg mb-6">
              Tus datos han sido registrados correctamente.
            </p>
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

export default RegisterRefugeeForm;