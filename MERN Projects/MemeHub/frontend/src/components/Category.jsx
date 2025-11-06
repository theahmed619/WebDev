import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// This is from your v1 code
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

// Colors from your v1 code
const colorVariants = [
  "bg-gradient-to-br from-purple-500 to-purple-600",
  "bg-gradient-to-br from-pink-500 to-pink-600",
  "bg-gradient-to-br from-indigo-500 to-indigo-600",
  "bg-gradient-to-br from-cyan-500 to-cyan-600",
  "bg-gradient-to-br from-teal-500 to-teal-600",
  "bg-gradient-to-br from-green-500 to-green-600",
];

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get the category from the URL, e.g., '/category/Fantasy'
  const currentCategory = location.pathname.split('/')[2] || 'All';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return toast.error("Please log in to see categories.");
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/blog/categories`,
          { headers: { token: token } }
        );
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 mb-12 lg:mb-16">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Explore Categories
        </h2>
        <p className="text-gray-600">Discover content across different topics</p>
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
        itemClass="px-3"
        arrows={false}
        swipeable={true}
        draggable={true}
      >
        {/* 'All' Button */}
        <Link
          to="/" // Link to Home page for "All"
          className="block group"
        >
          <div
            className={`flex flex-col items-center justify-center w-full aspect-square text-white rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden
              ${currentCategory === 'All' ? 'ring-4 ring-offset-2 ring-blue-500' : ''}
              bg-gradient-to-br from-blue-500 to-blue-600
            `}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
            </div>
            <span className="text-base lg:text-lg font-bold capitalize text-center px-3 relative z-10">
              All
            </span>
          </div>
        </Link>
        
        {/* Dynamic Categories */}
        {loading ? (
          // Loading spinner from your v1 code
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-gray-500">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </div>
          </div>
        ) : (
          categories.map((category, index) => (
            <Link
              to={`/category/${category}`} // Link to the new category page
              key={category}
              className="block group"
            >
              <div
                className={`flex flex-col items-center justify-center w-full aspect-square ${
                  colorVariants[index % colorVariants.length]
                } text-white rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden
                  ${currentCategory === category ? 'ring-4 ring-offset-2 ring-purple-500' : ''}
                `}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                </div>
                <span className="text-base lg:text-lg font-bold capitalize text-center px-3 relative z-10">
                  {category}
                </span>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default Category;