import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// 1. Add your slides here
const slides = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLkX9FAgdsvvqZa8n-xRCMM_KWkqcCT7KuA&s',
    title: 'Welcome to MemeHub',
    subtitle: 'Your one-stop for all things fantasy.',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTin_X6MGKnZpyA1BUZq-R0KRejo8QanIMV_A&s',
    title: 'Latest News & Updates',
    subtitle: 'Stay in the loop with the latest content.',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByxaqs7wvnjE_eXck4OncqbtkiHvrvyKg8Q&s',
    title: 'Featured Posts',
    subtitle: 'Check out our most popular articles.',
  },
];

const Slidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 3. Auto-play effect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Clean up on unmount
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-lg my-4  ">
      {/* Slide Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full aspect-[3/1] relative ">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover "
              onError={(e) => e.target.src = 'https://placehold.co/1200x400/CCCCCC/FFFFFF?text=Image+Error'}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-2xl md:text-5xl font-bold text-white shadow-lg">{slide.title}</h2>
              <p className="text-lg md:text-xl text-white/90 mt-2 shadow-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>
      
      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-all z-10"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
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

