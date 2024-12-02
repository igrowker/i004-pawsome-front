import { useEffect } from "react";
import PetCard from "@/components/PetCard";
import { useParams } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import RefugeDescription from "@/components/RefugeeDescription";
import { IAnimal } from "@/interfaces/IAnimal";
import axios from "axios";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "@/redux/actions/userActions";


const URL = import.meta.env.VITE_API_URL

export default function RefugeProfile() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch(); // Usa el tipo AppDispatch

  // agrego un estado para ver que botón pintar
  const [filter, setFilter] = useState("")
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([])

  const { data: user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id)); // Despacha la acción para obtener el animal
    }
  }, [id, dispatch]);
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
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No se encontró el refugio</div>;
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
              <h2 className="font-roboto text-2xl">{user.refugee.name_refugee}</h2>
              <img src="/refugee-profile-paw.png" alt="Imagen de patitar" />
            </div>
            <RefugeDescription />
            <Link to={"/volunteerform"}><span className="inline-block text-lg font-roboto mt-[15px] mb-[13px] bg-primaryLight p-3 rounded text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all">Ser Voluntario</span></Link>

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
