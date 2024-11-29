import { IRefuge } from "@/interfaces/IRefugee";

export const refuges: IRefuge[] = [
  {
    _id: "64d0f4c2b45302e4a7d3bc35",
    name: "Hogar de Animales Luna",
    address: "Calle Principal 123, Barcelona",
    contact_email: "contacto@hogarluna.org",
    phone: "+34 600 123 456",
    description:
      "Un refugio dedicado a cuidar gatos y perros en busca de un hogar amoroso.",
    animals: ["6739975cabab1984320cdbed", "8739475dabcd1984320cdefa"],
    photo: "https://urldefoto.com"
  },
  {
    _id: "64e0a1b4c45302e4a7d3bc22",
    name: "Refugio Esperanza",
    address: "Avenida Siempreviva 742, Valencia",
    contact_email: "info@refugioesperanza.org",
    phone: "+34 600 987 654",
    description:
      "Rescatamos animales abandonados y les ofrecemos una segunda oportunidad.",
    animals: ["73e9975cabab1984320cdbea"],
    photo: "https://urldefoto.com"
  },
  {
    _id: "64e1b4c5c45302e4a7d3bf44",
    name: "Santuario de Mascotas",
    address: "Calle falsa 89, Madrid",
    contact_email: "contact@santuariomascotas.com",
    phone: "+34 600 456 789",
    description:
      "Santuario dedicado al cuidado y bienestar de animales rescatados.",
    animals: ["83a9475cabbd1984320cdfab", "93b9875dabce2984320cdabc"],
    photo: "https://urldefoto.com"
  },
];
