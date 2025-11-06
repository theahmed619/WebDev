import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Play, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogCard = ({ blog, mediaType, onDeleteClick }) => {
  const navigate = useNavigate();

  const media = blog[mediaType];
  const isImage = mediaType === 'blogImage';
  
  if (!media) return null;

  const handleCardClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteClick(blog._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${blog._id}`);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.03] border border-gray-100"
      onClick={handleCardClick}
    >
      {/* Media Preview */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {isImage ? (
          <img 
            src={media.url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="relative w-full h-full">
            <video 
              src={media.url}
              className="w-full h-full object-cover"
              muted
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                <Play className="w-10 h-10 text-gray-800" fill="currentColor" strokeWidth={0} />
              </div>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* View Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2.5} />
          <span className="text-xs font-bold text-gray-800">View</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-black text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
          {blog.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
            <span className="text-xs font-bold text-indigo-700">FID: {blog.fid}</span>
          </span>
          {blog.desc && (
            <p className="text-gray-500 text-xs line-clamp-1 flex-1 font-medium">
              {blog.desc}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleEdit}
            className="relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 overflow-hidden group/btn shadow-md hover:shadow-xl transform active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Edit className="w-4 h-4 relative z-10" strokeWidth={2.5} />
            <span className="text-sm font-bold relative z-10">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl transition-all duration-300 overflow-hidden group/btn shadow-md hover:shadow-xl transform active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <Trash2 className="w-4 h-4 relative z-10" strokeWidth={2.5} />
            <span className="text-sm font-bold relative z-10">Delete</span>
          </button>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default BlogCard;