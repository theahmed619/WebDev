import React from 'react';

// Pulse ring spinner for buttons
const LoadingSpinner = () => {
  return (
    <div className="relative w-5 h-5">
      <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
      <div className="absolute inset-0 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

// Full page loader with multiple animated elements
export const PageLoader = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="relative">
      {/* Outer pulsing ring */}
      <div className="absolute inset-0 w-20 h-20 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
      
      {/* Middle rotating ring */}
      <div className="absolute inset-2 w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      
      {/* Inner rotating ring (reverse direction) */}
      <div className="absolute inset-4 w-12 h-12 border-4 border-t-transparent border-r-transparent border-b-purple-400 border-l-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      
      {/* Center dot */}
      <div className="absolute inset-8 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="mt-8 text-slate-700 font-medium animate-pulse">Loading...</div>
  </div>
);

// Bonus: Dots spinner
export const DotsLoader = () => (
  <div className="flex space-x-2">
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
  </div>
);

// Bonus: Orbit spinner
export const OrbitLoader = () => (
  <div className="relative w-16 h-16">
    <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-blue-500 rounded-full animate-spin origin-center" style={{ animationDuration: '1.5s', transformOrigin: 'center 32px' }}></div>
    <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-purple-500 rounded-full animate-spin" style={{ animationDuration: '1s', transformOrigin: 'center 32px', animationDelay: '0.2s' }}></div>
  </div>
);

// Demo component
const LoaderDemo = () => {
  return (
    <div className="p-8 space-y-12 bg-white min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Loading Spinners Collection</h2>
      </div>

      <div className="space-y-8">
        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Button Spinner</h3>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-3 hover:bg-blue-700 transition-colors">
            <LoadingSpinner />
            <span>Processing...</span>
          </button>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Dots Loader</h3>
          <DotsLoader />
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Orbit Loader</h3>
          <OrbitLoader />
        </div>

        <div className="p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Full Page Loader Preview</h3>
          <div className="h-64 relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden">
            <PageLoader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderDemo;