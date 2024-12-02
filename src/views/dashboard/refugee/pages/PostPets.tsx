import React, { useState } from "react";
import axios from "axios";
import { apiUrls } from "@/config";

const AnimalForm = () => {
  const [formData, setFormData] = useState({
    refugee_id: "",
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

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
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

  const handleConditionChange = (index, value) => {
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

  const handleVaccinationChange = (index, field, value) => {
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

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación de la descripción
    if (formData.description.length < 10 || formData.description.length > 200) {
      newErrors.description =
        "La descripción debe tener entre 10 y 200 caracteres.";
    }

    // Validación del nombre
    if (formData.name.length < 2 || formData.name.length > 30) {
      newErrors.name = "El nombre debe tener entre 2 y 30 caracteres.";
    }

    // Puedes añadir más validaciones aquí si es necesario

    setErrors(newErrors);

    // Si no hay errores, retornamos true para permitir el envío del formulario
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    if (!validateForm()) {
      return; // Si hay errores, no enviamos el formulario
    }

    setIsSubmitting(true);

    try {
      // Enviar imágenes al backend para subir a Cloudinary
      const photoUrls = [];
      const formDataForFiles = new FormData();

      for (const image of images) {
        formDataForFiles.append("file", image); // Nombre del campo que el backend espera
      }

      const uploadResponse = await axios.post(
        apiUrls.filesUpload(),
        formDataForFiles,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta del backend:", uploadResponse.data);

      if (uploadResponse.data.url) {
        photoUrls.push(uploadResponse.data.url);
      } else {
        throw new Error("La respuesta del backend no contiene una URL.");
      }
      // Agregar las URLs de las fotos al formulario
      const payload = { ...formData, photos: photoUrls };
      const token = localStorage.getItem("token"); // Si lo almacenas en localStorage

      // Enviar el formulario completo al backend
      const response = await axios.post(apiUrls.postAnimal(), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Animal creado:", response.data);
      alert("Animal creado exitosamente");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar los datos");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="refugee_id"
        placeholder="ID del refugio"
        value={formData.refugee_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <label>Estado de salud:</label>

      <select
        name="species"
        value={formData.species}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar la especie</option>
        <option value="gato">Perro</option>
        <option value="perro">Gato</option>
        <option value="otros">Otros</option>
      </select>
      <input
        type="text"
        name="breed"
        placeholder="Raza"
        value={formData.breed}
        onChange={handleChange}
        required
      />

      {/* Selector para health_status */}
      <label>Estado de salud:</label>
      <select
        name="health_status"
        value={formData.health_status}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar estado de salud</option>
        <option value="sano">Sano</option>
        <option value="enfermo">Enfermo</option>
        <option value="discapacitado">Discapacitado</option>
      </select>

      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        required
      />
      {errors.description && (
        <p style={{ color: "red" }}>{errors.description}</p>
      )}

      <select
        name="adoption_status"
        value={formData.adoption_status}
        onChange={handleChange}
        required
      >
        <option value="">Seleccionar estado de adopción</option>
        <option value="disponible">Disponible</option>
        <option value="en proceso">En proceso</option>
        <option value="adoptado">Adoptado</option>
      </select>

      <div>
        <label>Condiciones de salud:</label>
        {formData.medicalHistory.conditions.map((condition, index) => (
          <input
            key={index}
            type="text"
            value={condition}
            onChange={(e) => handleConditionChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddCondition}>
          Agregar condición
        </button>
      </div>

      <div>
        <label>Vacunas:</label>
        {formData.medicalHistory.vaccinations.map((vaccination, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nombre"
              value={vaccination.name}
              onChange={(e) =>
                handleVaccinationChange(index, "name", e.target.value)
              }
            />
            <input
              type="date"
              value={vaccination.date}
              onChange={(e) =>
                handleVaccinationChange(index, "date", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleAddVaccination}>
          Agregar vacuna
        </button>
      </div>

      <div>
        <label>Fotos:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default AnimalForm;
