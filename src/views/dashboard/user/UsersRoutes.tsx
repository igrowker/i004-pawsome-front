import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login"
import Logout from "../../../components/Logout";


function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserProfile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>
  );
}

export default UsersRoutes;
