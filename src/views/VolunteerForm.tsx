import Input from "../components/ui/input";
import Legend from "../components/ui/legend";

const VolunteerForm = () => {
  return (
    <>
      <header className="bg-primaryLight p-10">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción para el voluntariado
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
            text="Información de Emergencia"
            className="text-2xl font-bold font-roboto"
          />
          <div>
            <label htmlFor="emergencyContact" className="block"></label>
            <Input
              placeholder="Contacto de emergencia"
              name="emergencyContact"
              required={true}
            />
            <Input
              type="tel"
              placeholder="Teléfono de emergencia"
              name="emergencyTel"
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

          <Input
            placeholder="Experiencia previa en voluntariado"
            name="experience"
            required={true}
          />

          <Input
            placeholder="Áreas de interés o preferencia"
            name="dni"
            required={true}
          />
          <input
            type="text"
            className="bg-transparent border-b-4 w-full outline-none leading-7"
            id="preferenceArea"
          />
          <label htmlFor="knowledge" className="block">
            Habilidades o conocimientos
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="knowledge"
            id="knowledge"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">Motivación</legend>
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="volunteer" className="block">
            ¿Por qué quieres ser voluntario?
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="volunteer"
            id="volunteer"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>
          <label htmlFor="learn" className="block">
            ¿Qué esperas lograr o aprender?
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="learn"
            id="learn"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>{" "}
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Preferencias de Rol
          </legend>
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="role" className="block">
            Rol o actividad específica de interés
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input
            type="text"
            id="role"
            className="bg-transparent border-b-4 w-full outline-none leading-7"
          />
          <label className="block">
            Preferencia de trabajo individual o en equipo
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input type="radio" name="individual-team" id="individual" />{" "}
          <label htmlFor="individual">Individual</label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input type="radio" name="individual-team" id="team" />{" "}
          <label htmlFor="team" className="align-middle">
            Equipo
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Condiciones de Salud y Requisitos Especiales
          </legend>
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="medicalConditions" className="block">
            Condiciones médicas o restricciones físicas
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="medicalConditions"
            id="medicalConditions"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>
          <label htmlFor="alergics" className="block">
            Restricciones alimenticias o alergias
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="alergics"
            id="alergics"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Compromiso y Confirmación
          </legend>
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="commitment" className="block">
            Disponibilidad para cumplir con el compromiso requerido
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input
            type="text"
            id="commitment"
            className="bg-transparent border-b-4 w-full outline-none leading-7"
          />
          <label htmlFor="sign" className="block">
            Firma
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input
            type="text"
            id="sign"
            className="bg-transparent border-b-4 w-full outline-none leading-7"
          />
          <label htmlFor="permission" className="block">
            Consentimiento para tratamiento de datos personales
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <input
            type="text"
            id="permission"
            className="bg-transparent border-b-4 w-full outline-none leading-7"
          />
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Observaciones Adicionales
          </legend>
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="adicionalInfo" className="block">
            Notas o información adicional que el voluntario desee agregar
          </label>
          <Input
            type="number"
            placeholder="Documento de Identidad"
            name="dni"
            required={true}
          />
          <textarea
            name="adicionalInfo"
            id="adicionalInfo"
            className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
          ></textarea>
        </fieldset>
      </form>
    </>
  );
};

export default VolunteerForm;
