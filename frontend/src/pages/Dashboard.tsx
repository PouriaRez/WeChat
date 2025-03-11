import React from "react";
import { signout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import { disconnect } from "../services/socketServices";

const Dashboard = () => {
  const nav = useNavigate();

  const user = localStorage.getItem("user");

  const handleSignout = () => {
    disconnect();
    signout();
    nav("/login");
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <h1>Welcome: {user}</h1>
      <Chat></Chat>
      <button type="button" onClick={handleSignout}>
        Signout
      </button>
    </div>
  );
};

export default Dashboard;
