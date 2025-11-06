import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star } from 'lucide-react';

const SurpriseCard = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
    
     <Link
        to="/payment/surprise"
        className="block group"
      >
        <div className="relative bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* ... (decorative elements) ... */}
          <div className="relative z-20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] text-center">
            <div className="text-7xl mb-4 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
              🎁
            </div>
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Unlock a Surprise!
            </h3>
            <p className="text-white/90 text-lg font-medium drop-shadow-md">
              A special gift is waiting for you.
            </p>
            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-semibold shadow-lg text-sm">
                Unlock Now 
                <Gift size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SurpriseCard;