import { useState } from "react";

export default function RefugeDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p>
        Su misión principal es brindarles una segunda oportunidad a perros, gatos y otros animales,
        ofreciéndoles un entorno seguro, alimento, atención veterinaria y, sobre todo, mucho amor.
        {!isExpanded && "..."} {/* Muestra puntos suspensivos si no está expandido */}
        {isExpanded && (
          <span>
            Estos animales son rescatados de situaciones de abandono o maltrato y, en el refugio,
            encuentran un lugar donde pueden sanar, recibir cuidados y prepararse para encontrar
            un hogar definitivo lleno de cariño y respeto.
          </span>
        )}
      </p>
      <button
        onClick={toggleExpanded}
        className="text-primaryDark underline hover:text-primaryLight transition-colors"
      >
        {isExpanded ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
