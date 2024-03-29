require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 0;

// Configure the database connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT || 5432,
  // Optionally, you can set the search_path here if your pg version supports it
  // options: '-c search_path="E-HOTEL 2.0"'
});

// A function to set search_path and execute the query
async function queryWithSearchPath(queryText, queryParams) {
  await pool.query('SET search_path TO "E-HOTEL 2.0"');
  return pool.query(queryText, queryParams);
}

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define the /api/hotelChains route
app.get('/api/hotelChains', async (req, res) => {
  try {
    const result = await queryWithSearchPath('SELECT * FROM HotelChain', []);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Debugging logs
const server = app.listen(port, () => {
  const actualPort = server.address().port;
  console.log(`Server is running on port ${actualPort}`);
});
console.log('DB User:', process.env.DB_USER);
console.log('DB Password:', process.env.DB_PASSWORD);

