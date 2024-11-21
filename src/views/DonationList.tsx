import { useEffect, useState } from "react";
import { getDonationsData } from "./helpers/getDonations";

interface DonatioInterface {
  id: number,
  refugeId: number,
  title: string,
  description: string,
  imageUrl: string,
  monetaryDonation: boolean,
  inKindDonation: boolean, 
  cuantityDonatio: number,
  donationNumber: number,
  deadlineDonation: Date

}

const DonationList : React.FC = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const data = async () => {
      const donation = await getDonationsData();
      setDonations(donation.donations);
    };
    data();
  }, []);

  return (
    <div className="md:columns-2 sm:columns-1 ms-1 mt-20 mb-15">
      {donations.map((item: DonatioInterface) => (
        <div className="flex flex-col justify-center gap-2 rounded-2xl shadow p-2 mt-2 ms-2 h-auto">
          <div className="flex gap-2" key={item.id}>
            <img
              className="bg-neutral-500 w-24 h-24 shrink-0 rounded-full"
              src={item.imageUrl}
              alt=""
            />
            <div className="flex flex-col">
              <span className="font-bold text-neutral-700 italic">
                {item.title}
              </span>
              <p className="line-clamp-3">{item.description}</p>
              <p className="line-clamp-3">{item.cuantityDonatio}€</p>
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
