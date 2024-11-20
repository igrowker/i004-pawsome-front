import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;



