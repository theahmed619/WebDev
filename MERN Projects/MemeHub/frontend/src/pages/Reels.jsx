import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiVideoCamera, HiHeart, HiShare, HiBookmark, HiPlay, HiPause } from 'react-icons/hi';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState({});
  const videoRefs = useRef({});
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return toast.error("Please log in to see reels.");
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/blog/all`,
          { headers: { token: token } }
        );
        
        const filteredReels = data.blogs
          .filter(blog => blog.blogReel)
          .reverse();
          
        setReels(filteredReels);
        
        // Initialize playing state
        const playingState = {};
        filteredReels.forEach((reel, idx) => {
          playingState[reel._id] = idx === 0;
        });
        setPlaying(playingState);

      } catch (error) {
        console.log(error);
        toast.error("Could not fetch reels.");
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  // Handle scroll snap and autoplay
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      const index = Math.round(scrollTop / itemHeight);
      
      if (index !== currentIndex && index < reels.length) {
        setCurrentIndex(index);
        
        // Pause all videos except current
        Object.keys(videoRefs.current).forEach((key, idx) => {
          const video = videoRefs.current[key];
          if (video) {
            if (idx === index) {
              video.play().catch(() => {});
              setPlaying(prev => ({ ...prev, [reels[idx]._id]: true }));
            } else {
              video.pause();
              setPlaying(prev => ({ ...prev, [reels[idx]._id]: false }));
            }
          }
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, reels]);

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMute = () => {
    setMuted(!muted);
    Object.values(videoRefs.current).forEach(video => {
      if (video) video.muted = !muted;
    });
  };

  const togglePlayPause = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play();
        setPlaying(prev => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setPlaying(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleShare = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.desc,
      }).catch(() => {});
    } else {
      toast.success('Share link copied!');
    }
  };

  return (
    <div className="mt-1 fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="flex items-center justify-center h-[90%] w-full">
        
        {/* Enhanced phone-like container */}
        <div className="w-full h-full md:max-w-md md:h-[90vh] bg-black md:rounded-3xl md:shadow-2xl overflow-hidden md:border md:border-gray-800 relative">
          
          {/* Glassmorphic Header */}
          {/* <div className="absolute top-0 left-0 right-0 z-20 backdrop-blur-xl bg-black/40 border-b border-white/10">
            <div className="p-5">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center">
                <HiVideoCamera className="w-7 h-7 mr-2 text-pink-500" />
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Fantasy Reels
                </span>
              </h2>
            </div>
          </div> */}

          {/* Reels Scrolling Container */}
          <div 
            ref={containerRef}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
                  <HiVideoCamera className="w-8 h-8 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-lg font-medium">Loading Reels...</p>
              </div>
            ) : reels.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
                <HiVideoCamera className="w-20 h-20 text-gray-700 mb-4" />
                <p className="text-xl font-semibold mb-2">No Reels Yet</p>
                <p className="text-gray-400">Be the first to post a reel!</p>
              </div>
            ) : (
              reels.map((blog, index) => (
                <div 
                  key={blog._id} 
                  className="relative w-full h-full snap-start flex-shrink-0 bg-black"
                >
                  {/* Video */}
                <video 
                    ref={el => videoRefs.current[blog._id] = el}
                    src={blog.blogReel.url} 
                    loop 
                    muted={muted}
                    playsInline
                    autoPlay={index === 0}
                    // Change 'object-cover' to 'object-contain'
                    className="w-full h-full object-contain"
                    onClick={() => togglePlayPause(blog._id)}
                  />

                  {/* Play/Pause Overlay */}
                  {!playing[blog._id] && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                      onClick={() => togglePlayPause(blog._id)}
                    >
                      <div className="bg-black/60 backdrop-blur-sm rounded-full p-6">
                        <HiPlay className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlays */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                    <div className="flex items-end justify-between">
                      {/* Text Content */}
                      <div className="flex-1 mr-4">
                        <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-white/95 text-sm leading-relaxed drop-shadow-md line-clamp-3">
                          {blog.desc}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-5 items-center">
                      {/* --- MUTE/UNMUTE BUTTON (MOVED) --- */}
                        <button 
                          onClick={toggleMute}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="p-3 rounded-full backdrop-blur-md bg-black/40 hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                            {muted ? (
                              <BiVolumeMute className="w-7 h-7 text-white" />
                            ) : (
                              <BiVolumeFull className="w-7 h-7 text-white" />
                            )}
                          </div>
                        </button>
                        {/* Like Button */}
                        {/* <button 
                          onClick={() => toggleLike(blog._id)}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                            liked[blog._id] 
                              ? 'bg-pink-500/90 scale-110' 
                              : 'bg-black/40 hover:bg-pink-500/60 group-hover:scale-110'
                          }`}>
                            <HiHeart className={`w-7 h-7 transition-colors ${
                              liked[blog._id] ? 'text-white' : 'text-white'
                            }`} />
                          </div>
                          <span className="text-white text-xs font-medium drop-shadow-md">
                            {liked[blog._id] ? '1.2k' : '1.1k'}
                          </span>
                        </button> */}
                      </div>
                    </div>
                  </div>

                  {/* Mute/Unmute Button */}
                  {/* <button 
                    onClick={toggleMute}
                    className="absolute top-24 right-4 p-3 rounded-full backdrop-blur-md bg-black/40 hover:bg-white/20 transition-all duration-300 z-10"
                  >
                    {muted ? (
                      <BiVolumeMute className="w-6 h-6 text-white" />
                    ) : (
                      <BiVolumeFull className="w-6 h-6 text-white" />
                    )}
                  </button> */}

                  {/* Progress Indicator */}
                  {/* <div className="absolute top-20 left-0 right-0 flex gap-1 px-4 z-10">
                    {reels.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                          idx === index 
                            ? 'bg-white' 
                            : idx < index 
                              ? 'bg-white/60' 
                              : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div> */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* CSS to hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Reels;