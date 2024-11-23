import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebare = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 flex flex-col justify-between text-white p-6">
      <nav className="mt-8">
      <img
          src={require("../assets/images/logo.png")} 
          alt="Logo"
          className="w-32 h-32 object-cover rounded-full"
        />
        <ul>
          <li>
            <Link
              to="/Dashboard"
              className="block py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/CreateRoom"
              className="block py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              Create Room
            </Link>
          </li>
          <li>
            <Link
              to="/CreateVideo"
              className="block py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              Create Video
            </Link>
          </li>
          <li>
            <Link
              to="/Listvideo"
              className="block py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              List Video
            </Link>
          </li>
          <li>
            <Link
              to="/Room"
              className="block py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              Rooms
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-8 w-full py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded-lg transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebare;
