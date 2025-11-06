import React from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import Navbar from '../components/Navbar'; // 1. Import Navbar

const Profile = () => {
  const { user, logoutHandler } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler(navigate);
  };

  return (
    <>
      <Navbar /> {/* 2. Add Navbar component */}

      {/* This padding creates the gap for the navbars */}
      <div className="pt-24 pb-24 md:pb-8 p-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full">
              <UserCircle size={64} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Admin Profile</h2>
            <p className="text-lg text-gray-600 mt-2">{user?.email}</p>

            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-8"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;