import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserPhoto,
  updateUserProfile,
} from "../../../../redux/actions/userActions";
import { RootState } from "@/redux/store";
import { DonationInterface } from "@/interfaces/IDonation.ts";
import { AdoptionRequest } from "@/interfaces/AdoptionRequestInterface";
import { FaUserCircle } from "react-icons/fa";
import ImageUpload from "./ImageUpload.tsx";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import DonationForm from "@/views/DonationForm.tsx";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: userData,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);

  const { user } = useSelector((state: RootState) => state.auth);


  const userId = user?.id;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState<"profile" | "donations" | "adoptions">(
    "profile"
  );

  const [profilePhoto, setProfilePhoto] = useState(user?.photo || "");
  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const userRole = user?.role || "guest";

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

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
      if (userData.photo) {
        setProfilePhoto(userData.photo);
      }
    }
  }, [userData]);

  useEffect(() => {
    const fetchDonations = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiUrl}/donations/donation-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data = await response.json();

        const filteredDonations = data.donationRequests.filter(
          (donation: DonationInterface) => donation.refugee_id === userId
        );

        setDonations(filteredDonations || []);
      } catch (error) {
        setDonationsError(
          error instanceof Error ? error.message : "Error al cargar las donaciones."
        );
        console.error("Error fetching donations:", error);
      } finally {
        setDonationsLoading(false);
      }
    };

    if (activeTab === "donations") {
      fetchDonations();
    }
  }, [apiUrl, activeTab, userId]);

  useEffect(() => {
    const fetchAdoptionRequests = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiUrl}/adoptions/requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch adoption requests");
        }

        const data = await response.json();
        setAdoptionRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      }
    };

    if (activeTab === "adoptions") {
      fetchAdoptionRequests();
    }
  }, [apiUrl, activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    if (user?.id) {
      dispatch(updateUserProfile(user.id, filteredFormData as FormData));
      setIsEditing(false);
    } else {
      console.error("El usuario no tiene un ID válido para actualizar.");
    }
  };

  const handleUpload = (file: File, url: string) => {
    if (!userId) {
      return;
    }
  
    // Usar 'file' sin afectar la lógica
    console.log("Archivo subido:", file);
  
    setIsImageLoading(true);
  
    dispatch(updateUserPhoto(userId, url)).then(() => {
      dispatch(fetchUserProfile(userId)).finally(() => {
        setIsImageLoading(false);
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 mt-20">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
          {isImageLoading ? (
            <Spinner />
          ) : profilePhoto ? (
            <img
              src={profilePhoto}
              alt="User Profile"
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
            />
          ) : (
            <FaUserCircle className="text-gray-400" size={48} />
          )}
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
          <ImageUpload onUpload={handleUpload} />
        </div>
      </div>

      <div className="flex justify-center border-b mb-6">
        {["profile", "donations", "adoptions"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "profile" | "donations" | "adoptions")
            }
            className={`pb-2 px-4 text-lg ${
              activeTab === tab
                ? "text-secondaryDark border-b-2 border-secondaryDark font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab === "profile" && "Perfil"}
            {tab === "donations" && "Donaciones"}
            {tab === "adoptions" && "Solicitudes de Adopción"}
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
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Historial de Donación
        </h3>
        {donationsLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        ) : donationsError ? (
          <p className="text-red-500">{donationsError}</p>
        ) : donations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg text-gray-700">
                    {donation.title}
                  </h4>
                  {donation.targetAmountMoney && (
                    <span className="text-primaryLight text-l font-bold">
                      {donation.targetAmountMoney}€
                    </span>
                  )}
                </div>
                {donation.imageUrl && (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mb-4">
                    <img
                      src={donation.imageUrl}
                      alt={donation.title}
                      className="object-contain h-full w-full"
                    />
                  </div>
                )}
                <p className="text-gray-600 text-sm line-clamp-3">
                  {donation.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay donaciones registradas.</p>
        )}
        {userRole === "refugee" && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Agregar Nueva Donación
            </h3>
            <DonationForm />
          </div>
        )}
      </div>
      
      )}

      {activeTab === "adoptions" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Solicitudes de Adopción</h3>
          {adoptionRequests.length > 0 ? (
            <ul className="space-y-2">
              {adoptionRequests.map((request) => (
                <li key={request.petName} className="border p-4 rounded-md">
                  <p>{request.date}</p>
                  <p>{request.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay solicitudes de adopción.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
