import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiDownload, HiCheckCircle } from 'react-icons/hi';

const Surprise = () => {

  useEffect(() => {
    // This hook runs once when the page loads
    
    // 1. Create a temporary link
    const link = document.createElement('a');
    
    // 2. Set the href to your static image in the 'public' folder
    //    *** YOU MUST ADD 'surprise-image.png' to your /public folder ***
    link.href = '/surprise-image.png'; 
    
    // 3. Set the download attribute to name the file
    link.download = 'Meme-Surprise.png';
    
    // 4. Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }, []); // The empty array ensures this only runs once

  return (
    <div className="pt-20 pb-20 md:pt-24 md:pb-8 p-4 max-w-lg mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <HiCheckCircle className="w-24 h-24 text-green-500 mx-auto" />
        
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your download should start automatically.
        </p>
        
        <p className="text-sm text-gray-500 mt-6">
          If your download doesn't start, you can
          <a 
            href="/surprise-image.png" 
            download="FantasyHub-Surprise.png"
            className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
          >
            click here to download it manually
          </a>.
        </p>

        <Link 
          to="/" 
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-300 font-medium shadow-lg mt-8"
        >
          <HiDownload className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Surprise;