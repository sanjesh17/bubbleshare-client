import React, { useState } from "react";
import { Cloudy, CloudUpload, Plus, UserRound, ShieldPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("Bubbles");

  return (
    <div className="w-full fixed bottom-0 font-primary flex justify-between px-4 py-1 bg-white/90 backdrop-blur-xl shadow-[0px_8px_12px_blue]">
      <Link to="/" className="no-underline focus:outline-none flex">
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => setActiveTab("Bubbles")}
        >
          <Cloudy
            size={32}
            className={
              activeTab === "Bubbles" ? "text-blue-600" : "text-gray-500"
            }
          />
          <p
            className={`font-semibold text-[13px] ${
              activeTab === "Bubbles" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            BUBBLES
          </p>
        </div>
      </Link>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => setActiveTab("Shared")}
      >
        <CloudUpload
          size={32}
          className={activeTab === "Shared" ? "text-blue-600" : "text-gray-500"}
        />
        <p
          className={`font-semibold text-[13px] ${
            activeTab === "Shared" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          SHARED
        </p>
      </div>
      <Link to="/create" className="no-underline focus:outline-none flex">
        <div className="rounded-full p-4 shadow-2xl scale-125 bg-white cursor-pointer">
          <Plus size={42} className="text-blue-600" />
        </div>
      </Link>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => setActiveTab("Upgrade")}
      >
        <ShieldPlus
          size={32}
          className={
            activeTab === "Upgrade" ? "text-blue-600" : "text-gray-500"
          }
        />
        <p
          className={`font-semibold text-[13px] ${
            activeTab === "Upgrade" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          UPGRADE
        </p>
      </div>
      <div
        className="flex flex-col justify-center items-center cursor-pointer"
        onClick={() => setActiveTab("Profile")}
      >
        <UserRound
          size={32}
          className={
            activeTab === "Profile" ? "text-blue-600" : "text-gray-500"
          }
        />
        <p
          className={`font-semibold text-[13px] ${
            activeTab === "Profile" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          PROFILE
        </p>
      </div>
    </div>
  );
};

export default Navigation;
