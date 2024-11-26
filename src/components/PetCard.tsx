import React, { useState } from "react";
import Modal from "./ui/modal";
import Input from "./ui/input";
import { IAnimal } from "@/interfaces/IAnimal";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const PetCard: React.FC<Partial<IAnimal>> = ({
  name = "N/A",
  breed = "N/A",
  photos = "N/A",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-between bg-white rounded-3xl shadow p-4 mb-4 max-w-sm w-full">
      <div className="flex items-center">
        <img
          src={photos[0]}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4 bg-gray-400"
        />

        <div className="flex flex-col max-w-[8rem] sm:max-w-xs ml-3">
          <h2 className="text-md font-semibold">{truncateText(name, 9)}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {truncateText(breed!, 15)}
          </p>
        </div>
      </div>
      <button
        className="bg-primaryLight text-white font-bold py-3 rounded-3xl w-32 text-sm "
        onClick={openModal}
      >
        Update Profile
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="flex justify-center items-center text-xl font-bold">
          {`Edit data of ${name}`}
        </h2>
        <nav className="flex-grow mt-2 overflow-y-auto text-primaryDark">
          <div className="p-2">
            <Input placeholder="Name" name="name" />
            <Input placeholder="Breed" name="breed" />
            <div className="flex justify-center items-center  text-sm w-full">
              <button
                onClick={closeModal}
                className="flex-1 py-2 bg-primaryDark text-white rounded-md"
              >
                Cerrar
              </button>
              <button className="flex-1 py-2 bg-light border border-primaryDark text-primaryDark rounded-md ml-2">
                Guardar
              </button>
            </div>
          </div>
        </nav>
      </Modal>
    </div>
  );
};

export default PetCard;
