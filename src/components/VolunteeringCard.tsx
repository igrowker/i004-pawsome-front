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
    
    <div className="mt-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {volunteering.map((item: Volunteering, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={item.imageUrl}
                alt={`Imagen de ${item.refugee_name}`}
              />
              <div className="flex flex-col">
                <span className="mb-[10px]">
                    {item.refugee_name}
                </span>
                <p className="text-sm text-neutral-600 mb-[10px]">
                  {item.description}
                </p>
                <p className="text-sm text-neutral-600 mb-[10px]">
                  {item.requirements}
                </p><p className="text-sm text-neutral-600">
                  {item.availability}
                </p>
                <button className="border-1 rounded-3xl h-14 w-[85%] bg-primaryLight text-white hover:bg-primaryLight transition-colors mt-[15px]">
                  Ser voluntario
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteeringCard;

