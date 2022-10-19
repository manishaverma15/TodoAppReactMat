import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoardPageReducer } from './Pages/DashBoard/DashBoardReducer';
import { HomePage } from './Pages/Home/Home';
import { LoginForm } from './Pages/LogIn/LogInForm';
import { RegistrationForm } from './Pages/Registration/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} ></Route>
        <Route path="register" element={<RegistrationForm/>} ></Route>
        <Route path="login" element={<LoginForm/>} ></Route>
        <Route path="dashboard" element={<DashBoardPageReducer/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
