import PetCard from "@/components/PetCard";
import { animals } from "@/data/Animals";
import { IAnimal } from "@/interfaces/IAnimal";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";

const PetList: React.FC = () => {
  const [filter, setFilter] = useState("");

  const pets: Partial<IAnimal>[] = animals;

  const filteredPets = pets.filter(
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

      <div>
        {filteredPets.map((pet) => (
          <PetCard
            key={pet._id}
            photos={pet.photos}
            name={pet.name!}
            breed={pet.breed!}
          />
        ))}
      </div>
    </div>
  );
};

export default PetList;
