import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { InitDB } from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketSetup } from "./controllers/socketControllers.js";

dotenv.config();

// Creating an instance of express
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Create an http server
const httpServer = createServer(app);

// Creating a Socket.IO server and connecting it to the HTTP Sever
// Socket.IO needs it's own CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

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

// Socket.IO setup
SocketSetup(io);

// Server call/listener
InitDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
  });
});
