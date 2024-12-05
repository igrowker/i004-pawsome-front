import PetCard from "@/components/PetCard";
import RefugeDescription from "@/components/RefugeeDescription";
import { IAnimal } from "@/interfaces/IAnimal";
import axios from "axios";
import { MouseEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchRefugeeById } from "@/redux/actions/refugeeActions";

const URL = import.meta.env.VITE_BACK_URL;

export default function RefugeProfile() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data_refugee } = useSelector((state: RootState) => state.refugee);
  console.log(data_refugee);
  const navigate = useNavigate();
  // agrego un estado para ver que botón pintar
  const [filter, setFilter] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([]);

  const setAnimalFilter = (event: MouseEvent<HTMLButtonElement>) => {
    // el .currentTarget me da el botón actual que dio click
    setFilter(event.currentTarget.textContent || "");
  };

  const getAnimalsBySpecie = async (filterValue: string) => {
    const { data } = await axios<IAnimal[]>(`${URL}/animals`);

    if (data) {
      console.log(data);
      const fetchAnimalsBySpecie = data.filter(
        (animal) => animal.species.toLowerCase() === filterValue.toLowerCase()
      );
      setFilteredAnimals(fetchAnimalsBySpecie);
    }
  };

  const getStylesButton = (labelButton: string) =>
    filter === labelButton
      ? "border-b-4 border-secondaryDark text-secondaryDark"
      : "";

  useEffect(() => {
    dispatch(fetchRefugeeById(id));
  }, [id, dispatch]);

  const handleClick = () => {
    navigate(`/volunteering/${data_refugee._id}`);
  };
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
              <h2 className="font-roboto text-2xl">
                {data_refugee.name_refugee}
              </h2>
              <img src="/refugee-profile-paw.png" alt="Imagen de patitar" />
            </div>
            <RefugeDescription RefugeeDescription={data_refugee.description} />
            <Link to={"/volunteerform"}>
              <span className="inline-block text-lg font-roboto mt-[15px] mb-[13px] bg-primaryLight p-3 rounded text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition-all">
                Ser Voluntario
              </span>
            </Link>
            <div className="relative group">
              <button
                className={`w-full ${
                  data_refugee.opportunities.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600"
                } text-white font-semibold py-2 px-4 rounded-lg transition duration-200`}
                disabled={data_refugee.opportunities.length === 0}
                onClick={() => {
                  if (data_refugee.opportunities.length > 0) {
                    handleClick();
                  }
                }}
              >
                {data_refugee.opportunities.length === 0
                  ? "Sin voluntariados disponibles"
                  : "Ir al voluntariado"}
              </button>

              {data_refugee.opportunities.length === 0 && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  No hay voluntariados
                </span>
              )}
            </div>
            <h5 className="text-lg font-roboto">Filtros</h5>
            <div className="flex justify-around mt-2">
              {["Perro", "Gato", "Otro"].map((item) => (
                <button
                  key={item}
                  onClick={(event) => {
                    setAnimalFilter(event);
                    getAnimalsBySpecie(item);
                  }}
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
      <div className="mt-5">
        {filteredAnimals.length === 0 ? (
          <p className="text-gray-500 text-center">
            No hay animales para mostrar.
          </p>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnimals.map((animal) => (
              <PetCard
                key={animal._id}
                name={animal.name}
                photos={animal.photos}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
