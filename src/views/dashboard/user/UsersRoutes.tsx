import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login"


function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      {/* Pendiente de hacer favorites ,no MVP */}
      <Route path="favorites" element={<Favorites />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default UsersRoutes;
