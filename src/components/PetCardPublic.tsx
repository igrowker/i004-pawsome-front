import React from "react";
import { IAnimal } from "@/interfaces/IAnimal";
import { useNavigate } from "react-router-dom";

// Función para truncar texto si es muy largo
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Le pasamos a Pet Card que el id sea obligatorio pasarselo ya que Partial IAnimal coge solo algunos valores pero el ID SIEMPRE 
const PetCardPublic: React.FC<{ _id: string } & Partial<IAnimal>> = ({
  _id,
  name = "N/A",
  breed = "N/A",
  photos = [],
}) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (_id) {
      navigate(`/animalprofile/${_id}`);
    } else {
      console.error("ID del animal no disponible");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow p-4 mb-4 max-w-sm w-full">
      <div className="flex items-center">
        <img
          src={photos[0] || "/default-image.png"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4 bg-gray-400"
        />

        <div className="flex flex-col max-w-[8rem] sm:max-w-xs ml-3">
          <h2 className="text-md font-semibold">{truncateText(name, 9)}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {truncateText(breed!, 15)}
          </p>
        </div>
      </div>
      <button
        className="bg-primaryLight text-white font-bold py-3 rounded-3xl w-32 text-sm "
        onClick={handleNavigate}
      >
        Conóceme
      </button>
    </div>
  );
};

export default PetCardPublic;
