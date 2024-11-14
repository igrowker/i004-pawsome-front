import { Routes, Route } from "react-router-dom";

import RegisterPage from './RegisterPage';

function RegisterRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default RegisterRoutes;
