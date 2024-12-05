// components/AdoptionList.tsx
import React from 'react';
import AdoptionCard from './AdoptionCard';
import { IAnimal } from '@/interfaces/IAnimal';
import FilterAdoption from './FilterAdoption';
import { Spinner } from './ui/spinner';
import Pagination from './ui/pagination';
import { useAdoptionList } from '@/hooks/useAdoptionList';

const AdoptionList: React.FC = () => {
  const {
    loading,
    availableAnimals,
    filteredAnimals,
    currentAnimals,
    setFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = useAdoptionList(); // Usamos el hook personalizado

  if (loading) {
    return <Spinner />;
  }

  if (!availableAnimals || availableAnimals.length === 0) {
    return <div>No hay animales disponibles para adopción en este momento.</div>;
  }

  return (
    <div>
      <FilterAdoption onFilterChange={setFilter} />

      {/* Lista de animales filtrados por especies */}
      <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentAnimals.length > 0 ? (
          currentAnimals.map((animal: IAnimal) => (
            <AdoptionCard
              key={animal._id}
              id={animal._id}
              name={animal.name}
              breed={animal.breed || 'Desconocido'}
              age={`${animal.age} años`}
              imageUrl={animal.photos[0]} // Usa la primera foto del animal
              tag={animal.adoption_status}
            />
          ))
        ) : (
          <div>No hay animales disponibles para la especie seleccionada.</div>
        )}
      </div>

      {/* Componente de paginación */}
      <Pagination
        totalItems={filteredAnimals.length} // Paginamos sobre los animales filtrados
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AdoptionList;
