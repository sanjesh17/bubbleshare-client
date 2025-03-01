import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CreateBubble = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateBubble = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bubbleshare-be.onrender.com/bubbles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, expiry }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create Bubble");

      navigate("/");
      setName("");
      setExpiry(6);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-90 max-w-md bg-white/10 backdrop-blur-3xl p-6 rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-6 mx-auto my-[60%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 text-center">
        Create a New Bubble
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleCreateBubble} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Bubble Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <select
            value={expiry}
            onChange={(e) => setExpiry(Number(e.target.value))}
            className="w-full px-4 py-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={6}>6 Hours</option>
            <option value={12}>12 Hours</option>
            <option value={24}>24 Hours</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition active:scale-95 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Bubble"}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateBubble;
