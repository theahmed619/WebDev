import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
    title: 'Welcome to Projora',
    subtitle: 'Your one-stop store for high-quality projects.',
    cta: 'Browse Projects',
    link: '/projects',
    gradient: 'from-blue-600/80 via-purple-600/60 to-transparent',
  },
  {
    image: 'https://www.ntaskmanager.com/wp-content/uploads/2020/02/What-is-a-Project-1-scaled.jpg',
    title: 'All Tech Projects Available',
    subtitle: 'A full-stack social media app ready to deploy.',
    cta: 'View Details',
    link: '/projects',
    gradient: 'from-emerald-600/80 via-teal-600/60 to-transparent',
  },
  {
    image: 'https://media.istockphoto.com/id/1452771551/vector/contact-us-button-with-cursor-pointer-click-vector-web-button.jpg?s=612x612&w=0&k=20&c=IGWQ-VhsNAnZyKnuWhggHhpozUiuFRq5jd-rJ7-KqIc=',
    title: 'Contact for Customize Project',
    subtitle: 'Explore the latest update with new dynamic auth.',
    cta: 'Contact Us',
    link: '/contact',
    gradient: 'from-orange-600/80 via-red-600/60 to-transparent',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    } 
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" } 
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const Slidebar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  };

  // Auto-play with progress bar
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentSlide, isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setProgress(0);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl my-6 group">
      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
      
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black">
        {/* Image Slider */}
        <div 
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-[280px] md:h-[400px] lg:h-[500px] relative">
              <motion.img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://placehold.co/1200x500/0d1117/3b82f6?text=Projora'}
                animate={{ 
                  scale: index === currentSlide ? 1.05 : 1,
                  opacity: index === currentSlide ? 1 : 0.7
                }}
                transition={{ duration: 8, ease: "easeInOut" }}
              />
              {/* Dynamic gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-2xl"
            >
              {/* Badge */}
              <motion.div 
                variants={childVariants}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm text-white/90 font-medium">
                  Featured {currentSlide + 1}/{slides.length}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                variants={childVariants}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p 
                variants={childVariants}
                className="text-base md:text-lg lg:text-xl text-white/90 mb-6 max-w-xl leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                variants={childVariants}
                onClick={() => navigate(slides[currentSlide].link)}
                className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{slides[currentSlide].cta}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  initial={false}
                />
                <motion.svg 
                  className="w-5 h-5 relative z-10"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.button 
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all z-20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <HiChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button 
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all z-20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.9 }}
        >
          <HiChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {/* Play/Pause Button */}
          <motion.button
            onClick={toggleAutoPlay}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full text-white hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>

          {/* Dot Indicators with Progress */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setProgress(0);
                }}
                className="relative group/dot"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
                {currentSlide === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        {isAutoPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slidebar;