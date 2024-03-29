const db = require('../db');

// Function to transfer completed bookings and rentals to Booking_History
exports.transferCompletedReservations = async () => {
    try {
        const transferQuery = `
            INSERT INTO Booking_History (booking_id, check_in_date, check_out_date)
            SELECT booking_id, check_in_date, check_out_date
            FROM Archives
            WHERE check_out_date < CURRENT_DATE;

            DELETE FROM Archives
            WHERE check_out_date < CURRENT_DATE;
        `;
        await db.query(transferQuery);
        console.log('Completed reservations transferred to Booking_History.');
    } catch (err) {
        console.error('Error transferring completed reservations:', err);
    }
};
