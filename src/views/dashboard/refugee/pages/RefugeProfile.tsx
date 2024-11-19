import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function RefugeProfile() {
  // agrego un estado para ver que botón pintar
  const [filter, setFilter] = useState("")

  const handleSetFilter = (event: MouseEvent<HTMLButtonElement>) => {
    // el .currentTarget me da el botón actual que dio click
    setFilter(event.currentTarget.textContent || "")
  }

  const getStylesButton = (labelButton: string) => filter === labelButton ? "border-b-4 border-secondaryDark text-secondaryDark" : ""

  return (
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
              ["Perros", "Gatos", "Donar", "Voluntarios"].map(item => (
                <button
                  key={item}
                  onClick={handleSetFilter}
                  className={getStylesButton(item)}
              >{item}</button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
