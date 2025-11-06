import React from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { HiLogout } from 'react-icons/hi';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logoutHandler } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler(navigate);
  };

  // --- 1. Get user's name and first initial ---
  // Provides a fallback in case the name isn't loaded yet
  const name = user?.name || 'User';
  const initial = name[0].toUpperCase();

  return (
    <>
      {/* Container with padding for top and bottom navbars */}
      <div className="flex flex-col min-h-screen pt-20 pb-20 md:pt-24 md:pb-8">
        
        {/* Main content area */}
        <div className="flex-grow p-4 max-w-lg mx-auto w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            
            {/* --- 2. New Avatar --- */}
            <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl font-semibold text-white">{initial}</span>
            </div>

            {/* --- 3. Name and Email --- */}
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              {user?.name}
            </h2>
            <p className="text-md text-gray-500 mt-1">{user?.email}</p>

            {/* --- 4. Styled Logout Button --- */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 transition-colors duration-300 font-medium shadow-lg mt-10"
            >
              <HiLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Footer is pushed to the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default Profile;