import { Server } from "socket.io";

export const SocketSetup = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user has connected", socket.id);

    // Emit a test message immediately upon connection to the client
    socket.emit("message", "Hello from the server!");

    // Example of handling incoming messages from the client
    socket.on("message", (data) => {
      console.log("Received message from client:", data);
      io.emit("message", data); // Broadcast message to all clients
      console.log("Message sent to all clients");
    });

    socket.on("disconnect", () => {
      console.log("A user has disconnected", socket.id);
    });
  });
};
