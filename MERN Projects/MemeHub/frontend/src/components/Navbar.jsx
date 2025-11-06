import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext'; 
import { 
  HiHome, 
  HiSearch, 
  HiVideoCamera, 
  HiUserCircle 
} from 'react-icons/hi';
import Logo from "../../public/lust.png";

// --- Main Navbar Component ---
const Navbar = () => {
  const { logoutHandler } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler(navigate);
  };

  return (
    <>
      {/* ====== TOP NAVBAR (Desktop & Mobile Logo) ====== */}
      <nav className="flex bg-white shadow-md w-full p-4 justify-between items-center fixed top-0 z-50">
        
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <img src={Logo} alt="MemeHub Logo" className="w-10 h-10" />
          <span>MemeHub</span>
        </Link>

        {/* --- 1. UPDATED: Middle Search Box --- */}
        <div 
          className="relative w-1/3 hidden md:block cursor-pointer" // Added cursor-pointer
          onClick={() => navigate('/search')} // Added onClick handler
        >
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <HiSearch size={24} />
          </span>
          <input
            type="text"
            placeholder="Search MemeHub..."
            className="w-full pl-12 pr-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly // Added readOnly so it acts like a link
          />
        </div>

        {/* Right: Logout (Hidden on mobile) */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors hidden md:block"
        >
          Logout
        </button>
      </nav>

      {/* ====== MOBILE NAVBAR (Bottom) ====== */}
      <nav className="md:hidden bg-white border-t border-gray-200 w-full p-2 flex justify-around items-center fixed bottom-0 z-50">
        
        {/* Home */}
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex flex-col items-center rounded-lg p-2 w-1/4 transition-colors ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <HiHome size={24} className="mb-1" />
          <span className="text-xs">Home</span>
        </NavLink>
        
        {/* Search */}
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `flex flex-col items-center rounded-lg p-2 w-1/4 transition-colors ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <HiSearch size={24} className="mb-1" />
          <span className="text-xs">Search</span>
        </NavLink>

        {/* Reels */}
        <NavLink 
          to="/reels" 
          className={({ isActive }) => 
            `flex flex-col items-center rounded-lg p-2 w-1/4 transition-colors ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <HiVideoCamera size={24} className="mb-1" />
          <span className="text-xs">Reel</span>
        </NavLink>

        {/* Profile */}
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center rounded-lg p-2 w-1/4 transition-colors ${
              isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <HiUserCircle size={24} className="mb-1" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;