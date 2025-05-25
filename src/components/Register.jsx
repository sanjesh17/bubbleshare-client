import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import LoginBg from "../assets/LoginScreen.png";
import Logo from "../assets/BUBBLE.png";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center fixed top-0 left-0"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <img src={Logo} alt="BubbleShare Logo" className="rounded-full w-50" />

      <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-4 rounded-2xl bg-white/60 backdrop-blur-2xl w-60 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-500 outline-none transition-all duration-200"
          placeholder="Enter your username"
          required
        />
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
          className="px-12 py-3 bg-gradient-to-b from-[#5172ff] to-[#003dff] text-white rounded-3xl shadow-[0px_4px_12px_#CCCCCC] text-xl mt-4 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="flex items-center space-x-1 mt-2">
        <p>Already have an account?</p>
        <Link to="/login">
          <p className="text-blue-800">Login</p>
        </Link>
      </div>
      <p className="text-black/50 mt-2">Get Started!</p>
      <p className="text-black/50 mt-[-6px]">Your high-res world awaits!</p>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default Register;
