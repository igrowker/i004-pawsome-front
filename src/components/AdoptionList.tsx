import React, { useEffect, useState } from 'react';
import AdoptionCard from './AdoptionCard';

const AdoptionList: React.FC = () => {
  const [adoptions, setAdoptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await fetch('http://localhost:3000/animals');
        if (!response.ok) throw new Error('Error al obtener los animales');
        const data = await response.json();
        setAdoptions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdoptions();
  }, []);

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {adoptions.map((adoption) => (
        <AdoptionCard
          key={adoption._id}
          id={adoption._id} 
          name={adoption.name}
          breed={adoption.breed || 'Desconocido'}
          age={`${adoption.age} años`}
          imageUrl={adoption.photos[0]} // Usa la primera foto
          tag={adoption.adoption_status}
        />
      ))}
    </div>
  );
};

export default AdoptionList;
