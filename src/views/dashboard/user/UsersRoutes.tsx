import { Routes, Route } from "react-router-dom";
// import UserProfile from "./pages/UserProfile";
import UserProfile from "../../../components/UserProfile";
import Favorites from "./pages/Favorites";

function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      {/* Pendiente de hacer favorites ,no MVP */}
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default UsersRoutes;
