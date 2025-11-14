import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext'; 
// --- 1. IMPORT THE NEW HOOK ---
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  Search, 
  UserCircle,
  Moon,
  Sun
} from 'lucide-react';
import Logo from "../../public/bag2.png";
import { IoBagHandleOutline } from "react-icons/io5";

const Navbar = () => {
  // --- 2. SPLIT THE HOOKS ---
  const { logoutHandler } = UserData(); // Get auth logic
  const { theme, toggleTheme } = useTheme(); // Get theme logic
  // --- END OF FIX ---
  
  const navigate = useNavigate();

  const getMobileLinkClass = ({ isActive }) => 
    `flex flex-col items-center rounded-lg p-2 w-1/3 transition-colors ${ 
      isActive ? 'text-blue-400 bg-gray-800' : 'text-gray-400 hover:bg-gray-800'
    }`;

  return (
    <>
      {/* ... (rest of your Navbar JSX is correct) ... */}
      
      {/* ====== TOP NAVBAR (Desktop) ====== */}
      <nav className="hidden md:flex bg-gray-900 border-b border-gray-700 text-white w-full p-4 justify-between items-center fixed top-0 z-50 h-20">
        
        {/* Logo on the Left */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          {/* <img src={Logo} alt="Projora Logo" className="w-10 h-10" /> */}
          <IoBagHandleOutline />
          <span>Projora</span>
        </Link>

        {/* Icons on the Right */}
        <div className="flex items-center gap-8">
            <Link 
              to="/search" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              title="Search"
            >
              <Search size={28} />
            </Link>

            {/* --- 4. ADD THE THEME BUTTON HERE --- */}
            <button
              onClick={toggleTheme}
              className="text-gray-300 hover:text-blue-400 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={28} /> 
              ) : (
                <Moon size={28} />
              )}
            </button>
            {/* --- END OF BUTTON --- */}

            <Link 
              to="/profile" 
              className="text-gray-300 hover:text-blue-400 transition-colors"
              title="Profile"
            >
              <UserCircle size={28} />
            </Link>
        </div>
      </nav>

      {/* ====== MOBILE NAVBAR (Top & Bottom) ====== */}
      <nav className="flex md:hidden bg-gray-900 border-b border-gray-700 text-white w-full p-4 justify-between items-center fixed top-0 z-50 h-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          {/* <img src={Logo} alt="Projora Logo" className="w-10 h-10" /> */}

            <IoBagHandleOutline />
          <span>Projora</span>
        </Link>
        
        {/* 5. ADD THEME BUTTON TO MOBILE TOP BAR --- */}
        <button
          onClick={toggleTheme}
          className="text-gray-300 hover:text-blue-400 transition-colors p-2"
        >
          {theme === 'dark' ? (
            <Sun size={24} /> 
          ) : (
            <Moon size={24} />
          )}
        </button>
      </nav>

      {/* --- Mobile Bottom Bar --- */}
      <nav className="md:hidden bg-gray-900 border-t border-gray-700 w-full p-2 flex justify-around items-center fixed bottom-0 z-50 h-20">
        
        {/* Home */}
        <NavLink to="/" end className={getMobileLinkClass}>
          <Home size={24} className="mb-1" />
          <span className="text-xs">Home</span>
        </NavLink>
        
        {/* Search */}
        <NavLink to="/search" className={getMobileLinkClass}>
          <Search size={24} className="mb-1" />
          <span className="text-xs">Search</span>
        </NavLink>

        {/* Profile */}
        <NavLink to="/profile" className={getMobileLinkClass}>
          <UserCircle size={24} className="mb-1" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Navbar;