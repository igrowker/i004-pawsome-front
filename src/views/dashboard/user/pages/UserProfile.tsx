import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../../../redux/actions/userActions";
import { RootState } from "@/redux/store";
import { useDispatch } from "@/redux/hooks";
import UploadPhoto from "@/components/UploadPhoto";
import { DonationInterface } from "@/interfaces/DonationInterface";
import { AdoptionRequest } from "@/interfaces/AdoptionRequestInterface";


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

  const [activeTab, setActiveTab] = useState<"profile" | "donations" | "requests">("profile");

  const [profilePhoto, setProfilePhoto] = useState<string>(
    "https://via.placeholder.com/150"
  );

  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    } else {
      console.error("El usuario no tiene un ID válido.");
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
        const response = await fetch(`${apiUrl}/donations/donation-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setDonations(data.donationRequests || []);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonationsError("Error al cargar las donaciones.");
      } finally {
        setDonationsLoading(false);
      }
    };

    if (activeTab === "donations") {
      fetchDonations();
    }
  }, [apiUrl, activeTab]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/adoption-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        const formattedRequests: AdoptionRequest[] = data.map((req: any) => ({
          petName: req.petName,
          status: req.status,
          date: req.date,
        }));
        setAdoptionRequests(formattedRequests);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      }
    };

    if (activeTab === "requests") {
      fetchAdoptionRequests();
    }
  }, [apiUrl, activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.id) {
      dispatch(updateUserProfile(user.id, formData));
      setIsEditing(false);
    } else {
      console.error("El usuario no tiene un ID válido para actualizar.");
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
            className="hover:bg-secondaryLight bg-primaryLight text-white px-4 py-2 rounded-md mb-4"
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
                className="hover:bg-secondaryLight bg-primaryLight text-white px-4 py-2 rounded-md"
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
          {donationsLoading ? (
            <p>Cargando donaciones...</p>
          ) : donationsError ? (
            <p className="text-red-500">{donationsError}</p>
          ) : donations.length > 0 ? (
            <ul className="space-y-4">
              {donations.map((donation) => (
                <li key={donation.id} className="p-4 border border-gray-200 rounded-md">
                  <h4 className="text-lg font-semibold">{donation.item}</h4>
                  <p className="text-gray-600">Monto objetivo: {donation.targetAmountMoney}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes donaciones registradas.</p>
          )}
        </div>
      )}

      {activeTab === "requests" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Solicitudes de Adopción</h3>
          {adoptionRequests.length > 0 ? (
            <ul className="space-y-4">
              {adoptionRequests.map((request, index) => (
                <li key={index} className="p-4 border border-gray-200 rounded-md">
                  <h4 className="text-lg font-semibold">{request.petName}</h4>
                  <p className="text-gray-600">Estado: {request.status}</p>
                  <p className="text-gray-600">Fecha: {new Date(request.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes solicitudes de adopción.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;