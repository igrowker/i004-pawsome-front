import { Routes, Route } from "react-router-dom";
import AllUsers from "./pages/AllUsers";
import AllRefugees from "./pages/AllRefugees";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AllUsers />} />
      <Route path="/" element={<AllRefugees />} />
    </Routes>
  );
}

export default AdminRoutes;
