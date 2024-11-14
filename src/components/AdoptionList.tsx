import React from 'react';
import AdoptionCard from './AdoptionCard';

interface Adoption {
  id: number;
  name: string;
  breed: string;
  age: string;
  imageUrl: string;
  tag: string;
}

const adoptions: Adoption[] = [
  {
    id: 1,
    name: 'Bella',
    breed: 'Labrador Retriever',
    age: '2 years old',
    imageUrl: 'https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg',
    tag: 'PERRO',
  },
  {
    id: 2,
    name: 'Milo',
    breed: 'Siamese Cat',
    age: '3 years old',
    imageUrl: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2023/10/24/653782d413b16.jpeg',
    tag: 'GATO',
  },
  {
    id: 3,
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '4 years old',
    imageUrl: 'https://www.zooplus.es/magazine/wp-content/uploads/2024/08/El-perro-mas-viejo-del-mundo.jpeg',
    tag: 'PERRO',
  },
];

const AdoptionList: React.FC = () => (
  <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {adoptions.map((adoption) => (
      <AdoptionCard
        key={adoption.id}
        name={adoption.name}
        breed={adoption.breed}
        age={adoption.age}
        imageUrl={adoption.imageUrl}
        tag={adoption.tag}
      />
    ))}
  </div>
);

export default AdoptionList;
