// import { useSelector } from "react-redux";
// import { useForm } from "react-form-ease";
// import { useState } from "react";
// import { Spinner } from "./ui/spinner";
// import { registerUserAndRefugee } from "../redux/actions/registerActions";// Asegúrate de importar correctamente el hook
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// const RegisterRefugeeForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const {
//     isLoading, error, user
//   } = useSelector((state: any) => state.user); 
//   const {
//     formData,
//     updateForm,
//     validateForm,
//     errors: formErrors = {},
//   } = useForm({
//     data: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       name: "",
//       last_name: "",
//       name_refugee: "",
//       description: "",
//       image: "",
//       pets: "",
//       registerUser: "refugio",
//     },
//     validations: {
//       email: (value) => {
//         if (!value) return "Por favor ingresa el email";
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           return "Email no válido.";
//       },
//       password: (value) => {
//         if (!value) return "Por favor ingresa una contraseña.";
//         if (value.length < 8)
//           return "La contraseña debe tener al menos 8 caracteres.";
//         if (value.length > 50)
//           return "La contraseña no puede tener más de 50 caracteres.";
//         if (
//           !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/.test(value)
//         ) {
//           return "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).";
//         }
//         return undefined;
//       },
//       confirmPassword: (value, data) => {
//         if (!value) return "Por favor confirma tu contraseña.";
//         if (value !== data.password) return "Las contraseñas no coinciden.";
//       },
//       name: (value) => {
//         if (!value) return "Por favor ingresa un nombre";
//       },
//       last_name: (value) => {
//         if (!value) return "Por favor ingresa apellidos";
//       },
//       name_refugee: (value) => {
//         if (!value) return "Por favor ingresa un nombre del refugio";
//       },
//       description: (value) => {
//         if (!value) return "Por favor ingresa una descripción";
//       },
//     },
//   });



//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const isValid = validateForm();
//     if (!isValid) {
//       console.log("Errores en el formulario:", formErrors);
//       return;
//     }

//     const userData = {
//       email: formData.email,
//       password: formData.password,
//       name: formData.name,
//       last_name: formData.last_name,
//       role: 'refugee',
//     };

//     const refugeeData = {
//       name_refugee: formData.name_refugee,
//       description: formData.description,
//       img: formData.image || undefined,
//       pets: formData.pets ? formData.pets.split(',') : [],
//     };

//     dispatch(registerUserAndRefugee(userData, refugeeData));
//   } catch (err) {
//     console.error('Error al registrar:', err);
//   }
// };

// if (isLoading) return <Spinner />;
// if (isSubmitted && user) {
//   return (
//     <div className="popup">
//       <h2>¡Registro Exitoso!</h2>
//       <p>Tu refugio ha sido registrado correctamente.</p>
//       <button onClick={() => navigate('/login')}>Ir al Login</button>
//     </div>
//   );
// }

//   const closePopup = () => {
//     setIsSubmitted(false);
//     navigate("/login")

//   };
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-form-ease';
import { useState } from 'react';
import { registerUserAndRefugee } from '../redux/actions/registerActions'; // Importa la acción
import { Spinner } from './ui/spinner';
import { useNavigate } from 'react-router-dom';

const RegisterRefugeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted] = useState(false);

  const { isLoading, error: apiError, user } = useSelector((state: any) => state.user);

  const {
    formData,
    updateForm,
    validateForm,
    errors: formErrors = {},
  } = useForm({
    data: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      last_name: '',
      name_refugee: '',
      description: '',
      image: '',
      pets: '',
      registerUser: 'refugio',
    },
    validations: {
      email: (value) => {
        if (!value) return 'Por favor ingresa el email';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email no válido.';
      },
      password: (value) => {
        if (!value) return 'Por favor ingresa una contraseña.';
        if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
      },
      confirmPassword: (value, data) => {
        if (!value) return 'Por favor confirma tu contraseña.';
        if (value !== data.password) return 'Las contraseñas no coinciden.';
      },
      name: (value) => {
        if (!value) return 'Por favor ingresa un nombre';
      },
      last_name: (value) => {
        if (!value) return 'Por favor ingresa apellidos';
      },
      name_refugee: (value) => {
        if (!value) return 'Por favor ingresa un nombre del refugio';
      },
      description: (value) => {
        if (!value) return 'Por favor ingresa una descripción';
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        last_name: formData.last_name,
        role: 'refugee',
      };

      const refugeeData = {
        name_refugee: formData.name_refugee,
        description: formData.description,
        img: formData.image || undefined,
        pets: formData.pets ? formData.pets.split(',') : [],
      };

      dispatch(registerUserAndRefugee(userData, refugeeData));
    } catch (err) {
      console.error('Error al registrar:', err);
    }
  };

  if (isLoading) return <Spinner />;
  if (isSubmitted && user) {
    return (
      <div className="popup">
        <h2>¡Registro Exitoso!</h2>
        <p>Tu refugio ha sido registrado correctamente.</p>
        <button onClick={() => navigate('/login')}>Ir al Login</button>
      </div>
    );
  }

  

  return (
    <>
      <div className="">
        <img src="/dog.webp" alt="" className="w-full" />
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
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email}</p>
          )}
          {apiError && <p className="text-red-500">{apiError}</p>}
        </div>

        <div className="password">
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}
        </div>

        <div className="confirmPassword">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500">{formErrors.confirmPassword}</p>
          )}
        </div>

        <div className="name">
          <input
            type="text"
            placeholder="Nombre"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
        </div>

        <div className="lastName">
          <input
            type="text"
            placeholder="Apellidos"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          />
          {formErrors.last_name && (
            <p className="text-red-500">{formErrors.last_name}</p>
          )}
        </div>

        <div className="refugeeName">
          <input
            type="text"
            placeholder="Nombre del Refugio"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.name_refugee}
            onChange={(e) => updateForm({ name_refugee: e.target.value })}
          />
          {formErrors.name_refugee && (
            <p className="text-red-500">{formErrors.name_refugee}</p>
          )}
        </div>

        <div className="description">
          <input
            placeholder="Descripción del Refugio"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
          {formErrors.description && (
            <p className="text-red-500">{formErrors.description}</p>
          )}
        </div>

        <div className="image mb-[25px]">
          <label
            htmlFor="file"
            className="border-2 rounded-3xl h-14 w-[85%] flex items-center justify-between px-4 bg-white cursor-pointer"
          >
            {formData.image ? (
              <span className="text-black truncate">{formData.image}</span>
            ) : (
              <span className="placeholder-black">
                Imagen (opcional)
              </span>
            )}
            <span className="text-primaryLight font-semibold">Examinar</span>
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) =>
              updateForm({
                image: e.target.files ? e.target.files[0].name : "",
              })
            }
          />
        </div>
        <div className="pets">
          <input
            type="text"
            placeholder="Animales en el refugio (opcional)"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.pets}
            onChange={(e) => updateForm({ pets: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white mb-[30px]"
        > Registrar
        </button>
      </form>
      {/* {isLoading && (<Spinner/>)}
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
      )} */}
      {formErrors && <p className="text-red-500">{apiError}</p>}
    </>
  );
};

export default RegisterRefugeeForm;
