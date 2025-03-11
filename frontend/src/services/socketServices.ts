import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

// Initialize socket connection globally
const socket: Socket = io(SOCKET_URL, {
  autoConnect: true, // Ensures socket connects immediately
});

socket.on("connect", () => {
  console.log("🔌 Connected to server with socket ID:", socket.id);
});

// Function to send a message to the server
export const sendMessage = (message: string) => {
  if (socket) {
    console.log("📤 Sending message:", message);
    socket.emit("message", message);
  }
};

// Function to listen for incoming messages
export const onMessage = (callback: (data: string) => void) => {
  if (socket) {
    console.log("HELLOOOOOO");
    socket.on("message", callback);
  }
};

// Disconnect the socket
export const disconnect = () => {
  if (socket) {
    socket.disconnect();
  }
};
