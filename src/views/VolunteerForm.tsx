import Input from "@/components/ui/input";
import Legend from "@/components/ui/legend";
import { useForm } from "react-form-ease";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "@/redux/services/volunteeringFormService";
import { RootState } from "@/redux/rootReducer";
import { AppDispatch } from "@/redux/store";


const VolunteerForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {  error } = useSelector(
    (state: RootState) => state.form
  );

  const {
    formData,
    updateForm,
    validateForm,
    errors: formErrors = {},
  } = useForm({
    data: {
      full_name: "",
      birth: "",
      gender: "",
      address: "",
      telephone: "",
      email: "",
      availableDays: "",
      availableHours:"",
      frecuency:"",
      experience:"",
      preferenceArea:"",
      knowledge:"",
      volunteer:"",
      learn:"",
      volunteering_option:"",
      role:"",
      work_preference:"",
      medical_conditions:"",
      alergics:"",
      data_consent:"",
      aditional_info:"",
    },

    validations: {
      full_name: (value) => {
        if (!value) return "Por favor ingresa un nombre";
      },
      birth: (value) => {
        if (!value) return "Por favor ingresa una fecha";
      },
      gender:(value) => {
        if (!value) return "Por favor ingresa un género";
      },
      address:(value) => {
        if (!value) return "Por favor ingresa una dirección";
      },
      telephone: (value) => {
        if (!value) return "Por favor ingresa un número de teléfono";
      },
      email: (value) => {
        if (!value) return "Por favor ingresa el email";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email no válido.";
      },
      availableDays: (value) => {
        if (!value) return "Por favor ingresa un día";
      },
      availableHours: (value) => {
        if (!value) return "Por favor ingresa una hora";
      },
      frecuency: (value) => {
        if (!value) return "Por favor ingresa con qué frecuencia";
      },
      experience:(value) => {
        if (!value) return "Por favor indica si tienes experiencia";
      },
      preferenceArea: (value) => {
        if (!value) return "Por favor indica tu área de interés o preferencia";
      },
      knowledge: (value) => {
        if (!value) return "Por favor ingresa si tienes habilidades o conocimientos ";
      },
      volunteer: (value) => {
        if (!value) return "Por favor ingresa una respuesta";
      },
      learn: (value) => {
        if (!value) return "Por favor ingresa una respuesta";
      },
      volunteering_option: (value) => {
        if (!value) return "Por favor selecciona una opción";
      },
      role: (value) => {
        if (!value) return "Por favor ingresa una actividad";
      },
      work_preference: (value) => {
        if (!value) return "Por favor ingresa elije una opción";
      },
      medical_conditions: (value) => {
        if (!value) return "Por favor ingresa una respuesta";
      },
      alergics:(value) => {
        if (!value) return "Por favor ingresa una respuesta";
      },
      data_consent:(value) => {
        if (!value) return "Por favor elije un opción";
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    dispatch(submitForm(formData));
  };

  return (
    <div className="bg-[#F3F4F6]">
      <header className="text-[#374151] p-5">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción para {}
        </h2>
      </header>
      <form className="max-w-md md:max-w-2xl lg:max-w-3xl p-8 flex flex-col justify-center" onSubmit={handleSubmit}>
        <fieldset className="space-y-2 mt-10 first-of-type:mt-0">
          <Legend
            text="Datos Personales"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <div>
            <Input
              placeholder="Nombre Completo"
              name="fullName"
              required={true}
              value={formData.full_name}
              onChange={(e) => updateForm({ full_name: e.target.value })}
              
            />
             {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input type="date" name="birth" required={true} value={formData.birth}
              onChange={(e) => updateForm({ birth: e.target.value })} />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input placeholder="Género" name="gender" required={true} value={formData.gender}
              onChange={(e) => updateForm({ gender: e.target.value })}/>
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input placeholder="Dirección" name="address" required={true} value={formData.address}
              onChange={(e) => updateForm({ address: e.target.value })} />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              type="number"
              placeholder="Telefóno de Contacto"
              name="contactTel"
              required={true}
              value={formData.telephone}
              onChange={(e) => updateForm({ telephone: e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              value={formData.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          </div>
        </fieldset>

        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Disponibilidad"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />

          <div className="pt-2">
            <Input
              placeholder="Días disponibles"
              name="availableDays"
              required={true}
              value={formData.availableDays}
              onChange={(e) => updateForm({ availableDays: e.target.value })}
            />
{formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              placeholder="Horarios disponibles"
              name="availableHours"
              required={true}
              value={formData.availableHours}
              onChange={(e) => updateForm({ availableHours: e.target.value })}
            />
{formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input placeholder="Frecuencia" name="frecuency" required={true} value={formData.frecuency}
              onChange={(e) => updateForm({ frecuency: e.target.value })}/>
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Experiencia y Habilidades"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />

          <div>
            <Input
              placeholder="Experiencia previa en voluntariado"
              name="experience"
              required={true} value={formData.experience}
              onChange={(e) => updateForm({ experience: e.target.value })}
            />
{formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              placeholder="Áreas de interés o preferencia"
              name="preferenceArea"
              required={true}
              value={formData.preferenceArea}
              onChange={(e) => updateForm({ preferenceArea: e.target.value })}
            />
{formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              placeholder="Habilidades o conocimientos"
              name="knowledge"
              required={true} value={formData.knowledge}
              onChange={(e) => updateForm({ knowledge: e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Motivación"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />

          <div>
            <Input
              type="text"
              placeholder="¿Por qué quieres ser voluntario?"
              name="volunteer"
              required={true} value={formData.volunteer}
              onChange={(e) => updateForm({ volunteer: e.target.value })}
            />
{formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              type="text"
              placeholder="¿Qué esperas lograr o aprender?"
              name="learn"
              required={true}
              value={formData.learn}
              onChange={(e) => updateForm({ learn: e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <div>
            <Legend
              text="Elige un voluntariado"
              className="text-2xl font-bold font-roboto text-[#374151]"
            />
            <input type="radio" name="accept-option" id="accept-option" value={formData.volunteering_option}
              onChange={(e) => updateForm({ volunteering_option: e.target.value })} />{" "}
            <label htmlFor="accept-option">Aceptar</label>{" "}
            <input type="radio" name="deny-option" id="team" value={formData.volunteering_option}
              onChange={(e) => updateForm({ volunteering_option: e.target.value })}/>{" "}
            <label htmlFor="deny-option" className="align-middle">
              Rechazar
            </label>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Preferencias de Rol"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <Input
            placeholder="Rol o actividad específica de interés"
            name="role"
            required={true} value={formData.role}
            onChange={(e) => updateForm({ role: e.target.value })}
          />
          {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          <label className="block">
            Preferencia de trabajo individual o en equipo
          </label>
          <input type="radio" name="individual-team" id="individual" value={formData.work_preference}
              onChange={(e) => updateForm({ work_preference: e.target.value })} />{" "}
          <label htmlFor="individual">Individual</label>{" "}
          <input type="radio" name="individual-team" id="team" value={formData.work_preference}
              onChange={(e) => updateForm({ work_preference: e.target.value })} />{" "}
          <label htmlFor="team" className="align-middle">
            Equipo
          </label>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Condiciones de Salud y Requisitos Especiales"
            className="text-2xl font-bold text-[#374151] font-roboto"
          />
          <div>
            <Input
              placeholder="Condiciones médicas o restricciones físicas"
              name="medicalConditions"
              required={true} value={formData.medical_conditions}
              onChange={(e) => updateForm({ medical_conditions: e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
            <Input
              placeholder="Restricciones alimenticias o alergias"
              name="alergics"
              required={true} value={formData.alergics}
              onChange={(e) => updateForm({alergics : e.target.value })}
            />
            {formErrors.full_name && <p className="text-red-500">{formErrors.full_name}</p>}
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <div>
            <Legend
              text="Consentimiento para tratamiento de datos personales"
              className="text-2xl font-bold font-roboto text-[#374151]"
            />
            <input type="radio" name="accept-option" id="accept-option" value={formData.data_consent}
              onChange={(e) => updateForm({data_consent : e.target.value })}/>{" "}
            <label htmlFor="accept-option">Aceptar</label>{" "}
            <input type="radio" name="deny-option" id="team" value={formData.data_consent}
              onChange={(e) => updateForm({data_consent : e.target.value })}/>{" "}
            <label htmlFor="deny-option" className="align-middle">
              Rechazar
            </label>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Observaciones Adicionales"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <label htmlFor="adicionalInfo" className="block"></label>
          <Input name="adicionalInfo" value={formData.aditional_info}
              onChange={(e) => updateForm({aditional_info : e.target.value })} />
        </fieldset>
        <button
          type="submit" 
          className="bg-primaryLight w-full py-3 mt-4 rounded text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all"
        >
          {/* {loading ? "Enviando..." : "Enviar"} */}
        </button>
        {/* {success && <p className="text-green-500">Formulario enviado con éxito.</p>} */}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default VolunteerForm;
