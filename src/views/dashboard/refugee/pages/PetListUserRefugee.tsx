import PetCard from "@/components/PetCard";
import { fetchAllAnimals } from "@/redux/actions/animalActions";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FilterAdoption from "@/components/FilterAdoption";
import { IRefuge } from "@/interfaces/IRefugee";

const PetListByRefugee: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { allAnimals, loading } = useSelector(
    (state: RootState) => state.animal
  );

  useEffect(() => {
    if (user?.refugee) {
      dispatch(fetchAllAnimals());
    }
  }, [dispatch, user?.refugee]);

  // Comprobamos que user sea de tipo IREFUGE
  const userRefugee = user?.refugee as IRefuge | undefined;
  // Comprobamos que userRefugee esté definido y accedemos a pets
  const userPets = userRefugee?.pets || [];


  const userRefugeePets = allAnimals.filter((animal) =>
    userPets.includes(animal._id)
  );

  // Filtrar los animales cuando escribamos en el filtro 
  const filteredByNameOrBreed = userRefugeePets.filter(
    (pet) =>
      pet.name!.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed!.toLowerCase().includes(filter.toLowerCase())
  );

  // Filtrar los animales según la especie seleccionada en el filtro
  const filteredPets = filteredByNameOrBreed.filter(
    (pet) =>
      speciesFilter
        ? pet.species.toLowerCase().includes(speciesFilter.toLowerCase())
        : true
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Busca el animal"
          className="w-full md:w-1/3 p-1 border border-gray-300 rounded-3xl"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

      </div>
      <FilterAdoption onFilterChange={setSpeciesFilter} />

      {loading ? (
        <p>Loading pets...</p>
      ) : (
        <div>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard
                _id={pet._id}
                key={pet._id}
                photos={pet.photos}
                name={pet.name!}
                breed={pet.breed!}
              />
            ))
          ) : (
            <p>No pets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PetListByRefugee;