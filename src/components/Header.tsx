import React, { useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold">PAWSOME</h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-primaryDark">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-primaryDark">About</Link>
        <Link to="/services" className="text-gray-700 hover:text-primaryDark">Services</Link>
        <Link to="/contact" className="text-gray-700 hover:text-primaryDark">Contact</Link>
        <Link to="/logout" className="bg-blue-500 text-white hover:bg-blue-400 p-2 rounded">Cerrar sesión</Link>
      </nav>

      {/* Mobile Menu Icon */}
      <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? (
          <AiOutlineClose className="w-6 h-6" />
        ) : (
          <CgMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 w-48 bg-white border rounded-lg shadow-lg p-4 md:hidden">
          <Link to="/" className="block text-gray-700 hover:text-primaryDark py-2">Home</Link>
          <Link to="/about" className="block text-gray-700 hover:text-primaryDark py-2">About</Link>
          <Link to="/services" className="block text-gray-700 hover:text-primaryDark py-2">Services</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-primaryDark py-2">Contact</Link>
          <Link to="/logout" className="block text-white bg-blue-500 hover:bg-blue-400 p-2 rounded mt-2">Cerrar sesión</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
