import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { Tag, Sparkles, TrendingUp, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const server = import.meta.env.VITE_SERVER;

  const currentCategory = location.pathname.split('/')[3] || 'all';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
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
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border-blue-400'
      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white hover:bg-gray-700/70 border-gray-700 hover:border-gray-600 hover:scale-105';
  };

  const categoryIcons = {
    'all': Layers,
    'mern': TrendingUp,
    'react': Sparkles,
    'node': Tag,
  };

  const getIconForCategory = (category) => {
    const IconComponent = categoryIcons[category.toLowerCase()] || Tag;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="relative py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                <Tag className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Explore Categories
                </h2>
                <p className="text-sm text-gray-400">
                  Filter projects by technology stack
                </p>
              </div>
            </div>
            
            {/* Category Count Badge */}
            {!loading && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="hidden sm:flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300 font-medium">
                  {categories.length + 1} Categories
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Categories Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-gray-800/30 scroll-smooth">
            {/* "All" Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/projects"
                className={`group relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-300 ${getCategoryClass('all')}`}
              >
                <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>All Projects</span>
                {currentCategory === 'all' && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>

            {/* Dynamic Categories */}
            {loading ? (
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-32 h-10 bg-gray-800/50 rounded-xl animate-pulse border border-gray-700"
                  />
                ))}
              </div>
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={`/projects/category/${category.toLowerCase()}`}
                    className={`group relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border-2 transition-all duration-300 ${getCategoryClass(category)}`}
                  >
                    <span className="group-hover:rotate-12 transition-transform duration-300">
                      {getIconForCategory(category)}
                    </span>
                    <span>{category}</span>
                    
                    {/* Active indicator */}
                    {category.toLowerCase() === currentCategory.toLowerCase() && (
                      <>
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                        <motion.div
                          className="ml-1 w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-blue-500/20 -z-20"></div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default Category;