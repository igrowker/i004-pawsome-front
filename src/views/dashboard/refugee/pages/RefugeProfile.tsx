import { useEffect, MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import RefugeDescription from "@/components/RefugeeDescription";
import { IAnimal } from "@/interfaces/IAnimal";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchRefugeeById } from "@/redux/actions/refugeeActions";
import BackButton from "@/components/VolverButton";
import { FaArrowLeft } from "react-icons/fa";
import PetCardPublic from "@/components/PetCardPublic";
import { DonationInterface } from "@/interfaces/IDonation";

export default function RefugeProfile() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data_refugee } = useSelector((state: RootState) => state.refugee);

  const [donations, setDonations] = useState<DonationInterface[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([]);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [donationsError, setDonationsError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"animals" | "donations">("animals");

  // Fetch data for the refugee
  useEffect(() => {
    if (id) {
      dispatch(fetchRefugeeById(id));
    }
  }, [id, dispatch]);

  // Filter animals when data_refugee changes
  useEffect(() => {
    if (data_refugee?.pets && Array.isArray(data_refugee.pets)) {
      setFilteredAnimals(data_refugee.pets);
    }
  }, [data_refugee]);

  // Fetch donations associated with the refugee
  useEffect(() => {
    if (data_refugee?._id) {
      fetchDonations();
    }
  }, [data_refugee]);

  const fetchDonations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donations/donation-requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data.donationRequests || !Array.isArray(data.donationRequests)) {
        throw new Error("Estructura inesperada en la respuesta del servidor");
      }
  
      const refugeeId = data_refugee.user_id || data_refugee._id;
      const filteredDonations = data.donationRequests.filter(
        (donation: DonationInterface) =>
          donation.refugee_id?.trim().toLowerCase() === refugeeId.trim().toLowerCase()
      );
  
      setDonations(filteredDonations);
    } catch (error) {
      setDonationsError(error instanceof Error ? error.message : "Error al cargar las donaciones.");
      console.error("Error fetching donations:", error);
    } finally {
      setDonationsLoading(false);
    }
  };

  const handleDonate = (donation: DonationInterface) => {
    if (donation.isMonetaryDonation) {
      navigate("/donation-amount", {
        state: {
          refugeeId: donation.refugee_id,
          donationId: donation._id,
          title: donation.title,
          description: donation.description,
        },
      });
    } else {
      navigate("/in-kind-donation", {
        state: {
          donationId: donation._id,
          title: donation.title,
        },
      });
    }
  };

  const getStylesTab = (tab: string) =>
    activeTab === tab ? "border-b-4 border-secondaryDark text-secondaryDark font-bold" : "";

  return (
    <>
      <div className="md:grid">
        <img
          src="/refugee-profile.png"
          alt="Imagen de perfil del refugio"
          className="w-full lg:hidden"
        />
        <div className="sm:w-[600px] lg:w-[900px] m-auto">
          <div className="mx-5 mt-[15px]">
            <div className="flex justify-between">
              <h2 className="font-roboto text-2xl self-center">{data_refugee?.name_refugee}</h2>
              <img className="mb-2" src="/refugee-profile-paw.png" alt="Imagen de patitar" />
            </div>
            <RefugeDescription RefugeeDescription={data_refugee?.description} />

            {/* Tabs */}
            <div className="flex justify-center mt-5">
              <button
                className={`px-4 py-2 ${getStylesTab("animals")}`}
                onClick={() => setActiveTab("animals")}
              >
                Animales
              </button>
              <button
                className={`px-4 py-2 ${getStylesTab("donations")}`}
                onClick={() => setActiveTab("donations")}
              >
                Donaciones
              </button>
            </div>

            {/* Content */}
            {activeTab === "animals" && (
              <div className="mt-5">
                {filteredAnimals.length === 0 ? (
                  <p className="text-gray-500 text-center">No hay animales para mostrar.</p>
                ) : (
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAnimals.map((animal) => (
                      <PetCardPublic
                        key={animal._id}
                        _id={animal._id}
                        name={animal.name}
                        photos={animal.photos}
                        breed={animal.breed}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "donations" && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold mb-4">Donaciones</h3>
                {donationsLoading ? (
                  <p className="text-gray-500">Cargando donaciones...</p>
                ) : donationsError ? (
                  <p className="text-red-500">{donationsError}</p>
                ) : donations.length === 0 ? (
                  <p className="text-gray-500">No hay donaciones para este refugio.</p>
                ) : (
                  <ul className="space-y-4">
                    {donations.map((donation) => (
                      <li key={donation._id} className="border p-4 rounded-md">
                        <p className="font-semibold">{donation.title}</p>
                        <p>{donation.description}</p>
                        {donation.isMonetaryDonation ? (
                          <p>Monto necesario: {donation.targetAmountMoney}€</p>
                        ) : (
                          <p>Artículos necesarios: {donation.targetItemsCount}</p>
                        )}
                        <button
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() => handleDonate(donation)}
                        >
                          {donation.isMonetaryDonation ? "Donar" : "Donar en especie"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <BackButton className="m-5 p-5 justify-self-center" icon={<FaArrowLeft />} to="/home" />
    </>
  );
}
