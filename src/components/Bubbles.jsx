import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Bubbles = ({ bubble, onClick, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  let timer;

  const handlePressStart = () => {
    timer = setTimeout(() => setShowDelete(true), 600);
  };

  const handlePressEnd = () => {
    clearTimeout(timer);
  };

  return (
    <div
      className="relative rounded-full w-50 h-50 p-12 text-center bg-white/20 backdrop-blur-xl flex flex-col justify-center items-center text-3xl font-semibold transition-all shadow-2xl ease-in-out duration-150 hover:bg-white/80 cursor-pointer"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={() => !showDelete && onClick(bubble.folderId)}
    >
      {showDelete && (
        <button
          className="absolute top-2 right-2 bg-white/60 backdrop-blur-2xl text-black/60 p-2 rounded-full"
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
      )}
      <p>{bubble.name}</p>
    </div>
  );
};

export default Bubbles;
