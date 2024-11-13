const VolunteerForm = () => {
  return (
    <>
      <header className="bg-primaryLight p-10">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción para el voluntariado
        </h2>
      </header>
      <form className="max-w-72 md:max-w-2xl lg:max-w-3xl m-auto mt-10 mb-10 bg-slate-100 p-6 rounded-md shadow">
        <fieldset>
          <legend>Datos Personales</legend>
          <div>
            <label htmlFor="">Nombre Completo</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Fecha de Nacimiento</label>
            <input type="date" />
          </div>
          <div>
            <label htmlFor="">Género</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Dirección</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Telefóno de Contacto</label>
            <input type="tel" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="email" />
          </div>
          <div>
            <label htmlFor="">Documento de Identidad</label>
            <input type="text" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Información de Emergencia</legend>
          <div>
            <label htmlFor="">Contacto de emergencia</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Teléfono de emergencia</label>
            <input type="tel" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Disponibilidad</legend>
          <div>
            <label htmlFor="">Días disponibles</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Horarios disponibles</label>
            <input type="time" />
          </div>
          <div>
            <label htmlFor="">Frecuencia</label>
            <input type="text" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Experiencia y Habilidades</legend>
          <div>
            <label htmlFor="">Experiencia previa en voluntariado</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Áreas de interés o preferencia</label>
            <input type="date" />
          </div>
          <div>
            <label htmlFor="">Habilidades o conocimientos</label>
            <input type="text" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Motivación</legend>
          <div>
            <label htmlFor="">¿Por qué quieres ser voluntario?</label>
            <textarea name="" id=""></textarea>
          </div>
          <div>
            <label htmlFor="">¿Qué esperas lograr o aprender?</label>
            <textarea name="" id=""></textarea>
          </div>
        </fieldset>
        <fieldset>
          <legend>Preferencias de Rol</legend>
          <div>
            <label htmlFor="">Rol o actividad específica de interés</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">
              Preferencia de trabajo individual o en equipo
            </label>
            <input type="radio" /> Individual
            <input type="radio" /> Equipo
          </div>
        </fieldset>
        <fieldset>
          <legend>Condiciones de Salud y Requisitos Especiales</legend>
          <div>
            <label htmlFor="">
              Condiciones médicas o restricciones físicas
            </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Restricciones alimenticias o alergias</label>
            <input type="date" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Compromiso y Confirmación</legend>
          <div>
            <label htmlFor="">
              Disponibilidad para cumplir con el compromiso requerido
            </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Firma</label>
            <input type="date" />
          </div>
          <div>
            <label htmlFor="">
              Consentimiento para tratamiento de datos personales
            </label>
            <input type="text" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Observaciones Adicionales</legend>
          <div>
            <label htmlFor="">Nombre Completo</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Notas o información adicional que el voluntario desee agregar</label>
            <textarea name="" id=""></textarea>
          </div>

        </fieldset>
      </form>
    </>
  );
};

export default VolunteerForm;
