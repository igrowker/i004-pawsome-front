import Input from "@/components/ui/input";
import Legend from "@/components/ui/legend";
import { useForm } from "react-form-ease";
import FormData from "./../types/typeFormData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { fetchVolunteeringByRefugeeId } from "@/redux/actions/volunteeringActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IVolunteeringByRefugeeId } from "./../interfaces/IVolunteeringByRefugee";
import useVolunteerRegister from "@/hooks/volunteeringFormRegister";
import { VolunteerRegisterData } from './../hooks/volunteeringFormRegister';
import { Link } from "react-router-dom";
import { PiArrowLineLeftLight } from "react-icons/pi";

const VolunteerForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { data_refugee } = useSelector((state: RootState) => state.refugee);
  const { volunteering_id } = useSelector(
    (state: RootState) => state.volunteering
  );
  const {
    formData,
    updateForm, validateForm,
    errors: formErrors = {},
  } = useForm<FormData>({
    data: {
      personalData: {
        fullName: "",
        birth: "",
        gender: "",
        address: "",
        contactTel: "",
        email: "",
      },
      availability: {
        availableDays: "",
        availableHours: "",
        frecuency: "",
      },
      experienceAndSkills: {
        experience: "",
        preferenceArea: "",
        knowledge: "",
      },
      motivation: {
        volunteer: "",
        learn: "",
      },
      rolePreferences: {
        role: "",
        individualTeam: "",
      },
      healthConditions: {
        medicalConditions: "",
        alergics: "",
      },
      selectedVolunteering: {
        volunteeringId: "",
        volunteeringName: "",
        volunteeringDescription: "",
      },
      additionalObservations: {
        additionalInfo: "",
      },
      additionalMessage: ""
    },
    // validations: {
    //   personalData: (value: object) =>{

    //       if (value.fullName) return "El nombre completo es obligatorio.";
    //       if (value.birth) return "La fecha de nacimiento es obligatoria.";
    //       if (isNaN(Date.parse(value))) return "Por favor, ingrese una fecha válida.";

    //     gender: (value: string) => {
    //       if (!value) return "El género es obligatorio.";
    //     },
    //     address: (value: string) => {
    //       if (!value) return "La dirección es obligatoria.";
    //     },
    //     contactTel: (value: string) => {
    //       if (!value) return "El teléfono de contacto es obligatorio.";
    //       if (!/^\+?\d{10,15}$/.test(value)) return "El teléfono no tiene un formato válido.";
    //     },
    //     email: (value: string) => {
    //       if (!value) return "El email es obligatorio.";
    //       if (!/\S+@\S+\.\S+/.test(value)) return "Por favor, ingrese un email válido.";
    //     }
    //     return ""
    //   },
    //   availability: {
    //     availableDays: (value: string) => {
    //       if (!value) return "Los días de disponibilidad son obligatorios.";
    //     },
    //     availableHours: (value: string) => {
    //       if (!value) return "Las horas de disponibilidad son obligatorias.";
    //     },
    //     frecuency: (value: string) => {
    //       if (!value) return "La frecuencia es obligatoria.";
    //     },
    //   },
    //   experienceAndSkills: {
    //     experience: (value: string) => {
    //       if (!value) return "La experiencia es obligatoria.";
    //     },
    //     preferenceArea: (value: string) => {
    //       if (!value) return "El área de preferencia es obligatoria.";
    //     },
    //     knowledge: (value: string) => {
    //       if (!value) return "El conocimiento es obligatorio.";
    //     },
    //   },
    //   motivation: {
    //     volunteer: (value: string) => {
    //       if (!value) return "La motivación para ser voluntario es obligatoria.";
    //     },
    //     learn: (value: string) => {
    //       if (!value) return "La motivación para aprender es obligatoria.";
    //     },
    //   },
    //   rolePreferences: {
    //     role: (value: string) => {
    //       if (!value) return "El rol preferido es obligatorio.";
    //     },
    //     individualTeam: (value: string) => {
    //       if (!value) return "La preferencia por trabajar individual o en equipo es obligatoria.";
    //     },
    //   },
    //   healthConditions: {
    //     medicalConditions: (value: string) => {
    //       if (!value) return "Las condiciones médicas son obligatorias.";
    //     },
    //     alergics: (value: string) => {
    //       if (!value) return "Las alergias son obligatorias.";
    //     },
    //   },
    //   selectedVolunteering: {
    //     volunteeringId: (value: string) => {
    //       if (!value) return "El ID del voluntariado es obligatorio.";
    //     },
    //     volunteeringName: (value: string) => {
    //       if (!value) return "El nombre del voluntariado es obligatorio.";
    //     },
    //     volunteeringDescription: (value: string) => {
    //       if (!value) return "La descripción del voluntariado es obligatoria.";
    //     },
    //   },
    //   additionalObservations: {
    //     additionalInfo: (value: string) => {
    //       if (!value) return "La información adicional es obligatoria.";
    //     },
    //   },
    // },
  });

  useEffect(() => {
    console.log(formData);
    if (id) {
      dispatch(fetchVolunteeringByRefugeeId(id));
    }
  }, [formData]);

  const { isLoading, error: apiError, isSuccess, registerVolunteer } = useVolunteerRegister();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const isValid = validateForm();
    if (!isValid) {
      console.log("Errores en el formulario:", formErrors);
      return;
    }
  
    try {
      const volunteerData: VolunteerRegisterData = {
        personalData: {
          fullName: formData.personalData.fullName,
          birth: formData.personalData.birth,
          gender: formData.personalData.gender,
          address: formData.personalData.address,
          contactTel: formData.personalData.contactTel,
          email: formData.personalData.email,
        },
        availability: {
          availableDays: formData.availability.availableDays,
          availableHours: formData.availability.availableHours,
          frecuency: formData.availability.frecuency,
        },
        experienceAndSkills: {
          experience: formData.experienceAndSkills.experience,
          preferenceArea: formData.experienceAndSkills.preferenceArea,
          knowledge: formData.experienceAndSkills.knowledge,
        },
        motivation: {
          volunteer: formData.motivation.volunteer,
          learn: formData.motivation.learn,
        },
        rolePreferences: {
          role: formData.rolePreferences.role,
          individualTeam: formData.rolePreferences.individualTeam,
        },
        healthConditions: {
          medicalConditions: formData.healthConditions.medicalConditions,
          alergics: formData.healthConditions.alergics,
        },
        selectedVolunteering: {
          volunteeringId: formData.selectedVolunteering.volunteeringId,
          volunteeringName: formData.selectedVolunteering.volunteeringName,
          volunteeringDescription: formData.selectedVolunteering.volunteeringDescription,
        },
        additionalObservations: {
          additionalInfo: formData.additionalObservations.additionalInfo,
        },
        additionalMessage: {
          additionalMsg: formData.additionalMessage,
        },
      };
      
      // const dataToSend = {formData: volunteerData, oportunidadId: formData.selectedVolunteering.volunteeringId}
      const result = await registerVolunteer(volunteerData);
  
      if (result) {
        console.log("Registro exitoso:", result);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      
    }
  };
  
  
  const closePopup = () => {
    navigate(`/volunteering/${id}`);
    setIsSubmitted(false);
  };

  return (
  <>
  
    <div className="bg-[#F3F4F6]">
    <button className="bg-primaryLight text-light text-2xl p-2 my-2 font-semibold rounded-full shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 absolute">
        <Link to={`/volunteering/${id}`}>
          <PiArrowLineLeftLight className="" />
        </Link>
      </button>
      <header className="text-[#374151] p-5">
        <h2 className="text-2xl font-bold font-roboto text-center mt-10">
          Formulario de Inscripción para el refugio: {data_refugee.name_refugee}
        </h2>
      </header>
      <form className="md:max-w-2xl lg:max-w-3xl m-auto mt-5 mb-5 bg-[#fff] p-6 rounded-md shadow" onSubmit={handleSubmit}>
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
              value={formData.personalData.fullName}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    fullName: e.target.value,
                  },
                })
              }
            />
            <Input
              type="date"
              name="birth"
              required={true}
              value={formData.personalData.birth}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    birth: e.target.value.trim(),
                  },
                })
              }
            />
            <Input
              placeholder="Género"
              name="gender"
              required={true}
              value={formData.personalData.gender}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    gender: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Dirección"
              name="address"
              required={true}
              value={formData.personalData.address}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    address: e.target.value,
                  },
                })
              }
            />

            <Input
              type="contacTel"
              placeholder="Telefóno de Contacto"
              name="contactTel"
              required={true}
              value={formData.personalData.contactTel}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    contactTel: e.target.value,
                  },
                })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              required={true}
              value={formData.personalData.email}
              onChange={(e) =>
                updateForm({
                  personalData: {
                    ...formData.personalData,
                    email: e.target.value,
                  },
                })
              }
            />
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
              value={formData.availability.availableDays}
              onChange={(e) =>
                updateForm({
                  availability: {
                    ...formData.availability,
                    availableDays: e.target.value,
                  },
                })
              }
            />

            <Input
              placeholder="Horarios disponibles"
              name="availableHours"
              required={true}
              value={formData.availability.availableHours}
              onChange={(e) =>
                updateForm({
                  availability: {
                    ...formData.availability,
                    availableHours: e.target.value,
                  },
                })
              }
            />

            <Input
              placeholder="Frecuencia"
              name="frecuency"
              required={true}
              value={formData.availability.frecuency}
              onChange={(e) =>
                updateForm({
                  availability: {
                    ...formData.availability,
                    frecuency: e.target.value,
                  },
                })
              }
            />
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
              required={true}
              value={formData.experienceAndSkills.experience}
              onChange={(e) =>
                updateForm({
                  experienceAndSkills: {
                    ...formData.experienceAndSkills,
                    experience: e.target.value,
                  },
                })
              }
            />

            <Input
              placeholder="Áreas de interés o preferencia"
              name="preferenceArea"
              required={true}
              value={formData.experienceAndSkills.preferenceArea}
              onChange={(e) =>
                updateForm({
                  experienceAndSkills: {
                    ...formData.experienceAndSkills,
                    preferenceArea: e.target.value,
                  },
                })
              }
            />

            <Input
              placeholder="Habilidades o conocimientos"
              name="knowledge"
              required={true}
              value={formData.experienceAndSkills.knowledge}
              onChange={(e) =>
                updateForm({
                  experienceAndSkills: {
                    ...formData.experienceAndSkills,
                    knowledge: e.target.value,
                  },
                })
              }
            />
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
              required={true}
              value={formData.motivation.volunteer}
              onChange={(e) =>
                updateForm({
                  motivation: {
                    ...formData.motivation,
                    volunteer: e.target.value,
                  },
                })
              }
            />

            <Input
              type="text"
              placeholder="¿Qué esperas lograr o aprender?"
              name="learn"
              required={true}
              value={formData.motivation.learn}
              onChange={(e) =>
                updateForm({
                  motivation: {
                    ...formData.motivation,
                    learn: e.target.value,
                  },
                })
              }
            />
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
            required={true}
            value={formData.rolePreferences.individualTeam}
            onChange={(e) =>
              updateForm({
                rolePreferences: {
                  ...formData.rolePreferences,
                  individualTeam: e.target.value,
                },
              })
            }
          />
          <label className="block">
            Preferencia de trabajo individual o en equipo
          </label>
          <input
            type="radio"
            name="individual-team"
            id="individual"
            value={"individual"}
            checked={formData.rolePreferences.individualTeam === "individual"}
            onChange={() =>
              updateForm({
                rolePreferences: {
                  ...formData.rolePreferences,
                  individualTeam: "individual",
                },
              })
            }
          />{" "}
          <label htmlFor="individual">Individual</label>{" "}
          <input
            type="radio"
            name="individual-team"
            id="team"
            value={"team"}
            checked={formData.rolePreferences.individualTeam === "team"}
            onChange={() =>
              updateForm({
                rolePreferences: {
                  ...formData.rolePreferences,
                  individualTeam: "team",
                },
              })
            }
          />{" "}
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
              required={true}
              value={formData.healthConditions.medicalConditions}
              onChange={(e) =>
                updateForm({
                  healthConditions: {
                    ...formData.healthConditions,
                    medicalConditions: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Restricciones alimenticias o alergias"
              name="alergics"
              required={true}
              value={formData.healthConditions.alergics}
              onChange={(e) =>
                updateForm({
                  healthConditions: {
                    ...formData.healthConditions,
                    alergics: e.target.value,
                  },
                })
              }
            />
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Observaciones Adicionales"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <label htmlFor="adicionalInfo" className="block"></label>
          <Input
            name="adicionalInfo"
            required={true}
            value={formData.additionalObservations.additionalInfo}
            onChange={(e) =>
              updateForm({
                additionalObservations: {
                  ...formData.additionalObservations,
                  additionalInfo: e.target.value,
                },
              })
            }
          />
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Selecciona un Voluntariado"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <div>
            <select
              id="selectedVolunteering"
              name="selectedVolunteering"
              value={formData.selectedVolunteering.volunteeringName}
              onChange={(e) =>
                {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  updateForm({
                    selectedVolunteering: {
                      ...formData.selectedVolunteering,
                      volunteeringName: e.target.value,
                      volunteeringId: selectedOption.getAttribute('data-id') ?? '' ,
                    },
                  });
                }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Selecciona un voluntariado --</option>
              {Array.isArray(volunteering_id) &&
                volunteering_id.map(
                  (volunteering: IVolunteeringByRefugeeId) => (
                    <option
                      key={volunteering._id}
                      value={volunteering.description}
                      data-id={volunteering._id}
                    >
                      {volunteering.description}
                    </option>
                  )
                )}
              <option value="no_volunteer">
                No encuentro el voluntariado que quiero
              </option>
            </select>
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <Legend
            text="Mensaje adicional"
            className="text-2xl font-bold font-roboto text-[#374151]"
          />
          <label htmlFor="adicionalMsj" className="block"></label>
          <Input
            name="adicionalMsj"
            required={true}
            value={formData.additionalMessage}
            onChange={(e) =>
              updateForm({ additionalMessage: e.target.value })
            }
          />
        </fieldset>
        <button
          type="submit"
          className="bg-primaryLight w-full py-3 mt-4 rounded text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all"
        >
          Enviar
        </button>
      </form>
      {isLoading && <Spinner />}
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
      )}
      {formErrors && <p className="text-red-500">{apiError}</p>}
    </div>
  </>
    
  );
};

export default VolunteerForm;
