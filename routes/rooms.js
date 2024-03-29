const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

router.get('/search', roomsController.searchAvailableRooms);
router.delete('/:roomId', roomsController.deleteRoom);

module.exports = router;
