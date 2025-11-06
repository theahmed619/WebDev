import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import { PageLoader } from '../components/LoadingSpinner';
import MediaModal from '../components/MediaCards';
import { Camera, ImageIcon, Sparkles } from 'lucide-react';

const Photos = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return toast.error("You are not logged in.");
      }

      const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/api/blog/all`, {
          headers: { token: token },
        });
      setBlogs(data.blogs.filter(blog => blog.blogImage));
    } catch (error) { 
      console.log(error);
      toast.error('Could not fetch photos.'); 
    } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPhotos(); }, []);

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
      fetchPhotos();
    } catch (error) { 
      toast.error(error.response?.data?.message || 'Delete failed.'); 
    }
  };

  if (loading) return <PageLoader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 pt-24 pb-24 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-4 rounded-2xl shadow-xl">
                <Camera className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                  Photos Gallery
                  <Sparkles className="w-8 h-8 text-pink-500" strokeWidth={2} />
                </h1>
                <p className="text-gray-500 font-semibold mt-1">
                  {blogs.length} beautiful moments captured
                </p>
              </div>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full w-32"></div>
          </div>

          {/* Content */}
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-12 h-12 text-pink-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Photos Yet</h3>
                <p className="text-gray-500 font-medium">Start by uploading your first photo!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogs.map(blog => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog}
                  mediaType="blogImage"
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

export default Photos;