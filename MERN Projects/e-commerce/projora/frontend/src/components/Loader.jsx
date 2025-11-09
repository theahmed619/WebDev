import React from 'react';

/**
 * A full-page loader. Use this for main page transitions.
 */
export const PageLoader = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
    <div className="relative w-20 h-20">
      {/* Outer pulsing ring */}
      <div className="absolute inset-0 border-4 border-blue-400 border-opacity-50 rounded-full animate-ping"></div>
      {/* Middle rotating ring */}
      <div className="absolute inset-2 w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      {/* Inner rotating ring (reverse) */}
      <div 
        className="absolute inset-4 w-12 h-12 border-4 border-t-transparent border-b-purple-400 rounded-full animate-spin" 
        style={{ animationDirection: 'reverse', animationDuration: '1s' }}
      ></div>
    </div>
    <div className="mt-8 text-lg font-medium tracking-wider animate-pulse">
      Loading Projora...
    </div>
  </div>
);

/**
 * A small spinner for buttons.
 */
export const ButtonSpinner = () => {
  return (
    <div className="relative w-5 h-5">
      <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
      <div className="absolute inset-0 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

/**
 * Bouncing dots for small loading states.
 */
export const DotsLoader = () => (
  <div className="flex space-x-2 justify-center items-center">
    <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
  </div>
);