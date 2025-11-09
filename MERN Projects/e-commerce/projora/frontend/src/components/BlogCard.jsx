import React from 'react';
import { HiPlay } from 'react-icons/hi';
import { Link } from 'react-router-dom'; // 1. Import the Link component

const BlogCard = ({ blog }) => {
  // Find the first available media to display
  const media = blog.blogImage || blog.blogVideo || blog.blogReel;
  const isImage = !!blog.blogImage; // Check if the first media is an image

  return (
    // 2. Wrap your entire card in a Link component
    <Link 
      to={`/blog/${blog._id}`} 
      className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
    >
      {/* Media Section */}
      <div className="relative w-full aspect-video bg-gray-200">
        {media ? (
          isImage ? (
            <img 
              src={media.url} 
              alt={blog.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
            />
          ) : (
            <video 
              src={media.url} 
              controls 
              muted 
              className="w-full h-full object-cover" 
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Media
          </div>
        )}
        
        {/* Play icon for videos/reels */}
        {!isImage && media && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <HiPlay className="w-12 h-12 text-white/80" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
          {blog.category}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors" title={blog.title}>
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={blog.desc}>
          {blog.desc}
        </p>
      </div>
    </Link> // 3. Close the Link component
  );
};

export default BlogCard;