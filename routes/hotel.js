const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Route to delete a hotel chain
router.delete('/chain/:chainId', hotelController.deleteHotelChain);

// Route to delete a hotel
router.delete('/:hotelId', hotelController.deleteHotel);

// Add other hotel-related routes here

module.exports = router;
