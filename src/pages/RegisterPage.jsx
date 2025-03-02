import React from "react";
import Register from "../components/Register";
import withPageTransition from "../HOC/WithPageTransition";

const RegisterPage = () => {
  return (
    <div className="min-h-screen font-primary">
      <Register />
    </div>
  );
};

export default withPageTransition(RegisterPage);
