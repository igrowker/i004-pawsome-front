import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useFilterAdoption from '@/hooks/useFilterAdoption';

interface FilterAdoptionProps {
  onFilterChange: (species: string) => void;
}

// Creamos las posibles especies a escoger
const species = ["Todas", "Perro", "Gato", "Otros"];

const FilterAdoption: React.FC<FilterAdoptionProps> = ({ onFilterChange }) => {
  const {
    selectedSpecies,
    isOpen,
    handleSpeciesChange,
    toggleDropdown
  } = useFilterAdoption(onFilterChange);

  return (
    <div>
      <h3>Selecciona una especie:</h3>
      <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          onClick={toggleDropdown}
          className="bg-teal-500 text-white w-full py-2 px-4 rounded-lg flex justify-between items-center"
        >
          {selectedSpecies}
          <FaChevronDown className="ml-2" />
        </button>

        {/* Opciones del dropdown */}
        {isOpen && (
          <div
            id="dropdown"
            className="absolute left-0 w-full top-full mt-1 z-20"
          >
            <ul className="w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
              {species.map((speciesOption) => (
                <li
                  key={speciesOption}
                  onClick={() => handleSpeciesChange(speciesOption)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {speciesOption}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterAdoption;