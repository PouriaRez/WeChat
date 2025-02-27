import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { InitDB } from "./config/db.js";

dotenv.config();

// Creating an instance of express
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware

app.use(cors());
app.use(express.json());

// Routes

// Server call/listener
InitDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
});
