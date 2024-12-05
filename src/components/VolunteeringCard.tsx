
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
      {/* <div
        key={item._id}
        className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow space-y-4 max-w-sm"
      > */}
        {/* <img
          className="w-28 h-28 rounded-full object-cover"
          src={item.imageUrl}
          alt={`Imagen de ${item.refugee_name}`}
        /> */}
        <div className="text-center space-y-2">
          <p className="text-sm text-neutral-600 text-justify">
            {description}
          </p>
          <p className="text-sm text-neutral-600 text-justify">
            {requirements}
          </p>
          <p className="text-sm text-neutral-600 text-justify">
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

