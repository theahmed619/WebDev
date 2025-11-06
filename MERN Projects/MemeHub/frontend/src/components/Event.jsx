import React from "react";
import { Link } from "react-router-dom";
import { Gift, Sparkles, Star } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Happy Diwali",
    subtitle: "Festival of Lights",
    gradient: "from-yellow-400 via-orange-400 to-orange-500",
    icon: "✨",
    emoji: "🪔",
  },
  {
    id: 2,
    title: "Happy New Year",
    subtitle: "Celebrate 2025",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    icon: "🎉",
    emoji: "🎊",
  },
  //  {
  //   id: 2,
  //   title: "Raksha Bandhan",
  //   subtitle: "Bond of Protection",
  //   gradient: "from-pink-500 via-rose-500 to-red-500",
  //   icon: "🎀",
  //   emoji: "💝",
  // },
  {
    id: 3,
    title: "Eid Mubarak",
    subtitle: "Blessed Celebration",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    icon: "🌙",
    emoji: "⭐",
  },
  {
    id: 4,
    title: "Merry Christmas",
    subtitle: "Season of Joy",
    gradient: "from-red-500 via-rose-500 to-pink-600",
    icon: "🎄",
    emoji: "🎅",
  },
];

function Event() {
  return (
    <div className="container mx-auto px-4 mb-12 lg:mb-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <Sparkles className="text-yellow-500 animate-pulse" size={28} />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Special Events & Wishes
          </h2>
          <Sparkles className="text-yellow-500 animate-pulse" size={28} />
        </div>
        <p className="text-gray-600">Send warm wishes for every celebration</p>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {events.map((event, index) => (
          <Link
            to={`/payment/${event.id}`}
            key={event.id}
            className="block group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gift Box Container */}
            <div className="relative">
              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 text-3xl animate-bounce z-10">
                {event.emoji}
              </div>
              
              {/* Main Gift Box */}
              <div
                className={`relative bg-gradient-to-br ${event.gradient} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-3xl`}
              >
                {/* Ribbon Horizontal */}
                <div className="absolute top-1/2 left-0 right-0 h-12 bg-white/20 backdrop-blur-sm border-y-2 border-white/40 transform -translate-y-1/2 z-10"></div>
                
                {/* Ribbon Vertical */}
                <div className="absolute top-0 bottom-0 left-1/2 w-12 bg-white/20 backdrop-blur-sm border-x-2 border-white/40 transform -translate-x-1/2 z-10"></div>
                
                {/* Bow on top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative">
                    <Gift className="text-white drop-shadow-2xl" size={48} strokeWidth={2.5} />
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
                  </div>
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-4 right-4 text-white/40 animate-pulse">
                  <Star size={20} fill="currentColor" />
                </div>
                <div className="absolute bottom-4 left-4 text-white/40 animate-pulse delay-300">
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="absolute top-1/4 left-8 text-white/30 animate-pulse delay-500">
                  <Star size={12} fill="currentColor" />
                </div>

                {/* Content */}
                <div className="relative z-20 p-8 lg:p-10 flex flex-col items-center justify-center min-h-[280px] text-center">
                  {/* Icon */}
                  <div className="text-6xl lg:text-7xl mb-4 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {event.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {event.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-white/90 text-sm lg:text-base font-medium drop-shadow-md">
                    {event.subtitle}
                  </p>

                  {/* View Button */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-semibold shadow-lg text-sm">
                      Open Gift
                      <Gift size={16} />
                    </span>
                  </div>
                </div>

                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>
              </div>

              {/* Shadow beneath gift */}
              <div className="absolute inset-x-4 -bottom-2 h-8 bg-gradient-to-b from-gray-400/30 to-transparent blur-2xl rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-4 text-gray-400">
          <Star size={16} fill="currentColor" className="animate-pulse" />
          <span className="text-sm font-medium">Click any gift to celebrate</span>
          <Star size={16} fill="currentColor" className="animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Event;