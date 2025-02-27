import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

// Checking if port is undef. if so, return 5432, else return the int casted .env port number
const PORT = process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432;

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const InitDB = async () => {
  let client;
  try {
    // Acquire a client from the pool to guarantee connection with database.
    client = await pool.connect();

    // Create the User database if connection is successful.
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS users(
                userID SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `
    );
    console.log("\n\n\n\n\n\n\n\n\n\nDatabase initialized!");
  } catch (error) {
    // If an error is caught, then throw a console error and raise an exception
    console.error("Failed to Initialize DB ", error);
    throw new Error("Database initialization failed");
  } finally {
    // Release the client, ensuring the connection is returned to the pool, regardless of success or failure.
    client?.release();
  }
};

export default pool;
