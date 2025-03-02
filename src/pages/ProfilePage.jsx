import React from "react";
import Profile from "../components/Profile";
import Navigation from "../components/Navigation";

const ProfilePage = () => {
  return (
    <div className="min-h-screen font-primary">
      <Profile />
      <Navigation />
    </div>
  );
};

export default ProfilePage;
