require('dotenv').config();
const { Pool } = require('pg');

// Configure the database connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  });
  
// A function to set search_path and execute the query
async function queryWithSearchPath(queryText, queryParams) {
    await pool.query('SET search_path TO "E-HOTEL 2.0"');
    return pool.query(queryText, queryParams);
  }

module.exports = {
  query: queryWithSearchPath,
};

