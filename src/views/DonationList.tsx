import { useEffect, useState } from "react";
import { getDonationsData } from "./helpers/getDonations";

interface DonationInterface {
  id: number;
  refugeId: number;
  title: string;
  description: string;
  imageUrl: string;
  monetaryDonation: boolean;
  inKindDonation: boolean;
  cuantityDonatio: number;
  donationNumber: number;
  deadlineDonation: Date;
}

const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<DonationInterface[]>([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getDonationsData(); // La respuesta puede ser undefined o un objeto de tipo DonationsResponse
        console.log(response); // Ver los datos recibidos en consola

        // Si la respuesta es undefined o no tiene 'donations', usamos un array vacío
        if (response && Array.isArray(response.donations)) {
          const shelterFilter = response.donations.filter(
            (element: DonationInterface) => element.refugeId === 102);
          setDonations(shelterFilter);
        } else {
          console.error(
            "La respuesta no tiene la propiedad 'donations' correctamente."
          );
          setDonations([]); // Usar un array vacío si no se encuentra la propiedad 'donations'
        }
      } catch (error) {
        console.error("Error al obtener los datos de donaciones:", error);
        setDonations([]); // En caso de error, usar un array vacío
      }
    };
    data();
  }, []);
  console.log(donations);

  return (
    <div className="mt-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {donations.map((item: DonationInterface, index: number) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={item.imageUrl}
                alt={`Imagen de ${item.title}`}
              />
              <div className="flex flex-col justify-between">
                <span className="font-semibold text-lg text-neutral-800 italic">
                  {item.title}
                </span>
                <p className="text-sm text-neutral-600 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-sm text-neutral-600 mt-2">
                  Cantidad necesitada:{" "}
                  <span className="font-bold">{item.cuantityDonatio}€</span>
                </p>
                <button className="mt-4 w-full bg-secondaryLight text-white font-bold py-2 px-4 rounded-lg hover:bg-primaryLight transition-colors">
                  Donate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationList;

{
  /* <div className="md:columns-2 sm:columns-1 ms-1 mt-20 mb-20">
{donations.map((item: DonationInterface, id:number) => (
  <div className="flex flex-col justify-center gap-2 rounded-2xl shadow p-2 mt-2 ms-2 h-auto">
    <div className="flex gap-2" key={id}>
      <img
        className="bg-neutral-500 w-24 h-24 shrink-0 rounded-full"
        src={item.imageUrl}
        alt=""
      />
      <div className="flex flex-col">
        <span className="font-bold text-neutral-700 italic mb-1">
          {item.title}
        </span>
        <p className="line-clamp-3 mb-1">{item.description}</p>
        <p className="line-clamp-3 mb-2"> Cantidad necesitada: {item.cuantityDonatio}€</p>
        <button className="hover:bg-primaryLight bg-secondaryLight font-bold text-neutral-50 rounded-2xl p-2 w-44">
          Donate
        </button>
      </div>
    </div>
  </div>
))}
</div>
 */
}
