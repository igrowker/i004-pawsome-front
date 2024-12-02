import React, { useEffect } from 'react';
import AdoptionCard from './AdoptionCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableAnimals } from '@/redux/actions/animalActions';
import { RootState } from '@/redux/rootReducer';
import { AppDispatch } from '@/redux/store';
import { IAnimal } from '@/interfaces/IAnimal';

const AdoptionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { availableAnimals, loading } = useSelector((state: RootState) => state.animal);

  useEffect(() => {
    dispatch(fetchAvailableAnimals());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando animales disponibles para su adopción...</div>;
  }
  if (!availableAnimals || availableAnimals.length === 0) {
    return <div>No hay animales disponibles para adopción en este momento.</div>;
  }


  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {availableAnimals.map((animal: IAnimal) => (
        <AdoptionCard
          key={animal._id}
          id={animal._id}
          name={animal.name}
          breed={animal.breed || 'Desconocido'}
          age={`${animal.age} años`}
          imageUrl={animal.photos[0]} // Usa la primera foto
          tag={animal.adoption_status}
        />
      ))}
    </div>
  );
};

export default AdoptionList;
