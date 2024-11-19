import { Routes, Route } from "react-router-dom";
import UsersRoutes from "./user/UsersRoutes";
import RefugeeRoutes from "./refugee/RefugeeRoutes";
import AdminRoutes from "./admin/AdminRoutes";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Bienvenido al Dashboard</h1>} />

      <Route path="user/*" element={<UsersRoutes />} />
      <Route path="refugee/*" element={<RefugeeRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default DashboardRoutes;
