import { FaShieldDog } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-md w-full space-y-8 text-center relative">
        <h1 className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          4
          <span className="inline-block text-gray-600 animate-bounce">
            <FaShieldDog />
          </span>
          4
        </h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Oops! This page has escaped
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Our detective puppy is on the case. Help him find the missing page!
        </p>

        <div className="mt-8 h-24 bg-yellow-100 rounded-xl relative overflow-hidden border-4 border-yellow-300">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-3 bg-white px-4 py-2 rounded-lg shadow-lg">
            <span className="text-2xl font-bold text-purple-600">Paw</span>
            <span className="text-2xl font-bold text-pink-600">some</span>
            <span className="text-3xl animate-pulse">!</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Volver a la página principal
          </a>
          <a
            href="/adoptar"
            className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            Adoptar una mascota
          </a>
        </div>
      </div>
    </div>
  );
}
