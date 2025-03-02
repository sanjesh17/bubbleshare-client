import React from "react";
import Login from "../components/Login";
import withPageTransition from "../HOC/WithPageTransition";

const LoginPage = () => {
  return (
    <div className="min-h-screen font-primary">
      <Login />
    </div>
  );
};

export default withPageTransition(LoginPage);
