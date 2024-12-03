import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiInfo } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { logout } from "@/redux/actions/authActions";
import { AppDispatch } from "@/redux/store";
import { MdOutlinePets, MdFavoriteBorder } from "react-icons/md";
import { SiPetsathome } from "react-icons/si";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async () => {
    try {
      // Espera a que el logout se complete y recarga la página y redirige a home
      await dispatch(logout());
      setIsOpen(false);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

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
    { icon: FiHome, text: "Home", to: "/home" },
    ...(auth.user?.role === "user"
      ? [
          {
            icon: MdFavoriteBorder,
            text: "Favorite",
            to: "/dashboard/user/favorites",
          },
        ]
      : []),
    ...(auth.user?.role === "refugee"
      ? [
          {
            icon: SiPetsathome,
            text: "Your pets for adoption",
            to: "dashboard/refugee/petslist",
          },
        ]
      : []),
    ...(auth.user?.role === "refugee" || auth.user?.role === "user"
      ? [{ icon: CiUser, text: "Profile", to: "/user" }]
      : []),
    ...(auth.user?.role === "refugee"
      ? [
          {
            icon: MdOutlinePets,
            text: "Add new pet",
            to: "/dashboard/refugee/postpets",
          },
        ]
      : []),
    { icon: FiInfo, text: "About us", to: "/about" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-primaryLight p-4 shadow-md">
        <div className="flex justify-between items-center">
          <Link to="/home">
            <div className="text-white font-bold text-xl ">
              <img src="/paw2.png" alt="logo" className="w-40 h-30" />
            </div>
          </Link>
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
            className={`absolute top-0 right-0 bottom-0 w-[80%] sm:w-[385px] bg-primaryLight text-white shadow-xl transform transition-transform duration-300 ease-in-out ${
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

              <div className="flex justify-between items-center px-5 mb-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 text-gray-300 px-3">
                  <FaRegUser className="w-10 h-10" />
                </div>
                <div className="flex flex-col ml-4">
                  {isAuthenticated && user ? (
                    <>
                      <span className="font-bold">Welcome, {user.name}!</span>
                      <p className="text-xs">Enjoy your session.</p>
                    </>
                  ) : (
                    <>
                      <span className="font-bold">Welcome</span>
                      <p className="text-xs">
                        Log in to your account to adopt, view your favorites,
                        etc.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!isAuthenticated && (
                <div className="flex justify-center items-center px-4 py-2 gap-2 text-sm w-full">
                  <Link
                    to="/login"
                    className="flex-1 py-2 bg-primaryDark text-white rounded-md text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signin"
                    className="flex-1 py-2 bg-light border border-primaryDark text-primaryDark rounded-md ml-2 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Subscribe
                  </Link>
                </div>
              )}

              <nav className="flex-grow overflow-y-auto bg-gray-50 text-primaryDark">
                <ul className="space-y-2 p-6">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="opacity-0 animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Link
                        to={item.to}
                        className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="font-medium">{item.text}</span>
                      </Link>
                    </li>
                  ))}
                  {isAuthenticated && (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 px-4 py-3 w-full text-left rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <CiLogout className="h-6 w-6" />
                        <span className="font-medium">Log out</span>
                      </button>
                    </li>
                  )}
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
