import React from 'react';

interface AdoptionCardProps {
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  tag: string;
}

const AdoptionCard: React.FC<AdoptionCardProps> = ({ name, breed, age, imageUrl, tag }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
    {/* Tag en la esquina superior derecha */}
    <div className="self-end bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full mt-2 mr-2">
      {tag}
    </div>
    
    {/* Imagen de perfil */}
    <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full object-cover mt-2" />
    
    {/* Nombre, raza y edad */}
    <h3 className="text-lg font-semibold mt-2">{name}</h3>
    <p className="text-gray-600 text-sm text-center">{breed} - {age}</p>
    
    {/* Botón de adopción */}
    <button className="w-full bg-teal-500 text-white font-semibold py-3 mt-4 rounded-b-lg">
      Quiero adoptar
    </button>
  </div>
);

export default AdoptionCard;
