// components/BackButton.tsx
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, icon = <FaArrowLeft className="text-white z-20" />, className = "", to = "/home" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate cambia depende de en que vista estemos
        navigate(to);
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`bg-white text-center w-full sm:w-48 rounded-2xl h-14 relative text-black text-lg font-semibold group flex items-center justify-center overflow-hidden border-2 border-dark shadow-md hover:bg-dark hover:text-white hover:shadow-lg transition duration-300 ${className}`}
        >
            <div
                className="bg-dark rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 group-hover:w-full z-10 duration-500"
            >
                {React.cloneElement(icon as React.ReactElement, { className: "text-white" })}
            </div>
            <span className="z-0 group-hover:text-transparent text-black">Volver</span>
        </button>
    );
};

export default BackButton;
