import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectCard from './ProjectCard';
import { DotsLoader } from './Loader';
import { Link } from 'react-router-dom';
import { Rocket, Loader2, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedProjects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = import.meta.env.VITE_SERVER;

  const [visibleCount, setVisibleCount] = useState(3);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/projects/all`);
        setAllProjects(data.projects);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch featured projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [server]);

  const loadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 3);
      setLoadMoreLoading(false);
    }, 500);
  };

  const hasMoreProjects = visibleCount < allProjects.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
            <div className="relative p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
              <Rocket className="w-7 h-7 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Our Projects
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Discover amazing projects built with modern technologies
            </p>
          </div>
        </div>
        
        <Link 
          to="/projects"
          className="group hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 hover:text-blue-300 font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Stats Bar */}
      {!loading && allProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-gray-300 text-sm">
              <span className="font-bold text-white">{allProjects.length}</span> Total Projects
            </span>
          </div>
          <div className="w-px h-6 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300 text-sm">
              <span className="font-bold text-white">{visibleCount}</span> Showing
            </span>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <DotsLoader />
        </div>
      ) : allProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-4">
            <Rocket className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">No Projects Yet</h2>
          <p className="text-gray-500">Check back soon for exciting new projects!</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allProjects.slice(0, visibleCount).map((project) => (
            <motion.div key={project._id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Load More Button */}
      {hasMoreProjects && (
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={loadMore}
            disabled={loadMoreLoading}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            {loadMoreLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                <span className="relative z-10">Loading...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Load More Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Mobile View All Button */}
      <motion.div 
        className="sm:hidden text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link 
          to="/projects"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-400 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedProjects;