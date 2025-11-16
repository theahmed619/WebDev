import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UserData } from '../context/UserContext'; 
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Search, 
  UserCircle,
  Moon,
  Sun,
  Sparkles
} from 'lucide-react';
import { IoBagHandleOutline } from "react-icons/io5";

const Navbar = () => {
  const { logoutHandler } = UserData();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMobileLinkClass = ({ isActive }) => 
    `flex flex-col items-center justify-center rounded-xl p-2 w-1/3 transition-all duration-300 relative group ${ 
      isActive 
        ? 'text-blue-400' 
        : 'text-gray-400 hover:text-gray-200'
    }`;

  return (
    <>
      {/* ====== DESKTOP NAVBAR ====== */}
      <nav className={`hidden md:flex bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b text-white w-full px-6 lg:px-8 justify-between items-center fixed top-0 z-50 h-16 transition-all duration-300 ${
        scrolled 
          ? 'border-gray-700 shadow-lg shadow-black/20 backdrop-blur-sm' 
          : 'border-transparent'
      }`}>
        
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center gap-3 text-2xl font-bold text-white group relative"
        >
          <div className="relative">
            <IoBagHandleOutline className="text-blue-400 group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" size={32} />
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-white group-hover:to-blue-100 transition-all duration-300">
            Projora
          </span>
        </Link>

        {/* Navigation Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <Link 
            to="/search" 
            className={`relative p-2.5 rounded-lg transition-all duration-300 group ${
              location.pathname === '/search'
                ? 'text-blue-400 bg-blue-400/10'
                : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
            }`}
            title="Search"
          >
            <Search size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            {location.pathname === '/search' && (
              <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-lg"></div>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 group overflow-hidden"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              {theme === 'dark' ? (
                <Sun size={24} className="group-hover:text-yellow-300" /> 
              ) : (
                <Moon size={24} className="group-hover:text-blue-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Profile */}
          <Link 
            to="/profile" 
            className={`relative p-2.5 rounded-lg transition-all duration-300 group ${
              location.pathname === '/profile'
                ? 'text-blue-400 bg-blue-400/10'
                : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
            }`}
            title="Profile"
          >
            <UserCircle size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            {location.pathname === '/profile' && (
              <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-lg"></div>
            )}
          </Link>
        </div>
      </nav>

      {/* ====== MOBILE TOP NAVBAR ====== */}
      <nav className={`flex md:hidden bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b text-white w-full px-4 justify-between items-center fixed top-0 z-50 h-16 transition-all duration-300 ${
        scrolled 
          ? 'border-gray-700 shadow-lg shadow-black/20' 
          : 'border-transparent'
      }`}>
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-bold text-white group"
        >
          <IoBagHandleOutline className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={28} />
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Projora
          </span>
        </Link>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 active:scale-95"
        >
          {theme === 'dark' ? (
            <Sun size={22} /> 
          ) : (
            <Moon size={22} />
          )}
        </button>
      </nav>

      {/* ====== MOBILE BOTTOM NAVBAR ====== */}
      <nav className="md:hidden bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-t border-gray-700 w-full px-4 py-2 flex justify-around items-center fixed bottom-0 z-50 h-20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        
        {/* Home */}
        <NavLink to="/" end className={getMobileLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                <Home size={24} className="mb-1" />
              </div>
              <span className="text-xs font-medium">Home</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-b-full"></div>
              )}
            </>
          )}
        </NavLink>
        
        {/* Search */}
        <NavLink to="/search" className={getMobileLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                <Search size={24} className="mb-1" />
              </div>
              <span className="text-xs font-medium">Search</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-b-full"></div>
              )}
            </>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink to="/profile" className={getMobileLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                <UserCircle size={24} className="mb-1" />
              </div>
              <span className="text-xs font-medium">Profile</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-b-full"></div>
              )}
            </>
          )}
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;