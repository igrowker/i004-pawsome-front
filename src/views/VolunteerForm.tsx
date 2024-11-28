import Input from "@/components/ui/input";
import Legend from "@/components/ui/legend";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getVolunteering, getVolunteeringByRefugee } from "../redux/actions/volunteeringActions";
// // import volunteeringList from "./VolunteeringList";
// import { RootState } from "../redux/rootReducer";



const VolunteerForm = () => {
  // const volunteeringData = useSelector(
  //   (state: RootState) => state.volunteering.volunteering
  // );
  // const dispatch = useDispatch();
  // const filteredVolunteering = useSelector( (state:any) => state.volunteering.filteredVolunteering)

  // useEffect(() => {
  //   const mockData = [
  //     { id: 1, refugee_name: "Refugio Esperanza" },
  //     { id: 2, refugee_name: "Casa Gatuna" },
  //     { id: 3, refugee_name: "Huellitas Felices" },
  //   ];
  //   dispatch(getVolunteering(mockData));
  // }, [dispatch]);

//   const handleRefugeeSelection = (refugeeId: string) => {
//     dispatch(getVolunteeringByRefugee(Number(refugeeId)));
// }; NO LO USO EN ESTA VISTA PERO POSIBLE EN LA DE CARD

  // const data = await getVolunteeringData();
  // const selectedRefugee =
  //   volunteeringData?.[0]?.refugee_name || "Ningún refugio seleccionado";

  return (
    <div className="bg-[#F3F4F6]">
      <header className="text-[#374151] p-5">
        <h2 className="text-2xl font-bold font-roboto text-center">
          Formulario de Inscripción para {}
        </h2>
      </header>
      <form className="max-w-md md:max-w-2xl lg:max-w-3xl p-8 flex flex-col justify-center">
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
            />

            <Input
              placeholder="Horarios disponibles"
              name="availableHours"
              required={true}
            />

            <Input placeholder="Frecuencia" name="frecuency" required={true} />
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
            className="text-2xl font-bold font-roboto text-[#374151]"
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
          <div>
            <Legend
              text="Elige un voluntariado"
              className="text-2xl font-bold font-roboto text-[#374151]"
            />
            <input type="radio" name="accept-option" id="accept-option" />{" "}
            <label htmlFor="accept-option">Aceptar</label>{" "}
            <input type="radio" name="deny-option" id="team" />{" "}
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
            className="text-2xl font-bold text-[#374151] font-roboto"
          />
          <div>
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
          </div>
        </fieldset>
        <fieldset className="space-y-2 mt-10">
          <div>
            <Legend
              text="Consentimiento para tratamiento de datos personales"
              className="text-2xl font-bold font-roboto text-[#374151]"
            />
            <input type="radio" name="accept-option" id="accept-option" />{" "}
            <label htmlFor="accept-option">Aceptar</label>{" "}
            <input type="radio" name="deny-option" id="team" />{" "}
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
          <Input name="adicionalInfo" required={true} />
        </fieldset>
        <button
          type="submit"
          className="bg-primaryLight w-full py-3 mt-4 rounded text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
