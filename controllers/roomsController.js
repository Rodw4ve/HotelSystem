const db = require('../db');

//Search for Available rooms
exports.searchAvailableRooms = async (req, res) => {
    const { checkInDate, checkOutDate } = req.query;

    try {
        const query = `
            SELECT * FROM room
            WHERE status = 'vacant'
            AND room_id NOT IN (
                SELECT room_id FROM archives
                WHERE type = 'booking'
                AND check_in_date <= $2 AND check_out_date >= $1
            )
            AND room_id NOT IN (
                SELECT room_id FROM archives
                WHERE type = 'rental'
                AND check_in_date <= $2 AND check_out_date >= $1
            );
        `;
        const { rows } = await db.query(query, [checkInDate, checkOutDate]);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const deleteQuery = 'DELETE FROM Room WHERE room_id = $1 RETURNING *;';
        const { rows } = await db.query(deleteQuery, [roomId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};