import AdoptionList from "@/components/AdoptionList";
import Navigation from "@/components/Navigation";
import ShelterList from "@/components/ShelterList";
import Pagination from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRefugees } from "@/redux/actions/refugeeActions";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    data: shelters,
    error,
  } = useSelector((state: RootState) => state.refugee);
  console.log(shelters)
  

  const [activeView, setActiveView] = React.useState("refugios");
  const [currentPage, setCurrentPage] = useState<number>(1); // Estado para la paginación
  const itemsPerPage = 6; //Seis maps por pag


  useEffect(() => {
    if (activeView === "refugios") {
      dispatch(fetchRefugees());
    }
  }, [activeView, dispatch]);


  const currentShelters = shelters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4">
        {/* Filtro y botón de donar */}
        {activeView === "adopciones" && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Adopciones</h2>
          </div>
        )}

        {/* Mostrar vista activa */}
        {activeView === "refugios" ? (
          loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500"> Error:{error} </p>
          ) : (
            <div>
              <ShelterList shelters={currentShelters} />
              {/* Paginación de refugios */}
              <Pagination
                totalItems={shelters.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )
        ) : (
          <AdoptionList />
        )}
      </main>
    </div>
  );
};

export default Home;
