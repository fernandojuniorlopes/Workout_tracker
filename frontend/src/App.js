import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Homepage'
import NavigationBar from './components/NavigationBar';
import LoggedInNavbar from './components/LoggedInNavbar';
import AddWorkoutForm from './components/AddWorkoutForm';
import { UserProvider } from './contexts/UserContext';
const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {/* Homepage content */}
    </div>
  );
};

const App = () => {
  const isAuthenticated = () => {
    // Check and log the value retrieved from localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    const response = localStorage.getItem('response')
    // console.log('Value of loggedIn in localStorage:', loggedIn);
    // console.log(response)
  
    return loggedIn === 'true'; // For instance, checking the token in local storage
  };  

  return (
    <UserProvider>
      <Router>
              {isAuthenticated() ? <LoggedInNavbar /> : <NavigationBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route
          path="/workout-calendar"
          element={isAuthenticated() ? <AddWorkoutForm /> : <Navigate to="/" />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
