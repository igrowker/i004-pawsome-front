// hooks/useAdoptionList.ts
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableAnimals } from '@/redux/actions/animalActions';
import { RootState } from '@/redux/rootReducer';
import { AppDispatch } from '@/redux/store';
import { IAnimal } from '@/interfaces/IAnimal';

export const useAdoptionList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { availableAnimals, loading } = useSelector((state: RootState) => state.animal);
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAvailableAnimals());
  }, [dispatch]);

  // Filtrar los animales según la especie seleccionada en el filtro
  const filteredAnimals = (Array.isArray(availableAnimals) ? availableAnimals : []).filter((animal: IAnimal) =>
    filter ? animal.species.toLowerCase().includes(filter.toLowerCase()) : true
  );

  // Obtener los animales paginados
  const currentAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    loading,
    availableAnimals,
    filteredAnimals,
    currentAnimals,
    filter,
    setFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage
  };
};
