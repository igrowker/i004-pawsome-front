import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./views/dashboard/DashboardRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
