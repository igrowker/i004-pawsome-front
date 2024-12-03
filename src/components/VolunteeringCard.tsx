import {  Key,  useEffect } from "react";
import {   NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { getVolunteering } from "../redux/actions/volunteeringActions";
// import { getVolunteeringData } from "../redux/services/volunteeringService";
import { fetchVolunteeringData } from "@/redux/actions/volunteeringActions";
import { RootState } from "../redux/rootReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface Volunteering {
  _id: string;
  refugee_name: string;
  imageUrl: string;
  description: string;
  requirements: string;
  availability: string;
}
const VolunteeringCard: React.FC = () => {
     const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const volunteeringData = useSelector((state : RootState) => state.volunteering.volunteeringData)
  

      const handleCLick = () => {
        navigate("/volunteeringform")
      }
      
    
      useEffect(() => {
        dispatch(fetchVolunteeringData())
        
        console.log(volunteeringData)
      }, [dispatch]);
      useEffect(() => {
        console.log("Datos actualizados:", volunteeringData);
    }, [volunteeringData]);
      if (!volunteeringData) return <div>Loading...</div>; 
  return (
    
    <div className="mt-20 mb-20 flex flex-col items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {volunteeringData.map((item: any) => (
      <div
        key={item._id}
        className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow space-y-4 max-w-sm"
      >
        {/* <img
          className="w-28 h-28 rounded-full object-cover"
          src={item.imageUrl}
          alt={`Imagen de ${item.refugee_name}`}
        /> */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-neutral-800">
            {item.refugee_name}
          </h3>
          <p className="text-sm text-neutral-600 text-justify">
            {item.description}
          </p>
          <p className="text-sm text-neutral-600 text-justify">
            {item.requirements}
          </p>
          <p className="text-sm text-neutral-600 text-justify">
            {item.availability}
          </p>
        </div>
        <button className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors" onClick={handleCLick}>
          Ser voluntario
        </button>
      </div>
    ))}
  </div>
  {/* <div className="volunteeringExtraForm">
    <NavLink to="/volunteerForm">No has encontrado ningún voluntariado de tu interés?, dejanos tus datos y el tipo de voluntariado en el que quisieras participar</NavLink>
  </div> */}
</div>
  );
};

export default VolunteeringCard;

