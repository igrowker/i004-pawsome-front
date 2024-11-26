import React from "react";
import { FaUser, FaCogs, FaShieldAlt, FaUserShield, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-white min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold  mb-6">
            Política de Privacidad
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Tu privacidad es importante para nosotros. En{" "}
            <span className="font-semibold text-teal-500"> PAWSOME</span>, 
            nos comprometemos a proteger tu información. Descubre cómo gestionamos y protegemos tus datos.
          </p>
        </div>

        {/* Sección de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-teal-100 text-teal-600 rounded-full p-4 inline-block mb-4">
            <FaUser className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Información que recopilamos
            </h2>
            <p className="text-gray-600 text-sm">
              Recopilamos datos como tu nombre, correo electrónico, preferencias y datos técnicos para ofrecerte la mejor experiencia.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-4 inline-block mb-4">
            <FaCogs className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Uso de la información
            </h2>
            <p className="text-gray-600 text-sm">
              Utilizamos tus datos para gestionar solicitudes, personalizar tu experiencia y mejorar nuestro servicio.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-red-100 text-red-600 rounded-full p-4 inline-block mb-4">
            <FaShieldAlt className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Protección de datos
            </h2>
            <p className="text-gray-600 text-sm">
              Implementamos medidas de seguridad avanzadas para proteger tu información personal.
            </p>
          </div>

          {/* Tarjeta 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
            <FaUserShield className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Tus derechos
            </h2>
            <p className="text-gray-600 text-sm">
              Tienes derecho a acceder, actualizar o eliminar tu información y a solicitar una copia de tus datos.
            </p>
          </div>

          {/* Tarjeta 5 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-purple-100 text-purple-600 rounded-full p-4 inline-block mb-4">
            <FaEnvelope className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Contáctanos
            </h2>
            <p className="text-gray-600 text-sm">
              ¿Dudas? Escríbenos a{" "}
              <a
                href="mailto:contacto@pawsome.com"
                className="text-teal-500 underline"
              >
                contacto@pawsome.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
