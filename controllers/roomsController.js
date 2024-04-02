const db = require('../db');
// Search for Available rooms

exports.searchAvailableRooms = async (req, res) => {
    const { check_in_date, check_out_date, capacity, city, hotelChain, rating, priceMin, priceMax } = req.query;

    try {
        const query = `
        SELECT r.room_id, r.room_num, r.price, r.amenities, r.capacity, r.view
        FROM Room r
        JOIN Hotel h ON r.hotel_id = h.hotel_id
        JOIN Hotel_City hc ON h.hotel_id = hc.hotel_id
        JOIN City c ON hc.name = c.name
        JOIN HotelChain hc2 ON h.chain_id = hc2.chain_id
        JOIN Archives a ON r.room_id = a.room_id 
        WHERE c.name IN ('New York', 'Los Angeles', 'Toronto', 'Montreal', 'Vancouver', 'Cancun', 'Austin', 'Miami') -- Filter by city
        AND r.capacity IN ('single', 'double', 'triple', 'quad', 'suite') -- Filter by room capacity
        AND r.price BETWEEN 0 AND 1000 -- Filter by price range
        AND r.status = 'vacant' -- Filter by room status
        AND hc2.name IN ('Hilton', 'Wyndham','Hyatt','Marriott','Continental') -- Filter by hotel chain name
        AND h.rating IN  (1,2,3) -- Filter by hotel rating
        AND a.check_in_date <= '2024-05-01' -- Filter by check-in date
        AND a.check_out_date >= '2024-04-01' -- Filter by check-out date
        ORDER BY r.price ASC;
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