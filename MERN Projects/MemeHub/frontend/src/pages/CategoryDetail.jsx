import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BlogCard from '../components/BlogCard.jsx'; // 1. Import the new card
import { HiArrowLeft } from 'react-icons/hi';

const CategoryDetail = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
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

        // 2. Filter blogs (with safety check)
        const filtered = data.blogs.filter(
          (blog) => 
            blog.category && 
            blog.category.trim().toLowerCase() === categoryName.trim().toLowerCase()
        );
        
        // 3. Reverse to show newest first, just like your v1 code
        setBlogs(filtered.reverse());

      } catch (error) {
        console.log(error);
        toast.error("Could not fetch posts for this category.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [categoryName]); // Re-fetch if the categoryName changes

  return (
    // 4. Add padding for top/bottom navbars
    <div className="pt-20 pb-20 md:pt-24 md:pb-0 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        
        {/* 5. Back Link (from your v1 code) */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Category: <span className="text-blue-600 capitalize">{categoryName}</span>
        </h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading posts...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500">
            No posts found in this category.
          </div>
        ) : (
          // 6. Use a responsive grid to show the cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;