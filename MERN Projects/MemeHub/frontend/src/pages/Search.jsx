import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiSearch } from 'react-icons/hi';
import BlogCard from '../components/BlogCard.jsx'; // 1. Import your v2 BlogCard
import Footer from '../components/Footer.jsx';
import SnapCard from "../components/SnapCard.jsx"
const Search = () => {
  // State for storing all blogs from the API
  const [allBlogs, setAllBlogs] = useState([]);
  // State for the user's search query
  const [searchTerm, setSearchTerm] = useState("");
  // State for the filtered search results
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // 1. Fetch all blogs once when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return toast.error("Please log in to search.");
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/blog/all`,
          { headers: { token: token } }
        );
        
        setAllBlogs(data.blogs.reverse()); // Store all blogs, newest first
      } catch (error) {
        console.error(error);
        toast.error("Could not fetch blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []); // Empty array means this runs only once

  // 2. Filter blogs whenever the searchTerm changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredBlogs([]); // If search is empty, show no results
    } else {
      const results = allBlogs.filter(
        (blog) =>
          // Safety check if blog.title exists
          (blog.title && 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          // Safety check if blog.category exists
          (blog.category && 
            blog.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredBlogs(results);
    }
  }, [searchTerm, allBlogs]); // Re-run this filter when search or blogs change

  return (
<>
      // Add padding for top/bottom navbars
    <div className="pt-6 pb-15 md:pt-24 md:pb-0 min-h-screen bg-gray-50 mt-3">
      <div className="max-w-7xl mx-auto p-4 ">
        
        {/* Search Input Section (from your v1 code) */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <HiSearch className="text-gray-400 w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full p-3 pl-12 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results Section (using v1 logic) */}
        <div>
          {loading ? (
            <p className="text-center text-gray-500">Loading initial data...</p>
          ) : searchTerm ? (
            filteredBlogs.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Search Results ({filteredBlogs.length})
                </h2>
                {/* 3. Use your v2 BlogCard in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No blogs found matching your search.
              </p>
            )
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Start typing above to search your Memes.
            </p>
          )}
        </div>
        

      </div>
          <SnapCard/>
           
    </div>
     <Footer/>


   
</>
  );
};

export default Search;