import { useEffect, MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import RefugeDescription from "@/components/RefugeeDescription";
import { IAnimal } from "@/interfaces/IAnimal";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchRefugeeById } from "@/redux/actions/refugeeActions";
import BackButton from "@/components/VolverButton";
import { FaArrowLeft } from "react-icons/fa";
import PetCardPublic from "@/components/PetCardPublic";

export default function RefugeProfile() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data_refugee } = useSelector((state: RootState) => state.refugee);
  const [filter, setFilter] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([]);

  // Cargar los datos del refugio al montar el componente
  useEffect(() => {
    if (id) {
      dispatch(fetchRefugeeById(id));
    }
  }, [id, dispatch]);

  // Establecer los animales filtrados cuando cambia data_refugee
  useEffect(() => {
    if (data_refugee?.pets) {
      setFilteredAnimals(data_refugee.pets);
    }
  }, [data_refugee]);

  // Función para filtrar animales por especie
  const setAnimalFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const selectedFilter = event.currentTarget.textContent || "";
    setFilter(selectedFilter);
    getAnimalsBySpecie(selectedFilter);
  };

  const getAnimalsBySpecie = (filterValue: string) => {
    if (data_refugee?.pets) {
      const filtered = data_refugee.pets.filter(
        pet => pet.species.toLowerCase() === filterValue.toLowerCase()
      );
      setFilteredAnimals(filtered);
    }
  };

  // Función para aplicar estilos a los botones del filtro
  const getStylesButton = (labelButton: string) =>
    filter === labelButton ? "border-b-4 border-secondaryDark text-secondaryDark" : "";

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
              <h2 className="font-roboto text-2xl self-center">{data_refugee?.name_refugee}</h2>
              <img className="mb-2" src="/refugee-profile-paw.png" alt="Imagen de patitar" />
            </div>
            <RefugeDescription RefugeeDescription={data_refugee?.description} />
            <div className="flex gap-1 justify-around">
              <Link to="/volunteerform">
                <span className="text-sm inline-block rounded font-roboto mt-[15px] mb-[13px] p-3 rounded-full text-black font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all py-3 bg-white">
                  Ser Voluntario
                </span>
              </Link>
              <Link to={`/volunteering/${data_refugee?._id}`}>
                <span className="text-sm inline-block font-roboto mt-[15px] mb-[13px] p-3 rounded-full text-black font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all py-3 bg-white">
                  Donar
                </span>
              </Link>
            </div>

            <div className="flex justify-around mt-2 text-sm">
              {["Perro", "Gato", "Otros"].map(item => (
                <button
                  key={item}
                  onClick={setAnimalFilter}
                  className={getStylesButton(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar animales filtrados */}
      <div className="mt-5 mx-5">
        {filteredAnimals.length === 0 ? (
          <p className="text-gray-500 text-center">No hay animales para mostrar.</p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnimals.map(animal => (
              <PetCardPublic key={animal._id} name={animal.name} photos={animal.photos} breed={animal.breed}/>
            ))}
          </div>
        )}
        <BackButton className="m-5 p-5 justify-self-center" icon={<FaArrowLeft />} to="/home" />
      </div>
    </>
  );
}
