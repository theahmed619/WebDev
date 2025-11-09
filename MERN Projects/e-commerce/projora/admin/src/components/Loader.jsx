import React from 'react';

/**
 * A full-page loader for initial data fetching.
 * (Used in App.jsx)
 */
export const PageLoader = () => (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
      <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </div>
);

/**
 * A small spinner for buttons.
 * (Used in Login.jsx, Verify.jsx, etc.)
 */
export const ButtonSpinner = () => {
  return (
    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
  );
};