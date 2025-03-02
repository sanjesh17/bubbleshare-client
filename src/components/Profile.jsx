import React, { useEffect, useState } from "react";
import Avatar from "../assets/user.png";
import { Sparkles, LogOut } from "lucide-react";
import FullScreenLoader from "./FullScreenLoader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return handleLogOut();

      try {
        const res = await fetch("https://bubbleshare-be.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        handleLogOut();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div>
      <div className="bg-blue-100 backdrop-blur-3xl rounded-b-2xl">
        <header className="flex items-center py-8 px-5 space-x-5">
          <img
            src={user?.avatar || Avatar}
            alt="user"
            className="h-20 shadow-lg rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </header>
        <section className="px-5 pb-10">
          <div className="bg-white rounded-xl h-30 shadow-xl flex px-12 justify-between items-center">
            <div className="flex flex-col items-center">
              <p className="font-normal text-lg">Your Bubbles</p>
              <p className="text-3xl font-semibold">{user?.bubbles || 0}</p>
            </div>
            <div className="h-full py-4">
              <div className="border border-l-2 h-full border-black/15"></div>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-normal text-lg">Shared Bubbles</p>
              <p className="text-3xl font-semibold">
                {user?.sharedBubbles || 0}
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="py-5 px-5">
        <ul className="flex flex-col space-y-5">
          <li className="flex space-x-3 items-center px-4">
            <Sparkles className="text-blue-500" />
            <p className="text-xl font-medium">Upgrade</p>
          </li>
          <hr className="border border-black/20" />
          <li
            className="flex space-x-3 items-center px-4"
            onClick={handleLogOut}
          >
            <LogOut className="text-blue-500" />
            <p className="text-xl font-medium">Log Out</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
