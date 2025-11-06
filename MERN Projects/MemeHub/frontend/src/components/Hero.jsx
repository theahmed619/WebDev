import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Using lucide-react for icons

const slides = [
  {
    url: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
    title: "Explore Majestic Mountains",
    subtitle: "Discover breathtaking views and serene landscapes.",
  },
  {
    url: "https://st2.depositphotos.com/1002200/6221/i/450/depositphotos_62210177-stock-photo-autumn-mountain-landscape.jpg",
    title: "Autumn Mountain Retreat",
    subtitle: "Experience the vibrant colors of the fall season.",
  },
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHOMcJmmWxrfgGlq04haylrm5gs2l2Ha-MWmRHkMCzC3YLiMfxnqJGWwZwHbla7LgGmQ&usqp=CAU",
    title: "Serene Lakeside Views",
    subtitle: "Relax and unwind by the calm and beautiful waters.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="h-[400px] w-full m-auto mb-10 relative group">
      {/* Slides Container */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
        {/* Caption */}
        <div className="absolute bottom-10 left-10 text-white p-4">
          <h2 className="text-4xl font-bold drop-shadow-lg">{slides[currentIndex].title}</h2>
          <p className="text-lg drop-shadow-lg">{slides[currentIndex].subtitle}</p>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Indicator Dots */}
      <div className="flex top-4 justify-center py-2 absolute bottom-2 w-full">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer mx-1 ${
              currentIndex === slideIndex ? "text-white" : "text-gray-400"
            }`}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;