import { useForm } from "react-form-ease";
import { useState } from "react";
import useRegister from './../hooks/useRegister';




const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const { formData, updateForm, validateForm, errors: formErrors = {}} = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      registerUser: "" as "user" | "refugee",
    },

    validations: {
        email: (value) => {
            if(!value) return "Por favor ingresa el email";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email no válido.";
        },

        password: (value) => {
          if (!value) return "Por favor ingresa una contraseña.";
          if (value.length < 8) return "La contraseña debe tener al menos 6 caracteres.";
          if (value.length > 12) return "La contraseña no puede tener más de 12 caracteres.";
          return undefined; 
        },
        confirmPassword: (value, data) => {
          if (!value) return "Por favor confirma tu contraseña.";
          if (value !== data.password) return "Las contraseñas no coinciden.";
        },
      
        name: (value) => {
          if(!value) return "Por favor ingresa un nombre"
        },
        
        lastName: (value) => {
          if(!value) return "Por favor ingresa apellidos"
        },
        registerUser: (value) => {
          if (!value) return "Por favor selecciona una opción.";
        },
    }
  });

  const { isLoading, error: apiError, isSuccess, registerUser } = useRegister(); 
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      console.log("Errores en el formulario:", formErrors);
      return;
    }

    try {
      const result = await registerUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName,
        registerUser: formData.registerUser,
      });

      if (result) setIsSubmitted(true);
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

  const closePopup = () => {
    setIsSubmitted(false);
  };


  return (
    <>
      <div className="">
        <img src="/dog.webp" alt="" className="w-full mt-[25px]" />
      </div>
      <form
        className="max-w-md md:max-w-2xl lg:max-w-3xl mt-10 ml-[52px] flex flex-col justify-center"
        onSubmit={handleSubmit}
      >
        <div className="email text-">
          <input
            type="email"
            placeholder="Email"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          ></input>
          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          ></input>
          {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
        </div>
        <div className="confirmPassword">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          ></input>
          {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
        </div>
        <div className="name">
          <input
            type="text"
            placeholder="Nombre"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          ></input>
      {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>
        <div className="lastName">
          <input
            type="text"
            placeholder="Apellidos"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          ></input>
           {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}
        </div>
        <div className="registerOptions inline-grid">
          <label>
            <input
              type="radio"
              name="option"
              value="refugio"
              className="mb-[15px]"
              onChange={(e) => updateForm({ registerUser: e.target.value as "user" | "refugee" })}
            />{" "}
            Refugio
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="adoptante"
              className="mb-[40px]"
              onChange={(e) => updateForm({ registerUser: e.target.value as "user" | "refugee"})}
            />{" "}
            Adoptante
          </label>
        </div>
        <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white" type="submit">
        Registrar
      </button>
      </form>
      {isSubmitted  && isSuccess && (
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
  {isLoading && <p>Cargando...</p>}
    </>
  );
};

export default RegisterForm;
