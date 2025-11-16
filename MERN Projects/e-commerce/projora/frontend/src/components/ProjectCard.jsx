import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Code, IndianRupee, ExternalLink, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!project) return null;

  const coverImage = project.images?.[0]?.url || 'https://placehold.co/600x400/0d1117/3b82f6?text=Projora';

  return (
    <motion.div 
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

      {/* Image Section */}
      <Link to={`/project/${project._id}`} className="relative block overflow-hidden">
        <div className="relative w-full h-52 bg-gray-900">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
          )}
          <motion.img
            className="w-full h-full object-cover"
            src={coverImage}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => { e.target.src = 'https://placehold.co/600x400/0d1117/3b82f6?text=Image+Error'; }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          {/* Featured badge */}
          <motion.div
            className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-blue-500/10 backdrop-blur-[2px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3"
            >
              <ArrowUpRight className="w-6 h-6 text-gray-900" />
            </motion.div>
          </motion.div>
        </div>
      </Link>
      
      {/* Content Section */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg group-hover:border-blue-500/50 transition-colors duration-300">
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-blue-500/30">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{project.price}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/project/${project._id}`}>
          <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 mb-2 line-clamp-1 group-hover:text-blue-400">
            {project.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-gray-400 text-sm mb-5 h-20 overflow-hidden line-clamp-4 leading-relaxed">
          {project.desc}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={`/project/${project._id}`}
            className="group/btn relative flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            <ExternalLink className="w-4 h-4 group-hover/demo:rotate-45 transition-transform duration-300" />
            <span className="relative z-10"> Details</span>
          </Link>
          
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/demo relative flex-1 flex items-center justify-center gap-2 bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/70 border border-gray-600 hover:border-gray-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
            title="View Live Demo"
          >
        
              <Eye className="w-4 h-4 relative z-10" />
            <span className=" ">Demo</span>
          </a>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
};

export default ProjectCard;