import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Eye, IndianRupee } from 'lucide-react';

// This is your new ProjectCard, adapted from BlogCard
const ProjectCard = ({ project, onDeleteClick }) => {
  const navigate = useNavigate();

  // Use the first image as the cover
  const coverImage = project.images?.[0]?.url;

  const handleCardClick = () => {
    navigate(`/project/${project._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card click
    onDeleteClick(project._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/edit/${project._id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Media Preview */}
      <div 
        onClick={handleCardClick}
        className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer"
      >
        {coverImage ? (
          <img 
            src={coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <IndianRupee className="w-4 h-4 text-green-600" strokeWidth={2.5} />
          <span className="text-sm font-bold text-gray-800">{project.price}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 
          onClick={handleCardClick}
          className="font-black text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
        >
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-lg">
            <span className="text-xs font-bold text-gray-700">{project.category}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={handleCardClick}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-gray-100 text-gray-700 rounded-xl transition-all duration-300 hover:bg-gray-200"
            title="View Details"
          >
            <Eye className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-blue-100 text-blue-700 rounded-xl transition-all duration-300 hover:bg-blue-200"
            title="Edit Project"
          >
            <Edit className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 px-3 py-3 bg-red-100 text-red-700 rounded-xl transition-all duration-300 hover:bg-red-200"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;