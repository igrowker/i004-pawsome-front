// components/Filter.tsx
import React from 'react';
import { FaFilter } from 'react-icons/fa';

const FilterAdoption: React.FC = () => (
  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
    <input
      type="text"
      placeholder="Filtro por especie"
      className="bg-transparent flex-grow focus:outline-none text-gray-600"
    />
    <FaFilter className="text-gray-500 ml-2" />
  </div>
);

export default FilterAdoption;
