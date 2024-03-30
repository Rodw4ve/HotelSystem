import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Homepage from './Homepage';
import BookNow from './BookNow';
import LogIn from './LogIn'; // Import the LogIn component
import Profile from './Profile'; // Import the Profile component
import BookedRooms from './BookedRooms';
import CustomerBookings from './CustomerBookings';
import HotelService from './HotelService';

import './App.css';

function App() {
  return (
    <AuthProvider> {/* Open the AuthProvider here */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rent-now" element={<RentNow />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booked-rooms" element={<BookedRooms />} />
          {/* Add additional routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
