import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import RentNow from './RentNow';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Set Homepage as the default route */}
        <Route path="/rent-now" element={<RentNow />} /> {/* Use URL-friendly path */}
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
