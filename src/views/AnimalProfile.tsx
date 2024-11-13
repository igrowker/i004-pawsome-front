import React from 'react';

const AnimalProfile: React.FC = () => {
  // Datos simulados para el diseño provisional
  const name = "Buddy";
  const sex = "Macho";
  const age = 3;
  const breed = "Labrador";
  const photo = "/animal-profile.png";
  const history = "Firulais es un perro muy cariñoso que fue rescatado y ahora busca un hogar.";
  const characteristics = ["Juguetón", "Cariñoso", "Energético"];

  return (
    <div className="animal-profile p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
      {/* Foto */}
      <div className="w-32 h-32 rounded-lg overflow-hidden">
        <img src={photo} alt={`Foto de ${name}`} className="object-cover w-full h-full" />
      </div>

      {/* Información Básica */}
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-lg">Sexo: {sex}</p>
      <p className="text-lg">Edad: {age} años</p>
      <p className="text-lg">Raza: {breed}</p>

      {/* Historia */}
      <section className="history mt-4">
        <h2 className="text-xl font-semibold mb-2">Historia</h2>
        <p className="text-gray-700">{history}</p>
      </section>

      {/* Características */}
      <section className="characteristics mt-4">
        <h2 className="text-xl font-semibold mb-2">Características</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {characteristics.map((characteristic, index) => (
            <li key={index}>{characteristic}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AnimalProfile;
