// components/Filter.tsx
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

interface FilterAdoptionProps {
  onFilterChange: (species: string) => void;
}

const FilterAdoption: React.FC<FilterAdoptionProps> = ({ onFilterChange }) => {

  const [filter, setFilter] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);  // Llamar al callback cuando cambia el valor
  };


  return (
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
      <input
        type="text"
        placeholder="Filtro por especie"
        value={filter}
        onChange={handleInputChange}
        className="bg-transparent flex-grow focus:outline-none text-gray-600"
      />
      <FaFilter className="text-gray-500 ml-2" />
    </div>
  );
};

export default FilterAdoption;
