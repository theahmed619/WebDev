import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

// 1. Updated slides array with CTA (Call to Action)
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    title: 'Welcome to Projora',
    subtitle: 'Your one-stop store for high-quality MERN projects.',
    cta: 'Browse Projects',
    link: '/projects',
  },
  {
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726c?q=80&w=2070&auto=format&fit=crop',
    title: 'Featured: MemeHub',
    subtitle: 'A full-stack social media app ready to deploy.',
    cta: 'View Details',
    link: '/project/60d5f1b4e6b3c1001f8f8b8a', // Example ID
  },
  {
    image: 'https://images.unsplash.com/photo-1516116216624-53e6973bea12?q=80&w=1932&auto=format&fit=crop',
    title: 'FantasyHub v3',
    subtitle: 'Explore the latest update with new dynamic auth.',
    cta: 'Learn More',
    link: '/project/60d5f1b4e6b3c1001f8f8b8b', // Example ID
  },
];

const Slidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); 
    return () => clearInterval(slideInterval);
  }, []);

  // This is the max-width container you asked for
  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-lg my-4">
      {/* Slide Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-[300px] md:h-[450px] lg:h-[500px] relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://placehold.co/1200x500/0d1117/3b82f6?text=Image+Error'}
            />
            {/* 2. New Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* 3. New Text & CTA Position */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 lg:p-12 text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mt-2 shadow-lg max-w-lg">
                {slide.subtitle}
              </p>
              <button
                onClick={() => navigate(slide.link)}
                className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation (Unchanged) */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slidebar;