const db = require('../db');
// Search for Available rooms
exports.searchAvailableRooms = async (req, res) => {
    const { check_in_date, check_out_date, capacity, city, hotelChain, rating, priceMin, priceMax } = req.query;

    try {
        const query = `
            SELECT r.room_id, r.price, r.capacity, h.rating, hc.name AS chain_name, c.name AS city_name
            FROM room r
            JOIN hotel h ON r.hotel_id = h.hotel_id
            JOIN hotelchain hc ON h.chain_id = hc.chain_id
            JOIN hotel_city hc2 ON h.hotel_id = hc2.hotel_id
            JOIN city c ON hc2.city_code = c.city_code
            WHERE r.status = 'vacant'
            AND ($3::text IS NULL OR r.capacity = $3)
            AND ($4::text IS NULL OR c.name = $4)
            AND ($5::text IS NULL OR hc.name = $5)
            AND ($6::int IS NULL OR h.rating >= $6)
            AND ($7::numeric IS NULL OR r.price >= $7)
            AND ($8::numeric IS NULL OR r.price <= $8)
            AND r.room_id NOT IN (
                SELECT room_id FROM archives
                WHERE type = 'booking'
                AND check_in_date <= $2 AND check_out_date >= $1
            )
            AND r.room_id NOT IN (
                SELECT room_id FROM archives
                WHERE type = 'rental'
                AND check_in_date <= $2 AND check_out_date >= $1
            );
        `;
        const params = [check_in_date, check_out_date, capacity, city, hotelChain, rating, priceMin, priceMax];
        const { rows } = await db.query(query, params);
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