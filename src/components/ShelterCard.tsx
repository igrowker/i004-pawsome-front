
import React from "react";
import { IRefuge } from "@/interfaces/IRefugee";


const ShelterCard: React.FC<{ shelter: IRefuge }> = ({ shelter }) => {

 

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={shelter.img}
              alt={`${shelter.name_refugee} profile`}
              className="btn w-10 h-10 rounded-full mr-4"
              onClick={() => {
                navigate("/refugee/"+shelter._id)
              }}
            />
            <div>
              <h2 className="font-semibold text-lg">{shelter.name_refugee}</h2>
            </div>
          </div>
        </div>
      </div>
      <img
        src={shelter.img}
        alt={`Animal at ${shelter.name_refugee}`}
        className="w-full h-64 object-cover"
      />
    </div>
  );
};

export default ShelterCard;
