import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Film, ArrowRight, Sparkles } from 'lucide-react';

const MediaCards = () => {
  const navigate = useNavigate();

  const mediaTypes = [
    {
      title: 'PHOTOS',
      subtitle: 'Capture moments',
      icon: Camera,
      path: '/photos',
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      bgPattern: 'from-pink-50 to-rose-50',
      count: '2.4k'
    },
    {
      title: 'VIDEOS',
      subtitle: 'Stories in motion',
      icon: Video,
      path: '/videos',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      bgPattern: 'from-blue-50 to-indigo-50',
      count: '1.8k'
    },
    {
      title: 'REELS',
      subtitle: 'Quick highlights',
      icon: Film,
      path: '/reels',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bgPattern: 'from-purple-50 to-pink-50',
      count: '3.2k'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" strokeWidth={2} />
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              Your Media Gallery
            </h1>
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Manage and explore your creative content
          </p>
        </div>

        {/* Photos Card - Full Width Featured */}
        <div
          onClick={() => navigate(mediaTypes[0].path)}
          className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 cursor-pointer 
            transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group mb-6 sm:mb-8 
            overflow-hidden"
        >
          {/* Animated Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${mediaTypes[0].gradient} opacity-0 
            group-hover:opacity-10 transition-all duration-500`}></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${mediaTypes[0].bgPattern} opacity-50`}></div>
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-200/30 to-pink-200/30 rounded-full blur-3xl -ml-24 -mb-24 group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className={`relative bg-gradient-to-br ${mediaTypes[0].gradient} p-4 sm:p-6 rounded-2xl 
                shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <Camera className="w-8 h-8 sm:w-14 sm:h-14 text-white" strokeWidth={2} />
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-5xl font-black text-gray-800 tracking-tight mb-1 sm:mb-2">
                  {mediaTypes[0].title}
                </h2>
                <p className="text-sm sm:text-lg text-gray-500 font-semibold flex items-center gap-2">
                  {mediaTypes[0].subtitle}
                  <span className="hidden sm:inline-flex items-center px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-bold">
                    {mediaTypes[0].count}+ Items
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right mr-2">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Featured</p>
                <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Gallery
                </p>
              </div>
              <ArrowRight className="w-6 h-6 sm:w-10 sm:h-10 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-3 transition-all duration-500" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Videos and Reels Cards - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {mediaTypes.slice(1).map((media) => {
            const IconComponent = media.icon;
            return (
              <div
                key={media.title}
                onClick={() => navigate(media.path)}
                className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 cursor-pointer 
                  transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] group 
                  overflow-hidden"
              >
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${media.gradient} opacity-0 
                  group-hover:opacity-10 transition-all duration-500`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${media.bgPattern} opacity-50`}></div>
                
                {/* Decorative Circle */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`bg-gradient-to-br ${media.gradient} p-4 sm:p-5 rounded-2xl 
                      shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                      <IconComponent className="w-7 h-7 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                    </div>
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-500" strokeWidth={2.5} />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black text-gray-800 tracking-tight mb-2">
                      {media.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 font-semibold mb-3">
                      {media.subtitle}
                    </p>
                    <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-full">
                      <span className="text-xs font-bold text-gray-600">{media.count}+ Items</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaCards;