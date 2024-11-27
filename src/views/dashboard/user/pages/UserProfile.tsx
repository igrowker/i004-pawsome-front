import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../../../redux/actions/userActions";
import { RootState } from "@/redux/rootReducer";
import UploadPhoto from "@/components/UploadPhoto";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { data: userData, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState<"profile" | "donations" | "requests">(
    "profile"
  );

  const [profilePhoto, setProfilePhoto] = useState<string>("https://via.placeholder.com/150");
  const [donations, setDonations] = useState<any[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (userData) {
      setFormData({ name: userData.name, email: userData.email, password: "" });
      if (userData.profilePhoto) {
        setProfilePhoto(userData.profilePhoto);
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/donations`);
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [apiUrl]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/adoption-requests`);
        const data = await response.json();
        setAdoptionRequests(data);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      }
    };

    fetchAdoptionRequests();
  }, [apiUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user.id) {
      dispatch(updateUserProfile(user.id, formData));
      setIsEditing(false);
    }
  };

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
          <h2 className="text-2xl font-semibold text-gray-900">
            {userData ? userData.name : "No tienes nombre"}
          </h2>
          <p className="text-secondaryDark text-sm">
            {userData ? userData.email : "No tienes email"}
          </p>
        </div>

        <div className="ml-auto">
          <UploadPhoto onPhotoUpload={setProfilePhoto} />
        </div>
      </div>

      <div className="flex justify-center border-b mb-6">
        {["profile", "donations", "requests"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "profile" | "donations" | "requests")}
            className={`pb-2 px-4 text-lg ${
              activeTab === tab
                ? "text-secondaryDark border-b-2 border-secondaryDark font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab === "profile" && "Perfil"}
            {tab === "donations" && "Donaciones"}
            {tab === "requests" && "Solicitudes"}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Editar Perfil</h3>
          {loading && <p>Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="hover:bg-secondaryLight bg-primaryLight text-white px-4 py-2 rounded-full mb-4"
          >
            {isEditing ? "Cancelar" : "Editar perfil"}
          </button>

          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Contraseña (opcional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="hover:bg-secondaryLight bg-primaryLight text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Guardar cambios
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === "donations" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Historial de donación</h3>
          <div className="space-y-4">
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm"
                >
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
              ))
            ) : (
              <p>No has realizado donaciones aún.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Solicitudes de adopción</h3>
          <div className="space-y-4">
            {adoptionRequests.length > 0 ? (
              adoptionRequests.map((request, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-2xl shadow-sm"
                >
                  <p className="text-gray-700">
                    <strong>Pet:</strong> {request.petName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <strong>Date:</strong> {request.date}
                  </p>
                </div>
              ))
            ) : (
              <p>No tienes solicitudes de adopción pendientes.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
