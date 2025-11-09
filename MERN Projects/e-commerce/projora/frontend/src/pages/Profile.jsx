import React from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User as UserIcon, Mail, ShoppingBag } from 'lucide-react'; // Import Lucide icons
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logoutHandler } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler(navigate);
  };

  // Provides a fallback in case the user isn't loaded yet
  const name = user?.name || 'User';
  const email = user?.email || 'loading...';
  const purchasedCount = user?.purchasedProjects?.length || 0;
  
  // Get first letter of first and last name for initials
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    // 1. Switched to dark mode, min-h-screen for footer
    <div className="flex flex-col min-h-screen pt-20 pb-20 md:pt-24 md:pb-0 bg-gray-900 text-white">
      
      {/* Main content area */}
      <div className="flex-grow p-4">
        <div className="max-w-md mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          
          <div className="text-center">
            {/* 2. New Avatar Style */}
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-gray-700">
              <span className="text-5xl font-semibold text-white">{initials}</span>
            </div>

            {/* 3. Name and Email */}
            <h2 className="text-3xl font-bold text-white mt-4">
              {name}
            </h2>
            <p className="text-md text-gray-400 mt-2 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {email}
            </p>
          </div>

          {/* 4. New "My Purchases" Section */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              My Purchases
            </h3>
            <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-gray-300">You own</p>
                <p className="text-2xl font-bold text-white">{purchasedCount} Projects</p>
              </div>
              <Link
                to="/projects"
                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Projects
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              You can download your purchased projects from the main projects page.
            </p>
          </div>

          {/* 5. Styled Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg mt-10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Footer is pushed to the bottom */}
      <Footer />
    </div>
  );
};

export default Profile;