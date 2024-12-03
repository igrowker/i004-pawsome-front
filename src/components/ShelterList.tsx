import React from "react";
import ShelterCard from "./ShelterCard";
import { IRefuge } from "@/interfaces/IRefugee";
import { Link } from "react-router-dom";

const ShelterList: React.FC<{ shelters: IRefuge[] }> = ({ shelters }) => (
  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {shelters.map((shelter) => (
      <div key={shelter._id}>
        <Link to={`/shelter/${shelter._id}`}></Link>
        <ShelterCard key={shelter._id} shelter={shelter} />
      </div>
    ))}
  </div>
);

export default ShelterList;
