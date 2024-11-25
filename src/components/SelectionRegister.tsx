import { useNavigate } from 'react-router-dom';

const SelectionUserRegister = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">Pawsome</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Un lugar, todos los refugios</p>
      <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] max-w-md">
        <p className="text-center text-lg font-medium mb-6">
          ¿Qué estás buscando?
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-primaryLight text-white py-3 rounded-xl font-medium text-lg"
            onClick={() => handleNavigate('/userRegister')}
          >
            Quiero adoptar
          </button>
          <button
            className="bg-secondaryLight text-white py-3 rounded-xl font-medium text-lg"
            onClick={() => handleNavigate('/refugeeRegister')}
          >
            Soy refugio
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionUserRegister;
