import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { InitDB } from "./config/db.js";

dotenv.config();

// Creating an instance of express
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Server call/listener
InitDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
});
