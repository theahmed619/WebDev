import React, { useState } from 'react';
import { Home, Upload, UserCircle, Sparkles } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // 1. Import Link, NavLink, and useNavigate
import { UserData } from '../context/UserContext'; // 2. Import UserData

// (This modal is no longer used by the Navbar, but I'll leave it
// here in case you want to use it elsewhere. I've connected its
// logout button to the real handler.)
const ProfileMenu = ({ user, onLogout, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="fixed bottom-24 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-slideUp border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white overflow-hidden">
          {/* ... (decorative divs) ... */}
          <div className="relative flex items-center justify-center mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <UserCircle size={56} strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-sm text-white/80 text-center mb-1 font-medium">Admin Account</p>
          <p className="font-bold text-center text-xl tracking-wide">{user?.email}</p>
        </div>
        
        <div className="p-5 space-y-3 bg-gradient-to-b from-gray-50 to-white">
          <button
            onClick={onLogout} // This now uses the real logout handler
            className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-4 px-6 rounded-2xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 font-semibold transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  // 3. Get user and logoutHandler from context
  const { user, logoutHandler } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler(navigate); // 4. Use the real logout handler
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-xl shadow-lg w-full px-6 py-4 flex justify-between items-center fixed top-0 z-50 border-b border-gray-100/50">
        
        {/* 5. Wrap logo in a Link to "/" */}
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-2xl group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
              MemeHub
            </span>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase -mt-1">
              Admin
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLogout} // This is now connected
            className="relative bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white py-3 px-8 rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 font-semibold overflow-hidden group"
          >
            <span className="relative z-10">Logout</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVBAR */}
      <nav className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 w-full px-3 py-2 flex justify-around items-center fixed bottom-0 z-50 shadow-2xl">
        
        {/* 6. Changed <button> to <NavLink> for Home */}
        <NavLink 
          to="/"
          className={({ isActive }) => 
            `relative flex flex-col items-center transition-all duration-300 group py-3 px-6 rounded-2xl active:scale-95 ${
              isActive 
                ? 'text-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50' 
                : 'text-gray-400 hover:text-indigo-600 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50'
            }`
          }
        >
          <div className="relative">
            <Home size={24} className="mb-1.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-4"></div>
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-wide">Home</span>
        </NavLink>
        
        {/* 7. Changed <button> to <NavLink> for Upload */}
        <NavLink 
          to="/upload"
          className={({ isActive }) => 
            `relative flex flex-col items-center transition-all duration-300 group py-3 px-6 rounded-2xl active:scale-95 ${
              isActive 
                ? 'text-purple-600 bg-gradient-to-br from-purple-50 to-pink-50' 
                : 'text-gray-400 hover:text-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
            }`
          }
        >
          <div className="relative">
            <Upload size={24} className="mb-1.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-4"></div>
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-wide">Upload</span>
        </NavLink>

        {/* 8. Changed <button> to <NavLink> for Profile */}
        <NavLink 
          to="/profile"
          className={({ isActive }) => 
            `relative flex flex-col items-center transition-all duration-300 group py-3 px-6 rounded-2xl active:scale-95 ${
              isActive 
                ? 'text-pink-600 bg-gradient-to-br from-pink-50 to-rose-50' 
                : 'text-gray-400 hover:text-pink-600 hover:bg-gradient-to-br hover:from-pink-50 hover:to-rose-50'
            }`
          }
        >
          <div className="relative">
            <UserCircle size={24} className="mb-1.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-4"></div>
          </div>
          <span className="text-[11px] font-bold mt-0.5 tracking-wide">Profile</span>
        </NavLink>
      </nav>

      {/* 9. Removed modal display logic */}
      {/* 10. Removed style tag for modal animations */}
    </>
  );
};

export default Navbar;