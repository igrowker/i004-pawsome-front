import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaDog, FaPaw } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import apiClient from "../apiClient";
import { Link } from 'react-router-dom';

interface Animal {
  name: string;
  species: string;
  sex: string;
  age: number;
  breed: string;
  description: string;
  health_status: string;
  photos: string[];
  adoption_status: string;
}

const AnimalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Crea una instancia de useNavigate
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultImage = "/animalprofile.png";

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await apiClient.get(`/animals/${id}`);
        console.log("Datos del animal recibidos:", response.data);
        setAnimal(response.data);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          (err as any)?.response?.data?.message || "Ocurrió un error inesperado";
        setError(errorMessage);
        setLoading(false);
      }
    };
    if (id) fetchAnimal();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!animal) return <div>No se encontró el animal</div>;

  return (
    <div className="animal-profile p-4 max-w-lg mx-auto my-auto bg-white rounded-3xl shadow-lg sm:p-6">
  {/* Imagen */}
  <div className="w-full overflow-hidden rounded-2xl">
    {animal.photos && animal.photos.length > 2 ? (
      <img
        src={animal.photos[0]}
        alt={`Foto de ${animal.name}`}
        className="w-full h-auto object-contain"
      />
    ) : (
      <img
        src={defaultImage}
        alt="Imagen por defecto"
        className="w-full h-auto object-contain"
      />
    )}
  </div>

  {/* Información principal */}
  <div className="ficha p-4 bg-white rounded-xl shadow-md mt-6 sm:p-6">
    <div className="flex justify-between sm:items-center">
      <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left sm:text-3xl">
        {animal.name}
      </h1>
      <p className="bg-secondaryLight text-gray-800 rounded-full text-xs font-medium px-4 py-1 mt-2 sm:mt-0">
        {animal.species}
      </p>
    </div>

    <div className="flex flex-wrap justify-center sm:justify-between items-center text-sm mt-4 gap-2">
      <p className="flex items-center text-gray-600">
        <FaPaw className="text-secondaryDark text-lg mr-2" />
        <span className="font-medium">{animal.sex}</span>
      </p>
      <p className="flex items-center text-gray-600">
        <FaCakeCandles className="text-secondaryDark text-lg mr-2" />
        <span className="font-medium">{animal.age} años</span>
      </p>
      <p className="flex items-center text-gray-600">
        <FaDog className="text-secondaryDark text-lg mr-2" />
        <span className="font-medium">{animal.breed}</span>
      </p>
    </div>
  </div>

  {/* Descripción */}
  <section className="mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:text-xl">Historia</h2>
    <p className="text-gray-700 text-justify text-sm sm:text-base">{animal.description}</p>
  </section>

  {/* Estado de salud */}
  <section className="flex items-center justify-between mt-6 bg-red-50 p-4 rounded-lg shadow-md">
    <div className="flex items-center">
      <FaBriefcaseMedical className="text-red-600 text-3xl mr-4" />
      <p className="text-gray-800 font-medium text-sm sm:text-base">
        {animal.health_status}
      </p>
    </div>
  </section>

  {/* Disponibilidad */}
<div className="availability flex items-center justify-between mt-6 bg-secondaryLight rounded-xl px-6 py-4 shadow-md">
  <p className="text-gray-800 font-semibold text-sm sm:text-base">
    Estado de adopción:
  </p>
  <p
    className={`font-semibold text-sm sm:text-base px-4 py-2 rounded-full shadow-md ${
      animal.adoption_status === "adoptado"
        ? "bg-white text-primaryLight border-2 border-primaryLight"
        : animal.adoption_status === "disponible"
        ? "bg-primaryLight text-white border-none"
        : "bg-yellow-400 text-white border-none" // Estilo para "en proceso"
    }`}
  >
    {animal.adoption_status}
  </p>
</div>

  {/* Botones */}
  <div className="flex flex-col sm:flex-row mt-8 justify-between items-center gap-4">
    {/* Botón formulario */}
    <button className="bg-primaryLight text-white py-3 px-6 rounded-lg shadow-md border-2 border-primaryLight text-lg tracking-widest cursor-pointer hover:bg-white hover:text-primaryLight hover:border-primaryLight hover:shadow-lg active:bg-[#87dbd0] transition duration-400 w-full sm:w-auto">
      <Link to={"/adoptform"} className="flex items-center justify-center">
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

    
  );
};

export default AnimalProfile;
