import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import Logo from "../assets/BUBBLE.png";
import LoginBg from "../assets/LoginScreen.png";

const Login = () => {
  const navigate = useNavigate(); // Handles navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://bubbleshare-be.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save token in localStorage for future requests
      localStorage.setItem("token", data.token);

      // Redirect user to My Bubbles page
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center fixed top-0 left-0"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <img src={Logo} alt="BubbleShare Logo" className="rounded-full w-50" />
      <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-2xl bg-white/60 backdrop-blur-2xl w-60 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-500 outline-none transition-all duration-200"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-2xl bg-white/60 backdrop-blur-2xl w-60 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-500 outline-none transition-all duration-200"
          placeholder="Enter your password"
          required
        />
        <button
          type="submit"
          className="px-12 py-3 bg-gradient-to-b from-[#5172ff] to-[#003dff] text-white rounded-3xl shadow-[0px_4px_12px_#CCCCCC] text-xl mt-4"
        >
          Login
        </button>
      </form>
      <div className="flex items-center space-x-1 mt-2">
        <p>Don't have an account?</p>
        <Link to="/register">
          <p className="text-blue-800">Sign Up</p>
        </Link>
      </div>
      <p className="text-black/50 mt-1">Ready to dive in?</p>
      <p className="text-black/50 mt-[-6px]">Your high-res world awaits!</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
    </div>
  );
};

export default Login;
