import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdoptForm from "./views/AdoptForm";
import DonationList from "./views/DonationList";
import Navbar from "./components/Navbar";
import VolunteerForm from "./views/VolunteerForm";
import DashboardRoutes from "./views/dashboard/DashboardRoutes";
import Home from "./views/home/Home";
import AnimalProfile from "./components/AnimalProfile";
import LandingPage from "./views/LandingPage";
import UsersRoutes from "./views/dashboard/user/UsersRoutes";
import RefugeeRoutes from "./views/dashboard/refugee/RefugeeRoutes";
import Login from "./components/Login";
import Footer from "./components/Footer";
import RegisterPage from "./views/RegisterPage";
// import MessageShelterModal from "./components/MessageShelterModal";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<RegisterPage />} />
          <Route path="/donationlist" element={<DonationList />} />
          <Route path="/volunteerform" element={<VolunteerForm />} />
          <Route path="/adoptform" element={<AdoptForm />} />
          <Route path="/animalprofile/:id" element={<AnimalProfile />} />

          {/* Ruta del usuario refugio y sus subrutas */}
          <Route path="/refugee" element={<RefugeeRoutes />} />

          {/* Ruta del usuario adoptante? volunteer? y sus subrutas */}
          <Route path="/user" element={<UsersRoutes />} />

          {/* Ruta del dashboard y sus subrutas */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
