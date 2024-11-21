import React from 'react';
import { Link } from 'react-router-dom';

interface Shelter {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
  imageUrl: string;
  profileUrl: string;
  tags: string[];
}

const ShelterCard: React.FC<{ shelter: Shelter }> = ({ shelter }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={shelter.profileUrl}
            alt={`${shelter.name} profile`}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <Link to={"/refugee"}><h2 className="font-semibold text-lg">{shelter.name}</h2></Link>
            <div className="flex space-x-2 mt-1">
              {shelter.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{shelter.timeAgo}</p>
      </div>
      <p className="text-sm text-gray-700 mb-2">
        Ayuda para rescate de perro en {shelter.location}, está solo en la calle, no tiene comida...
      </p>
    </div>
    <img
      src={shelter.imageUrl}
      alt={`Animal at ${shelter.name}`}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <button className="w-full bg-teal-500 text-white py-2 rounded-lg font-medium">
        Escribir al refugio
      </button>
    </div>
  </div>
);

export default ShelterCard;
