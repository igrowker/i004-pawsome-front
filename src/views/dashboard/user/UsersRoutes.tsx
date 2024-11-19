import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/Favorites";

function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default UsersRoutes;
