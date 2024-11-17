const VolunteerForm = () => {
  return (
    <>
      <header className="bg-primaryLight p-10">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción para el voluntariado
        </h2>
      </header>
      <form className="max-w-72 md:max-w-2xl lg:max-w-3xl m-auto mt-10 mb-10 bg-slate-100 p-6 rounded-md shadow">
        <fieldset className="space-y-2 mt-10 first-of-type:mt-0">
          <legend className="text-2xl font-bold font-roboto">
            Datos Personales
          </legend>
          <div className="space-y-4">
            <label htmlFor="fullName" className="block">
              Nombre Completo
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="fullName"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="birth" className="block">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="birth"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="gender" className="block">
              Género
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="gender"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="address" className="block">
              Dirección
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="address"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="contactTel" className="block">
              Telefóno de Contacto
            </label>
            <input
              type="tel"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="contactTel"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="email"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="dni" className="block">
              Documento de Identidad
            </label>
            <input
              type="number"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="dni"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Información de Emergencia
          </legend>
          <div className="space-y-4">
            <label htmlFor="emergencyContact" className="block">
              Contacto de emergencia
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="emergencyContact"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="emergencyTel" className="block">
              Teléfono de emergencia
            </label>
            <input
              type="tel"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="emergencyTel"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Disponibilidad
          </legend>
          <div className="space-y-4">
            <label htmlFor="availableDays" className="block">
              Días disponibles
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="availableDays"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="availableHours" className="block">
              Horarios disponibles
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="availableHours"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="frecuency" className="block">
              Frecuencia
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="frecuency"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Experiencia y Habilidades
          </legend>
          <div className="space-y-4">
            <label htmlFor="experience" className="block">
              Experiencia previa en voluntariado
            </label>
            <textarea
              name="experience"
              id="experience"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <label htmlFor="preferenceArea" className="block">
              Áreas de interés o preferencia
            </label>
            <input
              type="text"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
              id="preferenceArea"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="knowledge" className="block">
              Habilidades o conocimientos
            </label>
            <textarea
              name="knowledge"
              id="knowledge"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">Motivación</legend>
          <div className="space-y-4">
            <label htmlFor="volunteer" className="block">
              ¿Por qué quieres ser voluntario?
            </label>
            <textarea
              name="volunteer"
              id="volunteer"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <label htmlFor="learn" className="block">
              ¿Qué esperas lograr o aprender?
            </label>
            <textarea
              name="learn"
              id="learn"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>{" "}
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Preferencias de Rol
          </legend>
          <div className="space-y-4">
            <label htmlFor="role" className="block">
              Rol o actividad específica de interés
            </label>
            <input 
              type="text" 
              id="role"
              className="bg-transparent border-b-4 w-full outline-none leading-7"
            />
          </div>
          <div className="space-y-4 space-x-2">
            <label className="block">
              Preferencia de trabajo individual o en equipo
            </label>
            <input
              type="radio"
              name="individual-team"
              id="individual" 
            /> <label htmlFor="individual">Individual</label>
            <input
              type="radio"
              name="individual-team"
              id="team"
            /> <label htmlFor="team" className="align-middle">Equipo</label>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Condiciones de Salud y Requisitos Especiales
          </legend>
          <div className="space-y-4">
            <label htmlFor="medicalConditions" className="block">
              Condiciones médicas o restricciones físicas
            </label>
            <textarea 
              name="medicalConditions" 
              id="medicalConditions"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
          <div className="space-y-4">
            <label htmlFor="alergics" className="block">
              Restricciones alimenticias o alergias
            </label>
            <textarea 
              name="alergics" 
              id="alergics"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Compromiso y Confirmación
          </legend>
          <div className="space-y-4">
            <label htmlFor="commitment" className="block">
              Disponibilidad para cumplir con el compromiso requerido
            </label>
            <input
              type="text"
              id="commitment" 
              className="bg-transparent border-b-4 w-full outline-none leading-7"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="sign" className="block">
              Firma
            </label>
            <input
              type="text"
              id="sign" 
              className="bg-transparent border-b-4 w-full outline-none leading-7"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="permission" className="block">
              Consentimiento para tratamiento de datos personales
            </label>
            <input
              type="text"
              id="permission" 
              className="bg-transparent border-b-4 w-full outline-none leading-7"
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <legend className="text-2xl font-bold font-roboto">
            Observaciones Adicionales
          </legend>
          <div className="space-y-4">
            <label htmlFor="adicionalInfo" className="block">
              Notas o información adicional que el voluntario desee agregar
            </label>
            <textarea
              name="adicionalInfo"
              id="adicionalInfo"
              className="bg-transparent border-4 w-full outline-none leading-7 rounded h-32"
            ></textarea>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default VolunteerForm;
