import React, { ChangeEvent, useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice";

interface ImageUploadProps {
  onUpload: (file: File, url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url } = response.data;

      if (url) {
        onUpload(file, url);
        dispatch(
          addNotification({
            type: "success",
            message: "Imagen subida con éxito.",
          })
        );
      } else {
        throw new Error("La respuesta no contiene una URL válida.");
      }
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message:
            "Error al cargar la imagen. Asegúrate de que sea un archivo válido.",
        })
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor="upload-photo"
        className="hover:bg-secondaryLight bg-primaryLight text-white py-1 px-3 rounded-full text-sm cursor-pointer"
        style={{ marginLeft: "16px" }}
      >
        {uploading ? "Subiendo..." : "Editar foto"}
      </label>

      <input
        id="upload-photo"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
