const db = require('../db');

// Function to convert a booking to a rental
exports.checkInAndRentRoom = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Retrieve the booking details
        const getBookingQuery = `
            SELECT * FROM archives
            WHERE booking_id = $1 AND type = 'booking';
        `;
        const { rows: bookingRows } = await db.query(getBookingQuery, [bookingId]);

        if (bookingRows.length === 0) {
            return res.status(404).json({ message: 'Booking not found or already checked in' });
        }

        const { room_id } = bookingRows[0];

        // Update the booking type to 'rental'
        const updateBookingQuery = `
            UPDATE archives
            SET type = 'rental'
            WHERE booking_id = $1
            RETURNING *;
        `;
        const { rows } = await db.query(updateBookingQuery, [bookingId]);

        // Update the status of the room to 'renting'
        const updateRoomStatusQuery = `
            UPDATE room
            SET status = 'renting'
            WHERE room_id = $1;
        `;
        await db.query(updateRoomStatusQuery, [room_id]);

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to create a direct Rental
exports.directRentRoom = async (req, res) => {
    const { customer_id, room_id, check_in_date, check_out_date } = req.body;

    try {
        // Insert the rental into the archives table
        const rentalQuery = `
            INSERT INTO archives (customer_id, room_id, check_in_date, check_out_date, type)
            VALUES ($1, $2, $3, $4, 'rental')
            RETURNING *;
        `;
        const { rows } = await db.query(rentalQuery, [customer_id, room_id, check_in_date, check_out_date]);

        // Update the status of the room to 'renting'
        const updateRoomStatusQuery = `
            UPDATE room
            SET status = 'renting'
            WHERE room_id = $1;
        `;
        await db.query(updateRoomStatusQuery, [room_id]);

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

