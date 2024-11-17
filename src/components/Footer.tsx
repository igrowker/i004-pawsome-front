
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {

    return (
        <footer className=" py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo y Nombre */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/login.png"
            alt="Logo"
            className="w-32 h-32 mb-3"
          />
          <h1 className="text-2xl font-bold">PAWSOME</h1>
          <p className="text-sm mt-2">
            "Un hogar para cada pata"
          </p>
        </div>

        {/* Enlaces útiles */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-extrabold text-primaryLight text-decoration-line: underlined">Enlaces útiles</h2>
          <a
            href="/about"
            className="transition-all hover:translate-x-1 hover:text-gray-200"
          >
            Sobre nosotros
          </a>
          <a
            href="/adoptions"
            className="transition-all hover:translate-x-1 hover:text-gray-200"
          >
            Adopciones
          </a>
          <a
            href="/contact"
            className="transition-all hover:translate-x-1 hover:text-gray-200"
          >
            Contacto
          </a>
          <a
            href="/privacy"
            className="transition-all hover:translate-x-1 hover:text-gray-200"
          >
            Política de privacidad
          </a>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col space-y-3 items-center md:items-start">
          <h2 className="text-lg font-extrabold text-primaryLight">Síguenos</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white text-secondaryLight hover:bg-blue-600 hover:text-white transition-all"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white text-secondaryLight hover:bg-blue-400 hover:text-white transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white text-secondaryLight hover:bg-pink-600 hover:text-white transition-all"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Derechos de autor */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} PAWSOME. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer