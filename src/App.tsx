import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import AdoptForm from './views/AdoptForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/formulario-de-adopcion" element={<AdoptForm />} />
      </Routes>
    </Router>
  );
}

export default App;
