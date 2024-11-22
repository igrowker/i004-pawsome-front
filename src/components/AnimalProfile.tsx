import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDog, FaPaw } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";
import apiClient from "../apiClient";

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
    <div className="animal-profile p-4 max-w-md mx-auto my-auto bg-white rounded-xl mt-20">
      <div className="w-full h-full overflow-hidden">
  {animal.photos && animal.photos.length > 2 ? ( //cambiar el 2 por un 0 cuando esté implementado cloudinary
    <img
      src={animal.photos[0]}
      alt={`Foto de ${animal.name}`}
      className="object-cover w-full h-full"
    />
  ) : (
    <img
      src={defaultImage}
      alt="Imagen por defecto"
      className="object-cover w-full h-full"
    />
  )}
</div>
      <div className="ficha p-4 max-w-md mx-auto bg-white rounded-xl shadow-xl mt-4 space-y-2">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{animal.name}</h1>
            <p className="bg-secondaryLight rounded text-xs p-1 px-4">
              {animal.species}
            </p>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="flex items-center">
              <FaPaw className="text-secondaryDark text-sm mr-1" />
              {animal.sex}
            </p>
            <p className="flex items-center">
              <FaCakeCandles className="text-secondaryDark text-sm mr-1" />
              {animal.age} años
            </p>
            <p className="flex items-center">
              <FaDog className="text-secondaryDark text-sm mr-1" />
              {animal.breed}
            </p>
          </div>
        </div>
        <section className="history mt-2">
          <p className="text-gray-700 text-sm">{animal.description}</p>
        </section>
        <div className="availability flex justify-between items-center mt-4 bg-secondaryLight rounded-2xl px-4 py-3 text-sm">
          <p>
            <strong>Estado de adopción:</strong>
          </p>
          <p>
            <strong>{animal.adoption_status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfile;
