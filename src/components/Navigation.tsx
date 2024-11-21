import React from 'react';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setActiveView }) => (
  <nav className="flex bg-white border-b">
    <button
      onClick={() => setActiveView('refugios')}
      className={`flex-1 py-3 px-4 text-center font-medium ${
        activeView === 'refugios' ? 'border-b-2 border-teal-500' : 'text-gray-500'
      }`}
    >
      Refugios
    </button>
    <button
      onClick={() => setActiveView('adopciones')}
      className={`flex-1 py-3 px-4 text-center font-medium ${
        activeView === 'adopciones' ? 'border-b-2 border-teal-500' : 'text-gray-500'
      }`}
    >
      Adopciones
    </button>
  </nav>
);

export default Navigation;
