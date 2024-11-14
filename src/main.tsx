import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import Home from './views/home/Home.tsx';
import './styles/App.css'; // Asegúrate de que la ruta sea correcta


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
