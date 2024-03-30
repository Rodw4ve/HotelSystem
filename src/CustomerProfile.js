// CustomerProfile.js
import React, { useState, useContext } from 'react';
import './CustomerProfile.css'; // Make sure to have this CSS file for styling

const CustomerProfile = () => {
  const [customerDetails, setCustomerDetails] = useState({
    username: 'TheCustomer',
    fullName: 'John Doe',
    paymentHistory: [
      { id: 1, date: '2022-01-01', amount: '120.00' },
      { id: 2, date: '2022-02-15', amount: '200.00' },
      // ...more payments
    ],
  });

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // In a real scenario, the updates would also involve sending data to the server
  // Since we're hardcoding, this is just a placeholder
  const updateCustomerDetails = () => {
    console.log('Updated customer details: ', customerDetails);
    alert('Customer details updated (not really, but let’s pretend).');
  };

  return (
    <div className="customer-profile">
      <h1>Customer Profile</h1>
      <div className="customer-details">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={customerDetails.username}
            onChange={handleDetailChange}
            disabled // remove this if you want to allow editing
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={customerDetails.fullName}
            onChange={handleDetailChange}
          />
        </label>
        <button onClick={updateCustomerDetails}>Update Details</button>
      </div>
      <div className="payment-history">
        <h2>Payment History</h2>
        <ul>
          {customerDetails.paymentHistory.map((payment) => (
            <li key={payment.id}>
              {payment.date} - ${payment.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerProfile;
