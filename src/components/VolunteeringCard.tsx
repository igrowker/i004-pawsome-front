import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
interface VolunteeringCardProps {
  _id: string;
  description: string;
  requirements: string;
  availability: string;
}


const VolunteeringCard: React.FC <VolunteeringCardProps>= ({description,requirements,availability}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { id } = useParams<{ id: string }>();
  
  const handleDelete = () => {
    console.log(`Borrando voluntariado con ID: `);
  }

  
  return (
    
    <div className="mt-10 flex flex-col rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    {/* Condicional de autenticación */}
    {isAuthenticated && user?.role === "refugee" ? (
      // Si es un refugio, mostramos los botones de editar y eliminar
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <img src="../../public/Vector (1).copia.png" alt="logo_pawsome" className="h-14"/>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {description}
          </h2>
          <h3 className="text-lg font-semibold text-teal-600">Requisitos:</h3>
          <p className="text-gray-600 mb-2">
            {requirements}
          </p>
          <h3 className="text-lg font-semibold text-teal-600">Horario:</h3>
          <p className="text-gray-600 mb-4">
            {availability}
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
        </div>
      </div>
    ) : (
      // Si no es refugio, mostramos el botón de "Ser voluntario"
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {description}
          </h2>
          <p className="text-gray-600 mb-2">
            <h3 className="text-lg font-semibold text-teal-600">Requisitos:</h3>
            {requirements}
          </p>
          <p className="text-gray-600 mb-4">
            <h3 className="text-lg font-semibold text-teal-600">Horario:</h3>
            {availability}
          </p>
        </div>
        <button className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">
          <Link to={`/volunteer/${id}/oportunidades`}>Ser voluntario</Link>
        </button>
      </div>
    )}
  </div>
  
  );
};

export default VolunteeringCard;


