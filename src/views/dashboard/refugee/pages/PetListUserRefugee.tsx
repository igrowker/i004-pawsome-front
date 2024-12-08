import { fetchAllAnimalsByRefugee } from "@/redux/actions/animalActions";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import FilterAdoption from "@/components/FilterAdoption";
import { IAnimal } from "@/interfaces/IAnimal";
import { IRefuge } from "@/interfaces/IRefugee";
import PetCard from "@/components/PetCard";

const PetListUserRefugee: React.FC = () => {
  console.log("PetListUserRefugee renderizado");

  const [filter, setFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const { animalsByRefugee, loading } = useSelector(
    (state: RootState) => state.animal
  );
  // Comprobación de que userRefugee esta tipado como IRefuge
  const userRefugee = user?.refugee as IRefuge | undefined;

  useEffect(() => {
    if (userRefugee) {
      dispatch(fetchAllAnimalsByRefugee(userRefugee._id));
    } else {
      console.log("userRefugee no está definido", userRefugee);
    }
  }, [dispatch, userRefugee]);

  // Verifica si se están obteniendo los animales correctamente
  useEffect(() => {
    console.log(animalsByRefugee);  // Verifica el contenido de animalsByRefugee
  }, [animalsByRefugee]);

  const userPets: IAnimal[] = animalsByRefugee || [];

  useEffect(() => {
    console.log(userPets);  // Verifica los animales que tienes en userPets
  }, [userPets]);

  // Comprobación de si User refugee existe? Tiene la propiedad pets??

  const filteredByNameOrBreed = userPets.filter(
    (pet: IAnimal) =>
      pet.name!.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed!.toLowerCase().includes(filter.toLowerCase())
  );

  // Filtrar los animales según la especie seleccionada en el filtro
  const filteredPets = filteredByNameOrBreed.filter(
    (pet: IAnimal) =>
      speciesFilter
        ? pet.species.toLowerCase().includes(speciesFilter.toLowerCase())
        : true
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search animals"
          className="w-full md:w-1/3 p-1 border border-gray-300 rounded-3xl"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <FaFilter
          className="bg-primaryLight p-2 rounded-full ml-3"
          style={{ fontSize: "2.1rem", color: "white" }}
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
                key={pet._id}
                _id={pet._id}
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

export default PetListUserRefugee;