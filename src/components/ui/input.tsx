
"use client";

import React, { useState, useRef, useEffect } from "react";

interface InputProps {
  placeholder?: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  
}

export default function Input({
  placeholder,
  name,
  type = "text",
  required = false,
  className = "",
  
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setHasValue(inputRef.current.value.length > 0);
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputRef.current) {
      setHasValue(inputRef.current.value.length > 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
  };

  return (
    <div className={`relative mb-4 ${className}`}>
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={name}
        required={required}
        className={`
          w-full px-3 py-2 text-base text-gray-700 border border-gray-300 rounded transition duration-200
          focus:outline-none focus:ring-2 focus:ring-primaryDark focus:border-transparent
          ${isFocused || hasValue ? "pt-2" : ""}
        `}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-3 top-2 text-gray-600 transition-all duration-200 ease-in-out pointer-events-none
          ${
            isFocused || hasValue
              ? "transform -translate-y-5 scale-75 text-primaryDark bg-white px-1"
              : ""
          }
        `}
      >
        {placeholder}
      </label>
    </div>
  );
}
