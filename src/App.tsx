import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import AdoptForm from './views/AdoptForm';
import AnimalProfile from './views/AnimalProfile';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/formulario-de-adopcion" element={<AdoptForm />} />
        <Route path="/animal-profile" element={<AnimalProfile />} />
      </Routes>
    </Router>
  );
}

export default App;



/*
    <div className="">
      <h1 className="bg-primaryLight p-5">PrimaryLight</h1>
      <h1 className="bg-primaryDark p-5">PrimaryDark</h1>
      <h1 className="bg-secondaryDark p-5">SecondaryLight</h1>
      <h1 className="bg-secondaryLight p-5">SecondaryDark</h1>
      <h1 className="bg-dark text-light p-5" >dark(backround), light(text)</h1>
      <h1 className="bg-secondaryLight p-5">ROBOTO</h1>

    </div>
    */