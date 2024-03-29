const express = require('express');
const router = express.Router();
const rentingController = require('../controllers/rentingController');

// Endpoint to check in a customer and rent a room (convert a booking to a rental)
router.post('/check-in/:bookingId', rentingController.checkInAndRentRoom);

// Endpoint to rent a room directly without a prior booking
router.post('/direct-rent', rentingController.directRentRoom);

module.exports = router;
