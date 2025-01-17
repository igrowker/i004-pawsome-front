import React, { useState } from 'react';

interface UploadPhotoProps {
  onPhotoUpload: (photoUrl: string) => void;
  buttonText?: string; // Permite cambiar el texto del botón (por defecto, "Editar foto").
  validateFile?: boolean; // Controla si se deben realizar las validaciones.
  requireToken?: boolean; 
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onPhotoUpload, buttonText = 'Editar foto', validateFile = true ,requireToken = true }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file)
    if (!file) return;

    if (validateFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setError('La imagen debe ser formato .jpg, .png o .webp.');
        return;
      }

      if (file.size > maxSize) {
        setError('La imagen debe pesar menos de 5 MB.');
        return;
      }
    }

    setError(null);
    setLoading(true);

    try {
        const formData = new FormData();
        formData.append('file', file);

        const headers: Record<string, string> = {};
        if (requireToken) {
          headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
  
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/files/upload`, {
          method: 'POST',
          headers,
          body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al subir la imagen.');
        }

        const result = await response.json();
        onPhotoUpload(result.url);
    } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : 'Error desconocido.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="relative">
      <label
        htmlFor="upload-photo"
        className="hover:bg-secondaryLight bg-primaryLight text-white py-1 px-3 rounded-full text-sm cursor-pointer"
        style={{ marginLeft: '16px' }}
      >
        {loading ? 'Subiendo...' : buttonText}
      </label>
      <input
        id="upload-photo"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UploadPhoto;
