import React from "react";
import ShelterCard from "./ShelterCard";
import { IRefuge } from "@/interfaces/IRefugee";

const ShelterList: React.FC<{ shelters: IRefuge[] }> = ({ shelters }) => (
  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {shelters.map((shelter) => (
      <ShelterCard key={shelter._id} shelter={shelter} />
    ))}
  </div>
);

export default ShelterList;
