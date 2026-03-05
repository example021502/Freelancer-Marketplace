import React, { useContext, useState } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const { dashboardState } = useContext(DashboardContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "projects", label: "Projects", icon: "📋" },
    { id: "messages", label: "Messages", icon: "💬" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-green-400">Freelancer</h1>
        <p className="text-sm text-gray-400">Marketplace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-gray-800 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={dashboardState.userProfile.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{dashboardState.userProfile.name}</p>
              <p className="text-xs text-gray-400">Available</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 bg-gray-800 rounded-lg p-2"
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NavBar;
