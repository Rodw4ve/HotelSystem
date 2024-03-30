import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust the port if your backend runs on a different port

export const getCustomerBookings = async (customerId) => {
    try {
        const response = await axios.get(`${API_URL}/bookings/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customer bookings:', error);
        throw error;
    }
};
export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const updateBooking = async (bookingId, updatedBookingData) => {
    try {
        const response = await axios.put(`${API_URL}/bookings/${bookingId}`, updatedBookingData);
        return response.data;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error;
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error('Error canceling booking:', error);
        throw error;
    }
};

export const checkInAndRentRoom = async (bookingId) => {
    try {
        const response = await axios.post(`${API_URL}/renting/check-in/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error('Error checking in and renting room:', error);
        throw error;
    }
};

export const directRentRoom = async (rentalData) => {
    try {
        const response = await axios.post(`${API_URL}/renting/direct-rent`, rentalData);
        return response.data;
    } catch (error) {
        console.error('Error renting room directly:', error);
        throw error;
    }
};
// Add more functions as needed to interact with other endpoints