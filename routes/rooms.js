const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsController');

router.get('/search', roomsController.searchAvailableRooms);
router.delete('/:roomId', roomsController.deleteRoom);
router.get('/search', roomsController.searchRooms);

module.exports = router;
