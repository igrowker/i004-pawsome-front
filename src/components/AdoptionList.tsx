import React, { useEffect, useState } from 'react';
import AdoptionCard from './AdoptionCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableAnimals } from '@/redux/actions/animalActions';
import { RootState } from '@/redux/rootReducer';
import { AppDispatch } from '@/redux/store';
import { IAnimal } from '@/interfaces/IAnimal';
import FilterAdoption from './FilterAdoption';
import { Spinner } from './ui/spinner';
import Pagination from './ui/pagination';

const AdoptionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { availableAnimals, loading } = useSelector((state: RootState) => state.animal);

  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Estado para la paginación
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAvailableAnimals());
  }, [dispatch]);

  // Filtrar los animales según la especie seleccionada en el filtro
  // Nos aseguramos de que availableAnimals es un array para que funcione
  const filteredAnimals = (Array.isArray(availableAnimals) ? availableAnimals : []).filter((animal: IAnimal) =>
    filter ? animal.species.toLowerCase().includes(filter.toLowerCase()) : true
  );

  // Paginación de los animales filtrados
  const currentAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Spinner />;
  }
  if (!availableAnimals || availableAnimals.length === 0) {
    return <div>No hay animales disponibles para adopción en este momento.</div>;
  }

  return (
    <div >
      <h3>Selecciona una especie:</h3>
      <FilterAdoption onFilterChange={setFilter} />
      {/* Lista de animales filtrados oor especies */}
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
