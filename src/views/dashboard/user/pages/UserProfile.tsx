import React, { useState } from 'react';
import UploadPhoto from '../../../../components/UploadPhoto';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'donations' | 'requests'>('profile');
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
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 mt-20">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
        <div className="flex items-center">
          <img
            src={profilePhoto}
            alt="User Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
        </div>
        <div className="flex flex-col sm:ml-6 sm:flex-grow text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Alexandra Johnson</h2>
          <p className="text-secondaryDark text-sm">alexandra.j@example.com</p>
        </div>

        <div className="ml-auto">
          <UploadPhoto onPhotoUpload={setProfilePhoto} />
        </div>
      </div>

      <div className="flex justify-center border-b mb-6">
        {['profile', 'donations', 'requests'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'profile' | 'donations' | 'requests')}
            className={`pb-2 px-4 text-lg ${activeTab === tab ? 'text-secondaryDark border-b-2 border-secondaryDark font-semibold' : 'text-gray-500'}`}
          >
            {tab === 'profile' && 'Perfil'}
            {tab === 'donations' && 'Donaciones'}
            {tab === 'requests' && 'Solicitudes'}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">Bienvenido a tu perfil</h3>
          <p className="text-gray-600">Aquí puedes gestionar tu información personal.</p>
        </div>
      )}

      {activeTab === 'donations' && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Historial de donación</h3>
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm">
                <p className="text-gray-700">
                  <strong className="font-medium">Charity:</strong> {donation.charity}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Date:</strong> {donation.date}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Amount:</strong> {donation.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Solicitudes de adopción</h3>
          <div className="space-y-4">
            {adoptionRequests.map((request, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm"> 
                <p className="text-gray-700">
                  <strong className="font-medium">Animal:</strong> {request.animal}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Status:</strong> {request.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;