import React, { useState } from 'react';
import './EmployeeProfile.css'; // Make sure to have this CSS file for styling

const EmployeeProfile = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ rentingId: '', amount: '' });
  const [bookingId, setBookingId] = useState('');

  const openCheckInModal = (bookingId = '') => {
    setBookingId(bookingId);
    setIsCheckInModalOpen(true);
  };

  const handleCheckIn = () => {
    console.log(`Checking in booking ID: ${bookingId}`);
    // Handle check-in logic here, such as updating booking status in the backend
    setIsCheckInModalOpen(false); // Close modal after check-in
  };

  const openPaymentModal = (rentingId = '', amount = '') => {
    setPaymentDetails({ rentingId, amount });
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = () => {
    console.log(`Processing payment for Renting ID: ${paymentDetails.rentingId} with amount: ${paymentDetails.amount}`);
    // Handle payment logic here
    setIsPaymentModalOpen(false); // Close modal after processing
  };

  return (
    <div className="EmployeeProfile">
      <h1>Employee Dashboard</h1>
      <div>
        <button onClick={() => openCheckInModal(123)}>Check in Booking</button>
        <button onClick={() => openPaymentModal(456, '150.00')}>Process Payment</button>
      </div>
      
      {isCheckInModalOpen && (
        <div className="modal">
          <h2>Check-in Booking</h2>
          <p>Booking ID: {bookingId}</p>
          <button onClick={handleCheckIn}>Confirm Check-in</button>
          <button onClick={() => setIsCheckInModalOpen(false)}>Cancel</button>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="modal">
          <h2>Process Payment</h2>
          <p>Enter payment details below:</p>
          <input
            type="text"
            placeholder="Renting ID"
            value={paymentDetails.rentingId}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, rentingId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Amount"
            value={paymentDetails.amount}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
          />
          <button onClick={handleProcessPayment}>Submit Payment</button>
          <button onClick={() => setIsPaymentModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
