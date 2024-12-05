import React, { useEffect } from "react";

interface NotificationProps {
  id: string;
  type: "success" | "error";
  message: string;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const baseClasses =
    "p-4 rounded-md shadow-lg flex justify-between items-center mb-4";
  const typeClasses =
    type === "success" ? "bg-primaryLight text-white" : "bg-red-500 text-white";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <p>{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-white text-xl font-bold hover:text-gray-200 focus:outline-none"
      ></button>
    </div>
  );
};

export default Notification;
