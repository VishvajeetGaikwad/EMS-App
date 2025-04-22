import { useState, useEffect } from "react";
import { Bell, Settings } from "lucide-react"; // Importing icons for a premium touch

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Adding smooth entry animation
    const navBar = document.getElementById("navbar");
    navBar.classList.add("opacity-0");
    setTimeout(() => {
      navBar.classList.remove("opacity-0");
      navBar.classList.add("transition-opacity");
      navBar.classList.add("opacity-100");
    }, 100);
  }, []);

  return (
    <div
      id="navbar"
      className="w-full h-16 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg flex items-center justify-between px-6 transition-opacity"
    >
      <h2 className="text-2xl font-semibold text-indigo-900 tracking-wide"></h2>

      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="w-6 h-6 text-indigo-700 cursor-pointer hover:text-indigo-900 transition-colors" />
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </div>

        {/* User Profile Section */}
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover transition-transform transform hover:scale-105"
          />
          <span className="text-gray-800 font-medium">Welcome, Vishwajit</span>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start text-sm">
              <div className="flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </div>
              <div className="flex items-center gap-2 w-full hover:bg-gray-100 p-2 rounded">
                <span className="text-gray-700">Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
