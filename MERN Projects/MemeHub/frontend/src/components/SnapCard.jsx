import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye } from 'lucide-react';

const SnapCard = () => {
  return (
   <div className="container mx-auto px-4 mb-12 lg:mb-16">
      <Link
        to="/snap/auth" // This links to the new secret code page
        className="block group"
      >
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-full shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl aspect-square max-w-md mx-auto border border-gray-800">
          
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-600 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute inset-4 border-2 border-gray-700/40 rounded-full"></div>
          <div className="absolute inset-8 border border-gray-600/30 rounded-full"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
            <div className="relative mb-6 bg-gray-800/50 backdrop-blur-md p-6 rounded-full shadow-xl border border-gray-700/50">
              <Lock className="text-gray-300 drop-shadow-2xl" size={48} strokeWidth={2} />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 drop-shadow-lg">
              Unlock a Secret
            </h3>
            
            <p className="text-gray-300 text-base font-medium drop-shadow-md mb-6 max-w-xs">
              A Secret snap is waiting for you
            </p>

            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white backdrop-blur-sm text-gray-900 rounded-full font-bold shadow-lg text-sm">
                Enter Code to View
                <Eye size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SnapCard;