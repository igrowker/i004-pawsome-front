import PetCard from "@/components/PetCard";
import { fetchAllAnimals } from "@/redux/actions/animalActions";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PetList: React.FC = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { allAnimals, loading } = useSelector(
    (state: RootState) => state.animal
  );

  useEffect(() => {
    if (user?.refugee) {
      dispatch(fetchAllAnimals());
    }
  }, [dispatch, user?.refugee, user?.refugee.pets]);

  const userPetIds = user?.refugee?.pets || [];

  const userPets = allAnimals.filter((animal) =>
    userPetIds.includes(animal._id)
  );

  const filteredPets = userPets.filter(
    (pet) =>
      pet.name!.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed!.toLowerCase().includes(filter.toLowerCase())
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

      {loading ? (
        <p>Loading pets...</p>
      ) : (
        <div>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard
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

export default PetList;
