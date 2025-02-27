import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// Creating an instance of express
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
// Server call/listener
app.listen(3000, () => {
    console.log("Server started");
});
