import Input from "./ui/input";
import Legend from "./ui/legend";


const VolunteeringForm = () => {
  return (
    <>
      <header className="bg-primaryLight p-10">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción Voluntariado
        </h2>
      </header>
      <form className="w-[500px] md:max-w-2xl lg:max-w-3xl m-auto mt-10 mb-10 bg-slate-100 p-6 rounded-md shadow">
        <fieldset className="space-y-2 mt-10 first-of-type:mt-0">
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <div>
            <Input
              placeholder="Nombre Completo"
              name="fullName"
              required={true}
            />
            <Input type="date" name="birth" required={true} />
            <Input placeholder="Género" name="gender" required={true} />
            <Input placeholder="Dirección" name="address" required={true} />
            <Input
              type="tel"
              placeholder="Telefóno de Contacto"
              name="contactTel"
              required={true}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
            />
            <Input
              type="number"
              placeholder="Documento de Identidad"
              name="dni"
              required={true}
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Disponibilidad"
            className="text-2xl font-bold font-roboto"
          />

          <div className="pt-2">
            <Input
              placeholder="Días disponibles"
              name="availableDays"
              required={true}
            />
            
            <Input
              placeholder="Horarios disponibles"
              name="availableHours"
              required={true}
            />
            
            <Input
              placeholder="Frecuencia"
              name="frecuency"
              required={true}
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Experiencia y Habilidades"
            className="text-2xl font-bold font-roboto"
          />

          <div>
            <Input
              placeholder="Experiencia previa en voluntariado"
              name="experience"
              required={true}
            />
          </div>

        </fieldset>
        <button
          type="submit"
          className="bg-primaryLight w-full rounded-full
          py-3 mt-4 hover:contrast-125 transition-all"
        >Enviar</button>
      </form>
    </>
  );
};

export default VolunteeringForm