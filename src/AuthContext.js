import React, { createContext, useState, useEffect } from 'react';

// Create a context for auth and bookings
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  bookings: [], // Added state for bookings
  addBooking: () => {}, // Added function to add a booking
});

// Auth provider component
export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Initialize bookings state, for now we won't persist this to localStorage
  const [bookings, setBookings] = useState([]);

  // Add a booking to the bookings state
  const addBooking = (newBooking) => {
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  };

  // Update localStorage when the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // The context value that will be supplied to any descendants of this component.
  const contextValue = {
    user,
    setUser,
    bookings, // Provide bookings in the context value
    addBooking, // Provide addBooking in the context value
  };

  // The provider component wraps any components that need the context.
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
