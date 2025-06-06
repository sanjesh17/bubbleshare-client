import React from "react";
import Home from "../components/Home";
import Navigation from "../components/Navigation";
import withPageTransition from "../HOC/WithPageTransition";

const HomePage = () => {
  return (
    <div className="min-h-screen font-primary">
      <Home />
      <Navigation />
    </div>
  );
};

export default withPageTransition(HomePage);
