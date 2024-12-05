import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaBalanceScale, FaHandshake } from "react-icons/fa";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      {/* Encabezado */}
      <div className="text-center mb-12 relative">
        <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl relative z-10">
          Sobre Nosotros
        </h1>
        <div className="absolute inset-x-0 top-1/1 transform -translate-y-1/2 h-3 bg-teal-500 opacity-20 rounded-lg"></div>
        <p className="mt-8 text-gray-600 text-lg italic sm:text-xl max-w-3xl mx-auto relative z-10">
          Nos apasiona conectar familias amorosas con animales que necesitan un hogar.
          Juntos, podemos marcar la diferencia.
        </p>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div className="text-gray-700 space-y-6">
          <p className="text-lg sm:text-xl leading-relaxed">
            Nuestra misión es brindar a los animales abandonados y rescatados una segunda oportunidad en la vida. A través de nuestra plataforma, conectamos refugios de animales con personas que buscan adoptar o acoger.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed">
            Al adoptar, no solo estás dando un hogar a un animal que lo merece, sino que también estás ayudando a reducir la sobrepoblación y apoyando a los refugios que lo necesitan.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed">
            Únete a nosotros para crear una comunidad que valore la compasión y el cuidado por nuestros amigos peludos.
          </p>
          <div className="flex justify-center">
            {/* Botón centrado */}
            <Link
              to="/signin"
              className="inline-block bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
            >
              Regístrate
            </Link>
          </div>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/happy-family.jpg"
            alt="Familia feliz con perro adoptado"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <img
            src="/rescued-cat.jpg"
            alt="Gato rescatado"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <img
            src="/volunter.jpg"
            alt="Voluntario ayudando animales"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <img
            src="/new-owner.jpg"
            alt="Perro con nuevo dueño"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Valores */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
            Nuestros Valores
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto">
            En nuestra misión de encontrar hogares amorosos para animales necesitados, nos guiamos por valores fundamentales que nos definen como organización.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center bg-teal-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
                <FaHeart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Compasión
              </h3>
              <p className="text-gray-600 text-center">
                Tratamos a cada animal con amor y empatía, asegurándonos de que reciban los cuidados que merecen.
              </p>
            </div>
            {/* Valor 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center bg-yellow-400 text-white w-16 h-16 rounded-full mx-auto mb-4">
                <FaBalanceScale className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Transparencia
              </h3>
              <p className="text-gray-600 text-center">
                Priorizamos la honestidad y claridad en cada paso de nuestro proceso de adopción.
              </p>
            </div>
            {/* Valor 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-center justify-center bg-pink-500 text-white w-16 h-16 rounded-full mx-auto mb-4">
                <FaHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Compromiso
              </h3>
              <p className="text-gray-600 text-center">
                Nos dedicamos a encontrar el mejor hogar para cada animal, sin importar cuánto tiempo tome.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
