// Book a room
exports.bookRoom = async (req, res) => {
    const { customer_id, room_id, check_in_date, check_out_date } = req.body;

    try {
        const bookingQuery = `
            INSERT INTO bookings (customer_id, room_id, check_in_date, check_out_date)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const { rows } = await db.query(bookingQuery, [customer_id, room_id, check_in_date, check_out_date]);

        const updateRoomStatusQuery = `
            UPDATE rooms SET status = 'booking'
            WHERE room_id = $1;
        `;
        await db.query(updateRoomStatusQuery, [room_id]);

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { customer_id, room_id, check_in_date, check_out_date } = req.body;

    try {
        // Update the booking in the archives table
        const query = `
            UPDATE archives
            SET customer_id = $1, room_id = $2, check_in_date = $3, check_out_date = $4
            WHERE booking_id = $5
            RETURNING *;
        `;
        const { rows } = await db.query(query, [customer_id, room_id, check_in_date, check_out_date, bookingId]);

        // If the room_id has changed, update the status of the old and new rooms
        if (rows[0].room_id !== room_id) {
            // Set the old room to 'vacant'
            const updateOldRoomStatusQuery = `
                UPDATE room SET status = 'vacant'
                WHERE room_id = $1;
            `;
            await db.query(updateOldRoomStatusQuery, [rows[0].room_id]);

            // Set the new room to 'booked'
            const updateNewRoomStatusQuery = `
                UPDATE room SET status = 'booking'
                WHERE room_id = $1;
            `;
            await db.query(updateNewRoomStatusQuery, [room_id]);
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Cancel booking

exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        // Retrieve the room_id for the booking
        const getRoomIdQuery = `
            SELECT room_id FROM archives
            WHERE booking_id = $1;
        `;
        const { rows: bookingRows } = await db.query(getRoomIdQuery, [bookingId]);

        // Delete the booking from the archives table
        const deleteQuery = `
            DELETE FROM archives
            WHERE booking_id = $1
            RETURNING *;
        `;
        const { rows } = await db.query(deleteQuery, [bookingId]);

        // Update the status of the room to 'vacant'
        const updateRoomStatusQuery = `
            UPDATE room SET status = 'vacant'
            WHERE room_id = $1;
        `;
        await db.query(updateRoomStatusQuery, [bookingRows[0].room_id]);

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrive booking a specific customer

exports.getCustomerBookings = async (req, res) => {
    const { customerId } = req.params;

    try {
        const query = `
            SELECT * FROM archives
            WHERE customer_id = $1 AND type = 'booking';
        `;
        const { rows } = await db.query(query, [customerId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this customer' });
        }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
