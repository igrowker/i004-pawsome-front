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

          <div>
            <Input
              placeholder="Experiencia previa en voluntariado"
              name="experience"
              required={true}
            />
  
            <Input
              placeholder="Áreas de interés o preferencia"
              name="preferenceArea"
              required={true}
            />
  
  
            <Input
              placeholder="Habilidades o conocimientos"
              name="knowledge"
              required={true}
            />
          </div>

        </fieldset>
        <fieldset className="space-y-2 mt-10">

          <Legend
            text="Motivación"
            className="text-2xl font-bold font-roboto"
          />

          <div>
            <Input
              type="number"
              placeholder="¿Por qué quieres ser voluntario?"
              name="volunteer"
              required={true}
            />
  
            <Input
              type="number"
              placeholder="¿Qué esperas lograr o aprender?"
              name="learn"
              required={true}
            />
          </div>

        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Preferencias de Rol"
            className="text-2xl font-bold font-roboto"
          />
          <Input
            placeholder="Rol o actividad específica de interés"
            name="role"
            required={true}
          />
  
          <label className="block">
            Preferencia de trabajo individual o en equipo
          </label>
          <input type="radio" name="individual-team" id="individual" />{" "}
          <label htmlFor="individual">Individual</label>{" "}

          <input type="radio" name="individual-team" id="team" />{" "}
          <label htmlFor="team" className="align-middle">
            Equipo
          </label>

        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Condiciones de Salud y Requisitos Especiales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="medicalConditions" className="block">
            Condiciones médicas o restricciones físicas
          </label>
          <Input
            placeholder="Condiciones médicas o restricciones físicas"
            name="medicalConditions"
            required={true}
          />
          <Input
            placeholder="Restricciones alimenticias o alergias"
            name="alergics"
            required={true}
          />
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Compromiso y Confirmación"
            className="text-2xl font-bold font-roboto"
          />
          <Input
            placeholder="Disponibilidad para cumplir con el compromiso requerido"
            name="commitment"
            required={true}
          />
          <Input
            type="number"
            placeholder="Firma"
            name="sign"
            required={true}
          />
          <label htmlFor="permission" className="block">
            
          </label>
          <Input
            type="number"
            placeholder="Consentimiento para tratamiento de datos personales"
            name="permission"
            required={true}
          />
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Observaciones Adicionales"
            className="text-2xl font-bold font-roboto"
          />
          <label htmlFor="adicionalInfo" className="block">
            
          </label>
          <Input
            placeholder="Notas o información adicional que el voluntario desee agregar"
            name="adicionalInfo"
            required={true}
          />
        </fieldset>
      </form>
    </>
  );
};

export default VolunteerForm;
