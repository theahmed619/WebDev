import React from 'react';

// Small spinner for buttons
const LoadingSpinner = () => {
  return (
    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
  );
};

// Full page loader
export const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </div>
)

export default LoadingSpinner;