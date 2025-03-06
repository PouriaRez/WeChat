import React from "react";
import { signout } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const nav = useNavigate();

  const user = localStorage.getItem("user");

  const handleSignout = () => {
    signout();
    nav("/login");
  };
  return (
    <div>
      <h1>Welcome: {user}</h1>
      <button type="button" onClick={handleSignout}>
        Signout
      </button>
    </div>
  );
};

export default Dashboard;
