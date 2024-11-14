import React, { useState } from "react";
import PetCard from "../../../../components/PetCard";
import { FaFilter } from "react-icons/fa6";

interface Pet {
  id: number;
  imageUrl: string;
  name: string;
  breed: string;
}

const PetList: React.FC = () => {
  const [filter, setFilter] = useState("");

  const pets: Pet[] = [
    {
      id: 1,
      imageUrl: "/",
      name: "Buddy",
      breed: "Golden Retriever",
    },
    {
      id: 2,
      imageUrl: "/",
      name: "Whiskersssssss",
      breed: "Tabby Cat",
    },
    {
      id: 3,
      imageUrl: "/",
      name: "Polly",
      breed: "Parrot",
    },
  ];

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(filter.toLowerCase()) ||
      pet.breed.toLowerCase().includes(filter.toLowerCase())
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
            key={pet.id}
            imageUrl={pet.imageUrl}
            name={pet.name}
            breed={pet.breed}
          />
        ))}
      </div>
    </div>
  );
};

export default PetList;
