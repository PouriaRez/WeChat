import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthProperties {
  title: string;
  buttonText: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  err?: string;
  loginState: boolean;
}

const AuthPageComponent = ({
  title,
  buttonText,
  err,
  onSubmit,
  loginState,
}: AuthProperties) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Clicked?");

    await onSubmit(username, password);
  };

  const handleRedirection = () => {
    return loginState ? nav("/register") : nav("/login");
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col w-90 h-100 p-5 bg-[#3f2e4f] rounded">
        <p className="text-3xl p-2 font-extralight">{title}</p>
        <form
          className="flex justify-center items-center flex-col"
          onSubmit={handleFormSubmit}
        >
          <input
            className="w-75 h-10 p-2 text-2xl m-5"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="w-75 h-10 p-2 text-2xl mb-5"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {err && <p className="text-[#da0b34] font-extralight">{err}</p>}
          <button
            className="cursor-pointer bg-gradient-to-r
          from-[#4B0082] to-[#9400D8] hover:font-extrabold
          rounded-xl h-10 w-50 transition-all duration-200 mt-2"
            type="submit"
          >
            <p>{buttonText}</p>
          </button>
        </form>
        <button className="cursor-pointer mt-2" onClick={handleRedirection}>
          <p>{loginState ? "New here ?" : "Already have an account ?"}</p>
        </button>
      </div>
    </>
  );
};

export default AuthPageComponent;
