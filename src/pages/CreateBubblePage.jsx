import React from "react";
import CreateBubble from "../components/CreateBubble";
import Navigation from "../components/Navigation";
import Bg from "../assets/LoginScreen.png";

const CreateBubblePage = () => {
  return (
    <div
      className="min-h-screen font-primary h-screen w-full bg-cover bg-center fixed top-0 left-0"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <CreateBubble />
      <Navigation />
    </div>
  );
};

export default CreateBubblePage;
