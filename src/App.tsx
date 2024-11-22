import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgotpassword" element={<ForgotPassword apiEndpoint={''} />} />
    </Routes>
  );
}

export default App;



