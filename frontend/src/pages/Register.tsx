import React, { useState } from "react";
import AuthPageComponent from "../components/AuthPageComponent";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      nav("/login");
    } catch (err) {
      setErr("Username is already taken.");
      console.error("err", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <AuthPageComponent
          title="Register"
          buttonText="Register"
          loginState={false}
          onSubmit={handleRegister}
          err={err}
        />
      </div>
    </>
  );
};

export default Register;
