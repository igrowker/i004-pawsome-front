import React, { useState } from 'react';

const UploadPhoto: React.FC<{ onPhotoUpload: (photo: string) => void }> = ({ onPhotoUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setError('La imagen debe ser formato .jpg, .png o .webp.');
      return;
    }

    if (file.size > maxSize) {
      setError('La imagen debe pesar menos de 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError(null);
      onPhotoUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <label
        htmlFor="upload-photo"
        className="bg-green-400 text-white py-1 px-3 rounded-full text-sm cursor-pointer hover:bg-green-500"
        style={{ marginLeft: '16px' }}
      >
        Editar foto
      </label>
      <input
        id="upload-photo"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePhoto, setProfilePhoto] = useState<string>('https://via.placeholder.com/150');

  const donations = [
    { charity: 'Animal Rescue Trust', date: '2023-09-15', amount: '$100' },
    { charity: 'Wildlife Foundation', date: '2023-08-10', amount: '$50' },
  ];

  const adoptionRequests = [
    { animal: 'Bella the Labrador', status: 'Approved' },
    { animal: 'Max the Beagle', status: 'Pending' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
        <img
          src={profilePhoto}
          alt="User Profile"
          className="w-24 h-24 rounded-full mb-4 sm:mb-0"
        />
        <div className="flex flex-col sm:ml-4 sm:flex-grow">
          <h2 className="text-2xl font-bold text-gray-900">Alexandra Johnson</h2>
          <p className="text-[#b4a293]">alexandra.j@example.com</p>
        </div>
        <div className="flex-shrink-0">
          <UploadPhoto onPhotoUpload={setProfilePhoto} />
        </div>
      </div>

      <div className="flex justify-center border-b mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-2 px-4 text-lg ${
            activeTab === 'profile'
              ? 'text-[#b4a293] border-b-2 border-[#b4a293] font-bold'
              : 'text-gray-500'
          }`}
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`pb-2 px-4 text-lg ${
            activeTab === 'donations'
              ? 'text-[#b4a293] border-b-2 border-[#b4a293] font-bold'
              : 'text-gray-500'
          }`}
        >
          Donaciones
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-2 px-4 text-lg ${
            activeTab === 'requests'
              ? 'text-[#b4a293] border-b-2 border-[#b4a293] font-bold'
              : 'text-gray-500'
          }`}
        >
          Solicitudes
        </button>
      </div>

      {activeTab === 'donations' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Historial de donación</h3>
          {donations.map((donation, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p><strong>Charity:</strong> {donation.charity}</p>
              <p><strong>Date:</strong> {donation.date}</p>
              <p><strong>Amount:</strong> {donation.amount}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Solicitudes de adopción</h3>
          {adoptionRequests.map((request, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 w-full">
              <p><strong>Animal:</strong> {request.animal}</p>
              <p><strong>Status:</strong> {request.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

