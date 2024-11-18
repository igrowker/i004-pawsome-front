import { useForm } from "react-form-ease";


const RegisterForm = () => {
  const { formData, updateForm, validateForm, errors = {}} = useForm({
    data: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      lastName: "",
      registerOptions: "",
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
        }
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    

    const isValid = validateForm();
    if(!isValid){
      console.log("Errores en el formulario" , errors)
      return
    }
 
  };
  

  return (
    <>
      <div className="">
        <img src="../../public/register.png" alt="" className="w-full" />
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
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          ></input>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="confirmPassword">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.confirmPassword}
            onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          ></input>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
        <div className="name">
          <input
            type="text"
            placeholder="Nombre"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          ></input>
      {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="lastName">
          <input
            type="text"
            placeholder="Apellidos"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          ></input>
           {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>
        <div className="registerOptions inline-grid">
          <label>
            <input
              type="radio"
              name="option"
              value="refugio"
              className="mb-[15px]"
              onChange={(e) => updateForm({ registerOptions: e.target.value })}
            />{" "}
            Refugio
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="voluntario"
              className="mb-[15px]"  
              onChange={(e) => updateForm({ registerOptions: e.target.value })}
            />{" "}
            Voluntario
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="adoptante"
              className="mb-[40px]"
              onChange={(e) => updateForm({ registerOptions: e.target.value })}
            />{" "}
            Adoptante
          </label>
        </div>
        <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white" type="submit">
        Registrar
      </button>
      </form>
    </>
  );
};

export default RegisterForm;
