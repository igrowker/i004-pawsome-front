import React from 'react';

interface AdoptionCardProps {
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  tag: string;
}

const AdoptionCard: React.FC<AdoptionCardProps> = ({ name, breed, age, imageUrl, tag }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
    <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full object-cover" />
    <div className="flex-1">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600">{breed} - {age}</p>
    </div>
    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{tag}</span>
    <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg">Quiero adoptar</button>
  </div>
);

export default AdoptionCard;
