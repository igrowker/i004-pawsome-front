import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaDog, FaArrowLeft, FaBriefcaseMedical } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/rootReducer";
import { fetchAnimal } from "@/redux/actions/animalActions";

const AnimalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch(); // Usa el tipo AppDispatch

  // Obtener el estado desde Redux
  const { data: animal, loading, error } = useSelector(
    (state: RootState) => state.animal
  );

  const defaultImage = "/animalprofile.png";

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimal(id)); // Despacha la acción para obtener el animal
    }
  }, [id, dispatch]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!animal) return <div>No se encontró el animal</div>;

  return (
    <div className="animal-profile p-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-lg sm:p-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:mb-40 lg:mt-10">
      {/* Imagen */}
      <img
      src={animal.photos && animal.photos.length > 0 ? animal.photos[0] : defaultImage}
      alt={`Foto de ${animal.name}`}
      className="rounded-2xl object-cover lg:w-full lg:h-auto"
      onError={(e) => (e.currentTarget.src = defaultImage)} // Cambiar a la imagen por defecto si hay un error
      />


      {/* Información */}
      <div className="ficha p-4 bg-white rounded-xl shadow-md lg:p-6">
        {/* Título */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left sm:text-3xl">
            {animal.name}
          </h1>
          <p className="bg-secondaryLight text-gray-800 rounded-full text-xs font-medium px-4 py-1 mt-2 sm:mt-0">
            {animal.species}
          </p>
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
          {/* <p className="flex items-center text-gray-600">
            <FaPaw className="text-secondaryDark text-lg mr-2" />
            <span className="font-medium">{animal.sex}</span>
          </p> */}
          <p className="flex items-center text-gray-600">
            <FaCakeCandles className="text-secondaryDark text-lg mr-2" />
            <span className="font-medium">{animal.age} años</span>
          </p>
          <p className="flex items-center text-gray-600">
            <FaDog className="text-secondaryDark text-lg mr-2" />
            <span className="font-medium">{animal.breed}</span>
          </p>
        </div>

        {/* Descripción */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:text-xl">Historia</h2>
          <p className="text-gray-700 text-justify text-sm sm:text-base">
            {animal.description}
          </p>
        </section>

        {/* Estado de salud y historial médico */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:text-xl">
            Historial Médico
          </h2>

          {/* Estado de salud */}
          <div className="flex items-center bg-red-50 p-4 rounded-lg shadow-md mb-4">
            <FaBriefcaseMedical className="text-red-600 text-3xl mr-4" />
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              {animal.health_status}
            </p>
          </div>

          {/* Condiciones */}
          {animal.medicalHistory?.conditions && animal.medicalHistory.conditions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Condiciones de Salud:
              </h3>
              <div className="space-y-1">
                {animal.medicalHistory.conditions.map((condition, index) => (
                  <div key={index} className="text-gray-700 text-sm sm:text-base">
                    {condition}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vacunas */}
          {animal.medicalHistory?.vaccinations && animal.medicalHistory.vaccinations.length > 0 && (
            <div>
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Vacunas:
              </h3>
              <div className="space-y-1">
                {animal.medicalHistory.vaccinations.map((vaccination, index) => (
                  <div key={index} className="text-gray-700 text-sm sm:text-base">
                    <span className="font-medium">{vaccination.name}</span> -{" "}
                    <span className="text-gray-600">
                      {new Date(vaccination.date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>


        {/* Disponibilidad */}
        <div className="availability flex items-center justify-between mt-4 bg-secondaryLight rounded-xl px-6 py-4 shadow-md">
          <p className="text-gray-800 font-semibold text-sm sm:text-base">
            Estado de adopción:
          </p>
          <p
            className={`font-semibold text-sm sm:text-base px-4 py-2 rounded-full shadow-md ${animal.adoption_status === "adoptado"
              ? "bg-white text-teal-500 border-2 border-teal-500"
              : animal.adoption_status === "disponible"
                ? "bg-teal-500 text-white border-none"
                : "bg-yellow-400 text-white border-none"
              }`}
          >
            {animal.adoption_status}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row mt-8 justify-between items-center gap-4">
          {/* Botón formulario */}
          <button className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-md border-2 border-teal-500 text-lg tracking-widest cursor-pointer hover:bg-white hover:text-teal-500 hover:border-teal-500 hover:shadow-lg active:bg-[#87dbd0] transition duration-400 w-full sm:w-auto">
            <Link to={`/adopt/${id}`} className="flex items-center justify-center">
              <span>Rellena el formulario</span>
            </Link>
          </button>
          {/* Botón para volver */}
          <button
            onClick={() => navigate("/home")}
            className="bg-white text-center w-full sm:w-48 rounded-2xl h-14 relative text-black text-lg font-semibold group flex items-center justify-center overflow-hidden border-2 border-dark shadow-md hover:bg-dark hover:text-white hover:shadow-lg transition duration-300"
          >
            <div
              className="bg-dark rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 group-hover:w-full z-10 duration-500"
            >
              <FaArrowLeft className="text-white z-20" />
            </div>
            <span className="z-0 group-hover:text-transparent">Volver</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile;
