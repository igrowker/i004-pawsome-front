import React, { useState } from "react";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import ShelterList from "../../components/ShelterList";
import AdoptionList from "../../components/AdoptionList";
import FilterAdoption from "../../components/FilterAdoption";

interface Shelter {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
  imageUrl: string;
  profileUrl: string;
  tags: string[];
}

const shelters: Shelter[] = [
  {
    id: 1,
    name: "Refugio Patitas",
    location: "Valencia",
    timeAgo: "5 minutos",
    imageUrl:
      "https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg",
    profileUrl:
      "https://static.abc.es/media/ciencia/2017/10/19/AdobeStock_31122580-kgKD--1240x698@abc.jpg",
    tags: ["RESCATE", "PERRO"],
  },
  {
    id: 2,
    name: "Refugio Colitas",
    location: "Barcelona",
    timeAgo: "2 horas",
    imageUrl:
      "https://www.lavanguardia.com/files/og_thumbnail/uploads/2023/10/24/653782d413b16.jpeg",
    profileUrl:
      "https://www.zooplus.es/magazine/wp-content/uploads/2024/08/El-perro-mas-viejo-del-mundo.jpeg",
    tags: ["ADOPCIÓN", "GATO"],
  },
];

const Home: React.FC = () => {
  const [activeView, setActiveView] = useState("refugios"); // 'refugios' or 'adopciones'

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Navigation activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4">
        {/* Filtro y botón de donar */}
        {activeView === "adopciones" && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Adopciones</h2>
            <button className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-full shadow-md">
              Donar
            </button>
          </div>
        )}
        {activeView === "adopciones" && (
          <div className="mb-4">
            <FilterAdoption />
          </div>
        )}
        {/* Mostrar vista activa */}
        {activeView === "refugios" ? (
          <ShelterList shelters={shelters} />
        ) : (
          <AdoptionList />
        )}
      </main>
    </div>
  );
};

export default Home;
