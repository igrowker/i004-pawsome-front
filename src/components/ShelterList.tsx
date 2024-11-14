import React from 'react';
import ShelterCard from './ShelterCard';

interface Shelter {
  id: number;
  name: string;
  location: string;
  timeAgo: string;
  imageUrl: string;
  profileUrl: string;
  tags: string[];
}

const ShelterList: React.FC<{ shelters: Shelter[] }> = ({ shelters }) => (
  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {shelters.map((shelter) => (
      <ShelterCard key={shelter.id} shelter={shelter} />
    ))}
  </div>
);

export default ShelterList;
