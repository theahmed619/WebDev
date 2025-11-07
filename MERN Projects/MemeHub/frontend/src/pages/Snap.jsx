import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HiArrowLeft, HiOutlinePhotograph, HiOutlineVideoCamera } from 'react-icons/hi';

// --- THIS IS YOUR STATIC SNAP CONTENT ---
// You can change this to 'image' or 'video'
const snapContent = {
  //type: 'video', // 'image' or 'video'
  // url: "https://res.cloudinary.com/diw52naci/video/upload/v1762356841/tanuuu_2704-02-10-2025-0001_qygwvq.mp4"
  
  // --- Example for an image ---
   type: 'image',
  url: "https://res.cloudinary.com/dg5vfvrad/image/upload/v1762437761/IMG-20250724-WA0018_tez27k.jpg"
};
// ----------------------------------------

const Snap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Check if the user came from the SnapAuth page
  const isAuthorized = location.state?.authorized === true;

  useEffect(() => {
    // 2. If not authorized, redirect them back to the code entry page
    if (!isAuthorized) {
      navigate('/snap/auth');
    }
  }, [isAuthorized, navigate]);

  // 3. If they aren't authorized, show nothing
  if (!isAuthorized) {
    return null; 
  }

  // 4. If they ARE authorized, show the secret content
  return (
    <div className="pt-20 pb-20 md:pt-24 md:pb-8 p-4 max-w-5xl mx-auto min-h-screen">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
      >
        <HiArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col items-center">
          
          {/* --- FIX: Show icon based on content type --- */}
          {snapContent.type === 'image' ? (
            <HiOutlinePhotograph className="w-16 h-16 text-purple-500" />
          ) : (
            <HiOutlineVideoCamera className="w-16 h-16 text-purple-500" />
          )}
          
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Here's Your Snap!</h1>
          <p className="text-lg text-gray-600 mt-2 mb-6">
            You've unlocked the secret content.
          </p>

          {/* --- FIX: Conditionally render image or video --- */}
          <div className="w-full bg-black rounded-lg shadow-lg overflow-hidden">
            {snapContent.type === 'image' ? (
              <img 
                src={snapContent.url} 
                alt="Secret Snap" 
                className="w-full h-auto object-contain" 
              />
            ) : (
              <video
                src={snapContent.url}
                controls
                autoPlay
                loop
                className="w-full max-h-[80vh] object-contain"
              />
            )}
          </div>
          {/* <p>SNAP</p> */}
        </div>
      </div>
    </div>
  );
};

export default Snap;