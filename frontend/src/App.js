import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Homepage'

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {/* Homepage content */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
