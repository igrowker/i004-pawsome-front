import { useForm } from "react-form-ease";


const RegisterForm = () => {
  const { formData, updateForm, validateForm, errors} = useForm({
    data: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      registerOptions: "",
    },

    validations: {
        email: (value) => {
            if(!value) return "Por favor ingresa el email"
        }
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    if (!validateForm()) return 
 
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
          <p>{errors?.email}</p>
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          ></input>
          <p>{errors?.password}</p>
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          ></input>
        </div>
        <div className="name">
          <input
            type="text"
            placeholder="Nombre"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          ></input>
          <p>{errors?.name}</p>
        </div>
        <div className="lastName">
          <input
            type="text"
            placeholder="Apellidos"
            className="border-2 rounded-3xl h-14 w-[85%] mb-[25px] placeholder-black pl-2"
            value={formData.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          ></input>
          <p>{errors?.lastName}</p>
        </div>
        <div className="registerOptions inline-grid">
          <label>
            <input
              type="radio"
              name="option"
              value="refugio"
              className="mb-[15px]"
            />{" "}
            Refugio
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="voluntario"
              className="mb-[15px]"
            />{" "}
            Voluntario
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="adoptante"
              className="mb-[40px]"
            />{" "}
            Adoptante
          </label>
        </div>
        <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight" type="submit" onClick={() => console.log("Botón presionado")}>
        Registrar
      </button>
      </form>
    </>
  );
};

export default RegisterForm;
