import React, { useState } from 'react';

interface UploadPhotoProps {
  onPhotoUpload: (photo: string) => void;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onPhotoUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

    const reader = new FileReader();
    reader.onload = () => {
      setError(null);
      onPhotoUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative">
      <label
        htmlFor="upload-photo"
        className="bg-primaryLight text-white py-1 px-3 rounded-full text-sm cursor-pointer hover:bg-green-500"
        style={{ marginLeft: '16px' }}
      >
        Editar foto
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