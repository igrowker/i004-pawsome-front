import { useEffect, useState } from "react";
import { RootState } from "@reduxjs/toolkit/query";
import { getDonationsData } from "./helpers/getDonations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const donation = useSelector((state: RootState) => state.donations);
  const [donations, setDonations] = useState<DonationInterface[]>([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getDonationsData();
        if (response && Array.isArray(response.donations)) {
          const shelterFilter = response.donations.filter(
            (element: DonationInterface) => element.refugeId === 102);
          setDonations(shelterFilter);
        } else {
          console.error(
            "La respuesta no tiene la propiedad 'donations' correctamente."
          );
          setDonations([]);
        }
      } catch (error) {
        console.error("Error al obtener los datos de donaciones:", error);
        setDonations([]); 
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
                {
                  item.monetaryDonation? 
                <p className="text-sm text-neutral-600 mt-2">
                  Monto necesitado:{" "}
                  <span className="font-bold">{item.cuantityDonatio}€</span>
                </p>
                :
                <p className="text-sm text-neutral-600 mt-2">
                Cantidad necesitada:{" "}
                <span className="font-bold">{item.donationNumber}</span>
              </p>

                }
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

