import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxHeight?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  maxHeight = "80vh",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-gray-200 text-gray-800 rounded-lg shadow-lg max-w-md w-full relative z-10 flex flex-col overflow-hidden"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ maxHeight }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl cursor-pointer bg-none border-none p-1 leading-none"
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div className="flex-grow overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
