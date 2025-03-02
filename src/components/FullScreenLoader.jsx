import React from "react";
import { HashLoader } from "react-spinners";

const FullScreenLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
    >
      <HashLoader color="#007bff" size={50} />
    </div>
  );
};

export default FullScreenLoader;
