export interface IAnimal {
  _id: string;
  refugee_id: string;
  name: string;
  age: number;
  species: string;
  breed?: string;
  health_status: string;
  medicalHistory?: {
    conditions: string[]; 
    vaccinations: { name: string; date: string }[]; 
  };
  description: string;
  photos: string[];
  adoption_status: "disponible" | "en proceso" | "adoptado";
  createdAt: string;
  updatedAt: string;
  sex: string
}
