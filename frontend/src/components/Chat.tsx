import React, { useEffect, useState } from "react";
import { onMessage, sendMessage } from "../services/socketServices";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  // Setup socket connection and listen for incoming messages
  useEffect(() => {
    console.log("Socket Initialized"); // Add this for debugging

    // Listen for incoming messages
    onMessage((data: string) => {
      console.log("Received message:", data); // This should log the server's message
      setMessages((prev) => {
        console.log("📜 Previous messages:", prev);
        return [...prev, data];
      }); // Update the messages state
      console.log("Ig i set it?");
    });
  }, []);

  const handleMessageClick = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <div className="border-2 border-red-500 w-screen flex justify-center items-center flex-col">
        <h1>Chat</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here..."
          />
          <button onClick={handleMessageClick}>Send message</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
