
const express = require('express');
const router = express.Router();
const hotelManagementController = require('../controllers/hotelController');

// Route to delete a hotel chain
router.delete('/chain/:chainId', hotelManagementController.deleteHotelChain);

// Route to delete a hotel
router.delete('/hotel/:hotelId', hotelManagementController.deleteHotel);

module.exports = router;
