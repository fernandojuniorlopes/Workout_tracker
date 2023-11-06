import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Homepage'
import NavigationBar from './components/NavigationBar';
import LoggedInNavbar from './components/LoggedInNavbar';
const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {/* Homepage content */}
    </div>
  );
};

// Wrap your workout calendar with the ProtectedRoute component
const WorkoutCalendar = () => {
  return <div>Your workout calendar content here</div>;
};

const App = () => {
  const isAuthenticated = () => {
    // Check and log the value retrieved from localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    console.log('Value of loggedIn in localStorage:', loggedIn);
  
    return loggedIn === 'true'; // For instance, checking the token in local storage
  };  

  return (
    <Router>
            {isAuthenticated() ? <LoggedInNavbar /> : <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route
        path="/workout-calendar"
        element={isAuthenticated() ? <WorkoutCalendar /> : <Navigate to="/" />}
      />
      </Routes>
    </Router>
  );
};

export default App;
