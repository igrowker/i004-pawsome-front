import {  useState } from "react";


interface Volunteering {
  id: number;
  refugee_name: string,
  imageUrl: string,
  description: string,
  requirements: string,
  availability: string
}


const VolunteeringCard: React.FC = () => {
    const [volunteering] = useState<Volunteering[]>([
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
        },
      ]);

//   useEffect(() => {
//     const data = async () => {
//       try {
//         const response = await getDonationsData();
//         if (response && Array.isArray(response.donations)) {
//           const shelterFilter = response.donations.filter(
//             (element: DonationInterface) => element.refugeId === 102);
//           setDonations(shelterFilter);
//         } else {
//           console.error(
//             "La respuesta no tiene la propiedad 'donations' correctamente."
//           );
//           setDonations([]);
//         }
//       } catch (error) {
//         console.error("Error al obtener los datos de donaciones:", error);
//         setDonations([]); 
//       }
//     };
//     data();
//   }, []);
//   console.log(donations);

  return (
    
    <div className="mt-20 mb-20 flex flex-col items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {volunteering.map((item: Volunteering, index: number) => (
      <div
        key={index}
        className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow space-y-4 max-w-sm"
      >
        {/* Imagen circular */}
        <img
          className="w-28 h-28 rounded-full object-cover"
          src={item.imageUrl}
          alt={`Imagen de ${item.refugee_name}`}
        />

        {/* Contenido de texto */}
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

        {/* Botón de acción */}
        <button className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">
          Ser voluntario
        </button>
      </div>
    ))}
  </div>
</div>
  );
};

export default VolunteeringCard;

