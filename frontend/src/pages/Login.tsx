import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import AuthPageComponent from "../components/AuthPageComponent";

const Login = () => {
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      nav("/  ");
    } catch (err) {
      setErr("Invalid Username or Password");
      console.error("err", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <AuthPageComponent
          title="Login"
          buttonText="Continue"
          loginState={true}
          onSubmit={handleLogin}
          err={err}
        />
      </div>
    </>
  );
};

export default Login;
