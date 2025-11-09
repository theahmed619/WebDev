import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiCalendar, HiTag } from 'react-icons/hi';

const DetailBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  
  const { id } = useParams(); // Get the blog ID from the URL

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return toast.error("You are not logged in.");
        }

        // 1. Fetch the single blog using the new route
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/blog/${id}`,
          { headers: { token: token } }
        );
        
        setBlog(data.blog);
        
        // 2. Find which media this blog post has
        if (data.blog.blogImage) {
          setMedia(data.blog.blogImage);
          setMediaType('image');
        } else if (data.blog.blogVideo) {
          setMedia(data.blog.blogVideo);
          setMediaType('video');
        } else if (data.blog.blogReel) {
          setMedia(data.blog.blogReel);
          setMediaType('video'); // Reels are also videos
        } else {
          toast.error("Blog has no media to display.");
        }
        
      } catch (error) {
        toast.error("Could not fetch blog post.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]); // Re-run if ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading post...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl">Blog post not found.</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    // 3. Add padding for top/bottom navbars
    <div className="pt-20 pb-20 md:pt-24 md:pb-0 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        {/* Full-size Media */}
        {media ? (
          <div className="w-full bg-black rounded-2xl shadow-xl overflow-hidden mb-6">
            {mediaType === 'image' ? (
              <img 
                src={media.url} 
                alt={blog.title} 
                className="w-full h-auto object-contain max-h-[80vh]" 
              />
            ) : (
              <video 
                src={media.url} 
                controls 
                autoPlay 
                className="w-full max-h-[80vh]" 
              />
            )}
          </div>
        ) : (
          <div className="w-full p-10 bg-gray-100 text-center rounded-lg mb-6">
            <p>No media found for this post.</p>
          </div>
        )}

        {/* Content Section (Styled like your v1 card) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          {/* Category Badge */}
          <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full capitalize">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold my-3 text-gray-900">{blog.title}</h1>

          {/* Meta Info (from your v1 style) */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <HiTag size={16} />
              <span>FID: {blog.fid}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiCalendar size={16} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Description */}
          {blog.desc && (
            <div className="prose max-w-none text-gray-700">
              <p>{blog.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;