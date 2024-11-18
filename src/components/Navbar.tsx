"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiInfo } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { icon: FiHome, text: "Home", href: "/" },
    { icon: CiUser, text: "Profile", href: "/" },
    { icon: FaPaw, text: "Adopt", href: "/" },
    { icon: FiInfo, text: "About us", href: "/" },
    { icon: CiLogout, text: "Log out", href: "/" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6AB4A8] p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Logo</div>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute top-0 right-0 bottom-0 w-[80%] sm:w-[385px] bg-[#6AB4A8] text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end">
                <button
                  className="text-white focus:outline-none mr-1 mt-1"
                  onClick={() => setIsOpen(false)}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="flex justify-between items-center px-5">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 px-3">
                  <FaRegUser className="w-10 h-10 " />
                </div>
                <div className="flex flex-col ml-4">
                  <span className="font-bold">Welcome</span>
                  <p className="text-xs">
                    Log in to your account to adopt, view your favorites, etc.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center px-4 py-2 gap-2 text-sm w-full">
                <button className="flex-1 py-2 bg-primaryDark text-white rounded-md">
                  Login
                </button>
                <button className="flex-1 py-2 bg-light border border-primaryDark text-primaryDark rounded-md ml-2">
                  Subscribe
                </button>
              </div>

              <nav className="flex-grow overflow-y-auto bg-gray-50 text-primaryDark">
                <ul className="space-y-2 p-6">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="opacity-0 animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="font-medium">{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-white/20">
                <p className="text-sm text-center">© 2024 Pawsome.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
