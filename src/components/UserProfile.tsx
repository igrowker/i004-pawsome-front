import React, { useState } from 'react';

interface Donation {
  charity: string;
  date: string;
  amount: string;
}

interface AdoptionRequest {
  animal: string;
  status: string;
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('donations');

  const donations: Donation[] = [
    { charity: 'Animal Rescue Trust', date: '2023-09-15', amount: '$100' },
    { charity: 'Wildlife Foundation', date: '2023-08-10', amount: '$50' }
  ];

  const adoptionRequests: AdoptionRequest[] = [
    { animal: 'Bella the Labrador', status: 'Approved' },
    { animal: 'Max the Beagle', status: 'Pending' }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="https://via.placeholder.com/50"
          alt="User Profile"
          className="w-12 h-12 rounded-full mb-4 sm:mb-0 sm:mr-6"
        />
        <div>
          <h2 className="text-2xl font-bold">Alexandra Johnson</h2>
          <p className="text-gray-500">alexandra.j@example.com</p>
        </div>
        <button className="ml-auto mt-4 sm:mt-0 bg-green-200 text-green-800 py-2 px-4 rounded-lg">
          Edit
        </button>
      </div>

      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 pb-2 text-lg ${activeTab === 'profile' ? 'border-b-2 border-green-600' : ''}`}
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`flex-1 pb-2 text-lg ${activeTab === 'donations' ? 'border-b-2 border-green-600' : ''}`}
        >
          Donaciones
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 pb-2 text-lg ${activeTab === 'requests' ? 'border-b-2 border-green-600' : ''}`}
        >
          Solicitudes
        </button>
      </div>

      {activeTab === 'donations' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Historial de donación</h3>
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
        <div>
          <h3 className="text-xl font-semibold mb-4">Solicitudes de adopción</h3>
          {adoptionRequests.map((request, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
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
