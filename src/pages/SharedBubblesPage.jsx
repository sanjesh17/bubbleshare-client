import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bg from "../assets/LoginScreen.png";
import Bubbles from "../components/Bubbles";
import BubbleDetails from "../components/BubbleDetails";
import Navigation from "../components/Navigation";

const SharedBubblesPage = () => {
  const [sharedBubbles, setSharedBubbles] = useState([]);
  const [selectedBubbleId, setSelectedBubbleId] = useState(null);

  useEffect(() => {
    const fetchSharedBubbles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "https://bubbleshare-be.onrender.com/shared-bubbles",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch shared bubbles");

        setSharedBubbles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSharedBubbles();
  }, []);

  return (
    <div className="min-h-screen font-primary">
      <div
        className="h-screen w-full bg-cover bg-center fixed top-0 left-0 overflow-scroll p-4 pb-24"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="flex flex-col gap-6">
          {sharedBubbles.map((bubble, index) => (
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
                onClick={() => setSelectedBubbleId(bubble.folderId)}
                onDelete={null}
              />
            </motion.div>
          ))}
        </div>

        {selectedBubbleId && (
          <BubbleDetails
            bubbleId={selectedBubbleId}
            onClose={() => setSelectedBubbleId(null)}
            shared={true}
          />
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default SharedBubblesPage;
