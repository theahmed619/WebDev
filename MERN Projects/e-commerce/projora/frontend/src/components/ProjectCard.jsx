import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Code, IndianRupee } from 'lucide-react';

// A re-usable card for displaying a project
const ProjectCard = ({ project }) => {
  if (!project) return null;

  // Get the first image as the cover
  const coverImage = project.images?.[0]?.url || 'https://placehold.co/600x400/0d1117/3b82f6?text=Projora';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:scale-[1.02]">
      <Link to={`/project/${project._id}`}>
        <img
          className="w-full h-48 object-cover"
          src={coverImage}
          alt={project.title}
          onError={(e) => { e.target.src = 'https://placehold.co/600x400/0d1117/3b82f6?text=Image+Error'; }}
        />
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/project/${project._id}`}>
            <h3 className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
          </Link>
          <div className="flex items-center bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            <IndianRupee className="w-3 h-3 mr-1" />
            {project.price}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Code className="w-4 h-4 mr-2" />
          <span>{project.category}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-5 h-20 overflow-hidden line-clamp-4">
          {project.desc}
        </p>

        <div className="flex items-center space-x-3">
          <Link
            to={`/project/${project._id}`}
            className="flex-1 text-center bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </Link>
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-gray-700 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;