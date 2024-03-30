// BookedRooms.js

import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const BookedRooms = () => {
  const { bookings } = useContext(AuthContext);

  return (
    <div className="booked-rooms-container">
      <h1>Your Booked Rooms</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <p>Hotel: {booking.hotelName}</p>
              <p>Room Type: {booking.roomType}</p>
              {/* Add more booking details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-bookings-message">
          <p>You have not booked any rooms yet.</p>
          <p>Visit our <Link to="/book-now">Book Now</Link> page to find your perfect room.</p>
        </div>
      )}
    </div>
  );
};

export default BookedRooms;
