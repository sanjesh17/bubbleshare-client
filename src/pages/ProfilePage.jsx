import React from "react";
import Profile from "../components/Profile";
import Navigation from "../components/Navigation";
import withPageTransition from "../HOC/WithPageTransition";

const ProfilePage = () => {
  return (
    <div className="min-h-screen font-primary">
      <Profile />
      <Navigation />
    </div>
  );
};

export default withPageTransition(ProfilePage);
