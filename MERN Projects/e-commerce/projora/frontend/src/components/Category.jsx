import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { Tag } from 'lucide-react';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const server = import.meta.env.VITE_SERVER;

  // Get the category from the URL, e.g., '/projects/category/MERN'
  const currentCategory = location.pathname.split('/')[3] || 'all';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // This route is public, no token needed
        const { data } = await axios.get(`${server}/api/projects/categories`);
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [server]);

  const getCategoryClass = (category) => {
    const isActive = category.toLowerCase() === currentCategory.toLowerCase();
    return isActive
      ? 'bg-blue-600 text-white shadow-lg'
      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white';
  };

  return (
    <div className="py-6 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Browse by Category
        </h2>
        {/* Horizontal scrolling container */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {/* "All" Button */}
          <Link
            to="/projects"
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${getCategoryClass('all')}`}
          >
            All Projects
          </Link>

          {/* Dynamic Categories */}
          {loading ? (
            <div className="text-gray-400">Loading categories...</div>
          ) : (
            categories.map((category) => (
              <Link
                to={`/projects/category/${category.toLowerCase()}`}
                key={category}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${getCategoryClass(category)}`}
              >
                {category}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;