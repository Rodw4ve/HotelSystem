const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// Endpoint to create a new booking
router.post('/', bookingsController.createBooking);

// Endpoint to update an existing booking
router.put('/:bookingId', bookingsController.updateBooking);

// Endpoint to cancel a booking
router.delete('/:bookingId', bookingsController.cancelBooking);

// Endpoint to view a specific customer's booking
router.get('/customer/:customerId', bookingsController.getCustomerBookings);


module.exports = router;
