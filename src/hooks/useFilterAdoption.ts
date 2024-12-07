import { useState } from 'react';

const useFilterAdoption = (onFilterChange: (species: string) => void) => {
    const [selectedSpecies, setSelectedSpecies] = useState<string>("Todas");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Se actualiza la especie seleccionada y se llama a onFilterChange
    const handleSpeciesChange = (species: string) => {
        setSelectedSpecies(species);
        onFilterChange(species === "Todas" ? "" : species);
        setIsOpen(false);
    };

    const toggleDropdown = () => setIsOpen(prev => !prev);

    return {
        selectedSpecies,
        isOpen,
        handleSpeciesChange,
        toggleDropdown
    };
};

export default useFilterAdoption;
