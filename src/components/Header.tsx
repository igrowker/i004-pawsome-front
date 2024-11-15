import React, { useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-md ">
      {/* Logo */}
      <h1 className="text-2xl font-bold">PAWSOME</h1>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-primaryDark">Home</a>
        <a href="#" className="text-gray-700 hover:text-primaryDark">About</a>
        <a href="#" className="text-gray-700 hover:text-primaryDark">Services</a>
        <a href="#" className="text-gray-700 hover:text-primaryDark">Contact</a>
      </nav>
      
      {/* Mobile Menu Icon */}
      <button className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? (
          <AiOutlineClose className="w-6 h-6" />
        ) : (
          <CgMenu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation (Dropdown) */}
      {isMenuOpen && (
        <div className="absolute top-16 right-5 w-48 bg-white border rounded-lg shadow-lg p-4 md:hidden">
          <a href="#" className="block text-gray-700 hover:text-primaryDark py-2">Home</a>
          <a href="#" className="block text-gray-700 hover:text-primaryDark py-2">About</a>
          <a href="#" className="block text-gray-700 hover:text-primaryDark py-2">Services</a>
          <a href="#" className="block text-gray-700 hover:text-primaryDark py-2">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
