import React from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';

const LoggedInNavbar = () => {
  const handleLogout = () => {
        // Clear the login status or token from state or storage
        localStorage.removeItem('loggedIn'); // Assuming login status is stored in localStorage
    
        // Redirect the user to the login page or homepage
        window.location.href = '/login'; // Replace '/login' with your desired redirection path
      };
  return (
    <div className="navigation-bar">
      <nav className="navbar">
        <ul className="left-links">
          <li className="left-links li"><Link to="/"><b>Home</b></Link></li>
          <li className="left-links li"><Link to="/workout-calendar"><b>Workouts</b></Link></li>
          <li className="left-links li"><Link to="/calendar"><b>Calendar</b></Link></li>
        </ul>
        <ul className="right-links"> 
          <li className="right-links li"><b onClick={handleLogout}>Logout</b></li>
          <li className="right-links li"><b>Welcome </b></li>
          {/* Add more navigation links */}
        </ul>
      </nav>
    </div>
  );
};

export default LoggedInNavbar;
