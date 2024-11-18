import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and name */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center space-x-2">
            <img src="/login.png" alt="Logo" className="w-16 h-12" />
            <img src="/paw.png" alt="title" className="h-12" />
            
          </div>
          <p className="text-sm text-center bg-primaryLight rounded-xl px-4 py-1 text-white font-bold">"Un lugar, todos los refugios"</p>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <p className="text-lg font-bold mb-4">Síguenos en</p>
          <div className="w-16 h-1 bg-primaryLight mx-auto mb-5"></div>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-primaryLight rounded-full hover:text-blue-600 transition-all"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-primaryLight rounded-full hover:text-blue-400 transition-all"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-primaryLight rounded-full hover:text-pink-600 transition-all"
            >
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-center">Enlaces rápidos</h2>
          <div className="w-16 h-1 bg-primaryLight mx-auto mb-5"></div>
          <div className="grid grid-cols-2 gap-4 p-2">
            <a
              href="/about"
              className="block bg-primaryLight p-3 rounded-lg text-center font-bold hover:bg-primaryDark hover:text-white transition-all"
            >
              Sobre nosotros
            </a>
            <a
              href="/adoptions"
              className="block bg-primaryLight p-3 rounded-lg text-center font-bold hover:bg-primaryDark hover:text-white transition-all"
            >
              Registro
            </a>
            <a
              href="/register"
              className="block bg-primaryLight p-3 rounded-lg text-center font-bold hover:bg-primaryDark hover:text-white transition-all"
            >
              Donaciones
            </a>
            <a
              href="/donations"
              className="block bg-primaryLight p-3 rounded-lg text-center font-bold hover:bg-primaryDark hover:text-white transition-all"
            >
              Política de privacidad
            </a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="mt-3 text-center space-y-4 md:col-span-3 mx-auto">
          <h2 className="text-lg font-bold">Contáctanos</h2>
          <div className="w-16 h-1 bg-primaryLight mx-auto mb-5"></div>
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-primaryLight" />
              <span>+34 655 555-555</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-primaryLight" />
              <span>contacto@pawsome.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rights Reserved */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <b>PAWSOME.</b> Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
