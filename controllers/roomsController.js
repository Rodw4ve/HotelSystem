const db = require('../db');

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