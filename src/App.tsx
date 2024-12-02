import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import NotFound from "./components/notFound";
import Logout from "./components/Logout";
import ForgotPassword from "./components/ForgotPassword";
import RegisterForm from "./components/RegisterForm";
import RegisterRefugeeForm from "./components/RegisterRefugeeForm";
import RegisterPage from "./views/RegisterPage";
import About from "./views/About";
import PrivacyPolicy from "./views/PrivacyPolicy";
import NotificationContainer from "./components/NotificationContainer";
import AdoptPage from "./views/adopt";
import VolunteeringList from './views/VolunteeringList';
import DonationForm from "./views/DonationForm";
import DonationSuccess from "./components/DonationSuccess";
import DonationAmount from "./components/DonationAmount";
import DonationCancel from "./components/DonationCancel";
import InKindDonationForm from "./views/InKindDonationForm";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signin" element={<RegisterPage />} />
          <Route path="/donationlist" element={<DonationList />} />
          <Route path="/donation-amount" element={<DonationAmount />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/donation-cancel" element={<DonationCancel />} />
          <Route path="/volunteerform" element={<VolunteerForm />} />
          <Route path="/adopt/:animal_id" element={<AdoptPage />} />
          <Route path="/animalprofile/:id" element={<AnimalProfile />} />
          <Route path="/volunteeringlist" element={<VolunteeringList/>} /> 
          <Route path="/donation-form" element={<DonationForm />} />
          <Route path="/in-kind-donation" element={<InKindDonationForm />} />
          <Route
            path="/forgotpassword"
            element={<ForgotPassword apiEndpoint={""} />}
          />
          <Route
            path="userRegister"
            element={<RegisterForm></RegisterForm>}
          ></Route>
          <Route
            path="/shelterRegister"
            element={<RegisterRefugeeForm></RegisterRefugeeForm>}
          ></Route>
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          {/* Ruta del usuario refugio y sus subrutas */}
          <Route path="/refugee" element={<RefugeeRoutes />} />

          {/* Ruta del usuario adoptante? volunteer? y sus subrutas */}
          <Route path="/user" element={<UsersRoutes />} />

          {/* Ruta del dashboard y sus subrutas */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <NotificationContainer />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;