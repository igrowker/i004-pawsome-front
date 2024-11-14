import React from "react";

interface PetCardProps {
  imageUrl: string;
  name: string;
  breed: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const PetCard: React.FC<PetCardProps> = ({ imageUrl, name, breed }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow p-4 mb-4 max-w-sm w-full">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div className="flex flex-col max-w-[8rem] sm:max-w-xs">
          <h2 className="text-md font-semibold">{truncateText(name, 9)}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {truncateText(breed, 15)}
          </p>
        </div>
      </div>
      <button className="bg-primaryLight text-white font-bold py-3 rounded-3xl w-32 text-sm ">
        Update Profile
      </button>
    </div>
  );
};

export default PetCard;
