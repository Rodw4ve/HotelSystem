import React, { useState, useEffect } from 'react';
import { getCustomerBookings } from './HotelService';

const CustomerBookings = ({ customerId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getCustomerBookings(customerId);
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [customerId]);

    return (
        <div>
            <h2>Customer Bookings</h2>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.booking_id}>
                            Room ID: {booking.room_id}, Check-in: {booking.check_in_date}, Check-out: {booking.check_out_date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default CustomerBookings;