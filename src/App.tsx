import { Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from './components/Login';
import RegisterPage from './views/RegisterPage';
import DashboardRoutes from './views/dashboard/DashboardRoutes';


const App: React.FC = () => {

  return (

    <Routes>
      <Route path='/' element={<DashboardRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />}  ></Route>
    </Routes>

  );
};

export default App;