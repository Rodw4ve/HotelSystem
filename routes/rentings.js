const express = require('express');
const router = express.Router();
const rentingsController = require('../controllers/rentingsController');

// Endpoint to check in a customer and rent a room (convert a booking to a rental)
router.post('/check-in/:bookingId', rentingsController.checkInAndRentRoom);

// Endpoint to rent a room directly without a prior booking
router.post('/direct-rent', rentingsController.directRentRoom);

module.exports = router;
