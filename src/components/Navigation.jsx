import { Cloudy, CloudUpload, Plus, UserRound, ShieldPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="w-full fixed bottom-0 font-primary flex justify-between px-4 py-1 bg-white/90 backdrop-blur-xl shadow-[0px_8px_12px_blue]">
      <Link to="/" className="no-underline focus:outline-none flex">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Cloudy
            size={32}
            className={
              location.pathname === "/" ? "text-blue-600" : "text-gray-500"
            }
          />
          <p
            className={`font-semibold text-[13px] ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            BUBBLES
          </p>
        </div>
      </Link>

      <Link to="/shared" className="no-underline focus:outline-none flex">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <CloudUpload
            size={32}
            className={
              location.pathname === "/shared"
                ? "text-blue-600"
                : "text-gray-500"
            }
          />
          <p
            className={`font-semibold text-[13px] ${
              location.pathname === "/shared"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            SHARED
          </p>
        </div>
      </Link>

      <Link to="/create" className="no-underline focus:outline-none flex">
        <div className="rounded-full p-4 shadow-2xl scale-125 bg-white cursor-pointer">
          <Plus size={42} className="text-blue-600" />
        </div>
      </Link>

      <Link to="/upgrade" className="no-underline focus:outline-none flex">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <ShieldPlus
            size={32}
            className={
              location.pathname === "/upgrade"
                ? "text-blue-600"
                : "text-gray-500"
            }
          />
          <p
            className={`font-semibold text-[13px] ${
              location.pathname === "/upgrade"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            UPGRADE
          </p>
        </div>
      </Link>

      <Link to="/profile" className="no-underline focus:outline-none flex">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <UserRound
            size={32}
            className={
              location.pathname === "/profile"
                ? "text-blue-600"
                : "text-gray-500"
            }
          />
          <p
            className={`font-semibold text-[13px] ${
              location.pathname === "/profile"
                ? "text-blue-600"
                : "text-gray-500"
            }`}
          >
            PROFILE
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
