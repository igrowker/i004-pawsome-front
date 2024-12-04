import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Input from "@/components/ui/input";
import { createAnimal } from "@/redux/actions/animalActions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface IMedicalHitory {
  conditions: string[];
  vaccinations: { name: string; date: string }[];
}

interface IFormUpload {
  name: string;
  age: string;
  species: string;
  breed: string;
  health_status: string;
  medicalHistory: IMedicalHitory;
  description: string;
  adoption_status: string;
  photos: string[];
}

const AnimalForm = () => {
  const [formData, setFormData] = useState<IFormUpload>({
    name: "",
    age: "",
    species: "",
    breed: "",
    health_status: "",
    medicalHistory: {
      conditions: [],
      vaccinations: [],
    },
    description: "",
    adoption_status: "",
    photos: [],
  });
  const [error, setError] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [isSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.animal);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "age") {
      const ageValue = parseInt(value);
      if (isNaN(ageValue) || ageValue < 0 || ageValue > 25) {
        setError("La edad debe estar entre 0 y 25 años.");
      } else {
        setError("");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleAddCondition = () => {
    setFormData({
      ...formData,
      medicalHistory: {
        ...formData.medicalHistory,
        conditions: [...formData.medicalHistory.conditions, ""],
      },
    });
  };

  const handleConditionChange = (index: number, value: string) => {
    const updatedConditions = [...formData.medicalHistory.conditions];
    updatedConditions[index] = value;
    setFormData({
      ...formData,
      medicalHistory: {
        ...formData.medicalHistory,
        conditions: updatedConditions,
      },
    });
  };
  const handleRemoveCondition = (index: number) => {
    const newConditions = formData.medicalHistory.conditions.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: {
        ...prevData.medicalHistory,
        conditions: newConditions,
      },
    }));
  };

  const handleAddVaccination = () => {
    setFormData({
      ...formData,
      medicalHistory: {
        ...formData.medicalHistory,
        vaccinations: [
          ...formData.medicalHistory.vaccinations,
          { name: "", date: "" },
        ],
      },
    });
  };

  const handleVaccinationChange = (
    index: number,
    field: "name" | "date",
    value: string
  ) => {
    const updatedVaccinations = [...formData.medicalHistory.vaccinations];
    updatedVaccinations[index][field] = value;
    setFormData({
      ...formData,
      medicalHistory: {
        ...formData.medicalHistory,
        vaccinations: updatedVaccinations,
      },
    });
  };

  const handleRemoveVaccination = (index: number) => {
    const newVaccinations = formData.medicalHistory.vaccinations.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: {
        ...prevData.medicalHistory,
        vaccinations: newVaccinations,
      },
    }));
  };

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.description.length < 10 || formData.description.length > 200) {
      newErrors.description =
        "La descripción debe tener entre 10 y 200 caracteres.";
    }

    if (formData.name.length < 2 || formData.name.length > 30) {
      newErrors.name = "El nombre debe tener entre 2 y 30 caracteres.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    dispatch(createAnimal(formData, images));
    setImages(null);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg"
    >
      <div className="space-y-2">
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Especie:
        </label>
        <select
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar la especie</option>
          <option value="gato">Perro</option>
          <option value="perro">Gato</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          name="breed"
          placeholder="Raza"
          value={formData.breed}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Estado de salud:
        </label>
        <select
          name="health_status"
          value={formData.health_status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar estado de salud</option>
          <option value="sano">Sano</option>
          <option value="enfermo">Enfermo</option>
          <option value="discapacitado">Discapacitado</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}
        </div>

        <p className="text-gray-500 text-sm text-right">
          {formData.description.length}/200
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Estado de adopción:
        </label>
        <select
          name="adoption_status"
          value={formData.adoption_status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar estado de adopción</option>
          <option value="disponible">Disponible</option>
          <option value="en proceso">En proceso</option>
          <option value="adoptado">Adoptado</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Condiciones de salud:
        </label>
        {formData.medicalHistory.conditions.map((condition, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={condition}
              onChange={(e) => handleConditionChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {condition === "" && (
              <button
                type="button"
                onClick={() => handleRemoveCondition(index)}
                className="text-red-500 hover:text-red-700"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCondition}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar condición
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Vacunas:
        </label>
        {formData.medicalHistory.vaccinations.map((vaccination, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Nombre"
              value={vaccination.name}
              onChange={(e) =>
                handleVaccinationChange(index, "name", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={vaccination.date}
              onChange={(e) =>
                handleVaccinationChange(index, "date", e.target.value)
              }
              max={getTodayDate()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(vaccination.name === "" || vaccination.date === "") && (
              <button
                type="button"
                onClick={() => handleRemoveVaccination(index)}
                className="text-red-500 hover:text-red-700"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVaccination}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar vacuna
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Fotos:
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default AnimalForm;
