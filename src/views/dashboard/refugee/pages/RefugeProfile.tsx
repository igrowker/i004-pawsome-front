import axios from "axios";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../../../interfaces/IAnimal";
import PetCard from "../../../../components/PetCard";

const URL = import.meta.env.VITE_API_URL

export default function RefugeProfile() {
  // agrego un estado para ver que botón pintar
  const [filter, setFilter] = useState("")
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([])

  const setAnimalFilter = (event: MouseEvent<HTMLButtonElement>) => {
    // el .currentTarget me da el botón actual que dio click
    setFilter(event.currentTarget.textContent || "")
  }

  const getAnimalsBySpecie = async (filterValue: string) => {
    const { data } = await axios<IAnimal[]>(`${URL}/animals`)

    if (data) {
      const fetchAnimalsBySpecie = data.filter(animal => animal.species.toLowerCase() === filterValue.toLowerCase())
      setFilteredAnimals(fetchAnimalsBySpecie)
    }
  }

  const getStylesButton = (labelButton: string) => filter === labelButton ? "border-b-4 border-secondaryDark text-secondaryDark" : ""

  return (
    <>
      <div className="md:grid">
        <img
          src="/refugee-profile.png"
          alt="Imagen de perfil del refugio"
          className="w-full lg:hidden"
        />
        <div className="sm:w-[600px] lg:w-[900px] m-auto">
          <div className="mx-5 mt-[15px]">
            <div className="flex justify-between">
              <h2 className="font-roboto text-2xl">Refugio Patitas</h2>
              <img src="/refugee-profile-paw.png" alt="Imagen de patitar" />
            </div>
            <Link to={"/volunteerform"}><h3 className="text-lg font-roboto mt-[15px] mb-[13px]">Ser Voluntario</h3></Link>
            <h4 className="text-lg font-roboto mb-[42px]">Perfil</h4>
            <h5 className="text-lg font-roboto">Filtros</h5>
            <div className="flex justify-around mt-2">
              {
                ["Perro", "Gato", "Otro"].map(item => (
                  <button
                    key={item}
                    onClick={event => {
                      setAnimalFilter(event)
                      getAnimalsBySpecie(item)
                    }}
                    className={getStylesButton(item)}
                  >{item}</button>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar animales filtrados */}
      <div className="mt-5">
        {filteredAnimals.length === 0 ? (
          <p className="text-gray-500 text-center">No hay animales para mostrar.</p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
              filteredAnimals.map(animal => (
                <PetCard
                  key={animal._id}
                  name={animal.name}
                  photos={animal.photos}
                />
              ))
            }
          </div>
        )}
      </div>
    </>
  );
}
