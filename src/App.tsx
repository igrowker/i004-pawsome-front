import { Routes, Route } from 'react-router-dom';

import React from 'react';
import Login from './components/Login';
import RegisterPage from './views/RegisterPage';


const App: React.FC = () => {

  return (
    
      <Routes>
      <Route path="/login" element={<Login />} />
    {/* <div className="">
      <h1 className="bg-primaryLight p-5">PrimaryLight</h1>
      <h1 className="bg-primaryDark p-5">PrimaryDark</h1>
      <h1 className="bg-secondaryDark p-5">SecondaryLight</h1>
      <h1 className="bg-secondaryLight p-5">SecondaryDark</h1>
      <h1 className="bg-dark text-light p-5" >dark(backround), light(text)</h1>
      <h1 className="bg-secondaryLight p-5">ROBOTO</h1>
    </div> */}
    <Route path="/register" element={<RegisterPage />}  ></Route>
    </Routes> 
    
  );
}

export default App;