import { Dashboard } from '@mui/icons-material';
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoProvider } from './Context/Provider';
import { DashBoardPage } from './Pages/DashBoard/DashBoardPage';
import { HomePage } from './Pages/Home/Home';
import { LoginForm } from './Pages/LogIn/LogInForm';
import { RegistrationForm } from './Pages/Registration/RegistrationForm';

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} ></Route>  
            <Route path="register" element={<RegistrationForm />} ></Route>
            <Route path="login" element={<LoginForm />} ></Route>
            <Route path="dashboard" element={<DashBoardPage />}> </Route>
          </Routes>
        </Router>
      </TodoProvider>

    </div>
  );
}

export default App;
