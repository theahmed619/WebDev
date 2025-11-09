import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext'; 
import { 
  Home, 
  Search, 
  UserCircle,
} from 'lucide-react'; // Removed LayoutGrid
import Logo from "../../public/shopping-bag.png";

const Navbar = () => {
  const { logoutHandler } = UserData(); 
  const navigate = useNavigate();

  // --- 1. UPDATED HELPER FUNCTION ---
  // Changed w-1/4 to w-1/3 since there are now 3 items
  const getMobileLinkClass = ({ isActive }) => 
    `flex flex-col items-center rounded-lg p-2 w-1/3 transition-colors ${ 
      isActive ? 'text-blue-400 bg-gray-800' : 'text-gray-400 hover:bg-gray-800'
    }`;

  return (
    <>
      {/* ====== TOP NAVBAR (Desktop) ====== */}
      {/* This nav is hidden on mobile (md:hidden) */}
      <nav className="hidden md:flex bg-gray-900 border-b border-gray-700 text-white w-full p-4 justify-between items-center fixed top-0 z-50 h-20">
        
        {/* Logo on the Left */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <img src={Logo} alt="Projora Logo" className="w-10 h-10" />
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
      {/* This section is only visible on mobile (md:hidden) */}
      
      {/* Mobile Top Bar (Logo) */}
      <nav className="flex md:hidden bg-gray-900 border-b border-gray-700 text-white w-full p-4 justify-between items-center fixed top-0 z-50 h-20">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <img src={Logo} alt="Projora Logo" className="w-10 h-10" />
          <span>Projora</span>
        </Link>
      </nav>

      {/* --- 2. UPDATED MOBILE BOTTOM BAR --- */}
      {/* "Projects" link has been removed */}
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