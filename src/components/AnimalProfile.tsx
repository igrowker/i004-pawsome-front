import React from 'react';
import { FaDog } from "react-icons/fa"; 
import { FaPaw } from 'react-icons/fa';
import { FaCakeCandles } from 'react-icons/fa6';

// Interfaces para los datos del perfil de animal
interface AnimalProfileProps {
  name: string;
  pet: string;
  sex: string;
  age: number;
  size: string;
  photo: string;
  history: string;
  characteristics: string[];
  availability: string;
}

const AnimalProfile: React.FC = () => {
  // Datos simulados para el diseño provisional
  const animalData: AnimalProfileProps = {
    name: "Buddy",
    pet: "PERRO",
    sex: "Macho",
    age: 2,
    size: "Grande",
    photo: "/animal-profile.png",
    history: "Buddy is a friendly and energetic Golden retriever. He loves playing fetch and is great with kids. He's looking for a loving home where he can be part of the family.",
    characteristics: ["Bueno con niños y gatos"],
    availability: "Disponible"
  };

  return (
    <div className="animal-profile p-4 max-w-md mx-auto bg-white rounded-xl">
      {/* Foto */}
      <div className="w-full h-full overflow-hidden ">
        <img src={animalData.photo} alt={`Foto de ${animalData.name}`} className="object-cover w-full h-full" />
      </div>

      <div className="ficha p-4 max-w-md mx-auto bg-white rounded-xl shadow-xl mt-4 space-y-2">
        {/* Información Básica */}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{animalData.name}</h1>
            <p className="bg-secondaryLight rounded text-xs p-1 px-4">{animalData.pet}</p>
          </div>
          
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="flex items-center"><FaPaw className='text-secondaryDark text-sm mr-1'/>{animalData.sex}</p>
            <p className="flex items-center"><FaCakeCandles className='text-secondaryDark text-sm mr-1'/>{animalData.age} años</p>
            <p className="flex items-center"><FaDog className='text-secondaryDark text-sm mr-1'/>{animalData.size}</p>
          </div>
        </div>

        {/* Características */}
        <section className="characteristics">
          <p className="text-gray-700 text-sm">
            <strong>Características:</strong> {animalData.characteristics.join(", ")}
          </p>
        </section>

        {/* Historia */}
        <section className="history mt-2">
          <p className="text-gray-700 text-sm">{animalData.history}</p>
        </section>
      </div>

      {/* Disponibilidad */}  
      <div className="availability flex justify-between items-center mt-4 bg-secondaryLight rounded-2xl px-4 py-3 text-sm">
        <p><strong>Estado de adopción:</strong></p>
        <p><strong>{animalData.availability}</strong></p>
      </div>

      {/* Botón formulario */}  
      <div className="flex justify-center mt-3">
        <button className="button-form inline-flex text-center bg-primaryLight text-white rounded-2xl py-3 px-4 text-sm">
          <p>Rellena el formulario</p>
        </button>
      </div>
    </div>
  );
};

export default AnimalProfile;