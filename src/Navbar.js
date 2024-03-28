// Navbar.js
import React from 'react';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <div className="nav-group left">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Log In</a></li>
        </div>
        <div className="nav-group right">
          <li><a href="/profile">Profile</a></li>
          <li><a href="/rented-rooms">Rented Rooms</a></li>
          <li><a href="/rent-now">Rent Now</a></li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
