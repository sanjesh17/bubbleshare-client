import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bg from "../assets/LoginScreen.png";
import Bubbles from "./Bubbles";
import BubbleDetails from "./BubbleDetails";
import { CloudOff } from "lucide-react";
import FullScreenLoader from "./FullScreenLoader";

const Home = () => {
  const [bubbles, setBubbles] = useState([]);
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBubbles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        setLoading(true);
        const response = await fetch(
          "https://bubbleshare-be.onrender.com/bubbles",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch bubbles");

        setBubbles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBubbles();
  }, []);

  const deleteBubble = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `https://bubbleshare-be.onrender.com/bubbles/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete bubble");
      }

      setBubbles((prevBubbles) =>
        prevBubbles.filter((bubble) => bubble.folderId !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center fixed top-0 left-0 overflow-scroll p-4 pb-24"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      {loading && <FullScreenLoader />}

      {!loading && bubbles.length > 0 ? (
        <div className="flex flex-col gap-6">
          {bubbles.map((bubble, index) => (
            <motion.div
              key={bubble.folderId}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <Bubbles
                bubble={bubble}
                onClick={setSelectedBubbleId}
                onDelete={deleteBubble}
              />
            </motion.div>
          ))}
        </div>
      ) : !loading ? (
        <div className="h-screen flex flex-col justify-center items-center pb-18">
          <CloudOff className="w-60 h-60 mx-auto opacity-20" />
        </div>
      ) : null}

      {selectedBubbleId && (
        <BubbleDetails
          bubbleId={selectedBubbleId}
          onClose={() => setSelectedBubbleId(null)}
        />
      )}
    </div>
  );
};

export default Home;
