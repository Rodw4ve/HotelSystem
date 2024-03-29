const db = require('../db');

// Delete a hotel chain
exports.deleteHotelChain = async (req, res) => {
    const { chainId } = req.params;

    try {
        const deleteQuery = 'DELETE FROM HotelChain WHERE chain_id = $1 RETURNING *;';
        const { rows } = await db.query(deleteQuery, [chainId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Hotel chain not found' });
        }

        res.status(200).json({ message: 'Hotel chain deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const deleteQuery = 'DELETE FROM Hotel WHERE hotel_id = $1 RETURNING *;';
        const { rows } = await db.query(deleteQuery, [hotelId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
