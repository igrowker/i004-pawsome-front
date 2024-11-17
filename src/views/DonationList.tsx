import { useEffect, useState } from "react";
import { getDonationsData } from "./helpers/getDonations";

const DonationList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const data = async () => {
      const donation = await getDonationsData();
      setDonations(donation.results);
    };
    data();
  }, []);

  return (
    <div className="md:columns-2 sm:columns-1 ms-1">
      {donations.map((item: any, id: number) => (
        <div className="flex flex-col justify-center gap-2 rounded-2xl shadow p-2 mt-2 ms-2 ">
          <div className="flex gap-2" key={id}>
            <img
              className="bg-neutral-500 w-24 h-24 shrink-0 rounded-full"
              src={item.foto}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-neutral-700 italic">
                {item.nombre}
              </span>
              <p className="line-clamp-3">{item.descripcion_corta}</p>
              <p className="line-clamp-3">{item.valor_necesitado}€</p>
              <button className="hover:bg-primaryLight bg-secondaryLight font-bold text-neutral-50 rounded-2xl p-2 w-44">
                Donate
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
