require('dotenv').config();
const express = require('express');
const roomRoutes = require('../routes/rooms');
const bookingsRoutes = require('../routes/bookings')
const rentingRoutes = require('../routes/rentings');
const hotelRoutes = require('../routes/hotel');

const app = express();
const port = process.env.PORT || 3000;

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Debugging logs
const server = app.listen(port, () => {
  const actualPort = server.address().port;
  console.log(`Server is running on port ${actualPort}`);
});
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);

