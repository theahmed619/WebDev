import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Code, Zap, TrendingUp, ArrowRight, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    title: "Premium Tech Projects",
    subtitle: "Production-ready code with modern technologies",
    badge: "Featured",
    cta: "Explore Now",
    gradient: "from-blue-600/90 via-purple-600/70",
    icon: Code,
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    title: "Full-Stack Solutions",
    subtitle: "MERN, React, Node.js projects ready to deploy",
    badge: "Best Seller",
    cta: "View Projects",
    gradient: "from-emerald-600/90 via-teal-600/70",
    icon: Zap,
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    title: "Start Building Today",
    subtitle: "Save weeks of development with our templates",
    badge: "New",
    cta: "Get Started",
    gradient: "from-orange-600/90 via-red-600/70",
    icon: TrendingUp,
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setProgress(0);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setProgress(0);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
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
  }, [currentIndex, isAutoPlaying]);

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="relative h-[250px] md:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden group shadow-2xl">
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>

        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            style={{ backgroundImage: `url(${currentSlide.url})` }}
            className="absolute inset-0 bg-center bg-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} to-transparent`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10">
          
          {/* Top Section - Badge */}
          <div className="flex justify-between items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2"
              >
                <IconComponent className="w-4 h-4 text-white" />
                <span className="text-xs md:text-sm text-white font-semibold">{currentSlide.badge}</span>
              </motion.div>
            </AnimatePresence>

            {/* Play/Pause Button */}
            <motion.button
              onClick={toggleAutoPlay}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isAutoPlaying ? 'Pause' : 'Play'}
            >
              {isAutoPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </motion.button>
          </div>

          {/* Bottom Section - Content */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-3"
              >
                {/* Title */}
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
                  {currentSlide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-2xl drop-shadow-md">
                  {currentSlide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <motion.button
                    onClick={() => navigate('/projects')}
                    className="group relative inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{currentSlide.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate('/search')}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Browse All</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-6 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all z-20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white hover:bg-white/20 transition-all z-20 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((slide, slideIndex) => (
            <motion.button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="relative group/dot"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === slideIndex
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
              {currentIndex === slideIndex && (
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

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-br-full opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-full opacity-50"></div>
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-8 mt-8 text-gray-400 text-sm"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>50+ Premium Projects</span>
        </div>
        <div className="w-px h-4 bg-gray-700"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Instant Download</span>
        </div>
        {/* <div className="w-px h-4 bg-gray-700"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>Lifetime Updates</span>
        </div> */}
      </motion.div>
    </div>
  );
};

export default Hero;