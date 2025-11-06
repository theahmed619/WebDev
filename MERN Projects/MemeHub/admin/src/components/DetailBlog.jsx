import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/LoadingSpinner';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { ArrowLeft, Calendar, Tag, Eye } from 'lucide-react';

const DetailBlog = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return toast.error("You are not logged in.");
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/blog/${id}`,
        { headers: { token: token } }
      );
      
      setBlog(data.blog);
      
      if (data.blog.blogImage) {
        setMedia(data.blog.blogImage);
        setMediaType('image');
      } else if (data.blog.blogVideo) {
        setMedia(data.blog.blogVideo);
        setMediaType('video');
      } else if (data.blog.blogReel) {
        setMedia(data.blog.blogReel);
        setMediaType('video');
      } else {
        toast.error("Blog has no media to display.");
      }
      
    } catch (error) {
      toast.error("Could not fetch blog post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/blog/${id}`,
        { headers: { token: token } }
      );
      toast.success("Blog deleted successfully!");
      navigate('/');
    } catch (error) { 
      toast.error(error.response?.data?.message || 'Delete failed.'); 
    }
  };
  
  const handleUpdate = () => {
    toast.error("Update feature coming soon!");
  };

  if (loading) return <PageLoader />;

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100 max-w-md">
            <div className="bg-gradient-to-br from-red-100 to-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-red-600" strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-500 font-medium mb-6">This blog post doesn't exist or has been removed.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-bold hover:gap-3 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
            Back to Dashboard
          </Link>
          
          {/* Title Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                    <Tag className="w-4 h-4 text-indigo-600" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-indigo-700">FID: {blog.fid}</span>
                  </div>
                  {blog.createdAt && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                      <Calendar className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
                      <span className="text-sm font-bold text-gray-700">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Media Display */}
          {media ? (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 border border-gray-100">
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
                  className="w-full max-h-[80vh] bg-black" 
                />
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-16 text-center mb-6 border border-gray-200">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Eye className="w-10 h-10 text-gray-400" strokeWidth={2} />
              </div>
              <p className="text-gray-600 font-semibold text-lg">No media available for this post</p>
            </div>
          )}
          
          {/* Description */}
          {blog.desc && (
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1.5 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {blog.desc}
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleUpdate}
              className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl transition-all duration-300 overflow-hidden group shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <HiPencil className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-black text-lg relative z-10">Edit Post</span>
            </button>
            <button
              onClick={handleDelete}
              className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 via-rose-600 to-red-600 hover:from-red-600 hover:via-rose-700 hover:to-red-700 text-white rounded-2xl transition-all duration-300 overflow-hidden group shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <HiTrash className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-black text-lg relative z-10">Delete Post</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;