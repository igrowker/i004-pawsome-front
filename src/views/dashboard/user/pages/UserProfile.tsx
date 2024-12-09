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

  const [activeTab, setActiveTab] = useState<
    "profile" | "donations" | "requests" | "favorite"
  >("profile");

  const [profilePhoto, setProfilePhoto] = useState(user?.photo || "");

  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth = useSelector((state: RootState) => state.auth);

  const tabsByRole: { [key: string]: string[] } = {
    user: ["profile", "donations", "requests"],
    refugee: ["profile", "requests", "donations"],
  };

  const userRole = auth.user?.role || "guest";
  const allowedTabs = tabsByRole[userRole] || ["profile"];

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

        // Filtrar donaciones por refugee_id (ID del refugio actual)
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
      setFormData(filteredFormData as FormData);
    } else {
      console.error("El usuario no tiene un ID válido para actualizar.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 mt-20">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-100 overflow-hidden">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="User Profile"
              className="w-full h-full object-cover"
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
          <ImageUpload onUpload={() => {}} />
        </div>
      </div>

      <div className="flex justify-center border-b mb-6">
        {allowedTabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "profile" | "donations" | "requests" | "favorite")
            }
            className={`pb-2 px-4 text-lg ${activeTab === tab
              ? "text-secondaryDark border-b-2 border-secondaryDark font-semibold"
              : "text-gray-500"
              }`}
          >
            {tab === "profile" && "Perfil"}
            {tab === "donations" && "Donaciones"}
            {tab === "requests" && "Solicitudes"}
            {tab === "favorite" && "Favoritos"}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Editar Perfil
          </h3>
          {loading && <p>Cargando...</p>}
          {error && <p className="text-red-500">{error}</p>}
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
        </div>
      )}

      {activeTab === "donations" && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Historial de donación
          </h3>
          {donationsLoading ? (
            <p>Cargando donaciones...</p>
          ) : donationsError ? (
            <p className="text-red-500">{donationsError}</p>
          ) : donations.length > 0 ? (
            <ul className="space-y-2">
              {donations.map((donation) => (
                <li key={donation._id} className="border p-4 rounded-md">
                  <p>{donation.description}</p>
                  <p>{donation.targetAmountMoney}€</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay donaciones.</p>
          )}
          <h3 className="text-xl font-semibold mt-6 text-gray-800">
            Agregar nueva donación
          </h3>
          <DonationForm />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
