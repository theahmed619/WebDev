import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/LoadingSpinner';
import BlogCard from '../components/BlogCard';
import MediaModal from '../components/MediaCards';
import { Film, Zap, Sparkles } from 'lucide-react';

const Reels = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState(null);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return toast.error("You are not logged in.");
      }
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/blog/all`,
        { headers: { token: token } }
      );
      setBlogs(data.blogs.filter(blog => blog.blogReel));
    } catch (error) {
      toast.error('Could not fetch reels.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchReels();
  }, []);

  const handleCardClick = (url, type) => {
    setSelectedMediaUrl(url);
    setSelectedMediaType(type);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/blog/${blogId}`,
        { headers: { token: token } }
      );
      toast.success(data.message);
      fetchReels();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed.');
    }
  };

  if (loading) return <PageLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-4 rounded-2xl shadow-xl">
                <Film className="w-8 h-8 text-white" strokeWidth={2.5} />
                <Zap className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  Reels Collection
                  <Sparkles className="w-8 h-8 text-purple-500" strokeWidth={2} />
                </h1>
                <p className="text-gray-500 font-semibold mt-1">
                  {blogs.length} quick highlights
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full w-32"></div>
          </div>

          {/* Content */}
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Film className="w-12 h-12 text-purple-600" strokeWidth={2} />
                  <Zap className="w-6 h-6 text-pink-500 absolute -top-2 -right-2 animate-bounce" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Reels Yet</h3>
                <p className="text-gray-500 font-medium">Start by creating your first reel!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogs.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog}
                  mediaType="blogReel"
                  onCardClick={handleCardClick}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          )}

          {isModalOpen && (
            <MediaModal 
              mediaUrl={selectedMediaUrl}
              mediaType={selectedMediaType}
              onClose={() => setIsModalOpen(false)} 
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Reels;