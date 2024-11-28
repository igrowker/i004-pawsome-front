import {   useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getVolunteering } from "../redux/actions/volunteeringActions";
// import { getVolunteeringData } from "../redux/services/volunteeringService";
import { RootState } from "../redux/rootReducer";
import { useDispatch } from "react-redux";

const VolunteeringCard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const volunteeringData = useSelector((state : RootState) => state.volunteering.volunteering)
      const handleCLick = () => {
        navigate("/volunteerform")
      }
      
      const fetchVolunteeringData = async () => {
        const mockData = [
          {
                   id: 1,
                   refugee_name: "Refugio Esperanza",
                   imageUrl: "https://via.placeholder.com/150",
                   description:
                    "Un refugio dedicado a rescatar y cuidar animales callejeros. Necesitamos voluntarios para pasear perros y limpiar áreas comunes.",
                  requirements: "Mayor de 18 años, responsable y amante de los animales.",
                availability: "Lunes a viernes de 9:00 AM a 12:00 PM.",
                },
                 {
                   id: 2,
                  refugee_name: "Casa Gatuna",
                  imageUrl: "https://via.placeholder.com/150",
               description:
                     "Centro especializado en la protección de gatos abandonados. Ayúdanos con la socialización de los felinos y actividades de adopción.",
                   requirements: "Paciencia, amor por los gatos y experiencia previa (opcional).",
                  availability: "Fines de semana de 10:00 AM a 2:00 PM.",
                 },
                 {
                 id: 3,
                  refugee_name: "Huellitas Felices",
                 imageUrl: "https://via.placeholder.com/150",
                description:
                   "Refugio mixto para perros y gatos. Buscamos voluntarios para eventos de recaudación de fondos y transporte de animales.",
                requirements: "Vehículo propio (para transporte) y disponibilidad flexible.",
                  availability: "Horario flexible según eventos programados.",
               }
        ]
        // const data = await getVolunteeringData();
        dispatch(getVolunteering(mockData))
      }
      useEffect( () => {
        console.log(fetchVolunteeringData)
        fetchVolunteeringData();
      },[dispatch])

      if (!volunteeringData) return <div>Loading...</div>; 
  return (
    
    <div className="mt-20 mb-20 flex flex-col items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {volunteeringData.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow space-y-4 max-w-sm"
      >
        <img
          className="w-28 h-28 rounded-full object-cover"
          src={item.imageUrl}
          alt={`Imagen de ${item.refugee_name}`}
        />
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
</div>
  );
};

export default VolunteeringCard;

