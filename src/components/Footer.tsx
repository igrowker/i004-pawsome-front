import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <footer
      className={`py-8 transition-all ${
        isDarkMode ? "bg-dark text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo y nombre */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-4">
            <img src="/login.png" alt="Logo" className="w-16 h-16" />
            <img
              src={isDarkMode ? "/paw2.png" : "/paw.png"} // Cambia la imagen según el modo
              alt="pawsome"
              className="h-auto w-auto max-w-[200px] md:max-w-[250px] lg:max-w-[280px] max-h-[80px] md:max-h-[100px] lg:max-h-[120px] object-contain"
            />
          </div>
          <div className="w-full flex justify-center">
            <p className="text-sm text-center">"Un lugar, todos los refugios"</p>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="text-center">
          <p className="text-md font-bold mb-4">Síguenos en</p>
          <div
            className={`w-12 h-1 ${
              isDarkMode ? "bg-primaryLight" : "bg-teal-500"
            } mx-auto mb-5`}
          ></div>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all ${
                isDarkMode
                  ? "text-primaryLight hover:text-blue-600"
                  : "text-teal-500 hover:text-blue-400"
              }`}
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all ${
                isDarkMode
                  ? "text-primaryLight hover:text-blue-400"
                  : "text-teal-500 hover:text-blue-500"
              }`}
            >
              <FaTwitter className="text-lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all ${
                isDarkMode
                  ? "text-primaryLight hover:text-pink-600"
                  : "text-teal-500 hover:text-pink-500"
              }`}
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-center">Enlaces rápidos</h2>
          <div
            className={`w-12 h-1 ${
              isDarkMode ? "bg-primaryLight" : "bg-teal-500"
            } mx-auto mb-5`}
          ></div>
          <div className="grid grid-cols-2 gap-4 p-2">
            {[
              { href: "/about", label: "Sobre nosotros" },
              { href: "/signin", label: "Registro" },
              { href: "/donationlist", label: "Haz una donación" },
              { href: "/privacy", label: "Política de privacidad" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block p-3 rounded-lg text-center transition-all ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contáctanos */}
        <div className="mt-8 text-center space-y-4 md:col-span-3 mx-auto">
          <h2 className="text-lg font-bold">Contáctanos</h2>
          <div
            className={`w-12 h-1 ${
              isDarkMode ? "bg-primaryLight" : "bg-teal-500"
            } mx-auto mb-5`}
          ></div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <FaPhone
                className={`${isDarkMode ? "text-primaryLight" : "text-teal-500"}`}
              />
              <span>+34 655 555-555</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope
                className={`${isDarkMode ? "text-primaryLight" : "text-teal-500"}`}
              />
              <span>contacto@pawsome.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para cambiar entre modos */}
      <div className="mt-8 text-center">
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center space-x-2 bg-primaryLight text-white px-4 py-2 mx-2 rounded-full shadow-md hover:bg-primaryDark transition-all"
        >
          {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
        </button>
      </div>

      {/* Derechos reservados */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        © {new Date().getFullYear()} <b>Pawsome.</b> Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
