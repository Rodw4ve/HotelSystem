// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <div className="nav-group left">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </div>
        <div className="nav-group right">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/booked-rooms">Booked Rooms</Link></li>
          <li><Link to="/book-now">Book Now</Link></li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
