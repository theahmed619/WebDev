import React, { useState } from 'react';
import { Home, Upload, UserCircle, Sparkles, Search } from 'lucide-react'; // 1. Import Search icon
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';

// (ProfileMenu modal - unchanged, still not used by default)
const ProfileMenu = ({ user, onLogout, onClose }) => {
  // ... (modal code) ...
};

const Navbar = () => {
  const { user, logoutHandler } = UserData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 2. Add state for search input

  const handleLogout = () => {
    logoutHandler(navigate);
  };

  return (
    <>
      {/* ====== TOP NAVBAR (Desktop) ====== */}
      <nav className="bg-white/80 backdrop-blur-xl shadow-lg w-full px-6 py-4 flex items-center fixed top-0 z-50 border-b border-gray-100/50">
        
        {/* 3. Logo (Left) */}
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-2xl group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
              Projora
            </span>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase -mt-1">
              Admin
            </span>
          </div>
        </Link>

        {/* 4. Search Input (Middle) */}
        <div className="flex-1 flex justify-center px-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects, categories..."
              className="w-full p-2.5 pl-10 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* 5. Profile Icon (Right) */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-gray-500 hover:text-indigo-600 transition-colors" title="Profile">
            <UserCircle size={32} />
          </Link>
          {/* Logout button removed from top nav */}
        </div>
      </nav>

      {/* ====== MOBILE BOTTOM NAVBAR (Unchanged) ====== */}
      <nav className="md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 w-full px-3 py-2 flex justify-around items-center fixed bottom-0 z-50 shadow-2xl">
        
        {/* Home */}
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
        
        {/* Upload */}
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

        {/* Profile */}
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
    </>
  );
};

export default Navbar;