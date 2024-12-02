import React, { useEffect } from "react";
import AdoptionCard from "./AdoptionCard";
import { Spinner } from "./ui/spinner";
import { fetchAllAnimals } from "@/redux/actions/animalActions";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { RootState } from "@/redux/store";
import { IAnimal } from "@/interfaces/IAnimal";

interface AdoptionListProps {
  animals: IAnimal[];
}
const AdoptionList: React.FC<AdoptionListProps> = ({ animals }) => {
  const dispatch = useAppDispatch();

  const {
    allAnimals: adoptions,
    loading,
    error,
  } = useSelector((state: RootState) => state.animal);

  useEffect(() => {
    dispatch(fetchAllAnimals());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (adoptions.length === 0) {
    return <p>No hay mascotas disponibles para adopción.</p>;
  }

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {animals.map((adoption) => (
        <AdoptionCard
          key={adoption._id}
          id={adoption._id}
          name={adoption.name}
          breed={adoption.breed || "Desconocido"}
          age={`${adoption.age} años`}
          imageUrl={adoption.photos[0]} // Usa la primera foto
          tag={adoption.adoption_status}
        />
      ))}
    </div>
  );
};

export default AdoptionList;
