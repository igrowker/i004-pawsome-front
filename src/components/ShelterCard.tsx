
import React from "react";
import { IRefuge } from "@/interfaces/IRefugee";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ShelterCard: React.FC<{ shelter: IRefuge }> = ({ shelter }) => {

 const navigate = useNavigate()

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
      <div>
        <h5 className="text-lg">{shelter.description}</h5>
      </div>
      <img
        src={shelter.img}
        alt={`Animal at ${shelter.name_refugee}`}
        className="w-full h-64 object-cover"
      />
      <button className="w-full bg-teal-500 text-white font-semibold py-3 mt-4 rounded-b-lg">
        <Link to={"/refugee/"+shelter._id}>Ir al refugio</Link>
      </button>
    </div>
  );
};

export default ShelterCard;
