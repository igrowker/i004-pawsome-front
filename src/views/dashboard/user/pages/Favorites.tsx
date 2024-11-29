import React, { useEffect } from "react";
import { FaPaw, FaBirthdayCake, FaDog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "@/redux/actions/favoriteActions";
import { RootState } from "@/redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { FavoriteActionTypes } from "@/redux/actions/favoriteActions";

const Favorites: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, FavoriteActionTypes>>();

  const { favorites, loading, error } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(apiUrl);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);  

  const getImageForPet = (pet: any) => {
    return pet.image ? pet.image : "https://via.placeholder.com/150";
  };

  const categorizedPets = Array.isArray(favorites)
    ? favorites.reduce(
        (acc, pet) => {
          if (pet.species === "dog") acc.dogs.push(pet);
          else if (pet.species === "cat") acc.cats.push(pet);
          else acc.others.push(pet);
          return acc;
        },
        { dogs: [], cats: [], others: [] } as { dogs: any[]; cats: any[]; others: any[] }
      )
    : { dogs: [], cats: [], others: [] };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 mt-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tus Mascotas Favoritas</h1>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="bg-primaryLight text-white px-4 py-2 rounded-md mb-4"
      >
        {isEditing ? "Cancelar Edición" : "Editar Favoritos"}
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : favorites.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(categorizedPets).map(([category, pets]) => (
            pets.length > 0 && (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {category === "dogs" ? "Perros" : category === "cats" ? "Gatos" : "Otros"}
                </h2>
                <div className="animal-profile p-4 max-w-md mx-auto my-auto bg-white rounded-xl mt-20">
                  {pets.map((pet, index) => (
                    <div
                      key={index}
                      className="animal-profile p-4 bg-white rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 w-full"
                    >
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={getImageForPet(pet)} 
                          alt={`Foto de ${pet.name}`}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="ficha p-4 bg-white rounded-xl shadow-xl mt-4 space-y-2">
                        <div>
                          <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">{pet.name}</h1>
                            <p className="bg-secondaryLight rounded text-xs p-1 px-4">{pet.species}</p>
                          </div>

                          <div className="flex justify-between items-center text-sm mt-2">
                            <p className="flex items-center">
                              <FaPaw className="text-secondaryDark text-sm mr-1" />
                              {pet.sex || "Desconocido"}
                            </p>
                            <p className="flex items-center">
                              <FaBirthdayCake className="text-secondaryDark text-sm mr-1" />
                              {pet.age ? `${pet.age} años` : "Edad no especificada"}
                            </p>
                            <p className="flex items-center">
                              <FaDog className="text-secondaryDark text-sm mr-1" />
                              {pet.size || "Tamaño desconocido"}
                            </p>
                          </div>
                        </div>

                        {pet.characteristics && pet.characteristics.length > 0 && (
                          <section className="characteristics">
                            <p className="text-gray-700 text-sm">
                              <strong>Características:</strong> {pet.characteristics.join(", ")}
                            </p>
                          </section>
                        )}

                        {pet.history && (
                          <section className="history mt-2">
                            <p className="text-gray-700 text-sm">{pet.history}</p>
                          </section>
                        )}
                      </div>

                      {pet.availability && (
                        <div className="availability flex justify-between items-center mt-4 bg-secondaryLight rounded-2xl px-4 py-3 text-sm">
                          <p><strong>Estado de adopción:</strong></p>
                          <p><strong>{pet.availability}</strong></p>
                        </div>
                      )}

                      {isEditing && (
                        <div className="flex justify-center mt-3">
                          <button className="button-form inline-flex text-center bg-primaryLight text-white rounded-2xl py-3 px-4 text-sm">
                            <Link to={`/adoptform/`}>Rellena el formulario</Link>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tienes mascotas marcadas como favoritas.</p>
      )}
    </div>
  );
};

export default Favorites;
