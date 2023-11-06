import React from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <nav className="navbar">
        <ul className="left-links">
          <li className="left-links li"><Link to="/"><b>Home</b></Link></li>
        </ul>
        <ul className="right-links"> 
          <li className="right-links li"><Link to="/register"><b>Register</b></Link></li>
          <li className="right-links li"><Link to="/login"><b>Login</b></Link></li>
          {/* Add more navigation links */}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
