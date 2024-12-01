import { IRefuge } from "@/interfaces/IRefugee";
import React from "react";

const ShelterCard: React.FC<{ shelter: IRefuge }> = ({ shelter }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={shelter.img}
              alt={`${shelter.name_refugee} profile`}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h2 className="font-semibold text-lg">{shelter.name_refugee}</h2>
              {/* <div className="flex space-x-2 mt-1">
                {shelter.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
          {/* <p className="text-sm text-gray-500">{shelter.timeAgo}</p> */}
        </div>
        <p className="text-sm text-gray-700 mb-2">
          Ayuda para rescate de perro en {shelter.location}, está solo en la
          calle, no tiene comida...
        </p>
      </div>
      <img
        src={shelter.img}
        alt={`Animal at ${shelter.name_refugee}`}
        className="w-full h-64 object-cover"
      />
    </div>
  );
};

export default ShelterCard;
