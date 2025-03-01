import React, { useState } from "react";
import { FaTimes, FaShareAlt } from "react-icons/fa";

const Bubbles = ({ bubble, onClick, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  let timer;

  const handlePressStart = () => {
    timer = setTimeout(() => setShowOptions(true), 600);
  };

  const handlePressEnd = () => {
    clearTimeout(timer);
  };

  const handleShare = async () => {
    const email = prompt("Enter email to share this Bubble:");
    if (!email) return;

    setIsSharing(true);
    try {
      const response = await fetch(
        `https://bubbleshare-be.onrender.com/bubbles/${bubble.folderId}/share`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust if needed
          },
          body: JSON.stringify({ sharedWithEmail: email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Bubble shared successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error sharing bubble:", error);
      alert("Failed to share the Bubble");
    }
    setIsSharing(false);
  };

  return (
    <div
      className="relative rounded-full w-50 h-50 p-12 text-center bg-white/20 backdrop-blur-xl flex flex-col justify-center items-center text-3xl font-semibold transition-all shadow-2xl ease-in-out duration-150 hover:bg-white/80 cursor-pointer"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={() => !showOptions && onClick(bubble.folderId)}
    >
      {showOptions && (
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Delete Button */}
          <button
            className="bg-white/60 backdrop-blur-2xl text-black/60 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm("Are you sure you want to delete this bubble?")
              ) {
                onDelete(bubble.folderId);
              }
            }}
          >
            <FaTimes />
          </button>

          {/* Share Button */}
          <button
            className="bg-white/60 backdrop-blur-2xl text-black/60 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            disabled={isSharing}
          >
            <FaShareAlt />
          </button>
        </div>
      )}
      <p>{bubble.name}</p>
    </div>
  );
};

export default Bubbles;
