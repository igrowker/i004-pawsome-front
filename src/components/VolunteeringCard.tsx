
import { Link } from "react-router-dom";


interface VolunteeringCardProps {
  _id: string;
  description: string;
  requirements: string;
  availability: string;
}
const VolunteeringCard: React.FC <VolunteeringCardProps>= ({description,requirements,availability}) => {
  
  return (
    
    <div className="mt-10 flex flex-col rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
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
        <Link to={'/volunteerForm'}>Ser voluntario</Link> 
        </button>
      </div>
  </div>
  );
};

export default VolunteeringCard;

